const fs = require('fs');
const path = require('path');

const formatsDir = './formats';
const files = fs.readdirSync(formatsDir).filter(f => f.endsWith('.html'));

// REPLACE with your actual AdSense publisher ID
const ADSENSE_PUB_ID = 'ca-pub-XXXXXXXXXXXXXXXX';

// Ad unit IDs - REPLACE with your actual ad unit IDs
const AD_UNITS = {
  topBanner: '1234567890',      // 728x90 leaderboard
  sidebar: '0987654321',         // 300x250 medium rectangle
  inArticle: '1122334455',       // responsive in-article
  bottomBanner: '5566778899'     // responsive bottom
};

let fixed = 0;

files.forEach(file => {
  const filePath = path.join(formatsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // 1. Add AdSense script before </head>
  if (!content.includes('adsbygoogle.js')) {
    const adsenseScript = `  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}" crossorigin="anonymous"></script>\n`;
    content = content.replace('</head>', adsenseScript + '</head>');
  }
  
  // 2. Add top banner ad after navbar
  if (!content.includes('adsbygoogle') || !content.includes('ad-top-banner')) {
    const topAd = `
  <!-- Top Banner Ad -->
  <div class="ad-container ad-top-banner">
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="${ADSENSE_PUB_ID}"
         data-ad-slot="${AD_UNITS.topBanner}"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
  </div>\n`;
    
    // Insert after closing </nav>
    content = content.replace(/<\/nav>\n/, `</nav>\n${topAd}`);
  }
  
  // 3. Add in-article ad after letter document
  if (!content.includes('ad-in-article')) {
    const inArticleAd = `
      <!-- In-Article Ad -->
      <div class="ad-container ad-in-article">
        <ins class="adsbygoogle"
             style="display:block; text-align:center;"
             data-ad-layout="in-article"
             data-ad-format="fluid"
             data-ad-client="${ADSENSE_PUB_ID}"
             data-ad-slot="${AD_UNITS.inArticle}"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      </div>\n`;
    
    // Insert after letter-wrapper closing div
    content = content.replace(/(<\/div>\n      <div class="tips-box">)/, `${inArticleAd}      $1`);
  }
  
  // 4. Add sidebar ad in sidebar
  if (!content.includes('ad-sidebar')) {
    const sidebarAd = `
      <div class="sidebar-card ad-container ad-sidebar">
        <h3>📢 বিজ্ঞাপন</h3>
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="${ADSENSE_PUB_ID}"
             data-ad-slot="${AD_UNITS.sidebar}"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      </div>\n`;
    
    // Insert before last sidebar card
    content = content.replace(/(<\/div>\n    <\/div>\n  <\/div>\n<\/div>\n<div class="toast")/, `${sidebarAd}    </div>\n  </div>\n</div>\n<div class="toast"`);
  }
  
  // 5. Add bottom banner ad before footer/toast
  if (!content.includes('ad-bottom-banner')) {
    const bottomAd = `
  <!-- Bottom Banner Ad -->
  <div class="ad-container ad-bottom-banner">
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="${ADSENSE_PUB_ID}"
         data-ad-slot="${AD_UNITS.bottomBanner}"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
  </div>\n`;
    
    // Insert before toast div
    content = content.replace(/(<div class="toast")/, `${bottomAd}$1`);
  }
  
  // 6. Add ad styling CSS
  if (!content.includes('.ad-container')) {
    const adCSS = `
    .ad-container{background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:12px;margin:16px 0;text-align:center;min-height:90px;display:flex;align-items:center;justify-content:center}
    .ad-container ins{display:block!important}
    .ad-top-banner{min-height:90px}
    .ad-bottom-banner{min-height:90px;margin-bottom:0}
    .ad-in-article{margin:20px 0}
    .ad-sidebar{min-height:250px}
    @media(max-width:768px){.ad-top-banner,.ad-bottom-banner{min-height:50px}.ad-sidebar{min-height:250px}}
    @media print{.ad-container{display:none!important}}
`;
    
    // Insert before @media print
    content = content.replace(/(@media print)/, `${adCSS}    $1`);
  }
  
  fs.writeFileSync(filePath, content);
  fixed++;
});

console.log(`✅ Added AdSense to ${fixed} format pages`);
console.log(`⚠️ REPLACE '${ADSENSE_PUB_ID}' with your actual AdSense publisher ID`);
console.log(`⚠️ REPLACE ad unit IDs with your actual ad unit IDs`);
