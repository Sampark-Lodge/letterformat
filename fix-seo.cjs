const fs = require('fs');
const path = require('path');

const formatsDir = './formats';
const files = fs.readdirSync(formatsDir).filter(f => f.endsWith('.html'));

// Category mapping
const categoryMap = {
  'leave': { bn: 'ছুটি', en: 'Leave Application' },
  'sick': { bn: 'অসুস্থতার ছুটি', en: 'Sick Leave' },
  'casual': { bn: 'সাধারণ ছুটি', en: 'Casual Leave' },
  'wedding': { bn: 'বিয়ের ছুটি', en: 'Wedding Leave' },
  'family': { bn: 'পারিবারিক ছুটি', en: 'Family Leave' },
  'urgent': { bn: 'জরুরি কাজ', en: 'Urgent Work' },
  'going-home': { bn: 'বাড়ি যাওয়া', en: 'Going Home' },
  'medical': { bn: 'চিকিৎসা', en: 'Medical Appointment' },
  'dental': { bn: 'দাঁতের চিকিৎসা', en: 'Dental Appointment' },
  'bonafide': { bn: 'বোনাফাইড', en: 'Bonafide Certificate' },
  'character': { bn: 'চরিত্র সনদ', en: 'Character Certificate' },
  'income': { bn: 'আয় সনদ', en: 'Income Certificate' },
  'domicile': { bn: 'ডমিসাইল', en: 'Domicile Certificate' },
  'birth': { bn: 'জন্ম সনদ', en: 'Birth Certificate' },
  'death': { bn: 'মৃত্যু সনদ', en: 'Death Certificate' },
  'caste': { bn: 'কাস্ট সনদ', en: 'Caste Certificate' },
  'marriage': { bn: 'বিবাহ সনদ', en: 'Marriage Certificate' },
  'police-clearance': { bn: 'পুলিশ ক্লিয়ারেন্স', en: 'Police Clearance' },
  'rent': { bn: 'ভাড়া সনদ', en: 'Rent Certificate' },
  'name-change': { bn: 'নাম পরিবর্তন', en: 'Name Change' },
  'electricity': { bn: 'বিদ্যুৎ অভিযোগ', en: 'Electricity Complaint' },
  'water-shortage': { bn: 'পানি সংকট', en: 'Water Shortage' },
  'road-damage': { bn: 'রাস্তার ক্ষতি', en: 'Road Damage' },
  'garbage': { bn: 'আবর্জনা', en: 'Garbage Collection' },
  'noise-pollution': { bn: 'শব্দ দূষণ', en: 'Noise Pollution' },
  'neighbor-noise': { bn: 'প্রতিবেশী শব্দ', en: 'Neighbor Noise' },
  'illegal-parking': { bn: 'অবৈধ পার্কিং', en: 'Illegal Parking' },
  'water-leakage': { bn: 'পানি লিকেজ', en: 'Water Leakage' },
  'bank-kyc': { bn: 'ব্যাংক KYC', en: 'Bank KYC Update' },
  'bank-loan': { bn: 'ব্যাংক লোন', en: 'Bank Loan' },
  'bank-cheque': { bn: 'চেক বই', en: 'Cheque Book' },
  'bank-address': { bn: 'ঠিকানা পরিবর্তন', en: 'Bank Address Change' },
  'bank-account': { bn: 'অ্যাকাউন্ট স্টেটমেন্ট', en: 'Bank Account Statement' },
  'atm': { bn: 'ATM কার্ড', en: 'ATM Card' },
  'bank-closure': { bn: 'অ্যাকাউন্ট বন্ধ', en: 'Bank Account Closure' },
  'aadhaar': { bn: 'আধার', en: 'Aadhaar Update' },
  'pan': { bn: 'প্যান কার্ড', en: 'PAN Card' },
  'voter': { bn: 'ভোটার আইডি', en: 'Voter ID' },
  'ration': { bn: 'রেশন কার্ড', en: 'Ration Card' },
  'passport': { bn: 'পাসপোর্ট', en: 'Passport' },
  'driving': { bn: 'ড্রাইভিং লাইসেন্স', en: 'Driving License' },
  'school-fee': { bn: 'স্কুল ফি', en: 'School Fee Concession' },
  'school-scholarship': { bn: 'স্কলারশিপ', en: 'School Scholarship' },
  'school-transfer': { bn: 'ট্রান্সফার সার্টিফিকেট', en: 'School Transfer' },
  'school-fee-installment': { bn: 'ফি কিস্তি', en: 'Fee Installment' },
  'employment-experience': { bn: 'অভিজ্ঞতা পত্র', en: 'Experience Letter' },
  'employment-resignation': { bn: 'পদত্যাগ পত্র', en: 'Resignation Letter' },
  'relieving': { bn: 'রিলিভিং লেটার', en: 'Relieving Letter' },
  'salary-certificate': { bn: 'বেতন সনদ', en: 'Salary Certificate' },
  'salary-increment': { bn: 'বেতন বৃদ্ধি', en: 'Salary Increment' },
  'advance-salary': { bn: 'অগ্রিম বেতন', en: 'Advance Salary' },
  'increment': { bn: 'ইনক্রিমেন্ট', en: 'Increment Letter' }
};

// Bengali title mapping
const bengaliTitles = {
  'application-leave-due-to-fever': 'জ্বরের ছুটির আবেদন',
  'application-sick-leave': 'অসুস্থতার ছুটির আবেদন',
  'application-casual-leave': 'সাধারণ ছুটির আবেদন',
  'application-sister-wedding-leave': 'বোনের বিয়ের ছুটির আবেদন',
  'application-family-function-leave': 'পারিবারিক অনুষ্ঠানের ছুটি',
  'application-urgent-piece-of-work': 'জরুরি কাজের ছুটি',
  'application-going-home-leave': 'বাড়ি যাওয়ার ছুটি',
  'application-medical-appointment-leave': 'চিকিৎসা অ্যাপয়েন্টমেন্টের ছুটি',
  'application-dental-appointment-leave': 'দাঁতের চিকিৎসার ছুটি',
  'application-bonafide-certificate': 'বোনাফাইড সার্টিফিকেট আবেদন',
  'application-character-certificate': 'চরিত্র সনদপত্র আবেদন',
  'application-income-certificate': 'আয় সনদপত্র আবেদন',
  'application-domicile-certificate': 'ডমিসাইল সনদপত্র আবেদন',
  'application-birth-certificate': 'জন্ম সনদপত্র আবেদন',
  'application-death-certificate': 'মৃত্যু সনদপত্র আবেদন',
  'application-caste-certificate': 'কাস্ট সনদপত্র আবেদন',
  'application-marriage-certificate': 'বিবাহ সনদপত্র আবেদন',
  'application-police-clearance-certificate': 'পুলিশ ক্লিয়ারেন্স সার্টিফিকেট',
  'application-rent-certificate': 'ভাড়া সনদপত্র আবেদন',
  'application-name-change': 'নাম পরিবর্তনের আবেদন',
  'complaint-letter-electricity-board-power-cut': 'বিদ্যুৎ বিভাগে লোডশেডিং অভিযোগ',
  'complaint-letter-water-shortage': 'পানি সংকটের অভিযোগ',
  'complaint-letter-road-damage': 'রাস্তার ক্ষতির অভিযোগ',
  'complaint-letter-garbage-collection': 'আবর্জনা সংগ্রহের অভিযোগ',
  'complaint-letter-noise-pollution': 'শব্দ দূষণের অভিযোগ',
  'complaint-letter-neighbor-noise': 'প্রতিবেশীর শব্দের অভিযোগ',
  'complaint-letter-illegal-parking': 'অবৈধ পার্কিংয়ের অভিযোগ',
  'complaint-letter-water-leakage': 'পানি লিকেজের অভিযোগ',
  'application-bank-kyc-update': 'ব্যাংক KYC আপডেট আবেদন',
  'application-bank-loan': 'ব্যাংক লোন আবেদন',
  'application-bank-cheque-book': 'চেক বই আবেদন',
  'application-bank-address-change': 'ব্যাংকে ঠিকানা পরিবর্তন',
  'application-bank-account-statement': 'অ্যাকাউন্ট স্টেটমেন্ট আবেদন',
  'application-atm-card': 'ATM কার্ড আবেদন',
  'letter-bank-account-closure': 'ব্যাংক অ্যাকাউন্ট বন্ধ আবেদন',
  'application-aadhaar-update': 'আধার কার্ড আপডেট আবেদন',
  'application-pan-card': 'প্যান কার্ড আবেদন',
  'application-voter-id-correction': 'ভোটার আইডি সংশোধন',
  'application-ration-card': 'রেশন কার্ড আবেদন',
  'application-passport': 'পাসপোর্ট আবেদন',
  'application-driving-license': 'ড্রাইভিং লাইসেন্স আবেদন',
  'application-school-fee-concession': 'স্কুল ফি মওকুফ আবেদন',
  'application-school-scholarship': 'স্কলারশিপ আবেদন',
  'application-school-transfer-certificate': 'ট্রান্সফার সার্টিফিকেট আবেদন',
  'application-school-fee-installment': 'স্কুল ফি কিস্তি আবেদন',
  'application-employment-experience-letter': 'অভিজ্ঞতা পত্র আবেদন',
  'application-employment-resignation': 'পদত্যাগ পত্র',
  'application-relieving-letter': 'রিলিভিং লেটার আবেদন',
  'application-salary-certificate': 'বেতন সনদপত্র আবেদন',
  'application-salary-increment-request': 'বেতন বৃদ্ধির আবেদন',
  'application-advance-salary': 'অগ্রিম বেতন আবেদন',
  'application-increment-letter': 'ইনক্রিমেন্ট লেটার আবেদন'
};

let fixed = 0;

files.forEach(file => {
  const filePath = path.join(formatsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  const slug = file.replace('.html', '');
  const bnTitle = bengaliTitles[slug] || slug.replace(/-/g, ' ');
  const siteUrl = 'https://sampark-lodge.github.io/letterformat';
  const pageUrl = `${siteUrl}/formats/${file}`;
  
  // 1. Fix title tag - Bengali first
  content = content.replace(/<title>.*?<\/title>/, `<title>${bnTitle} — LetterFormat.in</title>`);
  
  // 2. Fix meta description
  content = content.replace(/<meta name="description" content=".*?">/, 
    `<meta name="description" content="বিনামূল্যে ${bnTitle}। কপি-পেস্ট ফরম্যাট, এডিটেবল টেমপ্লেট, পূরণ করা নমুনা, টিপস সহ। আপডেট ২০২৬।">`);
  
  // 3. Add canonical URL
  if (!content.includes('canonical')) {
    content = content.replace('</head>', `  <link rel="canonical" href="${pageUrl}">\n</head>`);
  } else {
    content = content.replace(/<link rel="canonical" href=".*?">/, `<link rel="canonical" href="${pageUrl}">`);
  }
  
  // 4. Add Open Graph tags
  if (!content.includes('og:title')) {
    const ogTags = `  <meta property="og:title" content="${bnTitle} — LetterFormat.in">
  <meta property="og:description" content="বিনামূল্যে ${bnTitle}। কপি-পেস্ট ফরম্যাট, এডিটেবল টেমপ্লেট।">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:type" content="article">
  <meta property="og:locale" content="bn_IN">
  <meta property="og:site_name" content="LetterFormat.in">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${bnTitle} — LetterFormat.in">
  <meta name="twitter:description" content="বিনামূল্যে ${bnTitle}। কপি-পেস্ট ফরম্যাট।">
  <meta name="keywords" content="${bnTitle}, বাংলা আবেদন, চিঠি ফরম্যাট, LetterFormat.in, ${slug.replace(/-/g, ' ')}">
  <meta name="author" content="LetterFormat.in">
  <meta name="robots" content="index, follow">
`;
    content = content.replace('</head>', ogTags + '</head>');
  }
  
  // 5. Add Schema.org structured data
  const schemaData = `
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${bnTitle}",
    "description": "বিনামূল্যে ${bnTitle}। কপি-পেস্ট ফরম্যাট, এডিটেবল টেমপ্লেট।",
    "url": "${pageUrl}",
    "datePublished": "2026-04-07",
    "dateModified": "2026-04-07",
    "author": {
      "@type": "Organization",
      "name": "LetterFormat.in",
      "url": "${siteUrl}"
    },
    "publisher": {
      "@type": "Organization",
      "name": "LetterFormat.in",
      "url": "${siteUrl}"
    },
    "inLanguage": "bn",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${pageUrl}"
    }
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "${bnTitle} কিভাবে লিখবেন?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "LetterFormat.in থেকে ${bnTitle} এর ফরম্যাট কপি করুন, লাল অংশে আপনার তথ্য লিখুন এবং প্রিন্ট করুন।"
        }
      },
      {
        "@type": "Question",
        "name": "এই ফরম্যাট কি বিনামূল্যে ব্যবহার করা যায়?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "হ্যাঁ, LetterFormat.in এর সব ফরম্যাট সম্পূর্ণ বিনামূল্যে ব্যবহারযোগ্য।"
        }
      }
    ]
  }
  </script>
`;
  content = content.replace('</head>', schemaData + '</head>');
  
  // 6. Fix format title in page body
  content = content.replace(/<h1 class="format-title">.*?<\/h1>/, `<h1 class="format-title">${bnTitle}</h1>`);
  
  // 7. Fix format description
  content = content.replace(/<p class="format-desc">.*?<\/p>/, 
    `<p class="format-desc">বিনামূল্যে ${bnTitle}। কপি-পেস্ট ফরম্যাট, এডিটেবল টেমপ্লেট, পূরণ করা নমুনা, টিপস সহ। আপডেট ২০২৬।</p>`);
  
  fs.writeFileSync(filePath, content);
  fixed++;
});

console.log(`✅ Fixed SEO for ${fixed} format pages`);
console.log('Added: Canonical URLs, Open Graph, Twitter Cards, Schema.org, Bengali titles, Keywords');
