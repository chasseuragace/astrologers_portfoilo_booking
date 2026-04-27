import 'dart:html' as html;
import 'dart:convert';

void downloadVCardWeb(String fileName, String vCardContent) {
  final bytes = utf8.encode(vCardContent);
  final blob = html.Blob([bytes], 'text/vcard');
  
  final url = html.Url.createObjectUrlFromBlob(blob);
  
  final anchor = html.AnchorElement(href: url)
    ..target = 'blank'
    ..download = '$fileName.vcf';
  
  html.document.body?.append(anchor);
  anchor.click();
  anchor.remove();
  
  html.Url.revokeObjectUrl(url);
}
