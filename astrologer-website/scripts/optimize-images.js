import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const TARGET_DIR = 'dist';
const QUALITY = 80; // 0-100, 80 is usually a good balance

async function walk(dir) {
  let files = await fs.readdir(dir);
  files = await Promise.all(files.map(async file => {
    const filePath = path.join(dir, file);
    const stats = await fs.stat(filePath);
    if (stats.isDirectory()) return walk(filePath);
    else if (stats.isFile()) return filePath;
  }));
  return files.reduce((all, folderContents) => all.concat(folderContents), []);
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return;

  try {
    const originalSize = (await fs.stat(filePath)).size;
    const buffer = await fs.readFile(filePath);
    let sharpInstance = sharp(buffer);

    let outputBuffer;
    if (ext === '.jpg' || ext === '.jpeg') {
      outputBuffer = await sharpInstance.jpeg({ quality: QUALITY, mozjpeg: true }).toBuffer();
    } else if (ext === '.png') {
      outputBuffer = await sharpInstance.png({ quality: QUALITY, compressionLevel: 9 }).toBuffer();
    } else if (ext === '.webp') {
      outputBuffer = await sharpInstance.webp({ quality: QUALITY }).toBuffer();
    }

    if (outputBuffer && outputBuffer.length < originalSize) {
      await fs.writeFile(filePath, outputBuffer);
      const newSize = outputBuffer.length;
      const savings = ((originalSize - newSize) / originalSize * 100).toFixed(2);
      console.log(`✅ Optimized ${filePath}: ${savings}% saved (${(originalSize/1024).toFixed(1)}KB -> ${(newSize/1024).toFixed(1)}KB)`);
    } else {
      console.log(`ℹ️ Skipped ${filePath} (already optimized or no savings)`);
    }
  } catch (error) {
    console.error(`❌ Error optimizing ${filePath}:`, error);
  }
}

async function main() {
  try {
    console.log(`🔍 Searching for images in ${TARGET_DIR}...`);
    const allFiles = await walk(TARGET_DIR);
    const images = allFiles.filter(f => f);
    
    console.log(`🚀 Optimizing ${images.length} potential images...`);
    await Promise.all(images.map(optimizeImage));
    console.log('✨ Image optimization complete!');
  } catch (error) {
    console.error('❌ Error during image optimization:', error);
    process.exit(1);
  }
}

main();
