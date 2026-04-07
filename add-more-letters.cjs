const fs = require('fs');
const path = require('path');

const formatsDir = './formats';

// New letters to add
const newLetters = [
  {
    slug: 'application-for-promotion',
    title: 'পদোন্নতির আবেদন',
    titleEn: 'Application for Promotion',
    category: 'চাকরি',
    categoryIcon: '💼',
    description: 'পদোন্নতির জন্য আবেদন পত্র লেখার ফরম্যাট',
    recipient: 'এইচআর ম্যানেজার',
    subject: 'পদোন্নতির আবেদন',
    body: [
      'সবিনয় নিবেদন এই যে, আমি [আপনার নাম], [বিভাগ] বিভাগে [পদবী] হিসেবে [তারিখ] থেকে কাজ করছি। গত [সংখ্যা] বছরে আমি এই পদে দক্ষতার সাথে দায়িত্ব পালন করেছি।',
      'আমি আমার কর্মদক্ষতা, প্রকল্প সাফল্য এবং দল নেতৃত্বের মাধ্যমে কোম্পানির উন্নয়নে উল্লেখযোগ্য অবদান রেখেছি। আমার পারফরম্যান্স রেটিং সর্বদা [রেটিং] হয়েছে।',
      'আমি বিনীতভাবে অনুরোধ করছি যে, আমার অভিজ্ঞতা এবং কর্মদক্ষতা বিবেচনা করে আমাকে [নতুন পদবী] পদে পদোন্নতি দেওয়ার জন্য বিবেচনা করুন। আমি এই নতুন ভূমিকায় আরও দায়িত্বশীলভাবে কাজ করতে প্রস্তুত।'
    ],
    tips: [
      'পদোন্নতির আবেদনের সময় আপনার সাফল্যের তালিকা তৈরি করুন',
      'কোম্পানির লক্ষ্যে আপনার অবদান স্পষ্টভাবে উল্লেখ করুন',
      'নতুন ভূমিকায় আপনি কীভাবে অবদান রাখবেন তা ব্যাখ্যা করুন'
    ],
    mistakes: [
      'শুধু পদোন্নতি চাওয়া, যোগ্যতা না দেখানো',
      'সহকর্মীদের সাথে তুলনা করা',
      'আবেগপ্রবণ আবেদন লেখা'
    ],
    faqs: [
      { q: 'পদোন্নতির আবেদন কখন করবেন?', a: 'বার্ষিক মূল্যায়ন চলাকালীন বা যখন আপনি উল্লেখযোগ্য সাফল্য অর্জন করেন।' },
      { q: 'পদোন্নতির আবেদনে কী কী অন্তর্ভুক্ত করবেন?', a: 'আপনার সাফল্য, দক্ষতা, নেতৃত্বের অভিজ্ঞতা এবং নতুন ভূমিকায় আপনার পরিকল্পনা।' }
    ]
  },
  {
    slug: 'application-for-study-leave',
    title: 'পড়াশোনার ছুটির আবেদন',
    titleEn: 'Study Leave Application',
    category: 'ছুটি',
    categoryIcon: '📝',
    description: 'উচ্চশিক্ষার জন্য ছুটির আবেদন পত্র',
    recipient: 'বিভাগীয় প্রধান',
    subject: 'পড়াশোনার ছুটির আবেদন',
    body: [
      'সবিনয় নিবেদন এই যে, আমি [আপনার নাম], [বিভাগ] বিভাগে [পদবী] হিসেবে কর্মরত। আমি [বিশ্ববিদ্যালয়/প্রতিষ্ঠান] থেকে [কোর্সের নাম] কোর্সে ভর্তি হতে চাই।',
      'এই কোর্সটি আমার পেশাগত উন্নয়নে সহায়ক হবে এবং কোম্পানির জন্যও লাভজনক হবে। কোর্সের সময়কাল [তারিখ] থেকে [তারিখ] পর্যন্ত।',
      'আমি বিনীতভাবে অনুরোধ করছি যে, আমাকে [সংখ্যা] মাসের পড়াশোনার ছুটি মঞ্জুর করুন। ছুটি শেষে আমি কোম্পানিতে ফিরে এসে আমার অর্জিত জ্ঞান কাজে লাগাব।'
    ],
    tips: [
      'কোর্সের বিস্তারিত তথ্য সংযুক্ত করুন',
      'কোর্সটি কীভাবে কোম্পানির জন্য উপকারী তা ব্যাখ্যা করুন',
      'ছুটি শেষে ফিরে আসার নিশ্চয়তা দিন'
    ],
    mistakes: [
      'কোর্সের তথ্য না দেওয়া',
      'কোম্পানির জন্য সুবিধা না বোঝানো',
      'ফিরে আসার নিশ্চয়তা না দেওয়া'
    ],
    faqs: [
      { q: 'পড়াশোনার ছুটি কতদিন পাওয়া যায়?', a: 'সাধারণত ৬ মাস থেকে ২ বছর পর্যন্ত, কোম্পানির নীতি অনুযায়ী।' },
      { q: 'পড়াশোনার ছুটিতে বেতন পাওয়া যায়?', a: 'কিছু কোম্পানি আংশিক বা সম্পূর্ণ বেতন দেয়, এটি কোম্পানির নীতির উপর নির্ভর করে।' }
    ]
  },
  {
    slug: 'application-for-house-rent-allowance',
    title: 'বাড়ি ভাতা আবেদন',
    titleEn: 'House Rent Allowance Application',
    category: 'চাকরি',
    categoryIcon: '💼',
    description: 'বাড়ি ভাতা (HRA) পাওয়ার জন্য আবেদন',
    recipient: 'এইচআর ম্যানেজার',
    subject: 'বাড়ি ভাতা (HRA) আবেদন',
    body: [
      'সবিনয় নিবেদন এই যে, আমি [আপনার নাম], [বিভাগ] বিভাগে [পদবী] হিসেবে কর্মরত। আমি বর্তমানে [ঠিকানা] ঠিকানায় ভাড়া বাসায় বসবাস করছি।',
      'আমার মাসিক ভাড়া [টাকার পরিমাণ] টাকা এবং আমি ভাড়া চুক্তি সংযুক্ত করেছি। আমি বিনীতভাবে অনুরোধ করছি যে, আমাকে বাড়ি ভাতা (HRA) প্রদানের ব্যবস্থা করুন।',
      'আমি প্রয়োজনীয় সকল কাগজপত্র (ভাড়া চুক্তি, ভাড়া রসিদ, বাড়ি মালিকের প্যান কার্ড) সংযুক্ত করেছি।'
    ],
    tips: [
      'ভাড়া চুক্তির কপি সংযুক্ত করুন',
      'মাসিক ভাড়া রসিদ সংযুক্ত করুন',
      'বাড়ি মালিকের প্যান কার্ড কপি সংযুক্ত করুন'
    ],
    mistakes: [
      'কাগজপত্র না সংযুক্ত করা',
      'ভুল তথ্য দেওয়া',
      'সময়মতো আবেদন না করা'
    ],
    faqs: [
      { q: 'HRA আবেদনে কী কী কাগজপত্র লাগে?', a: 'ভাড়া চুক্তি, মাসিক ভাড়া রসিদ, বাড়ি মালিকের প্যান কার্ড (যদি বার্ষিক ভাড়া ১ লাখ টাকার বেশি হয়)।' },
      { q: 'HRA কতটা করমুক্ত?', a: 'আপনার মূল বেতনের ৫০% (মেট্রো শহরে) বা ৪০% (অন্যান্য শহরে), অথবা প্রকৃত ভাড়ার ১০% বেশি, যেটি কম।' }
    ]
  },
  {
    slug: 'application-for-work-from-home',
    title: 'বাড়ি থেকে কাজের আবেদন',
    titleEn: 'Work From Home Application',
    category: 'চাকরি',
    categoryIcon: '💼',
    description: 'বাড়ি থেকে কাজ করার অনুমতির আবেদন',
    recipient: 'বিভাগীয় প্রধান',
    subject: 'বাড়ি থেকে কাজ করার অনুমতির আবেদন',
    body: [
      'সবিনয় নিবেদন এই যে, আমি [আপনার নাম], [বিভাগ] বিভাগে [পদবী] হিসেবে কর্মরত। আমি [তারিখ] থেকে [তারিখ] পর্যন্ত বাড়ি থেকে কাজ করার অনুমতি চাইছি।',
      'আমার [কারণ: স্বাস্থ্য সমস্যা/পারিবারিক প্রয়োজন/যাতায়াত সমস্যা] এর কারণে আমি অফিসে উপস্থিত হতে অসমর্থ। তবে আমি সম্পূর্ণভাবে কাজ চালিয়ে যেতে সক্ষম।',
      'আমি নিশ্চিত করছি যে, বাড়ি থেকে কাজ করলেও আমি আমার সকল দায়িত্ব সময়মতো পালন করব এবং প্রয়োজনীয় মিটিংয়ে অনলাইনে উপস্থিত থাকব।'
    ],
    tips: [
      'স্পষ্ট সময়কাল উল্লেখ করুন',
      'কাজ চালিয়ে যাওয়ার পরিকল্পনা দিন',
      'যোগাযোগের মাধ্যম উল্লেখ করুন'
    ],
    mistakes: [
      'অস্পষ্ট সময়কাল দেওয়া',
      'কাজের পরিকল্পনা না দেওয়া',
      'যোগাযোগের ব্যবস্থা না বলা'
    ],
    faqs: [
      { q: 'কতদিনের জন্য WFH আবেদন করা যায়?', a: 'সাধারণত ১ সপ্তাহ থেকে ৩ মাস পর্যন্ত, কোম্পানির নীতি অনুযায়ী।' },
      { q: 'WFH আবেদনে কী কী অন্তর্ভুক্ত করবেন?', a: 'সময়কাল, কারণ, কাজের পরিকল্পনা, যোগাযোগের মাধ্যম।' }
    ]
  },
  {
    slug: 'application-for-no-objection-certificate',
    title: 'এনওসি আবেদন',
    titleEn: 'No Objection Certificate Application',
    category: 'চাকরি',
    categoryIcon: '💼',
    description: 'কাজের আপত্তিহীন সনদপত্র (NOC) আবেদন',
    recipient: 'এইচআর ম্যানেজার',
    subject: 'এনওসি (NOC) আবেদন',
    body: [
      'সবিনয় নিবেদন এই যে, আমি [আপনার নাম], [বিভাগ] বিভাগে [পদবী] হিসেবে [তারিখ] থেকে কর্মরত। আমি [কাজের ধরন: পাসপোর্ট/ভিসা/উচ্চশিক্ষা/ব্যাংক লোন] এর জন্য নো অবজেকশন সার্টিফিকেট (NOC) প্রয়োজন।',
      'আমি বিনীতভাবে অনুরোধ করছি যে, আমাকে একটি NOC প্রদান করুন যেখানে উল্লেখ থাকবে যে, কোম্পানির আমার চাকরি নিয়ে কোনো আপত্তি নেই।',
      'আমি প্রয়োজনীয় সকল তথ্য সংযুক্ত করেছি এবং প্রয়োজনে অতিরিক্ত কাগজপত্র প্রদান করতে প্রস্তুত।'
    ],
    tips: [
      'NOC এর উদ্দেশ্য স্পষ্টভাবে উল্লেখ করুন',
      'প্রয়োজনীয় তথ্য সংযুক্ত করুন',
      'সময়মতো আবেদন করুন'
    ],
    mistakes: [
      'উদ্দেশ্য না বলা',
      'তথ্য না সংযুক্ত করা',
      'শেষ মুহূর্তে আবেদন করা'
    ],
    faqs: [
      { q: 'NOC পেতে কতদিন লাগে?', a: 'সাধারণত ৩-৭ কর্মদিবস।' },
      { q: 'NOC এ কী কী তথ্য থাকে?', a: 'কর্মচারীর নাম, পদবী, যোগদানের তারিখ, বেতন, এবং কোম্পানির কোনো আপত্তি নেই মর্মে ঘোষণা।' }
    ]
  },
  {
    slug: 'application-for-pf-withdrawal',
    title: 'পিএফ উত্তোলন আবেদন',
    titleEn: 'PF Withdrawal Application',
    category: 'চাকরি',
    categoryIcon: '💼',
    description: 'ভবিষ্য তহবিল (PF) উত্তোলনের আবেদন',
    recipient: 'এইচআর ম্যানেজার',
    subject: 'পিএফ (PF) উত্তোলন আবেদন',
    body: [
      'সবিনয় নিবেদন এই যে, আমি [আপনার নাম], [বিভাগ] বিভাগে [পদবী] হিসেবে কর্মরত। আমার PF অ্যাকাউন্ট নম্বর [PF নম্বর]।',
      'আমি [কারণ: চিকিৎসা/বিবাহ/বাড়ি নির্মাণ/শিক্ষা] এর জন্য আমার PF তহবিল থেকে [টাকার পরিমাণ] টাকা উত্তোলন করতে চাই।',
      'আমি প্রয়োজনীয় সকল কাগজপত্র (PF ফর্ম, পরিচয় পত্র, ব্যাংক অ্যাকাউন্ট বিবরণী) সংযুক্ত করেছি। বিনীত অনুরোধ, আমার আবেদন দ্রুত প্রক্রিয়া করার জন্য।'
    ],
    tips: [
      'সঠিক PF অ্যাকাউন্ট নম্বর উল্লেখ করুন',
      'উত্তোলনের কারণ স্পষ্টভাবে লিখুন',
      'সকল প্রয়োজনীয় ফর্ম সংযুক্ত করুন'
    ],
    mistakes: [
      'ভুল PF নম্বর দেওয়া',
      'কারণ না উল্লেখ করা',
      'অসম্পূর্ণ ফর্ম জমা দেওয়া'
    ],
    faqs: [
      { q: 'PF উত্তোলনে কতদিন লাগে?', a: 'সাধারণত ১০-২০ কর্মদিবস।' },
      { q: 'কতটা PF উত্তোলন করা যায়?', a: 'কারণ অনুযায়ী ৫০% থেকে ১০০% পর্যন্ত।' }
    ]
  },
  {
    slug: 'application-for-transfer',
    title: 'বদলির আবেদন',
    titleEn: 'Transfer Application',
    category: 'চাকরি',
    categoryIcon: '💼',
    description: 'অফিস বদলির আবেদন পত্র',
    recipient: 'বিভাগীয় প্রধান',
    subject: 'অফিস বদলির আবেদন',
    body: [
      'সবিনয় নিবেদন এই যে, আমি [আপনার নাম], [বর্তমান শাখা/অফিস] এ [পদবী] হিসেবে [তারিখ] থেকে কর্মরত।',
      'আমার [কারণ: স্বামী/স্ত্রীর চাকরি/পারিবারিক সমস্যা/স্বাস্থ্য সমস্যা] এর কারণে আমাকে [নতুন শাখা/শহর] এ বদলি করার প্রয়োজন হয়েছে।',
      'আমি বিনীতভাবে অনুরোধ করছি যে, আমার পরিস্থিতি বিবেচনা করে আমাকে [নতুন শাখা/শহর] এ বদলি করার ব্যবস্থা করুন। আমি নতুন শাখায়ও একই দক্ষতার সাথে কাজ চালিয়ে যাব।'
    ],
    tips: [
      'বদলির কারণ স্পষ্টভাবে উল্লেখ করুন',
      'নতুন শাখায় কাজ চালিয়ে যাওয়ার নিশ্চয়তা দিন',
      'প্রয়োজনীয় কাগজপত্র সংযুক্ত করুন'
    ],
    mistakes: [
      'অস্পষ্ট কারণ দেওয়া',
      'নতুন শাখার নাম না বলা',
      'কাগজপত্র না সংযুক্ত করা'
    ],
    faqs: [
      { q: 'বদলি আবেদনে কতদিন লাগে?', a: 'সাধারণত ২-৪ সপ্তাহ।' },
      { q: 'বদলি আবেদন প্রত্যাখ্যান হলে কী করবেন?', a: 'পুনরায় আবেদন করুন বা উচ্চতর কর্তৃপক্ষের কাছে আবেদন করুন।' }
    ]
  },
  {
    slug: 'application-for-leave-extension',
    title: 'ছুটি বৃদ্ধির আবেদন',
    titleEn: 'Leave Extension Application',
    category: 'ছুটি',
    categoryIcon: '📝',
    description: 'অনুমোদিত ছুটি বাড়ানোর আবেদন',
    recipient: 'প্রধান শিক্ষক/অধ্যক্ষ/ম্যানেজার',
    subject: 'ছুটি বৃদ্ধির আবেদন',
    body: [
      'সবিনয় নিবেদন এই যে, আমি [আপনার নাম], [শ্রেণি/বিভাগ] এর ছাত্র/কর্মচারী। আমাকে [তারিখ] থেকে [তারিখ] পর্যন্ত ছুটি মঞ্জুর করা হয়েছিল।',
      'দুর্ভাগ্যবশত, [কারণ: অসুস্থতা এখনও সারেনি/পারিবারিক জরুরি অবস্থা] এর কারণে আমি নির্ধারিত সময়ে ফিরতে পারছি না।',
      'আমি বিনীতভাবে অনুরোধ করছি যে, আমাকে আরও [সংখ্যা] দিনের ছুটি মঞ্জুর করুন। আমি [নতুন ফেরত তারিখ] তারিখে ফিরে আসব।'
    ],
    tips: [
      'আসল ছুটির তারিখ উল্লেখ করুন',
      'বৃদ্ধির কারণ স্পষ্টভাবে লিখুন',
      'নতুন ফেরত তারিখ দিন'
    ],
    mistakes: [
      'আসল ছুটির তথ্য না দেওয়া',
      'অস্পষ্ট কারণ',
      'ফেরত তারিখ না দেওয়া'
    ],
    faqs: [
      { q: 'ছুটি বৃদ্ধি আবেদন কখন করবেন?', a: 'আসল ছুটি শেষ হওয়ার আগেই আবেদন করুন।' },
      { q: 'ছুটি বৃদ্ধি আবেদনে কী কী অন্তর্ভুক্ত করবেন?', a: 'আসল ছুটির তারিখ, বৃদ্ধির কারণ, নতুন ফেরত তারিখ, প্রয়োজনীয় কাগজপত্র।' }
    ]
  },
  {
    slug: 'application-for-exam-duty-leave',
    title: 'পরীক্ষার দায়িত্বের ছুটি',
    titleEn: 'Exam Duty Leave Application',
    category: 'ছুটি',
    categoryIcon: '📝',
    description: 'পরীক্ষার দায়িত্ব পালনের জন্য ছুটির আবেদন',
    recipient: 'বিভাগীয় প্রধান',
    subject: 'পরীক্ষার দায়িত্ব পালনের ছুটি',
    body: [
      'সবিনয় নিবেদন এই যে, আমি [আপনার নাম], [বিভাগ] বিভাগে [পদবী] হিসেবে কর্মরত। আমাকে [বোর্ড/বিশ্ববিদ্যালয়] এর [পরীক্ষার নাম] পরীক্ষায় [তারিখ] থেকে [তারিখ] পর্যন্ত পরীক্ষক/তত্ত্বাবধায়ক হিসেবে দায়িত্ব পালন করতে হবে।',
      'এই দায়িত্ব পালনের জন্য আমাকে [সংখ্যা] দিনের ছুটি প্রয়োজন। আমি পরীক্ষার সময়সূচী এবং দায়িত্বপত্র সংযুক্ত করেছি।',
      'আমি বিনীতভাবে অনুরোধ করছি যে, আমাকে উক্ত সময়ের জন্য ছুটি মঞ্জুর করুন।'
    ],
    tips: [
      'পরীক্ষার দায়িত্বপত্র সংযুক্ত করুন',
      'সময়সূচী উল্লেখ করুন',
      'দায়িত্ব শেষে ফিরে আসার নিশ্চয়তা দিন'
    ],
    mistakes: [
      'দায়িত্বপত্র না সংযুক্ত করা',
      'সময়সূচী না দেওয়া',
      'ফিরে আসার তারিখ না বলা'
    ],
    faqs: [
      { q: 'পরীক্ষার দায়িত্বের ছুটি কি বেতনসহ?', a: 'হ্যাঁ, সাধারণত বেতনসহ ছুটি দেওয়া হয়।' },
      { q: 'কতদিনের ছুটি পাওয়া যায়?', a: 'পরীক্ষার সময়সূচী অনুযায়ী, সাধারণত ৫-১৫ দিন।' }
    ]
  },
  {
    slug: 'application-for-community-certificate',
    title: 'কমিউনিটি সার্টিফিকেট আবেদন',
    titleEn: 'Community Certificate Application',
    category: 'সার্টিফিকেট',
    categoryIcon: '📜',
    description: 'কমিউনিটি সার্টিফিকেট পাওয়ার আবেদন',
    recipient: 'তহশিলদার/ম্যাজিস্ট্রেট',
    subject: 'কমিউনিটি সার্টিফিকেট আবেদন',
    body: [
      'সবিনয় নিবেদন এই যে, আমি [আপনার নাম], পিতা/স্বামী [নাম], ঠিকানা [ঠিকানা] এর বাসিন্দা। আমি [কমিউনিটি] সম্প্রদায়ের অন্তর্ভুক্ত।',
      'আমি [কাজের ধরন: চাকরি/শিক্ষা/স্কলারশিপ] এর জন্য কমিউনিটি সার্টিফিকেট প্রয়োজন।',
      'আমি বিনীতভাবে অনুরোধ করছি যে, আমাকে একটি কমিউনিটি সার্টিফিকেট প্রদান করুন। প্রয়োজনীয় সকল কাগজপত্র (আধার কার্ড, ভোটার আইডি, পিতার কমিউনিটি সার্টিফিকেট) সংযুক্ত করেছি।'
    ],
    tips: [
      'সকল পরিচয় পত্র সংযুক্ত করুন',
      'পিতার কমিউনিটি সার্টিফিকেট সংযুক্ত করুন',
      'সঠিক তথ্য দিন'
    ],
    mistakes: [
      'ভুল কমিউনিটি উল্লেখ করা',
      'কাগজপত্র না সংযুক্ত করা',
      'অসম্পূর্ণ আবেদন'
    ],
    faqs: [
      { q: 'কমিউনিটি সার্টিফিকেট পেতে কতদিন লাগে?', a: 'সাধারণত ৭-১৫ কর্মদিবস।' },
      { q: 'কী কী কাগজপত্র লাগে?', a: 'আধার কার্ড, ভোটার আইডি, পিতার কমিউনিটি সার্টিফিকেট, ঠিকানার প্রমাণ।' }
    ]
  }
];

// Template for each page
function generatePage(letter) {
  const siteUrl = 'https://sampark-lodge.github.io/letterformat';
  const pageUrl = `${siteUrl}/formats/${letter.slug}.html`;
  
  const bodyHtml = letter.body.map(p => `<p>${p}</p>`).join('\n            ');
  const tipsHtml = letter.tips.map((tip, i) => 
    `<div class="tip-item"><div class="tip-num">${i + 1}</div><div class="tip-text">${tip}</div></div>`
  ).join('\n          ');
  const mistakesHtml = letter.mistakes.map((m, i) => 
    `<div class="mistake-item"><div class="mistake-icon">✕</div><div class="mistake-text">${m}</div></div>`
  ).join('\n          ');
  const faqsHtml = letter.faqs.map(faq => 
    `<div class="faq-item"><h3>❓ ${faq.q}</h3><p>${faq.a}</p></div>`
  ).join('\n          ');

  return `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${letter.title} — LetterFormat.in</title>
  <meta name="description" content="বিনামূল্যে ${letter.title}। কপি-পেস্ট ফরম্যাট, এডিটেবল টেমপ্লেট, পূরণ করা নমুনা, টিপস সহ। আপডেট ২০২৬।">
  <link rel="canonical" href="${pageUrl}">
  <meta property="og:title" content="${letter.title} — LetterFormat.in">
  <meta property="og:description" content="বিনামূল্যে ${letter.title}। কপি-পেস্ট ফরম্যাট, এডিটেবল টেমপ্লেট।">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:type" content="article">
  <meta property="og:locale" content="bn_IN">
  <meta property="og:site_name" content="LetterFormat.in">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${letter.title} — LetterFormat.in">
  <meta name="twitter:description" content="বিনামূল্যে ${letter.title}। কপি-পেস্ট ফরম্যাট।">
  <meta name="keywords" content="${letter.title}, বাংলা আবেদন, চিঠি ফরম্যাট, LetterFormat.in, ${letter.titleEn}">
  <meta name="author" content="LetterFormat.in">
  <meta name="robots" content="index, follow">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    :root{--red:#dc2626;--red-dark:#b91c1c;--red-light:#fee2e2;--red-xlight:#fff5f5;--red-mid:#fca5a5;--white:#fff;--gray-50:#f9fafb;--gray-100:#f3f4f6;--gray-200:#e5e7eb;--gray-300:#d1d5db;--gray-400:#9ca3af;--gray-500:#6b7280;--gray-600:#4b5563;--gray-700:#374151;--gray-800:#1f2937;--gray-900:#111827;--shadow-sm:0 1px 3px rgba(0,0,0,0.08);--shadow-md:0 4px 16px rgba(0,0,0,0.08);--shadow-lg:0 10px 40px rgba(0,0,0,0.1);--shadow-red:0 8px 32px rgba(220,38,38,0.18);--radius-sm:8px;--radius-md:14px;--radius-lg:20px;--font-bn:'Noto Sans Bengali',sans-serif;--transition:0.22s cubic-bezier(0.4,0,0.2,1)}
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{font-family:var(--font-bn);background:var(--gray-50);color:var(--gray-800);line-height:1.7}
    a{text-decoration:none;color:inherit}
    .container{max-width:1180px;margin:0 auto;padding:0 20px}
    @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
    .navbar{position:sticky;top:0;z-index:100;background:rgba(255,255,255,0.95);backdrop-filter:blur(14px);border-bottom:1.5px solid var(--gray-100)}
    .nav-inner{display:flex;align-items:center;justify-content:space-between;height:62px}
    .logo{display:flex;align-items:center;gap:10px;font-weight:900;font-size:1.15rem;color:var(--gray-900)}
    .logo-icon{width:36px;height:36px;border-radius:9px;background:var(--red);display:flex;align-items:center;justify-content:center}
    .logo-icon svg{width:18px;height:18px;fill:white}
    .logo-text span{color:var(--red)}
    .breadcrumb{display:flex;align-items:center;gap:8px;font-size:0.82rem;color:var(--gray-500)}
    .breadcrumb a{color:var(--red);font-weight:500}
    .breadcrumb a:hover{text-decoration:underline}
    .breadcrumb-sep{color:var(--gray-300)}
    .nav-actions{display:flex;gap:8px}
    .btn-sm{padding:7px 14px;border-radius:var(--radius-sm);font-size:0.82rem;font-weight:600;border:none;cursor:pointer;font-family:var(--font-bn);transition:all var(--transition)}
    .btn-sm.primary{background:var(--red);color:white}
    .btn-sm.primary:hover{background:var(--red-dark)}
    .btn-sm.ghost{background:var(--gray-100);color:var(--gray-700)}
    .btn-sm.ghost:hover{background:var(--gray-200)}
    .page-layout{display:grid;grid-template-columns:1fr 340px;gap:28px;padding:32px 0 60px}
    .main-content{animation:fadeUp 0.5s ease both}
    .format-meta{background:white;border-radius:var(--radius-lg);padding:28px;border:1.5px solid var(--gray-200);margin-bottom:20px}
    .meta-tags{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}
    .tag{font-size:0.72rem;font-weight:700;padding:4px 12px;border-radius:99px}
    .tag.red{background:var(--red-light);color:var(--red)}
    .tag.green{background:#dcfce7;color:#15803d}
    .format-title{font-size:1.5rem;font-weight:900;color:var(--gray-900);margin-bottom:8px}
    .format-desc{font-size:0.9rem;color:var(--gray-500);margin-bottom:16px}
    .meta-stats{display:flex;gap:20px;flex-wrap:wrap;padding-top:16px;border-top:1px solid var(--gray-100);font-size:0.82rem;color:var(--gray-500)}
    .meta-stats strong{color:var(--gray-800)}
    .meta-actions{display:flex;gap:10px;margin-top:20px;flex-wrap:wrap}
    .action-btn{display:flex;align-items:center;gap:7px;padding:11px 20px;border-radius:var(--radius-sm);font-size:0.88rem;font-weight:600;cursor:pointer;border:none;font-family:var(--font-bn);transition:all var(--transition)}
    .action-btn.copy{background:var(--red);color:white;box-shadow:var(--shadow-red)}
    .action-btn.copy:hover{background:var(--red-dark)}
    .action-btn.print{background:var(--gray-100);color:var(--gray-700);border:1.5px solid var(--gray-200)}
    .action-btn.print:hover{background:var(--gray-200)}
    .letter-wrapper{background:white;border-radius:var(--radius-lg);border:1.5px solid var(--gray-200);overflow:hidden;margin-bottom:20px}
    .letter-toolbar{background:var(--gray-50);border-bottom:1.5px solid var(--gray-200);padding:12px 20px;display:flex;align-items:center;justify-content:space-between}
    .toolbar-label{font-size:0.8rem;font-weight:700;color:var(--gray-600);text-transform:uppercase;display:flex;align-items:center;gap:8px}
    .toolbar-dot{width:8px;height:8px;border-radius:50%;background:var(--red);animation:pulse 1.5s infinite}
    .toolbar-copy-btn{padding:5px 12px;background:var(--red);color:white;border:none;border-radius:6px;font-size:0.76rem;font-weight:700;cursor:pointer;font-family:var(--font-bn)}
    .letter-document{padding:40px 48px;font-family:var(--font-bn);font-size:0.95rem;line-height:2;color:var(--gray-900)}
    .letter-document[contenteditable]{outline:none}
    .letter-document[contenteditable]:focus{background:#fffbfb}
    .letter-date{text-align:right;margin-bottom:24px}
    .letter-to{margin-bottom:24px}
    .to-label{font-weight:700;color:var(--gray-600);font-size:0.85rem;text-transform:uppercase;display:block;margin-bottom:4px}
    .to-name{font-weight:700;font-size:1rem}
    .to-address{color:var(--gray-600);font-size:0.9rem}
    .letter-subject{margin-bottom:24px;padding:12px 18px;background:var(--red-xlight);border-left:4px solid var(--red);border-radius:0 var(--radius-sm) var(--radius-sm) 0}
    .sub-label{font-size:0.75rem;font-weight:700;color:var(--red);text-transform:uppercase}
    .sub-text{font-weight:700;font-size:1rem;color:var(--gray-900)}
    .letter-salutation{margin-bottom:16px;font-weight:600}
    .letter-body p{margin-bottom:14px;text-align:justify}
    .placeholder{background:rgba(220,38,38,0.08);border-bottom:2px dashed var(--red-mid);padding:0 4px;border-radius:3px;color:var(--red-dark);cursor:text;outline:none;transition:all 0.2s}
    .placeholder:hover{background:rgba(220,38,38,0.12)}
    .placeholder:focus{background:rgba(220,38,38,0.15);border-bottom-style:solid;box-shadow:0 0 0 3px rgba(220,38,38,0.1)}
    .letter-closing{margin-bottom:48px}
    .sign-section{display:flex;flex-direction:column}
    .sign-line{width:140px;height:2px;background:var(--gray-700);margin-bottom:6px}
    .sign-name{font-weight:700}
    .tips-box,.mistakes-box,.faq-box{background:white;border-radius:var(--radius-lg);padding:24px;border:1.5px solid var(--gray-200);margin-bottom:20px}
    .section-title{font-size:1rem;font-weight:700;color:var(--gray-900);margin-bottom:16px;display:flex;align-items:center;gap:8px}
    .tip-item,.mistake-item{display:flex;gap:12px;margin-bottom:12px;align-items:flex-start}
    .tip-num{flex-shrink:0;width:22px;height:22px;border-radius:50%;background:#10b981;color:white;font-size:0.7rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin-top:2px}
    .tip-text,.mistake-text{font-size:0.85rem;color:var(--gray-600);line-height:1.5}
    .mistake-icon{flex-shrink:0;width:22px;height:22px;border-radius:50%;background:#ef4444;color:white;font-size:0.7rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin-top:2px}
    .faq-item{margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid var(--gray-100)}
    .faq-item:last-child{margin-bottom:0;padding-bottom:0;border-bottom:none}
    .faq-item h3{font-size:0.9rem;font-weight:700;color:var(--gray-800);margin-bottom:8px}
    .faq-item p{font-size:0.85rem;color:var(--gray-600);line-height:1.6}
    .sidebar{position:sticky;top:84px;animation:fadeUp 0.5s 0.1s ease both}
    .sidebar-card{background:white;border-radius:var(--radius-lg);padding:22px;border:1.5px solid var(--gray-200);margin-bottom:18px}
    .sidebar-card h3{font-size:0.88rem;font-weight:700;color:var(--gray-900);margin-bottom:14px;text-transform:uppercase}
    .quick-actions{display:flex;flex-direction:column;gap:8px}
    .quick-action-btn{display:flex;align-items:center;gap:10px;padding:12px 16px;border-radius:var(--radius-sm);border:1.5px solid var(--gray-200);background:white;cursor:pointer;font-family:var(--font-bn);font-size:0.88rem;font-weight:600;color:var(--gray-700);transition:all var(--transition)}
    .quick-action-btn:hover{border-color:var(--red-mid);background:var(--red-xlight);color:var(--red)}
    .quick-action-btn.primary{background:var(--red);color:white;border-color:var(--red)}
    .quick-action-btn.primary:hover{background:var(--red-dark)}
    .related-list{display:flex;flex-direction:column;gap:10px}
    .related-card{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-radius:var(--radius-sm);border:1px solid var(--gray-100);transition:all var(--transition);font-size:0.83rem;font-weight:600;color:var(--gray-700)}
    .related-card:hover{border-color:var(--red-mid);background:var(--red-xlight);color:var(--red)}
    .related-card svg{flex-shrink:0;transition:transform var(--transition)}
    .related-card:hover svg{transform:translateX(4px)}
    .toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(80px);background:var(--gray-900);color:white;padding:12px 24px;border-radius:var(--radius-md);font-size:0.9rem;font-weight:600;box-shadow:var(--shadow-lg);z-index:999;transition:transform 0.35s cubic-bezier(0.34,1.56,0.64,1),opacity 0.3s ease;opacity:0}
    .toast.show{transform:translateX(-50%) translateY(0);opacity:1}
    @media(max-width:900px){.page-layout{grid-template-columns:1fr}.sidebar{position:static}.letter-document{padding:24px}}
    @media(max-width:480px){.letter-document{padding:16px;font-size:0.88rem}.meta-actions{flex-direction:column}}
    @media print{.navbar,.sidebar,.letter-toolbar,.toast,.meta-actions{display:none!important}.letter-wrapper{border:none;box-shadow:none}.body{background:white}.placeholder{background:none;border-bottom:none;color:inherit;cursor:default}}
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
        <span>${letter.category}</span>
        <span class="breadcrumb-sep">›</span>
        <span>${letter.title}</span>
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
          <span class="tag red">${letter.categoryIcon} ${letter.category}</span>
          <span class="tag green">✅ যাচাইকৃত</span>
        </div>
        <h1 class="format-title">${letter.title}</h1>
        <p class="format-desc">${letter.description}</p>
        <div class="meta-stats">
          <span>👁 <strong>১০,০০০+</strong> বার দেখা হয়েছে</span>
          <span>📥 <strong>৫,০০০+</strong> বার কপি হয়েছে</span>
          <span>⭐ <strong>৪.৮/৫</strong> রেটিং</span>
        </div>
        <div class="meta-actions">
          <button class="action-btn copy" onclick="copyLetter()">📋 পুরো চিঠি কপি করুন</button>
          <button class="action-btn print" onclick="window.print()">🖨️ প্রিন্ট করুন</button>
        </div>
      </div>
      <div class="letter-wrapper">
        <div class="letter-toolbar">
          <div class="toolbar-label"><div class="toolbar-dot"></div>ফরম্যাট — লাল অংশে ক্লিক করে আপনার তথ্য লিখুন</div>
          <button class="toolbar-copy-btn" onclick="copyLetter()">কপি করুন</button>
        </div>
        <div class="letter-document" id="letterDocument" contenteditable="true">
          <div class="letter-date">তারিখ: <span class="placeholder" contenteditable="true">১ জানুয়ারি ২০২৬</span></div>
          <div class="letter-to">
            <span class="to-label">বরাবর</span>
            <div class="to-name"><span class="placeholder" contenteditable="true">${letter.recipient}</span></div>
            <div class="to-address"><span class="placeholder" contenteditable="true">[প্রতিষ্ঠানের নাম]</span><br><span class="placeholder" contenteditable="true">[ঠিকানা, জেলা]</span></div>
          </div>
          <div class="letter-subject">
            <div class="sub-label">বিষয়</div>
            <div class="sub-text"><span class="placeholder" contenteditable="true">${letter.subject}</span></div>
          </div>
          <div class="letter-salutation">মহোদয়,</div>
          <div class="letter-body">${bodyHtml}</div>
          <div class="letter-closing">বিনীত নিবেদন,</div>
          <div class="sign-section">
            <div class="sign-line"></div>
            <div class="sign-name"><span class="placeholder" contenteditable="true">[আপনার নাম]</span></div>
            <div class="sign-info"><span class="placeholder" contenteditable="true">[পদবী/শ্রেণি]</span></div>
            <div class="sign-info"><span class="placeholder" contenteditable="true">[তারিখ]</span></div>
          </div>
        </div>
      </div>
      <div class="tips-box"><h3 class="section-title">💡 টিপস</h3>${tipsHtml}</div>
      <div class="mistakes-box"><h3 class="section-title">⚠️ এড়িয়ে চলুন</h3>${mistakesHtml}</div>
      <div class="faq-box"><h3 class="section-title">❓ সচরাচর জিজ্ঞাসা</h3>${faqsHtml}</div>
    </div>
    <div class="sidebar">
      <div class="sidebar-card"><h3>⚡ দ্রুত কাজ</h3><div class="quick-actions">
        <button class="quick-action-btn primary" onclick="copyLetter()"><span>📋</span> পুরো চিঠি কপি</button>
        <button class="quick-action-btn" onclick="window.print()"><span>🖨️</span> প্রিন্ট করুন</button>
      </div></div>
      <div class="sidebar-card"><h3>📂 সম্পর্কিত</h3><div class="related-list">
        <a href="application-leave-due-to-fever.html" class="related-card"><span>📝 জ্বরের ছুটি</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
        <a href="application-bonafide-certificate.html" class="related-card"><span>📜 বোনাফাইড সার্টিফিকেট</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
        <a href="application-employment-resignation.html" class="related-card"><span>💼 পদত্যাগ পত্র</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
      </div></div>
    </div>
  </div>
</div>
<div class="toast" id="toast">✅ চিঠি কপি হয়েছে!</div>
<script>function copyLetter(){const doc=document.getElementById('letterDocument');const clone=doc.cloneNode(true);clone.querySelectorAll('[contenteditable]').forEach(el=>{el.removeAttribute('contenteditable')});const text=clone.innerText;navigator.clipboard.writeText(text).then(()=>showToast()).catch(()=>{const range=document.createRange();range.selectNodeContents(doc);const sel=window.getSelection();sel.removeAllRanges();sel.addRange(range);document.execCommand('copy');sel.removeAllRanges();showToast()})};function showToast(){const t=document.getElementById('toast');t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3000)}</script>
</body>
</html>`;
}

// Generate all new pages
newLetters.forEach(letter => {
  const html = generatePage(letter);
  const filename = `${letter.slug}.html`;
  fs.writeFileSync(path.join(formatsDir, filename), html);
  console.log(`✓ ${filename}`);
});

console.log(`\n✅ Generated ${newLetters.length} new format pages`);
