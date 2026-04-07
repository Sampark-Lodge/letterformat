const fs = require('fs');
const path = require('path');

const baseUrl = 'https://sampark-lodge.github.io/letterformat/';

// Category page SEO data
const categoryPages = {
  'index.html': {
    title: 'LetterFormat.in — বিনামূল্যে চিঠি ও আবেদন ফরম্যাট',
    description: 'বিনামূল্যে ব্যবহারযোগ্য চিঠি ও আবেদন ফরম্যাট। ছাত্র, চাকরিজীবী ও সাধারণ মানুষের জন্য কপি-পেস্ট ফরম্যাট।',
    keywords: 'বাংলা আবেদন, চিঠি ফরম্যাট, ছুটি আবেদন, সার্টিফিকেট, প্রত্যয়ন, LetterFormat.in'
  },
  'academic.html': {
    title: 'একাডেমিক আবেদন ফরম্যাট — LetterFormat.in',
    description: 'স্কুল/কলেজ সম্পর্কিত সব আবেদন ফরম্যাট। ছুটি, সার্টিফিকেট, ফি, স্কলারশিপ সহ।',
    keywords: 'একাডেমিক আবেদন, স্কুল আবেদন, কলেজ আবেদন, সার্টিফিকেট, ছুটি আবেদন, LetterFormat.in'
  },
  'application.html': {
    title: 'সাধারণ আবেদন ফরম্যাট — LetterFormat.in',
    description: 'সব ধরনের সাধারণ আবেদন পত্রের বাংলা ফরম্যাট। সরকারি, ব্যাংক, জমিসংক্রান্ত সহ সব আবেদন।',
    keywords: 'আবেদন পত্র, সাধারণ আবেদন, ব্যাংক আবেদন, সরকারি আবেদন, LetterFormat.in'
  },
  'bank.html': {
    title: 'ব্যাংক সম্পর্কিত আবেদন ফরম্যাট — LetterFormat.in',
    description: 'ব্যাংক একাউন্ট, কার্ড, লোন সম্পর্কিত সব আবেদন পত্রের বাংলা ফরম্যাট।',
    keywords: 'ব্যাংক আবেদন, এটিএম কার্ড, কার্ড আবেদন, লোন আবেদন, একাউন্ট, LetterFormat.in'
  },
  'certificate.html': {
    title: 'সার্টিফিকেট ও প্রত্যয়ন আবেদন — LetterFormat.in',
    description: 'আয়, রেসিডেন্স, চারিত্রিক, বয়স্ক, এতিম সহ সব ধরনের সার্টিফিকেট আবেদনের বাংলা ফরম্যাট।',
    keywords: 'সার্টিফিকেট আবেদন, আয় সার্টিফিকেট, রেসিডেন্স, প্রত্যয়ন, LetterFormat.in'
  },
  'complaint.html': {
    title: 'অভিযোগ পত্র ফরম্যাট — LetterFormat.in',
    description: 'ব্যাংক, ইন্টারনেট, পানি, শব্দ দূষণ সহ সব ধরনের অভিযোগ পত্রের বাংলা ফরম্যাট।',
    keywords: 'অভিযোগ পত্র, শিকায়, ব্যাংক অভিযোগ, পানি সমস্যা, LetterFormat.in'
  },
  'employment.html': {
    title: 'চাকরি সম্পর্কিত চিঠি ফরম্যাট — LetterFormat.in',
    description: 'অফার লেটার, জয়েনিং, টার্মিনেশন, ট্রান্সফার সহ কর্মসংক্রান্ত সব চিঠির বাংলা ফরম্যাট।',
    keywords: 'চাকরি চিঠি, অফার লেটার, জয়েনিং, রেজিগনেশন, LetterFormat.in'
  },
  'government.html': {
    title: 'সরকারি আবেদন ফরম্যাট — LetterFormat.in',
    description: 'পাসপোর্ট, ট্যাক্স, পেনশন, প্রতিবন্ধী সার্টিফিকেট সহ সরকারি সব আবেদনের বাংলা ফরম্যাট।',
    keywords: 'সরকারি আবেদন, পাসপোর্ট, ট্যাক্স, পেনশন, LetterFormat.in'
  },
  'job.html': {
    title: 'চাকরি আবেদন ফরম্যাট — LetterFormat.in',
    description: 'কভার লেটার, রেজিউম, ফলো-আপ, রেফারেন্স সহ চাকরি আবেদনের সব বাংলা ফরম্যাট।',
    keywords: 'চাকরি আবেদন, কভার লেটার, ফলো-আপ, রেজিউম, LetterFormat.in'
  },
  'school.html': {
    title: 'স্কুল সম্পর্কিত আবেদন ফরম্যাট — LetterFormat.in',
    description: 'ভর্তি, ফি, ইউনিফর্ম, ট্রান্সপোর্ট, আইডি কার্ড সহ স্কুল সম্পর্কিত সব আবেদনের বাংলা ফরম্যাট।',
    keywords: 'স্কুল আবেদন, ভর্তি, ফি, ইউনিফর্ম, LetterFormat.in'
  }
};

function addSEOTags(filepath, data) {
  const content = fs.readFileSync(filepath, 'utf8');
  
  // Check if canonical already exists
  if (content.includes('rel="canonical"')) {
    console.log(`⚠️  Already has canonical: ${path.basename(filepath)}`);
    return false;
  }
  
  const seoTags = `
  <link rel="canonical" href="${baseUrl}${data.url || path.basename(filepath)}" />
  <meta property="og:title" content="${data.title}" />
  <meta property="og:description" content="${data.description}" />
  <meta property="og:url" content="${baseUrl}${data.url || path.basename(filepath)}" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="bn_IN" />
  <meta property="og:site_name" content="LetterFormat.in" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${data.title}" />
  <meta name="twitter:description" content="${data.description}" />
  <meta name="keywords" content="${data.keywords}" />
  <meta name="robots" content="index, follow" />`;
  
  // Insert after the last meta description tag
  const insertPoint = content.indexOf('</title>');
  if (insertPoint === -1) {
    console.log(`❌ No title found in: ${path.basename(filepath)}`);
    return false;
  }
  
  const newContent = content.slice(0, insertPoint + 8) + seoTags + '\n  ' + content.slice(insertPoint + 8);
  fs.writeFileSync(filepath, newContent, 'utf8');
  return true;
}

const rootDir = path.join(__dirname);
let count = 0;

console.log('\n🔍 Adding SEO meta tags to category/index pages...\n');
Object.entries(categoryPages).forEach(([filename, data]) => {
  const filepath = path.join(rootDir, filename);
  if (!fs.existsSync(filepath)) {
    console.log(`❌ Not found: ${filename}`);
    return;
  }
  if (addSEOTags(filepath, data)) {
    console.log(`✅ ${filename}`);
    count++;
  }
});
console.log(`\n✨ Updated ${count} files`);
