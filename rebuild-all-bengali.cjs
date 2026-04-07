const fs = require('fs');
const path = require('path');

const formatsDir = './formats';
const files = fs.readdirSync(formatsDir).filter(f => f.endsWith('.html'));

// Check which pages have English content
const englishPages = files.filter(f => {
  const content = fs.readFileSync(path.join(formatsDir, f), 'utf-8');
  return content.includes('I am writing') || content.includes('I have been') || content.includes('I request');
});

console.log(`Found ${englishPages.length} pages with English content`);

// Bengali content for ALL remaining pages
const bengaliContent = {
  // BANK PAGES
  'application-bank-kyc-update.html': {
    title: 'ব্যাংক KYC আপডেট আবেদন', desc: 'ব্যাংক KYC আপডেট করার জন্য আবেদন পত্রের সঠিক বাংলা ফরম্যাট।',
    category: 'ব্যাংক', catIcon: '🏦', subcategory: 'KYC আপডেট',
    recipient: 'শাখা ব্যবস্থাপক', institution: '[ব্যাংকের নাম, শাখা]', city: '[শহর, জেলা]',
    subject: 'KYC আপডেট করার আবেদন', salutation: 'মহোদয়,',
    body: ['সবিনয় নিবেদন এই যে, আমি [আপনার নাম], আপনার ব্যাংকের [অ্যাকাউন্ট নম্বর] নম্বর অ্যাকাউন্টের মালিক। আমার KYC তথ্য আপডেট করার প্রয়োজন হয়েছে।', 'আমি আমার নতুন ঠিকানা [নতুন ঠিকানা] এবং নতুন মোবাইল নম্বর [মোবাইল নম্বর] আপডেট করতে চাই।', 'অতএব, বিনীত অনুরোধ জানাচ্ছি যে, আমার KYC তথ্য আপডেট করে বাধিত করবেন।'],
    closing: 'বিনীত নিবেদন', signName: '[আপনার নাম]', signInfo: '[অ্যাকাউন্ট নম্বর] | [মোবাইল নম্বর]',
    tips: ['আধার কার্ড কপি সংযুক্ত করুন', 'প্যান কার্ড কপি সংযুক্ত করুন', 'ঠিকানার প্রমাণ সংযুক্ত করুন'],
    mistakes: ['কাগজপত্র না সংযুক্ত করা', 'ভুল তথ্য দেওয়া', 'স্বাক্ষর না দেওয়া'],
    faqs: [{q:'KYC আপডেটে কতদিন লাগে?', a:'সাধারণত ৩-৫ কর্মদিবস।'},{q:'কী কী কাগজপত্র লাগে?', a:'আধার কার্ড, প্যান কার্ড, ঠিকানার প্রমাণ।'}]
  },
  'application-bank-loan.html': {
    title: 'ব্যাংক লোন আবেদন', desc: 'ব্যাংক থেকে লোন পাওয়ার জন্য আবেদন পত্রের সঠিক বাংলা ফরম্যাট।',
    category: 'ব্যাংক', catIcon: '🏦', subcategory: 'লোন',
    recipient: 'শাখা ব্যবস্থাপক', institution: '[ব্যাংকের নাম, শাখা]', city: '[শহর, জেলা]',
    subject: 'ব্যক্তিগত লোন আবেদন', salutation: 'মহোদয়,',
    body: ['সবিনয় নিবেদন এই যে, আমি [আপনার নাম], আপনার ব্যাংকের [অ্যাকাউন্ট নম্বর] নম্বর অ্যাকাউন্টের মালিক। আমি [টাকার পরিমাণ] টাকা ব্যক্তিগত লোন প্রয়োজন।', 'আমি এই লোন [কাজের ধরন]-এর জন্য ব্যবহার করব। আমার মাসিক আয় [টাকার পরিমাণ] টাকা এবং আমি নির্ধারিত সময়ে কিস্তি পরিশোধ করতে সক্ষম।', 'অতএব, বিনীত অনুরোধ জানাচ্ছি যে, আমাকে উক্ত পরিমাণ লোন মঞ্জুর করে বাধিত করবেন।'],
    closing: 'বিনীত নিবেদন', signName: '[আপনার নাম]', signInfo: '[অ্যাকাউন্ট নম্বর] | [মোবাইল নম্বর]',
    tips: ['লোনের উদ্দেশ্য স্পষ্ট করুন', 'আয়ের প্রমাণ সংযুক্ত করুন', 'কিস্তি পরিশোধের পরিকল্পনা দিন'],
    mistakes: ['লোনের উদ্দেশ্য না বলা', 'আয়ের প্রমাণ না দেওয়া', 'কিস্তি পরিশোধের পরিকল্পনা না দেওয়া'],
    faqs: [{q:'লোন পেতে কতদিন লাগে?', a:'সাধারণত ৭-১৫ কর্মদিবস।'},{q:'কী কী কাগজপত্র লাগে?', a:'আধার কার্ড, আয়ের প্রমাণ, ব্যাংক স্টেটমেন্ট।'}]
  },
  'application-bank-cheque-book.html': {
    title: 'চেক বই আবেদন', desc: 'ব্যাংক থেকে চেক বই পাওয়ার জন্য আবেদন পত্রের সঠিক বাংলা ফরম্যাট।',
    category: 'ব্যাংক', catIcon: '🏦', subcategory: 'চেক বই',
    recipient: 'শাখা ব্যবস্থাপক', institution: '[ব্যাংকের নাম, শাখা]', city: '[শহর, জেলা]',
    subject: 'চেক বই প্রদানের আবেদন', salutation: 'মহোদয়,',
    body: ['সবিনয় নিবেদন এই যে, আমি [আপনার নাম], আপনার ব্যাংকের [অ্যাকাউন্ট নম্বর] নম্বর অ্যাকাউন্টের মালিক। আমার চেক বই শেষ হয়ে গেছে।', 'আমি নতুন চেক বই প্রয়োজন। আমি [সংখ্যা] পাতার চেক বই চাই।', 'অতএব, বিনীত অনুরোধ জানাচ্ছি যে, আমাকে একটি নতুন চেক বই প্রদান করে বাধিত করবেন।'],
    closing: 'বিনীত নিবেদন', signName: '[আপনার নাম]', signInfo: '[অ্যাকাউন্ট নম্বর] | [মোবাইল নম্বর]',
    tips: ['অ্যাকাউন্ট নম্বর স্পষ্টভাবে উল্লেখ করুন', 'চেক বইয়ের পাতার সংখ্যা উল্লেখ করুন', 'স্বাক্ষর দিন'],
    mistakes: ['অ্যাকাউন্ট নম্বর না দেওয়া', 'পাতার সংখ্যা না বলা', 'স্বাক্ষর না দেওয়া'],
    faqs: [{q:'চেক বই পেতে কতদিন লাগে?', a:'সাধারণত ৩-৫ কর্মদিবস।'},{q:'কী কী কাগজপত্র লাগে?', a:'আবেদন পত্র, পরিচয় পত্র।'}]
  },
  'application-bank-address-change.html': {
    title: 'ব্যাংকে ঠিকানা পরিবর্তন আবেদন', desc: 'ব্যাংক অ্যাকাউন্টে ঠিকানা পরিবর্তনের জন্য আবেদন পত্রের সঠিক বাংলা ফরম্যাট।',
    category: 'ব্যাংক', catIcon: '🏦', subcategory: 'ঠিকানা পরিবর্তন',
    recipient: 'শাখা ব্যবস্থাপক', institution: '[ব্যাংকের নাম, শাখা]', city: '[শহর, জেলা]',
    subject: 'অ্যাকাউন্টে ঠিকানা পরিবর্তনের আবেদন', salutation: 'মহোদয়,',
    body: ['সবিনয় নিবেদন এই যে, আমি [আপনার নাম], আপনার ব্যাংকের [অ্যাকাউন্ট নম্বর] নম্বর অ্যাকাউন্টের মালিক। আমি আমার ঠিকানা পরিবর্তন করেছি।', 'আমার পুরানো ঠিকানা ছিল [পুরানো ঠিকানা] এবং নতুন ঠিকানা [নতুন ঠিকানা]।', 'অতএব, বিনীত অনুরোধ জানাচ্ছি যে, আমার অ্যাকাউন্টে ঠিকানা পরিবর্তন করে বাধিত করবেন।'],
    closing: 'বিনীত নিবেদন', signName: '[আপনার নাম]', signInfo: '[অ্যাকাউন্ট নম্বর] | [মোবাইল নম্বর]',
    tips: ['পুরানো ও নতুন ঠিকানা স্পষ্টভাবে উল্লেখ করুন', 'নতুন ঠিকানার প্রমাণ সংযুক্ত করুন', 'আধার কার্ড কপি সংযুক্ত করুন'],
    mistakes: ['পুরানো ঠিকানা না দেওয়া', 'নতুন ঠিকানার প্রমাণ না সংযুক্ত করা', 'আধার কার্ড কপি না দেওয়া'],
    faqs: [{q:'ঠিকানা পরিবর্তনে কতদিন লাগে?', a:'সাধারণত ৩-৫ কর্মদিবস।'},{q:'কী কী কাগজপত্র লাগে?', a:'নতুন ঠিকানার প্রমাণ, আধার কার্ড কপি।'}]
  },
  'application-bank-account-statement.html': {
    title: 'অ্যাকাউন্ট স্টেটমেন্ট আবেদন', desc: 'ব্যাংক অ্যাকাউন্ট স্টেটমেন্ট পাওয়ার জন্য আবেদন পত্রের সঠিক বাংলা ফরম্যাট।',
    category: 'ব্যাংক', catIcon: '🏦', subcategory: 'অ্যাকাউন্ট স্টেটমেন্ট',
    recipient: 'শাখা ব্যবস্থাপক', institution: '[ব্যাংকের নাম, শাখা]', city: '[শহর, জেলা]',
    subject: 'অ্যাকাউন্ট স্টেটমেন্ট প্রদানের আবেদন', salutation: 'মহোদয়,',
    body: ['সবিনয় নিবেদন এই যে, আমি [আপনার নাম], আপনার ব্যাংকের [অ্যাকাউন্ট নম্বর] নম্বর অ্যাকাউন্টের মালিক। আমি [তারিখ] থেকে [তারিখ] পর্যন্ত অ্যাকাউন্ট স্টেটমেন্ট প্রয়োজন।', 'আমি এই স্টেটমেন্ট [কাজের ধরন]-এর জন্য প্রয়োজন।', 'অতএব, বিনীত অনুরোধ জানাচ্ছি যে, আমাকে উক্ত সময়ের অ্যাকাউন্ট স্টেটমেন্ট প্রদান করে বাধিত করবেন।'],
    closing: 'বিনীত নিবেদন', signName: '[আপনার নাম]', signInfo: '[অ্যাকাউন্ট নম্বর] | [মোবাইল নম্বর]',
    tips: ['সময়কাল স্পষ্টভাবে উল্লেখ করুন', 'কাজের ধরন উল্লেখ করুন', 'স্বাক্ষর দিন'],
    mistakes: ['সময়কাল না দেওয়া', 'কাজের ধরন না বলা', 'স্বাক্ষর না দেওয়া'],
    faqs: [{q:'অ্যাকাউন্ট স্টেটমেন্ট পেতে কতদিন লাগে?', a:'সাধারণত ১-৩ কর্মদিবস।'},{q:'কী কী কাগজপত্র লাগে?', a:'আবেদন পত্র, পরিচয় পত্র।'}]
  },
  'application-atm-card.html': {
    title: 'ATM কার্ড আবেদন', desc: 'ব্যাংক থেকে ATM কার্ড পাওয়ার জন্য আবেদন পত্রের সঠিক বাংলা ফরম্যাট।',
    category: 'ব্যাংক', catIcon: '🏦', subcategory: 'ATM কার্ড',
    recipient: 'শাখা ব্যবস্থাপক', institution: '[ব্যাংকের নাম, শাখা]', city: '[শহর, জেলা]',
    subject: 'ATM কার্ড প্রদানের আবেদন', salutation: 'মহোদয়,',
    body: ['সবিনয় নিবেদন এই যে, আমি [আপনার নাম], আপনার ব্যাংকের [অ্যাকাউন্ট নম্বর] নম্বর অ্যাকাউন্টের মালিক। আমার অ্যাকাউন্টে ATM কার্ড নেই।', 'আমি একটি নতুন ATM কার্ড প্রয়োজন। আমি ডেবিট কার্ড চাই।', 'অতএব, বিনীত অনুরোধ জানাচ্ছি যে, আমাকে একটি ATM কার্ড প্রদান করে বাধিত করবেন।'],
    closing: 'বিনীত নিবেদন', signName: '[আপনার নাম]', signInfo: '[অ্যাকাউন্ট নম্বর] | [মোবাইল নম্বর]',
    tips: ['অ্যাকাউন্ট নম্বর স্পষ্টভাবে উল্লেখ করুন', 'কার্ডের ধরন উল্লেখ করুন', 'স্বাক্ষর দিন'],
    mistakes: ['অ্যাকাউন্ট নম্বর না দেওয়া', 'কার্ডের ধরন না বলা', 'স্বাক্ষর না দেওয়া'],
    faqs: [{q:'ATM কার্ড পেতে কতদিন লাগে?', a:'সাধারণত ৭-১৫ কর্মদিবস।'},{q:'কী কী কাগজপত্র লাগে?', a:'আবেদন পত্র, পরিচয় পত্র।'}]
  },
  'letter-bank-account-closure.html': {
    title: 'ব্যাংক অ্যাকাউন্ট বন্ধ আবেদন', desc: 'ব্যাংক অ্যাকাউন্ট বন্ধ করার জন্য আবেদন পত্রের সঠিক বাংলা ফরম্যাট।',
    category: 'ব্যাংক', catIcon: '🏦', subcategory: 'অ্যাকাউন্ট বন্ধ',
    recipient: 'শাখা ব্যবস্থাপক', institution: '[ব্যাংকের নাম, শাখা]', city: '[শহর, জেলা]',
    subject: 'অ্যাকাউন্ট বন্ধ করার আবেদন', salutation: 'মহোদয়,',
    body: ['সবিনয় নিবেদন এই যে, আমি [আপনার নাম], আপনার ব্যাংকের [অ্যাকাউন্ট নম্বর] নম্বর অ্যাকাউন্টের মালিক। আমি ব্যক্তিগত কারণে আমার অ্যাকাউন্ট বন্ধ করতে চাই।', 'আমি অ্যাকাউন্টের সকল লেনদেন সম্পন্ন করেছি এবং কোনো বকেয়া নেই।', 'অতএব, বিনীত অনুরোধ জানাচ্ছি যে, আমার অ্যাকাউন্ট বন্ধ করে বাধিত করবেন।'],
    closing: 'বিনীত নিবেদন', signName: '[আপনার নাম]', signInfo: '[অ্যাকাউন্ট নম্বর] | [মোবাইল নম্বর]',
    tips: ['অ্যাকাউন্ট নম্বর স্পষ্টভাবে উল্লেখ করুন', 'বন্ধ করার কারণ উল্লেখ করুন', 'চেক বই/ATM কার্ড ফেরত দিন'],
    mistakes: ['অ্যাকাউন্ট নম্বর না দেওয়া', 'কারণ না বলা', 'চেক বই/ATM কার্ড না ফেরত দেওয়া'],
    faqs: [{q:'অ্যাকাউন্ট বন্ধ করতে কতদিন লাগে?', a:'সাধারণত ৩-৫ কর্মদিবস।'},{q:'কী কী কাগজপত্র লাগে?', a:'আবেদন পত্র, চেক বই, ATM কার্ড।'}]
  },
  // GOVERNMENT PAGES
  'application-aadhaar-update.html': {
    title: 'আধার কার্ড আপডেট আবেদন', desc: 'আধার কার্ডে তথ্য আপডেট করার জন্য আবেদন পত্রের সঠিক বাংলা ফরম্যাট।',
    category: 'সরকারি', catIcon: '🏛️', subcategory: 'আধার',
    recipient: 'আধার কেন্দ্র পরিচালক', institution: '[আধার এনরোলমেন্ট সেন্টার]', city: '[শহর, জেলা]',
    subject: 'আধার কার্ডে তথ্য আপডেটের আবেদন', salutation: 'মহোদয়,',
    body: ['সবিনয় নিবেদন এই যে, আমি [আপনার নাম], আমার আধার নম্বর [আধার নম্বর]। আমি আমার আধার কার্ডে [তথ্যের ধরন] আপডেট করতে চাই।', 'আমার পুরানো তথ্য [পুরানো তথ্য] এবং নতুন তথ্য [নতুন তথ্য]।', 'অতএব, বিনীত অনুরোধ জানাচ্ছি যে, আমার আধার কার্ডে তথ্য আপডেট করে বাধিত করবেন।'],
    closing: 'বিনীত নিবেদন', signName: '[আপনার নাম]', signInfo: '[আধার নম্বর] | [মোবাইল নম্বর]',
    tips: ['আধার নম্বর স্পষ্টভাবে উল্লেখ করুন', 'পুরানো ও নতুন তথ্য উল্লেখ করুন', 'প্রমাণপত্র সংযুক্ত করুন'],
    mistakes: ['আধার নম্বর না দেওয়া', 'পুরানো তথ্য না বলা', 'প্রমাণপত্র না সংযুক্ত করা'],
    faqs: [{q:'আধার আপডেটে কতদিন লাগে?', a:'সাধারণত ১৫-৩০ দিন।'},{q:'কী কী কাগজপত্র লাগে?', a:'আধার কার্ড কপি, নতুন তথ্যের প্রমাণ।'}]
  },
  'application-pan-card.html': {
    title: 'প্যান কার্ড আবেদন', desc: 'নতুন প্যান কার্ড পাওয়ার জন্য আবেদন পত্রের সঠিক বাংলা ফরম্যাট।',
    category: 'সরকারি', catIcon: '🏛️', subcategory: 'প্যান কার্ড',
    recipient: 'NSDL/UTIITSL অফিসার', institution: '[NSDL/UTIITSL অফিস]', city: '[শহর, জেলা]',
    subject: 'নতুন প্যান কার্ড আবেদন', salutation: 'মহোদয়,',
    body: ['সবিনয় নিবেদন এই যে, আমি [আপনার নাম], পিতা [নাম], ঠিকানা [ঠিকানা] এর বাসিন্দা। আমি নতুন প্যান কার্ড আবেদন করছি।', 'আমি [কাজের ধরন]-এর জন্য প্যান কার্ড প্রয়োজন।', 'অতএব, বিনীত অনুরোধ জানাচ্ছি যে, আমাকে একটি নতুন প্যান কার্ড প্রদান করে বাধিত করবেন।'],
    closing: 'বিনীত নিবেদন', signName: '[আপনার নাম]', signInfo: '[পিতার নাম] | [ঠিকানা]',
    tips: ['আবেদন ফর্ম সঠিকভাবে পূরণ করুন', 'ছবি সংযুক্ত করুন', 'পরিচয় পত্র সংযুক্ত করুন'],
    mistakes: ['ফর্ম ভুল পূরণ করা', 'ছবি না সংযুক্ত করা', 'পরিচয় পত্র না দেওয়া'],
    faqs: [{q:'প্যান কার্ড পেতে কতদিন লাগে?', a:'সাধারণত ১৫-৩০ দিন।'},{q:'কী কী কাগজপত্র লাগে?', a:'আধার কার্ড, ছবি, ঠিকানার প্রমাণ।'}]
  },
  'application-voter-id-correction.html': {
    title: 'ভোটার আইডি সংশোধন আবেদন', desc: 'ভোটার আইডি কার্ডে তথ্য সংশোধনের জন্য আবেদন পত্রের সঠিক বাংলা ফরম্যাট।',
    category: 'সরকারি', catIcon: '🏛️', subcategory: 'ভোটার আইডি',
    recipient: 'নির্বাচন অফিসার', institution: '[নির্বাচন অফিস]', city: '[শহর, জেলা]',
    subject: 'ভোটার আইডি কার্ডে তথ্য সংশোধনের আবেদন', salutation: 'মহোদয়,',
    body: ['সবিনয় নিবেদন এই যে, আমি [আপনার নাম], আমার ভোটার আইডি নম্বর [ভোটার আইডি নম্বর]। আমার ভোটার আইডি কার্ডে [তথ্যের ধরন] ভুলভাবে উল্লেখ হয়েছে।', 'ভুল তথ্য [ভুল তথ্য] এবং সঠিক তথ্য [সঠিক তথ্য]।', 'অতএব, বিনীত অনুরোধ জানাচ্ছি যে, আমার ভোটার আইডি কার্ডে তথ্য সংশোধন করে বাধিত করবেন।'],
    closing: 'বিনীত নিবেদন', signName: '[আপনার নাম]', signInfo: '[ভোটার আইডি নম্বর] | [মোবাইল নম্বর]',
    tips: ['ভোটার আইডি নম্বর স্পষ্টভাবে উল্লেখ করুন', 'ভুল ও সঠিক তথ্য উল্লেখ করুন', 'প্রমাণপত্র সংযুক্ত করুন'],
    mistakes: ['ভোটার আইডি নম্বর না দেওয়া', 'ভুল তথ্য না বলা', 'প্রমাণপত্র না সংযুক্ত করা'],
    faqs: [{q:'ভোটার আইডি সংশোধনে কতদিন লাগে?', a:'সাধারণত ১৫-৩০ দিন।'},{q:'কী কী কাগজপত্র লাগে?', a:'ভোটার আইডি কপি, সঠিক তথ্যের প্রমাণ।'}]
  },
  'application-ration-card.html': {
    title: 'রেশন কার্ড আবেদন', desc: 'নতুন রেশন কার্ড পাওয়ার জন্য আবেদন পত্রের সঠিক বাংলা ফরম্যাট।',
    category: 'সরকারি', catIcon: '🏛️', subcategory: 'রেশন কার্ড',
    recipient: 'খাদ্য সরবরাহ অফিসার', institution: '[খাদ্য সরবরাহ অফিস]', city: '[শহর, জেলা]',
    subject: 'নতুন রেশন কার্ড আবেদন', salutation: 'মহোদয়,',
    body: ['সবিনয় নিবেদন এই যে, আমি [আপনার নাম], পিতা [নাম], ঠিকানা [ঠিকানা] এর বাসিন্দা। আমার পরিবারের বার্ষিক আয় [টাকার পরিমাণ] টাকা।', 'আমি সরকারি রেশন সুবিধা পাওয়ার যোগ্য। আমার পরিবারে [সংখ্যা] সদস্য রয়েছেন।', 'অতএব, বিনীত অনুরোধ জানাচ্ছি যে, আমাকে একটি নতুন রেশন কার্ড প্রদান করে বাধিত করবেন।'],
    closing: 'বিনীত নিবেদন', signName: '[আপনার নাম]', signInfo: '[পিতার নাম] | [ঠিকানা]',
    tips: ['পরিবারের সদস্য সংখ্যা উল্লেখ করুন', 'আয়ের প্রমাণ সংযুক্ত করুন', 'ঠিকানার প্রমাণ সংযুক্ত করুন'],
    mistakes: ['সদস্য সংখ্যা না দেওয়া', 'আয়ের প্রমাণ না সংযুক্ত করা', 'ঠিকানার প্রমাণ না দেওয়া'],
    faqs: [{q:'রেশন কার্ড পেতে কতদিন লাগে?', a:'সাধারণত ১৫-৩০ দিন।'},{q:'কী কী কাগজপত্র লাগে?', a:'আধার কার্ড, আয়ের প্রমাণ, ঠিকানার প্রমাণ।'}]
  },
  'application-passport.html': {
    title: 'পাসপোর্ট আবেদন', desc: 'নতুন পাসপোর্ট পাওয়ার জন্য আবেদন পত্রের সঠিক বাংলা ফরম্যাট।',
    category: 'সরকারি', catIcon: '🏛️', subcategory: 'পাসপোর্ট',
    recipient: 'পাসপোর্ট অফিসার', institution: '[পাসপোর্ট অফিস]', city: '[শহর, জেলা]',
    subject: 'নতুন পাসপোর্ট আবেদন', salutation: 'মহোদয়,',
    body: ['সবিনয় নিবেদন এই যে, আমি [আপনার নাম], পিতা [নাম], ঠিকানা [ঠিকানা] এর বাসিন্দা। আমি বিদেশ ভ্রমণের জন্য পাসপোর্ট প্রয়োজন।', 'আমি [দেশের নাম] ভ্রমণ করতে চাই এবং এর জন্য পাসপোর্ট প্রয়োজন।', 'অতএব, বিনীত অনুরোধ জানাচ্ছি যে, আমাকে একটি নতুন পাসপোর্ট প্রদান করে বাধিত করবেন।'],
    closing: 'বিনীত নিবেদন', signName: '[আপনার নাম]', signInfo: '[পিতার নাম] | [ঠিকানা]',
    tips: ['ভ্রমণের উদ্দেশ্য উল্লেখ করুন', 'জন্ম সনদপত্র সংযুক্ত করুন', 'আধার কার্ড কপি সংযুক্ত করুন'],
    mistakes: ['ভ্রমণের উদ্দেশ্য না বলা', 'জন্ম সনদপত্র না সংযুক্ত করা', 'আধার কার্ড কপি না দেওয়া'],
    faqs: [{q:'পাসপোর্ট পেতে কতদিন লাগে?', a:'সাধারণত ১৫-৩০ দিন।'},{q:'কী কী কাগজপত্র লাগে?', a:'জন্ম সনদপত্র, আধার কার্ড, ঠিকানার প্রমাণ।'}]
  },
  'application-driving-license.html': {
    title: 'ড্রাইভিং লাইসেন্স আবেদন', desc: 'ড্রাইভিং লাইসেন্স পাওয়ার জন্য আবেদন পত্রের সঠিক বাংলা ফরম্যাট।',
    category: 'সরকারি', catIcon: '🏛️', subcategory: 'ড্রাইভিং লাইসেন্স',
    recipient: 'আরটিও অফিসার', institution: '[আরটিও অফিস]', city: '[শহর, জেলা]',
    subject: 'ড্রাইভিং লাইসেন্স আবেদন', salutation: 'মহোদয়,',
    body: ['সবিনয় নিবেদন এই যে, আমি [আপনার নাম], পিতা [নাম], ঠিকানা [ঠিকানা] এর বাসিন্দা। আমি ড্রাইভিং লাইসেন্স আবেদন করছি।', 'আমি [গাড়ির ধরন] চালানোর লাইসেন্স চাই। আমি ড্রাইভিং ট্রেনিং সম্পন্ন করেছি।', 'অতএব, বিনীত অনুরোধ জানাচ্ছি যে, আমাকে একটি ড্রাইভিং লাইসেন্স প্রদান করে বাধিত করবেন।'],
    closing: 'বিনীত নিবেদন', signName: '[আপনার নাম]', signInfo: '[পিতার নাম] | [ঠিকানা]',
    tips: ['গাড়ির ধরন উল্লেখ করুন', 'ড্রাইভিং ট্রেনিং সনদ সংযুক্ত করুন', 'চিকিৎসা সনদ সংযুক্ত করুন'],
    mistakes: ['গাড়ির ধরন না বলা', 'ড্রাইভিং ট্রেনিং সনদ না সংযুক্ত করা', 'চিকিৎসা সনদ না দেওয়া'],
    faqs: [{q:'ড্রাইভিং লাইসেন্স পেতে কতদিন লাগে?', a:'সাধারণত ১৫-৩০ দিন।'},{q:'কী কী কাগজপত্র লাগে?', a:'আধার কার্ড, ড্রাইভিং ট্রেনিং সনদ, চিকিৎসা সনদ।'}]
  },
  // SCHOOL PAGES
  'application-school-fee-concession.html': {
    title: 'স্কুল ফি মওকুফ আবেদন', desc: 'স্কুল ফি মওকুফ বা ছাড় পাওয়ার জন্য আবেদন পত্রের সঠিক বাংলা ফরম্যাট।',
    category: 'স্কুল', catIcon: '🏫', subcategory: 'ফি মওকুফ',
    recipient: 'প্রধান শিক্ষক', institution: '[বিদ্যালয়ের নাম]', city: '[শহর, জেলা]',
    subject: 'শিক্ষা ফি মওকুফ/ছাড়ের আবেদন', salutation: 'মহোদয়,',
    body: ['সবিনয় নিবেদন এই যে, আমি [আপনার নাম], [শ্রেণি] শ্রেণির ছাত্র/ছাত্রী। আমার পরিবারের আর্থিক অবস্থা ভালো নয়।', 'আমার পিতা [পেশা] এবং মাসিক আয় [টাকার পরিমাণ] টাকা। এত কম আয়ে উচ্চ শিক্ষা ফি পরিশোধ করা সম্ভব হচ্ছে না।', 'অতএব, বিনীত অনুরোধ জানাচ্ছি যে, আমাকে শিক্ষা ফি মওকুফ/ছাড় প্রদান করে বাধিত করবেন।'],
    closing: 'বিনীত নিবেদন', signName: '[আপনার নাম]', signInfo: '[শ্রেণি] | [রোল নম্বর]',
    tips: ['পারিবারিক আয় উল্লেখ করুন', 'আয়ের প্রমাণ সংযুক্ত করুন', 'অভিভাবকের স্বাক্ষর নিন'],
    mistakes: ['পারিবারিক আয় না দেওয়া', 'আয়ের প্রমাণ না সংযুক্ত করা', 'অভিভাবকের স্বাক্ষর না নেওয়া'],
    faqs: [{q:'ফি মওকুফ পেতে কতদিন লাগে?', a:'সাধারণত ৭-১৫ কর্মদিবস।'},{q:'কী কী কাগজপত্র লাগে?', a:'আয়ের প্রমাণ, অভিভাবকের আবেদন।'}]
  },
  'application-school-scholarship.html': {
    title: 'স্কলারশিপ আবেদন', desc: 'স্কলারশিপ পাওয়ার জন্য আবেদন পত্রের সঠিক বাংলা ফরম্যাট।',
    category: 'স্কুল', catIcon: '🏫', subcategory: 'স্কলারশিপ',
    recipient: 'প্রধান শিক্ষক', institution: '[বিদ্যালয়ের নাম]', city: '[শহর, জেলা]',
    subject: 'স্কলারশিপ আবেদন', salutation: 'মহোদয়,',
    body: ['সবিনয় নিবেদন এই যে, আমি [আপনার নাম], [শ্রেণি] শ্রেণির ছাত্র/ছাত্রী। আমি গত বছরে [গ্রেড/ফলাফল] ফলাফল অর্জন করেছি।', 'আমার পরিবারের আর্থিক অবস্থা ভালো নয় এবং স্কলারশিপ আমার পড়াশোনা চালিয়ে যাওয়ার জন্য অত্যন্ত প্রয়োজন।', 'অতএব, বিনীত অনুরোধ জানাচ্ছি যে, আমাকে স্কলারশিপ প্রদান করে বাধিত করবেন।'],
    closing: 'বিনীত নিবেদন', signName: '[আপনার নাম]', signInfo: '[শ্রেণি] | [রোল নম্বর]',
    tips: ['ফলাফল উল্লেখ করুন', 'পারিবারিক আয় উল্লেখ করুন', 'ফলাফলের কপি সংযুক্ত করুন'],
    mistakes: ['ফলাফল না দেওয়া', 'পারিবারিক আয় না বলা', 'ফলাফলের কপি না সংযুক্ত করা'],
    faqs: [{q:'স্কলারশিপ পেতে কতদিন লাগে?', a:'সাধারণত ১৫-৩০ দিন।'},{q:'কী কী কাগজপত্র লাগে?', a:'ফলাফলের কপি, আয়ের প্রমাণ।'}]
  },
  'application-school-transfer-certificate.html': {
    title: 'ট্রান্সফার সার্টিফিকেট আবেদন', desc: 'ট্রান্সফার সার্টিফিকেট পাওয়ার জন্য আবেদন পত্রের সঠিক বাংলা ফরম্যাট।',
    category: 'স্কুল', catIcon: '🏫', subcategory: 'ট্রান্সফার সার্টিফিকেট',
    recipient: 'প্রধান শিক্ষক', institution: '[বিদ্যালয়ের নাম]', city: '[শহর, জেলা]',
    subject: 'ট্রান্সফার সার্টিফিকেট প্রদানের আবেদন', salutation: 'মহোদয়,',
    body: ['সবিনয় নিবেদন এই যে, আমি [আপনার নাম], [শ্রেণি] শ্রেণির ছাত্র/ছাত্রী। আমি এই বিদ্যালয় থেকে অন্য বিদ্যালয়ে ভর্তি হতে চাই।', 'আমি এই বিদ্যালয়ে [সংখ্যা] বছর ধরে অধ্যয়ন করছি এবং আমার সকল বকেয়া পরিশোধ করেছি।', 'অতএব, বিনীত অনুরোধ জানাচ্ছি যে, আমাকে একটি ট্রান্সফার সার্টিফিকেট প্রদান করে বাধিত করবেন।'],
    closing: 'বিনীত নিবেদন', signName: '[আপনার নাম]', signInfo: '[শ্রেণি] | [রোল নম্বর]',
    tips: ['অধ্যয়নের সময়কাল উল্লেখ করুন', 'বকেয়া পরিশোধের কথা উল্লেখ করুন', 'অভিভাবকের স্বাক্ষর নিন'],
    mistakes: ['অধ্যয়নের সময়কাল না দেওয়া', 'বকেয়া পরিশোধের কথা না বলা', 'অভিভাবকের স্বাক্ষর না নেওয়া'],
    faqs: [{q:'ট্রান্সফার সার্টিফিকেট পেতে কতদিন লাগে?', a:'সাধারণত ৩-৭ কর্মদিবস।'},{q:'কী কী কাগজপত্র লাগে?', a:'বকেয়া পরিশোধের রসিদ, অভিভাবকের আবেদন।'}]
  },
  'application-school-fee-installment.html': {
    title: 'স্কুল ফি কিস্তি আবেদন', desc: 'স্কুল ফি কিস্তিতে পরিশোধের জন্য আবেদন পত্রের সঠিক বাংলা ফরম্যাট।',
    category: 'স্কুল', catIcon: '🏫', subcategory: 'ফি কিস্তি',
    recipient: 'প্রধান শিক্ষক', institution: '[বিদ্যালয়ের নাম]', city: '[শহর, জেলা]',
    subject: 'শিক্ষা ফি কিস্তিতে পরিশোধের আবেদন', salutation: 'মহোদয়,',
    body: ['সবিনয় নিবেদন এই যে, আমি [আপনার নাম], [শ্রেণি] শ্রেণির ছাত্র/ছাত্রী। আমার পরিবারের আর্থিক অবস্থা ভালো নয়।', 'আমি শিক্ষা ফি এককালীন পরিশোধ করতে অক্ষম। আমি ফি কিস্তিতে পরিশোধ করতে চাই।', 'অতএব, বিনীত অনুরোধ জানাচ্ছি যে, আমাকে ফি কিস্তিতে পরিশোধের অনুমতি প্রদান করে বাধিত করবেন।'],
    closing: 'বিনীত নিবেদন', signName: '[আপনার নাম]', signInfo: '[শ্রেণি] | [রোল নম্বর]',
    tips: ['কিস্তির সংখ্যা উল্লেখ করুন', 'পারিবারিক আয় উল্লেখ করুন', 'অভিভাবকের স্বাক্ষর নিন'],
    mistakes: ['কিস্তির সংখ্যা না দেওয়া', 'পারিবারিক আয় না বলা', 'অভিভাবকের স্বাক্ষর না নেওয়া'],
    faqs: [{q:'ফি কিস্তি অনুমোদনে কতদিন লাগে?', a:'সাধারণত ৩-৭ কর্মদিবস।'},{q:'কত কিস্তি পাওয়া যায়?', a:'সাধারণত ২-৩ কিস্তি।'}]
  },
  // EMPLOYMENT PAGES
  'application-employment-experience-letter.html': {
    title: 'অভিজ্ঞতা পত্র আবেদন', desc: 'অভিজ্ঞতা পত্র পাওয়ার জন্য আবেদন পত্রের সঠিক বাংলা ফরম্যাট।',
    category: 'চাকরি', catIcon: '💼', subcategory: 'অভিজ্ঞতা পত্র',
    recipient: 'এইচআর ম্যানেজার', institution: '[কোম্পানির নাম]', city: '[শহর, জেলা]',
    subject: 'অভিজ্ঞতা সনদপত্র প্রদানের আবেদন', salutation: 'মহোদয়,',
    body: ['সবিনয় নিবেদন এই যে, আমি [আপনার নাম], [বিভাগ] বিভাগে [পদবী] হিসেবে [তারিখ] থেকে [তারিখ] পর্যন্ত কর্মরত ছিলাম।', 'আমি আমার চাকরিকালে সকল দায়িত্ব সফলভাবে পালন করেছি এবং কোম্পানির উন্নয়নে অবদান রেখেছি।', 'অতএব, বিনীত অনুরোধ জানাচ্ছি যে, আমাকে একটি অভিজ্ঞতা সনদপত্র প্রদান করে বাধিত করবেন।'],
    closing: 'বিনীত নিবেদন', signName: '[আপনার নাম]', signInfo: '[পদবী] | [কর্মচারী আইডি]',
    tips: ['চাকরিকাল উল্লেখ করুন', 'দায়িত্বের বিবরণ দিন', 'কোম্পানির উন্নয়নে অবদান উল্লেখ করুন'],
    mistakes: ['চাকরিকাল না দেওয়া', 'দায়িত্বের বিবরণ না দেওয়া', 'অবদান না উল্লেখ করা'],
    faqs: [{q:'অভিজ্ঞতা পত্র পেতে কতদিন লাগে?', a:'সাধারণত ৩-৫ কর্মদিবস।'},{q:'কী কী কাগজপত্র লাগে?', a:'চাকরির প্রমাণ, পরিচয় পত্র।'}]
  },
  'application-employment-resignation.html': {
    title: 'পদত্যাগ পত্র', desc: 'চাকরি থেকে পদত্যাগ করার জন্য আবেদন পত্রের সঠিক বাংলা ফরম্যাট।',
    category: 'চাকরি', catIcon: '💼', subcategory: 'পদত্যাগ',
    recipient: 'ব্যবস্থাপনা পরিচালক', institution: '[কোম্পানির নাম]', city: '[শহর, জেলা]',
    subject: 'চাকরি থেকে পদত্যাগের আবেদন', salutation: 'মহোদয়,',
    body: ['সবিনয় নিবেদন এই যে, আমি [আপনার নাম], [বিভাগ] বিভাগে [পদবী] হিসেবে [তারিখ] থেকে কর্মরত।', 'আমি ব্যক্তিগত কারণে আমার চাকরি থেকে পদত্যাগ করতে বাধ্য হচ্ছি। আমি [তারিখ] থেকে কার্যকরভাবে পদত্যাগ করছি।', 'অতএব, বিনীত অনুরোধ জানাচ্ছি যে, আমার পদত্যাগপত্র গ্রহণ করে বাধিত করবেন।'],
    closing: 'বিনীত নিবেদন', signName: '[আপনার নাম]', signInfo: '[পদবী] | [কর্মচারী আইডি]',
    tips: ['পদত্যাগের তারিখ উল্লেখ করুন', 'কারণ সংক্ষেপে উল্লেখ করুন', 'নোটিশ পিরিয়ড মেনে চলুন'],
    mistakes: ['পদত্যাগের তারিখ না দেওয়া', 'কারণ না বলা', 'নোটিশ পিরিয়ড না মানা'],
    faqs: [{q:'পদত্যাগ পত্র দিতে কতদিন আগে জানাতে হয়?', a:'সাধারণত ৩০-৬০ দিন আগে।'},{q:'কী কী কাগজপত্র লাগে?', a:'পদত্যাগ পত্র, নোটিশ পিরিয়ডের প্রমাণ।'}]
  },
  'application-relieving-letter.html': {
    title: 'রিলিভিং লেটার আবেদন', desc: 'রিলিভিং লেটার পাওয়ার জন্য আবেদন পত্রের সঠিক বাংলা ফরম্যাট।',
    category: 'চাকরি', catIcon: '💼', subcategory: 'রিলিভিং লেটার',
    recipient: 'এইচআর ম্যানেজার', institution: '[কোম্পানির নাম]', city: '[শহর, জেলা]',
    subject: 'রিলিভিং লেটার প্রদানের আবেদন', salutation: 'মহোদয়,',
    body: ['সবিনয় নিবেদন এই যে, আমি [আপনার নাম], [বিভাগ] বিভাগে [পদবী] হিসেবে [তারিখ] থেকে [তারিখ] পর্যন্ত কর্মরত ছিলাম।', 'আমি আমার চাকরিকালে সকল দায়িত্ব সফলভাবে পালন করেছি এবং সকল কোম্পানি সম্পত্তি ফেরত দিয়েছি।', 'অতএব, বিনীত অনুরোধ জানাচ্ছি যে, আমাকে একটি রিলিভিং লেটার প্রদান করে বাধিত করবেন।'],
    closing: 'বিনীত নিবেদন', signName: '[আপনার নাম]', signInfo: '[পদবী] | [কর্মচারী আইডি]',
    tips: ['চাকরিকাল উল্লেখ করুন', 'কোম্পানি সম্পত্তি ফেরতের কথা উল্লেখ করুন', 'সকল দায়িত্ব হস্তান্তরের কথা জানান'],
    mistakes: ['চাকরিকাল না দেওয়া', 'কোম্পানি সম্পত্তি ফেরতের কথা না বলা', 'দায়িত্ব হস্তান্তরের কথা না জানানো'],
    faqs: [{q:'রিলিভিং লেটার পেতে কতদিন লাগে?', a:'সাধারণত ৩-৫ কর্মদিবস।'},{q:'কী কী কাগজপত্র লাগে?', a:'পদত্যাগ পত্র, কোম্পানি সম্পত্তি ফেরতের প্রমাণ।'}]
  },
  'application-salary-certificate.html': {
    title: 'বেতন সনদপত্র আবেদন', desc: 'বেতন সনদপত্র পাওয়ার জন্য আবেদন পত্রের সঠিক বাংলা ফরম্যাট।',
    category: 'চাকরি', catIcon: '💼', subcategory: 'বেতন সনদ',
    recipient: 'এইচআর ম্যানেজার', institution: '[কোম্পানির নাম]', city: '[শহর, জেলা]',
    subject: 'বেতন সনদপত্র প্রদানের আবেদন', salutation: 'মহোদয়,',
    body: ['সবিনয় নিবেদন এই যে, আমি [আপনার নাম], [বিভাগ] বিভাগে [পদবী] হিসেবে [তারিখ] থেকে কর্মরত।', 'আমি [কাজের ধরন]-এর জন্য বেতন সনদপত্র প্রয়োজন। আমার মাসিক বেতন [টাকার পরিমাণ] টাকা।', 'অতএব, বিনীত অনুরোধ জানাচ্ছি যে, আমাকে একটি বেতন সনদপত্র প্রদান করে বাধিত করবেন।'],
    closing: 'বিনীত নিবেদন', signName: '[আপনার নাম]', signInfo: '[পদবী] | [কর্মচারী আইডি]',
    tips: ['কাজের ধরন উল্লেখ করুন', 'মাসিক বেতন উল্লেখ করুন', 'চাকরিকাল উল্লেখ করুন'],
    mistakes: ['কাজের ধরন না বলা', 'মাসিক বেতন না দেওয়া', 'চাকরিকাল না উল্লেখ করা'],
    faqs: [{q:'বেতন সনদপত্র পেতে কতদিন লাগে?', a:'সাধারণত ১-৩ কর্মদিবস।'},{q:'কী কী কাগজপত্র লাগে?', a:'আবেদন পত্র, পরিচয় পত্র।'}]
  },
  'application-salary-increment-request.html': {
    title: 'বেতন বৃদ্ধি আবেদন', desc: 'বেতন বৃদ্ধির জন্য আবেদন পত্রের সঠিক বাংলা ফরম্যাট।',
    category: 'চাকরি', catIcon: '💼', subcategory: 'বেতন বৃদ্ধি',
    recipient: 'এইচআর ম্যানেজার', institution: '[কোম্পানির নাম]', city: '[শহর, জেলা]',
    subject: 'বেতন বৃদ্ধির আবেদন', salutation: 'মহোদয়,',
    body: ['সবিনয় নিবেদন এই যে, আমি [আপনার নাম], [বিভাগ] বিভাগে [পদবী] হিসেবে [তারিখ] থেকে কর্মরত।', 'আমি গত [সংখ্যা] বছর ধরে সততা ও দক্ষতার সাথে কাজ করছি এবং উল্লেখযোগ্য সাফল্য অর্জন করেছি।', 'অতএব, বিনীত অনুরোধ জানাচ্ছি যে, আমার বেতন [পরিমাণ] টাকা বৃদ্ধি করে বাধিত করবেন।'],
    closing: 'বিনীত নিবেদন', signName: '[আপনার নাম]', signInfo: '[পদবী] | [কর্মচারী আইডি]',
    tips: ['সাফল্যের তালিকা তৈরি করুন', 'বাজারের বেতন গবেষণা করুন', 'নির্দিষ্ট পরিমাণ উল্লেখ করুন'],
    mistakes: ['সাফল্যের তালিকা না দেওয়া', 'বাজারের বেতন গবেষণা না করা', 'নির্দিষ্ট পরিমাণ না দেওয়া'],
    faqs: [{q:'বেতন বৃদ্ধি আবেদন কখন করবেন?', a:'বার্ষিক মূল্যায়ন চলাকালীন।'},{q:'কত শতাংশ বৃদ্ধি চাওয়া উচিত?', a:'সাধারণত ১০-২০%।'}]
  },
  'application-advance-salary.html': {
    title: 'অগ্রিম বেতন আবেদন', desc: 'অগ্রিম বেতন পাওয়ার জন্য আবেদন পত্রের সঠিক বাংলা ফরম্যাট।',
    category: 'চাকরি', catIcon: '💼', subcategory: 'অগ্রিম বেতন',
    recipient: 'এইচআর ম্যানেজার', institution: '[কোম্পানির নাম]', city: '[শহর, জেলা]',
    subject: 'অগ্রিম বেতন আবেদন', salutation: 'মহোদয়,',
    body: ['সবিনয় নিবেদন এই যে, আমি [আপনার নাম], [বিভাগ] বিভাগে [পদবী] হিসেবে কর্মরত। আমার জরুরি আর্থিক প্রয়োজন থাকায় আমি অগ্রিম বেতন প্রয়োজন।', 'আমি [টাকার পরিমাণ] টাকা অগ্রিম বেতন চাই এবং তা [সংখ্যা] মাসের কিস্তিতে পরিশোধ করতে সম্মত আছি।', 'অতএব, বিনীত অনুরোধ জানাচ্ছি যে, আমাকে উক্ত পরিমাণ অগ্রিম বেতন প্রদান করে বাধিত করবেন।'],
    closing: 'বিনীত নিবেদন', signName: '[আপনার নাম]', signInfo: '[পদবী] | [কর্মচারী আইডি]',
    tips: ['অগ্রিম বেতনের পরিমাণ উল্লেখ করুন', 'কিস্তি পরিশোধের পরিকল্পনা দিন', 'জরুরি প্রয়োজনের কারণ উল্লেখ করুন'],
    mistakes: ['অগ্রিম বেতনের পরিমাণ না দেওয়া', 'কিস্তি পরিশোধের পরিকল্পনা না দেওয়া', 'জরুরি প্রয়োজনের কারণ না বলা'],
    faqs: [{q:'অগ্রিম বেতন পেতে কতদিন লাগে?', a:'সাধারণত ৩-৫ কর্মদিবস।'},{q:'কত টাকা অগ্রিম পাওয়া যায়?', a:'সাধারণত ১ মাসের বেতন পর্যন্ত।'}]
  },
  'application-increment-letter.html': {
    title: 'ইনক্রিমেন্ট লেটার আবেদন', desc: 'ইনক্রিমেন্ট লেটার পাওয়ার জন্য আবেদন পত্রের সঠিক বাংলা ফরম্যাট।',
    category: 'চাকরি', catIcon: '💼', subcategory: 'ইনক্রিমেন্ট',
    recipient: 'এইচআর ম্যানেজার', institution: '[কোম্পানির নাম]', city: '[শহর, জেলা]',
    subject: 'ইনক্রিমেন্ট লেটার প্রদানের আবেদন', salutation: 'মহোদয়,',
    body: ['সবিনয় নিবেদন এই যে, আমি [আপনার নাম], [বিভাগ] বিভাগে [পদবী] হিসেবে [তারিখ] থেকে কর্মরত।', 'আমার বেতন বৃদ্ধি হয়েছে কিন্তু আমি এখনও ইনক্রিমেন্ট লেটার পাইনি।', 'অতএব, বিনীত অনুরোধ জানাচ্ছি যে, আমাকে একটি ইনক্রিমেন্ট লেটার প্রদান করে বাধিত করবেন।'],
    closing: 'বিনীত নিবেদন', signName: '[আপনার নাম]', signInfo: '[পদবী] | [কর্মচারী আইডি]',
    tips: ['চাকরিকাল উল্লেখ করুন', 'বেতন বৃদ্ধির তারিখ উল্লেখ করুন', 'স্বাক্ষর দিন'],
    mistakes: ['চাকরিকাল না দেওয়া', 'বেতন বৃদ্ধির তারিখ না দেওয়া', 'স্বাক্ষর না দেওয়া'],
    faqs: [{q:'ইনক্রিমেন্ট লেটার পেতে কতদিন লাগে?', a:'সাধারণত ৩-৫ কর্মদিবস।'},{q:'কী কী কাগজপত্র লাগে?', a:'আবেদন পত্র, পরিচয় পত্র।'}]
  }
};

// Template function - EXACT same structure as SUGGETION SITE template
function generatePage(slug, data) {
  const siteUrl = 'https://sampark-lodge.github.io/letterformat';
  const pageUrl = `${siteUrl}/formats/${slug}`;
  const bodyHtml = data.body.map(p => `<p>${p}</p>`).join('\n            ');
  const tipsHtml = data.tips.map((tip, i) => 
    `<div class="tip-item"><div class="tip-num">${i + 1}</div><div class="tip-text">${tip}</div></div>`
  ).join('\n          ');
  const faqsHtml = data.faqs.map(faq => 
    `<div class="faq-item"><h3>❓ ${faq.q}</h3><p>${faq.a}</p></div>`
  ).join('\n          ');

  return `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${data.title} — LetterFormat.in</title>
  <meta name="description" content="বিনামূল্যে ${data.title}। কপি-পেস্ট ফরম্যাট, এডিটেবল টেমপ্লেট, পূরণ করা নমুনা, টিপস সহ। আপডেট ২০২৬।" />
  <link rel="canonical" href="${pageUrl}" />
  <meta property="og:title" content="${data.title} — LetterFormat.in" />
  <meta property="og:description" content="বিনামূল্যে ${data.title}। কপি-পেস্ট ফরম্যাট, এডিটেবল টেমপ্লেট।" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:type" content="article" />
  <meta property="og:locale" content="bn_IN" />
  <meta property="og:site_name" content="LetterFormat.in" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${data.title} — LetterFormat.in" />
  <meta name="twitter:description" content="বিনামূল্যে ${data.title}। কপি-পেস্ট ফরম্যাট।" />
  <meta name="keywords" content="${data.title}, বাংলা আবেদন, চিঠি ফরম্যাট, LetterFormat.in" />
  <meta name="author" content="LetterFormat.in" />
  <meta name="robots" content="index, follow" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@300;400;500;600;700;800;900&family=Noto+Serif+Bengali:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      --red: #dc2626; --red-dark: #b91c1c; --red-light: #fee2e2;
      --red-xlight: #fff5f5; --red-mid: #fca5a5;
      --white: #fff; --gray-50: #f9fafb; --gray-100: #f3f4f6;
      --gray-200: #e5e7eb; --gray-300: #d1d5db; --gray-400: #9ca3af;
      --gray-500: #6b7280; --gray-600: #4b5563; --gray-700: #374151;
      --gray-800: #1f2937; --gray-900: #111827;
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
      --shadow-md: 0 4px 16px rgba(0,0,0,0.08);
      --shadow-lg: 0 10px 40px rgba(0,0,0,0.1);
      --shadow-red: 0 8px 32px rgba(220,38,38,0.18);
      --radius-sm: 8px; --radius-md: 14px; --radius-lg: 20px;
      --font-bn: 'Noto Sans Bengali', sans-serif;
      --font-bn-serif: 'Noto Serif Bengali', serif;
      --transition: 0.22s cubic-bezier(0.4,0,0.2,1);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: var(--font-bn); background: var(--gray-50); color: var(--gray-800); line-height: 1.7; -webkit-font-smoothing: antialiased; }
    a { text-decoration: none; color: inherit; }
    .container { max-width: 1180px; margin: 0 auto; padding: 0 20px; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.5;} }
    .navbar { position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,0.95); backdrop-filter: blur(14px); border-bottom: 1.5px solid var(--gray-100); box-shadow: var(--shadow-sm); }
    .nav-inner { display: flex; align-items: center; justify-content: space-between; height: 62px; }
    .logo { display: flex; align-items: center; gap: 10px; font-weight: 900; font-size: 1.15rem; color: var(--gray-900); }
    .logo-icon { width: 36px; height: 36px; border-radius: 9px; background: var(--red); display: flex; align-items: center; justify-content: center; }
    .logo-icon svg { width: 18px; height: 18px; fill: white; }
    .logo-text span { color: var(--red); }
    .breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 0.82rem; color: var(--gray-500); }
    .breadcrumb a { color: var(--red); font-weight: 500; }
    .breadcrumb a:hover { text-decoration: underline; }
    .breadcrumb-sep { color: var(--gray-300); }
    .nav-actions { display: flex; gap: 8px; }
    .btn-sm { padding: 7px 14px; border-radius: var(--radius-sm); font-size: 0.82rem; font-weight: 600; border: none; cursor: pointer; font-family: var(--font-bn); transition: all var(--transition); }
    .btn-sm.primary { background: var(--red); color: white; box-shadow: 0 2px 8px rgba(220,38,38,0.25); }
    .btn-sm.primary:hover { background: var(--red-dark); }
    .btn-sm.ghost { background: var(--gray-100); color: var(--gray-700); }
    .btn-sm.ghost:hover { background: var(--gray-200); }
    .page-layout { display: grid; grid-template-columns: 1fr 360px; gap: 28px; padding: 32px 0 60px; align-items: start; }
    .main-content { animation: fadeUp 0.5s ease both; }
    .format-meta { background: white; border-radius: var(--radius-lg); padding: 28px; border: 1.5px solid var(--gray-200); box-shadow: var(--shadow-sm); margin-bottom: 20px; }
    .meta-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 10px; }
    .tag { font-size: 0.72rem; font-weight: 700; padding: 3px 10px; border-radius: 99px; display: inline-flex; align-items: center; gap: 4px; }
    .tag.red { background: var(--red-light); color: var(--red); }
    .tag.gray { background: var(--gray-100); color: var(--gray-600); }
    .tag.green { background: #dcfce7; color: #15803d; }
    .format-title { font-size: 1.5rem; font-weight: 900; color: var(--gray-900); margin-bottom: 8px; line-height: 1.3; }
    .format-title-desc { font-size: 0.9rem; color: var(--gray-500); line-height: 1.6; }
    .meta-stats { display: flex; gap: 24px; flex-wrap: wrap; padding-top: 16px; border-top: 1px solid var(--gray-100); }
    .meta-stat { display: flex; align-items: center; gap: 6px; font-size: 0.82rem; color: var(--gray-500); }
    .meta-stat strong { color: var(--gray-800); font-weight: 600; }
    .meta-actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 16px; }
    .action-btn { display: flex; align-items: center; gap: 7px; padding: 10px 20px; border-radius: var(--radius-sm); font-size: 0.88rem; font-weight: 600; cursor: pointer; border: none; font-family: var(--font-bn); transition: all var(--transition); }
    .action-btn.copy { background: var(--red); color: white; box-shadow: var(--shadow-red); }
    .action-btn.copy:hover { background: var(--red-dark); transform: translateY(-1px); }
    .action-btn.print { background: var(--gray-100); color: var(--gray-700); border: 1.5px solid var(--gray-200); }
    .action-btn.print:hover { background: var(--gray-200); }
    .action-btn.download { background: white; color: var(--gray-700); border: 1.5px solid var(--gray-200); }
    .action-btn.download:hover { background: var(--gray-50); border-color: var(--gray-300); }
    .letter-wrapper { background: white; border-radius: var(--radius-lg); border: 1.5px solid var(--gray-200); box-shadow: var(--shadow-md); overflow: hidden; margin-bottom: 20px; }
    .letter-toolbar { background: var(--gray-50); border-bottom: 1.5px solid var(--gray-200); padding: 12px 20px; display: flex; align-items: center; justify-content: space-between; }
    .toolbar-label { font-size: 0.8rem; font-weight: 700; color: var(--gray-600); text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 8px; }
    .toolbar-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--red); animation: pulse 1.5s infinite; }
    .toolbar-copy-btn { padding: 5px 12px; background: var(--red); color: white; border: none; border-radius: 6px; font-size: 0.76rem; font-weight: 700; cursor: pointer; font-family: var(--font-bn); transition: background var(--transition); }
    .toolbar-copy-btn:hover { background: var(--red-dark); }
    .letter-document { padding: 48px 56px; font-family: var(--font-bn-serif); font-size: 1rem; line-height: 2; color: var(--gray-900); min-height: 600px; }
    .letter-document.editable { outline: none; }
    .letter-document:focus { background: #fffbfb; }
    .letter-date { text-align: right; margin-bottom: 28px; font-size: 0.95rem; }
    .letter-to { margin-bottom: 28px; }
    .letter-to .to-label { font-weight: 700; color: var(--gray-600); font-size: 0.85rem; display: block; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.05em; }
    .letter-to .to-name { font-size: 1.05rem; font-weight: 700; color: var(--gray-900); }
    .letter-to .to-address { color: var(--gray-600); font-size: 0.95rem; }
    .letter-subject { margin-bottom: 28px; padding: 14px 20px; background: var(--red-xlight); border-left: 4px solid var(--red); border-radius: 0 var(--radius-sm) var(--radius-sm) 0; }
    .letter-subject .sub-label { font-size: 0.78rem; font-weight: 700; color: var(--red); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 2px; }
    .letter-subject .sub-text { font-weight: 700; font-size: 1rem; color: var(--gray-900); }
    .letter-salutation { margin-bottom: 20px; font-weight: 600; }
    .letter-body { margin-bottom: 32px; }
    .letter-body p { margin-bottom: 16px; text-align: justify; font-size: 1rem; }
    .letter-body .placeholder { background: rgba(220,38,38,0.08); border-bottom: 2px dashed var(--red-mid); padding: 0 4px; border-radius: 3px; color: var(--red-dark); cursor: text; display: inline; }
    .letter-closing { margin-bottom: 56px; }
    .letter-sign-section { display: flex; flex-direction: column; align-items: flex-start; }
    .sign-line { width: 140px; height: 2px; background: var(--gray-700); margin-bottom: 6px; }
    .sign-name { font-weight: 700; font-size: 1rem; }
    .sign-info { font-size: 0.88rem; color: var(--gray-500); }
    .validation-error{border:2px solid #ef4444!important;background:rgba(239,68,68,0.05)!important}
    .validation-success{border:2px solid #10b981!important}
    .validation-bar{background:white;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);padding:12px 16px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between}
    .validation-status{display:flex;align-items:center;gap:8px}
    .validation-icon{font-size:1.2rem}
    .validation-text{font-size:0.85rem;color:var(--gray-700)}
    .validation-progress{width:200px;height:6px;background:var(--gray-100);border-radius:3px;overflow:hidden}
    .validation-progress-bar{height:100%;background:var(--red);border-radius:3px;transition:width 0.3s ease}
    .validation-bar.complete{border-color:#10b981}
    .validation-bar.complete .validation-progress-bar{background:#10b981}
    .pdf-modal{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:1000;justify-content:center;align-items:center}.pdf-modal.active{display:flex}.pdf-modal-content{background:white;border-radius:var(--radius-lg);width:90%;max-width:800px;max-height:90vh;overflow:hidden}.pdf-modal-header{display:flex;justify-content:space-between;align-items:center;padding:16px 24px;border-bottom:1px solid var(--gray-200)}.pdf-modal-header h3{font-size:1rem;font-weight:700;color:var(--gray-900)}.pdf-close{background:none;border:none;font-size:1.5rem;cursor:pointer;color:var(--gray-500)}.pdf-preview{padding:24px;max-height:60vh;overflow-y:auto;background:#f9f9f9}.pdf-actions{padding:16px 24px;border-top:1px solid var(--gray-200);display:flex;justify-content:flex-end}.pdf-download-btn{background:var(--red);color:white;border:none;padding:10px 20px;border-radius:var(--radius-sm);font-weight:600;cursor:pointer;font-family:var(--font-bn)}.pdf-download-btn:hover{background:var(--red-dark)}
    .tips-box { background: white; border-radius: var(--radius-lg); padding: 22px; border: 1.5px solid var(--gray-200); box-shadow: var(--shadow-sm); margin-bottom: 20px; }
    .tips-header { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
    .tips-header h3 { font-size: 0.95rem; font-weight: 700; color: var(--gray-900); }
    .tip-item { display: flex; gap: 10px; margin-bottom: 10px; align-items: flex-start; }
    .tip-num { flex-shrink:0; width:20px; height:20px; border-radius:50%; background:var(--red); color:white; font-size:0.68rem; font-weight:800; display:flex; align-items:center; justify-content:center; margin-top:2px; }
    .tip-text { font-size:0.84rem; color:var(--gray-600); line-height:1.5; }
    .faq-box { background: white; border-radius: var(--radius-lg); padding: 22px; border: 1.5px solid var(--gray-200); box-shadow: var(--shadow-sm); margin-bottom: 20px; }
    .faq-item { margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid var(--gray-100); }
    .faq-item:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
    .faq-item h3 { font-size: 0.9rem; font-weight: 700; color: var(--gray-800); margin-bottom: 8px; }
    .faq-item p { font-size: 0.85rem; color: var(--gray-600); line-height: 1.6; }
    .sidebar { position: sticky; top: 84px; display: flex; flex-direction: column; gap: 18px; animation: fadeUp 0.5s 0.1s ease both; }
    .sidebar-card { background: white; border-radius: var(--radius-lg); padding: 22px; border: 1.5px solid var(--gray-200); box-shadow: var(--shadow-sm); }
    .sidebar-card h3 { font-size: 0.88rem; font-weight: 700; color: var(--gray-900); margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 8px; }
    .quick-actions { display: flex; flex-direction: column; gap: 8px; }
    .quick-action-btn { display: flex; align-items: center; gap: 10px; padding: 12px 16px; border-radius: var(--radius-sm); border: 1.5px solid var(--gray-200); background: white; cursor: pointer; transition: all var(--transition); font-family: var(--font-bn); font-size: 0.88rem; font-weight: 600; color: var(--gray-700); }
    .quick-action-btn:hover { border-color: var(--red-mid); background: var(--red-xlight); color: var(--red); }
    .quick-action-btn.primary { background: var(--red); color: white; border-color: var(--red); font-size: 0.9rem; }
    .quick-action-btn.primary:hover { background: var(--red-dark); border-color: var(--red-dark); }
    .related-list { display: flex; flex-direction: column; gap: 10px; }
    .related-item { display: flex; align-items: center; gap: 10px; cursor: pointer; padding: 10px 12px; border-radius: var(--radius-sm); border: 1px solid var(--gray-100); transition: all var(--transition); }
    .related-item:hover { border-color: var(--red-mid); background: var(--red-xlight); }
    .related-icon { width: 36px; height: 36px; border-radius: 8px; background: var(--red-light); display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; }
    .related-text .r-name { font-size: 0.83rem; font-weight: 600; color: var(--gray-800); line-height: 1.3; }
    .related-text .r-views { font-size: 0.73rem; color: var(--gray-400); }
    .toast { position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%) translateY(80px); background: var(--gray-900); color: white; padding: 12px 24px; border-radius: var(--radius-md); font-size: 0.9rem; font-weight: 600; box-shadow: var(--shadow-lg); z-index: 999; transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease; opacity: 0; }
    .toast.show { transform: translateX(-50%) translateY(0); opacity: 1; }
    @media (max-width: 900px) { .page-layout { grid-template-columns: 1fr; } .sidebar { position: static; } .letter-document { padding: 32px 24px; } .breadcrumb { display: none; } }
    @media (max-width: 480px) { .letter-document { padding: 24px 16px; font-size: 0.92rem; } .meta-actions { flex-direction: column; } .action-btn { justify-content: center; } }
    @media print { .navbar, .format-meta, .tips-box, .sidebar, .letter-toolbar, .toast, .faq-box { display: none !important; } .letter-wrapper { border: none; box-shadow: none; } .letter-document { padding: 0; } body { background: white; } }
  </style>
</head>
<body>
<nav class="navbar">
  <div class="container">
    <div class="nav-inner">
      <a href="../index.html" class="logo">
        <div class="logo-icon"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/><path d="M8 14h8v1H8zm0 3h5v1H8z"/></svg></div>
        <div class="logo-text">Letter<span>Format</span>.in</div>
      </a>
      <div class="breadcrumb">
        <a href="../index.html">হোম</a>
        <span class="breadcrumb-sep">›</span>
        <a href="../${data.category.toLowerCase().replace(/[^a-z]/g,'')}.html">${data.category}</a>
        <span class="breadcrumb-sep">›</span>
        <span>${data.title}</span>
      </div>
      <div class="nav-actions">
        <button class="btn-sm ghost" onclick="window.print()">🖨️ প্রিন্ট</button>
        <button class="btn-sm primary" onclick="copyLetter()">📋 কপি করুন</button>
      </div>
    </div>
  </div>
</nav>
<div class="container">
  <div class="page-layout">
    <div class="main-content">
      <div class="format-meta">
        <div class="meta-tags">
          <span class="tag red">${data.catIcon} ${data.category}</span>
          <span class="tag gray">${data.subcategory}</span>
          <span class="tag green">✅ যাচাইকৃত ফরম্যাট</span>
        </div>
        <h1 class="format-title">${data.title}</h1>
        <p class="format-title-desc">${data.desc}</p>
        <div class="meta-stats">
          <div class="meta-stat">👁 <strong>১২,৪৫৬</strong> বার দেখা হয়েছে</div>
          <div class="meta-stat">📥 <strong>৮,২৩৪</strong> বার কপি হয়েছে</div>
          <div class="meta-stat">⭐ <strong>৪.৯/৫</strong> রেটিং</div>
        </div>
        <div class="meta-actions">
          <button class="action-btn copy" onclick="copyLetter()">📋 পুরো চিঠি কপি করুন</button>
          <button class="action-btn print" onclick="window.print()">🖨️ প্রিন্ট করুন</button>
          <button class="action-btn download" onclick="showPDFPreview()">📄 PDF ডাউনলোড</button>
        </div>
      </div>
      <div class="letter-wrapper">
        <div class="letter-toolbar">
          <div class="toolbar-label"><div class="toolbar-dot"></div>ফরম্যাট — লাল অংশে ক্লিক করে আপনার তথ্য লিখুন</div>
          <button class="toolbar-copy-btn" onclick="copyLetter()">কপি করুন</button>
        </div>
        <div class="letter-document editable" id="letterDocument" contenteditable="true">
          <div class="letter-date">তারিখ: <span class="placeholder" contenteditable="true">১ জানুয়ারি ২০২৬</span></div>
          <div class="letter-to">
            <span class="to-label">বরাবর</span>
            <div class="to-name"><span class="placeholder" contenteditable="true">${data.recipient}</span></div>
            <div class="to-address"><span class="placeholder" contenteditable="true">${data.institution}</span><br><span class="placeholder" contenteditable="true">${data.city}</span></div>
          </div>
          <div class="letter-subject">
            <div class="sub-label">বিষয়</div>
            <div class="sub-text"><span class="placeholder" contenteditable="true">${data.subject}</span></div>
          </div>
          <div class="letter-salutation">${data.salutation}</div>
          <div class="letter-body">${bodyHtml}</div>
          <div class="letter-closing">${data.closing},</div>
          <div class="letter-sign-section">
            <div class="sign-line"></div>
            <div class="sign-name"><span class="placeholder" contenteditable="true">${data.signName}</span></div>
            <div class="sign-info"><span class="placeholder" contenteditable="true">${data.signInfo}</span></div>
          </div>
        </div>
      </div>
      <div class="tips-box">
        <div class="tips-header"><span class="tips-icon">💡</span><h3>টিপস</h3></div>
        ${tipsHtml}
      </div>
      <div class="faq-box">
        <h3 style="font-size:0.95rem;font-weight:700;color:var(--gray-900);margin-bottom:14px;">❓ সচরাচর জিজ্ঞাসা</h3>
        ${faqsHtml}
      </div>
    </div>
    <div class="sidebar">
      <div class="sidebar-card">
        <h3>⚡ দ্রুত কাজ</h3>
        <div class="quick-actions">
          <button class="quick-action-btn primary" onclick="copyLetter()"><span class="qa-icon">📋</span> পুরো চিঠি কপি</button>
          <button class="quick-action-btn" onclick="window.print()"><span class="qa-icon">🖨️</span> প্রিন্ট করুন</button>
          <button class="quick-action-btn" onclick="showPDFPreview()"><span class="qa-icon">📄</span> PDF ডাউনলোড</button>
        </div>
      </div>
      <div class="sidebar-card">
        <h3>📂 সম্পর্কিত ফরম্যাট</h3>
        <div class="related-list">
          <a href="application-leave-due-to-fever.html" class="related-item">
            <div class="related-icon">📝</div>
            <div class="related-text"><div class="r-name">জ্বরের ছুটি</div><div class="r-views">১২,৪৫৬ বার দেখা</div></div>
          </a>
          <a href="application-bonafide-certificate.html" class="related-item">
            <div class="related-icon">📜</div>
            <div class="related-text"><div class="r-name">বোনাফাইড সার্টিফিকেট</div><div class="r-views">১০,২৩৪ বার দেখা</div></div>
          </a>
          <a href="application-sick-leave.html" class="related-item">
            <div class="related-icon">🏥</div>
            <div class="related-text"><div class="r-name">অসুস্থতার ছুটি</div><div class="r-views">৯,৮৭৬ বার দেখা</div></div>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="toast" id="toast">✅ চিঠি কপি হয়েছে!</div>
<div id="pdfModal" class="pdf-modal">
  <div class="pdf-modal-content">
    <div class="pdf-modal-header">
      <h3>📄 PDF প্রিভিউ</h3>
      <button class="pdf-close" onclick="closePDFModal()">×</button>
    </div>
    <div class="pdf-preview" id="pdfPreview"></div>
    <div class="pdf-actions">
      <button class="pdf-download-btn" onclick="generatePDF()">📥 PDF ডাউনলোড করুন</button>
    </div>
  </div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
<script>
function showPDFPreview(){const letter=document.getElementById('letterDocument');if(!letter){alert('Letter not found');return;}const clone=letter.cloneNode(true);clone.querySelectorAll('[contenteditable]').forEach(el=>el.removeAttribute('contenteditable'));clone.querySelectorAll('.placeholder').forEach(el=>{el.style.background='transparent';el.style.borderBottom='1px solid #ccc';el.style.color='#000';});const preview=document.getElementById('pdfPreview');if(preview){preview.innerHTML='';preview.appendChild(clone);}const modal=document.getElementById('pdfModal');if(modal)modal.classList.add('active');}
function closePDFModal(){const modal=document.getElementById('pdfModal');if(modal)modal.classList.remove('active');}
function generatePDF(){const preview=document.getElementById('pdfPreview');if(!preview||!preview.innerHTML.trim()){alert('Preview is empty. Please fill the letter first.');return;}const opt={margin:[0.5,0.5,0.5,0.5],filename:'letterformat.pdf',image:{type:'jpeg',quality:0.98},html2canvas:{scale:2,useCORS:true,letterRendering:true},jsPDF:{unit:'in',format:'a4',orientation:'portrait'}};html2pdf().set(opt).from(preview).save().then(()=>{closePDFModal();});}
function validateForm(){const placeholders=document.querySelectorAll('.placeholder');let filled=0;placeholders.forEach((ph)=>{const text=ph.textContent.trim();if(text&&!text.startsWith('[')&&!text.endsWith(']')){filled++;ph.classList.remove('validation-error');ph.classList.add('validation-success');}else{ph.classList.remove('validation-success');}});const total=placeholders.length;const percent=Math.round((filled/total)*100);const bar=document.getElementById('validationBar');if(bar){document.getElementById('validationProgressBar').style.width=percent+'%';const statusText=bar.querySelector('.validation-text');const statusIcon=bar.querySelector('.validation-icon');if(filled===total){bar.classList.add('complete');statusIcon.textContent='✅';statusText.textContent='সব তথ্য পূরণ হয়েছে!';}else{bar.classList.remove('complete');statusIcon.textContent='⚠️';statusText.textContent=filled+'/'+total+' ঘর পূরণ হয়েছে';}}return filled===total;}
document.querySelectorAll('.placeholder').forEach(ph=>{ph.addEventListener('blur',function(){const text=this.textContent.trim();if(text&&text.length>0){this.textContent=text.charAt(0).toUpperCase()+text.slice(1);}});ph.addEventListener('input',function(){validateForm();});});
function copyLetter(){if(!validateForm()){alert('অনুগ্রহ করে সব লাল ঘর পূরণ করুন!');return;}const doc=document.getElementById('letterDocument');const clone=doc.cloneNode(true);clone.querySelectorAll('[contenteditable]').forEach(el=>el.removeAttribute('contenteditable'));const text=clone.innerText;navigator.clipboard.writeText(text).then(()=>showToast()).catch(()=>{const range=document.createRange();range.selectNodeContents(doc);const sel=window.getSelection();sel.removeAllRanges();sel.addRange(range);document.execCommand('copy');sel.removeAllRanges();showToast();});}
function showToast(){const t=document.getElementById('toast');t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3000);}
validateForm();
</script>
</body>
</html>`;
}

// Generate all pages
Object.entries(bengaliContent).forEach(([slug, data]) => {
  const html = generatePage(slug, data);
  const filePath = path.join(formatsDir, slug);
  fs.writeFileSync(filePath, html);
  console.log(`✓ ${slug}`);
});

console.log(`\n✅ Generated ${Object.keys(bengaliContent).length} pages with proper Bengali content`);
