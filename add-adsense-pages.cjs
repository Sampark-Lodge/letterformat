const fs = require('fs');
const path = require('path');

const ADSENSE_PUB_ID = 'ca-pub-9325652578538740';

// Add AdSense to homepage
const indexFile = './index.html';
let indexContent = fs.readFileSync(indexFile, 'utf-8');

if (!indexContent.includes('adsbygoogle.js')) {
  const adsenseScript = `  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}" crossorigin="anonymous"></script>\n`;
  indexContent = indexContent.replace('</head>', adsenseScript + '</head>');
}

// Add ad after hero section
if (!indexContent.includes('ad-container')) {
  const adCSS = `
    .ad-container{background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:12px;margin:16px 0;text-align:center;min-height:90px;display:flex;align-items:center;justify-content:center}
    .ad-container ins{display:block!important}
    @media print{.ad-container{display:none!important}}
`;
  indexContent = indexContent.replace(/(@media print)/, `${adCSS}    $1`);
  
  // Add top ad after hero
  const topAd = `
  <div class="ad-container">
    <ins class="adsbygoogle" style="display:block" data-ad-client="${ADSENSE_PUB_ID}" data-ad-slot="1234567890" data-ad-format="auto" data-full-width-responsive="true"></ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
  </div>\n`;
  
  indexContent = indexContent.replace(/(<section class="categories")/, `${topAd}  $1`);
}

fs.writeFileSync(indexFile, indexContent);
console.log('✓ Homepage AdSense added');

// Add AdSense to category pages
const categoryFiles = ['application.html', 'complaint.html', 'certificate.html', 'bank.html', 'government.html', 'school.html', 'employment.html', 'academic.html', 'job.html'];

categoryFiles.forEach(file => {
  const filePath = `./${file}`;
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (!content.includes('adsbygoogle.js')) {
    const adsenseScript = `  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}" crossorigin="anonymous"></script>\n`;
    content = content.replace('</head>', adsenseScript + '</head>');
  }
  
  if (!content.includes('ad-container')) {
    const adCSS = `
    .ad-container{background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:12px;margin:16px 0;text-align:center;min-height:90px;display:flex;align-items:center;justify-content:center}
    .ad-container ins{display:block!important}
    @media print{.ad-container{display:none!important}}
`;
    content = content.replace(/(@media print)/, `${adCSS}    $1`);
    
    // Add ad after header
    const topAd = `
  <div class="ad-container">
    <ins class="adsbygoogle" style="display:block" data-ad-client="${ADSENSE_PUB_ID}" data-ad-slot="1234567890" data-ad-format="auto" data-full-width-responsive="true"></ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
  </div>\n`;
    
    content = content.replace(/(<div class="container page-content")/, `${topAd}  $1`);
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`✓ ${file} AdSense added`);
});

console.log('\n✅ AdSense added to homepage + 9 category pages');
