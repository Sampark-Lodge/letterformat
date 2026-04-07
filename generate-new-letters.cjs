const fs = require('fs');
const path = require('path');

const formatsDir = './formats';
const ADSENSE_PUB_ID = 'ca-pub-9325652578538740';

// Letter templates data - 5 new letters per category
const newLetters = {
  application: [
    { file: 'application-maternity-leave.html', title: 'মাতৃত্বকালীন ছুটির আবেদন', tag: 'ছুটি', tag2: 'মাতৃত্ব' },
    { file: 'application-paternity-leave.html', title: 'পিতৃত্বকালীন ছুটির আবেদন', tag: 'ছুটি', tag2: 'পিতৃত্ব' },
    { file: 'application-wedding-leave.html', title: 'বিয়ের ছুটির আবেদন', tag: 'ছুটি', tag2: 'বিয়ে' },
    { file: 'application-bereavement-leave.html', title: 'শোকের ছুটির আবেদন', tag: 'ছুটি', tag2: 'শোক' },
    { file: 'application-half-day-leave.html', title: 'অর্ধদিনের ছুটির আবেদন', tag: 'ছুটি', tag2: 'অর্ধদিন' }
  ],
  complaint: [
    { file: 'complaint-letter-landlord.html', title: 'বাড়িওয়ালার বিরুদ্ধে অভিযোগ', tag: 'অভিযোগ', tag2: 'বাড়িওয়ালা' },
    { file: 'complaint-letter-workplace.html', title: 'কর্মক্ষেত্রে বিমান ছাড়পত্র', tag: 'অভিযোগ', tag2: 'কর্মক্ষেত্র' },
    { file: 'complaint-letter-school.html', title: 'স্কুলে ভর্তি সংক্রান্ত অভিযোগ', tag: 'অভিযোগ', tag2: 'স্কুল' },
    { file: 'complaint-letter-bank.html', title: 'ব্যাংক সংক্রান্ত অভিযোগ', tag: 'অভিযোগ', tag2: 'ব্যাংক' },
    { file: 'complaint-letter-internet.html', title: 'ইন্টারনেট সংযোগ সমস্যা', tag: 'অভিযোগ', tag2: 'ইন্টারনেট' }
  ],
  certificate: [
    { file: 'certificate-income.html', title: 'আয়ের প্রত্যয়ন পত্র', tag: 'সার্টিফিকেট', tag2: 'আয়' },
    { file: 'certificate-residence.html', title: 'বসবাসের প্রত্যয়ন পত্র', tag: 'সার্টিফিকেট', tag2: 'বসবাস' },
    { file: 'certificate-non-marriage.html', title: 'অবিবাহত প্রত্যয়ন পত্র', tag: 'সার্টিফিকেট', tag2: 'অবিবাহত' },
    { file: 'certificate-orphan.html', title: 'এতিম প্রত্যয়ন পত্র', tag: 'সার্টিফিকেট', tag2: 'এতিম' },
    { file: 'certificate-senior-citizen.html', title: 'বয়স্ক প্রত্যয়ন পত্র', tag: 'সার্টিফিকেট', tag2: 'বয়স্ক' }
  ],
  bank: [
    { file: 'bank-credit-card-request.html', title: 'ক্রেডিট কার্ড আবেদন', tag: 'ব্যাংক', tag2: 'ক্রেডিট কার্ড' },
    { file: 'bank-debit-card-request.html', title: 'ডেবিট কার্ড আবেদন', tag: 'ব্যাংক', tag2: 'ডেবিট কার্ড' },
    { file: 'bank-minimum-balance.html', title: 'ন্যূনতম জমার ছাড়', tag: 'ব্যাংক', tag2: 'জমা' },
    { file: 'bank-interest-certificate.html', title: 'সুদের প্রত্যয়ন পত্র', tag: 'ব্যাংক', tag2: 'সুদ' },
    { file: 'bank-account-reactivation.html', title: 'অ্যাকাউন্ট পুনরায় সক্রিয়', tag: 'ব্যাংক', tag2: 'অ্যাকাউন্ট' }
  ],
  government: [
    { file: 'government-passport-status.html', title: 'পাসপোর্ট স্ট্যাটাস জানতে', tag: 'সরকারি', tag2: 'পাসপোর্ট' },
    { file: 'government-tax-certificate.html', title: 'ট্যাক্স সার্টিফিকেট আবেদন', tag: 'সরকারি', tag2: 'ট্যাক্স' },
    { file: 'government-old-age-pension.html', title: 'বয়স্ক ভাতা আবেদন', tag: 'সরকারি', tag2: 'ভাতা' },
    { file: 'government-disability-certificate.html', title: 'প্রতিবন্ধী সার্টিফিকেট', tag: 'সরকারি', tag2: 'প্রতিবন্ধী' },
    { file: 'government-unemployment.html', title: 'বেকারত্ব ভাতা আবেদন', tag: 'সরকারি', tag2: 'বেকার' }
  ],
  school: [
    { file: 'school-admission.html', title: 'স্কুলে ভর্তি আবেদন', tag: 'স্কুল', tag2: 'ভর্তি' },
    { file: 'school-uniform.html', title: 'স্কুল ইউনিফর্ম সংক্রান্ত', tag: 'স্কুল', tag2: 'ইউনিফর্ম' },
    { file: 'school-transport.html', title: 'স্কুল বাস সুবিধা', tag: 'স্কুল', tag2: 'পরিবহন' },
    { file: 'school-exam-permission.html', title: 'পরীক্ষায় অংশগ্রহণ', tag: 'স্কুল', tag2: 'পরীক্ষা' },
    { file: 'school-id-card.html', title: 'স্কুল আইডি কার্ড', tag: 'স্কুল', tag2: 'আইডি' }
  ],
  employment: [
    { file: 'employment-offer-letter.html', title: 'চাকরির অফার লেটার', tag: 'চাকরি', tag2: 'অফার' },
    { file: 'employment-joining.html', title: 'যোগদান পত্র', tag: 'চাকরি', tag2: 'যোগদান' },
    { file: 'employment-appraisal.html', title: 'কর্মমূল্যায়ন আবেদন', tag: 'চাকরি', tag2: 'মূল্যায়ন' },
    { file: 'employment-transfer.html', title: 'বদলি আবেদন', tag: 'চাকরি', tag2: 'বদলি' },
    { file: 'employment-termination.html', title: 'চাকরি থেকে অব্যাহতি', tag: 'চাকরি', tag2: 'অব্যাহতি' }
  ],
  academic: [
    { file: 'academic-result.html', title: 'রেজাল্ট কার্ড আবেদন', tag: 'একাডেমিক', tag2: 'রেজাল্ট' },
    { file: 'academic-transcript.html', title: 'ট্রান্সক্রিপ্ট আবেদন', tag: 'একাডেমিক', tag2: 'ট্রান্সক্রিপ্ট' },
    { file: 'academic-course-completion.html', title: 'কোর্স সম্পন্ন সার্টিফিকেট', tag: 'একাডেমিক', tag2: 'কোর্স' },
    { file: 'academic-attendance.html', title: 'উপস্থিতি প্রত্যয়ন', tag: 'একাডেমিক', tag2: 'উপস্থিতি' },
    { file: 'academic-grade-improvement.html', title: 'গ্রেড উন্নতি আবেদন', tag: 'একাডেমিক', tag2: 'গ্রেড' }
  ],
  job: [
    { file: 'job-reference-letter.html', title: 'রেফারেন্স লেটার', tag: 'চাকরি', tag2: 'রেফারেন্স' },
    { file: 'job-thank-you-letter.html', title: 'সাক্ষাৎকার ধন্যবাদ পত্র', tag: 'চাকরি', tag2: 'ধন্যবাদ' },
    { file: 'job-follow-up.html', title: 'ফলো-আপ চিঠি', tag: 'চাকরি', tag2: 'ফলো-আপ' },
    { file: 'job-decline-offer.html', title: 'চাকরি প্রত্যাখ্যান পত্র', tag: 'চাকরি', tag2: 'প্রত্যাখ্যান' },
    { file: 'job-counter-offer.html', title: 'কাউন্টার অফার চিঠি', tag: 'চাকরি', tag2: 'কাউন্টার' }
  ]
};

// Read template file
const templateContent = fs.readFileSync('./formats/application-sick-leave.html', 'utf-8');

Object.keys(newLetters).forEach(category => {
  newLetters[category].forEach(letter => {
    let content = templateContent
      .replace(/application-sick-leave\.html/g, letter.file)
      .replace(/অসুস্থতার ছুটির আবেদন/g, letter.title)
      .replace(/অসুস্থতার কারণে ছুটির আবেদন/g, letter.title)
      .replace(/ছুটি/g, letter.tag)
      .replace(/অসুস্থতা/g, letter.tag2);

    // Update title tag
    content = content.replace(/<title>.*? — LetterFormat.in<\/title>/, `<title>${letter.title} — LetterFormat.in</title>`);
    
    // Update meta description
    content = content.replace(/<meta name="description" content=".*?"/, `<meta name="description" content="বিনামূল্যে ${letter.title}। কপি-পেস্ট ফরম্যাট, এডিটেবল টেমপ্লেট, পূরণ করা নমুনা, টিপস সহ। আপডেট ২০২৬।"`);
    
    // Update canonical
    content = content.replace(/formats\/application-sick-leave\.html/, `formats/${letter.file}`);
    
    // Update og:title
    content = content.replace(/<meta property="og:title" content=".*?"/, `<meta property="og:title" content="${letter.title} — LetterFormat.in"`);
    
    // Update og:description  
    content = content.replace(/<meta property="og:description" content=".*?"/, `<meta property="og:description" content="বিনামূল্যে ${letter.title}। কপি-পেস্ট ফরম্যাট, এডিটেবল টেমপ্লেট।"`);
    
    // Update og:url
    content = content.replace(/formats\/application-sick-leave\.html/, `formats/${letter.file}`);
    
    // Update twitter:title
    content = content.replace(/<meta name="twitter:title" content=".*?"/, `<meta name="twitter:title" content="${letter.title} — LetterFormat.in"`);
    
    // Update twitter:description
    content = content.replace(/<meta name="twitter:description" content=".*?"/, `<meta name="twitter:description" content="বিনামূল্যে ${letter.title}। কপি-পেস্ট ফরম্যাট।"`);
    
    // Update keywords
    content = content.replace(/<meta name="keywords" content=".*?"/, `<meta name="keywords" content="${letter.title}, বাংলা আবেদন, চিঠি ফরম্যাট, LetterFormat.in"`);

    // Write file
    fs.writeFileSync(path.join(formatsDir, letter.file), content);
    console.log(`✅ Created: ${letter.file}`);
  });
});

console.log(`\n🎉 Created 45 new letter format files!`);