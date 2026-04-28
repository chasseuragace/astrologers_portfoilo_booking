#!/usr/bin/env node
/**
 * Translation Validator
 * Ensures all keys in en.json have corresponding keys in np.json and vice versa
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOCALES_DIR = path.join(__dirname, '../src/i18n/locales');
const PRIMARY_LANG = 'en';
const SECONDARY_LANG = 'np';

function loadJson(filename) {
  const filepath = path.join(LOCALES_DIR, filename);
  const content = fs.readFileSync(filepath, 'utf-8');
  return JSON.parse(content);
}

function getAllKeys(obj, prefix = '') {
  const keys = [];
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (obj[key] !== null && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      keys.push(...getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

function findMissingKeys(primaryKeys, secondaryKeys, primaryName, secondaryName) {
  const missing = [];
  for (const key of primaryKeys) {
    if (!secondaryKeys.includes(key)) {
      missing.push(key);
    }
  }
  return missing;
}

function validateTranslations() {
  console.log('🔍 Validating translations...\n');

  const primary = loadJson(`${PRIMARY_LANG}.json`);
  const secondary = loadJson(`${SECONDARY_LANG}.json`);

  const primaryKeys = getAllKeys(primary);
  const secondaryKeys = getAllKeys(secondary);

  const missingInSecondary = findMissingKeys(primaryKeys, secondaryKeys, PRIMARY_LANG, SECONDARY_LANG);
  const missingInPrimary = findMissingKeys(secondaryKeys, primaryKeys, SECONDARY_LANG, PRIMARY_LANG);

  let hasErrors = false;

  if (missingInSecondary.length > 0) {
    console.log(`❌ Missing in ${SECONDARY_LANG}.json (${missingInSecondary.length} keys):`);
    missingInSecondary.forEach(key => console.log(`   - ${key}`));
    console.log('');
    hasErrors = true;
  }

  if (missingInPrimary.length > 0) {
    console.log(`⚠️  Missing in ${PRIMARY_LANG}.json (${missingInPrimary.length} keys):`);
    missingInPrimary.forEach(key => console.log(`   - ${key}`));
    console.log('');
    hasErrors = true;
  }

  // Summary
  console.log('📊 Summary:');
  console.log(`   ${PRIMARY_LANG}.json: ${primaryKeys.length} keys`);
  console.log(`   ${SECONDARY_LANG}.json: ${secondaryKeys.length} keys`);
  console.log(`   Missing in ${SECONDARY_LANG}: ${missingInSecondary.length}`);
  console.log(`   Missing in ${PRIMARY_LANG}: ${missingInPrimary.length}`);
  console.log('');

  if (hasErrors) {
    console.log('❌ Validation failed!');
    process.exit(1);
  } else {
    console.log('✅ All translations are in sync!');
    process.exit(0);
  }
}

validateTranslations();
