const fs = require('fs');
const path = require('path');

const formatsDir = './formats';
const files = fs.readdirSync(formatsDir).filter(f => f.endsWith('.html'));

let fixed = 0;

files.forEach(file => {
  const filePath = path.join(formatsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace existing print styles with comprehensive print-only letter styles
  const oldPrintStyle = /@media print\{[^}]*\}/g;
  const newPrintStyle = `@media print{body{background:white!important;margin:0;padding:0}.navbar,.sidebar,.letter-toolbar,.toast,.meta-actions,.format-meta,.tips-box,.mistakes-box,.faq-box,.breadcrumb,.nav-actions{display:none!important}.page-layout{display:block!important;padding:0!important}.main-content{animation:none!important}.letter-wrapper{border:none!important;box-shadow:none!important;margin:0!important;padding:0!important;border-radius:0!important}.letter-document{padding:40px 48px!important;font-size:14pt!important;line-height:1.8!important;color:#000!important;background:white!important}.placeholder{background:none!important;border-bottom:none!important;color:#000!important;cursor:default!important;box-shadow:none!important}.letter-subject{background:#f9f9f9!important}.sign-line{background:#000!important}}`;
  
  content = content.replace(oldPrintStyle, newPrintStyle);
  
  // Also add print button text change
  if (content.includes('onclick="window.print()"')) {
    content = content.replace(/🖨️ প্রিন্ট/g, '🖨️ প্রিন্ট');
  }
  
  fs.writeFileSync(filePath, content);
  fixed++;
});

console.log(`✅ Fixed print styles for ${fixed} pages`);
console.log('Now only the letter will print - all UI elements hidden');
