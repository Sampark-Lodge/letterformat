const fs = require('fs');
const path = require('path');

// Application letters with proper Bengali content
const applicationLetters = {
  'application-maternity-leave.html': {
    title: 'মাতৃত্বকালীন ছুটির আবেদন',
    body: `<p>সবিনয় নিবেদন এই যে, আমি <span class="placeholder" contenteditable="true">[আপনার নাম]</span>, <span class="placeholder" contenteditable="true">[বিভাগ/শাখা]</span>-এর <span class="placeholder" contenteditable="true">[পদবী]</span>। আমি গত <span class="placeholder" contenteditable="true">[তারিখ]</span> তে জানতে পারি যে আমি গর্ভবতী।</p>
    <p>আমার চিকিৎসক ড. <span class="placeholder" contenteditable="true">[ডাক্তারের নাম]</span> আমাকে <span class="placeholder" contenteditable="true">[সংখ্যা]</span> সপ্তাহের মাতৃত্বকালীন ছুটির পরামর্শ দিয়েছেন।</p>
    <p>আমি সুস্থ অবস্থায় ফিরে আসার জন্য সচেষ্ট থাকব এবং ছুটি শেষে দায়িত্বভার গ্রহণ করব।</p>
    <p>অতএব, বিনীত অনুরোধ জানাচ্ছি যে, আমাকে <span class="placeholder" contenteditable="true">[তারিখ]</span> থেকে <span class="placeholder" contenteditable="true">[তারিখ]</span> পর্যন্ত মাতৃত্বকালীন ছুটি মঞ্জুর করে বাধিত করবেন।</p>`,
    tips: ['চিকিৎসকের প্রত্যয়ন পত্র অবশ্যই সংযুক্ত করুন', 'গর্ভাবস্থার নিশ্চয়তাপত্র সংযুক্ত করুন', 'ছুটির সময়কাল স্পষ্টভাবে উল্লেখ করুন'],
    faq: ['মাতৃত্বকালীন ছুটি কতদিন পাওয়া যায়? - ২৬ সপ্তাহ পর্যন্ত মজুরি সহ', 'কী কী কাগজপত্র লাগে? - চিকিৎসকের প্রত্যয়ন, গর্ভাবস্থার প্রমাণপত্র']
  },
  'application-paternity-leave.html': {
    title: 'পিতৃত্বকালীন ছুটির আবেদন',
    body: `<p>সবিনয় নিবেদন এই যে, আমি <span class="placeholder" contenteditable="true">[আপনার নাম]</span>, <span class="placeholder" contenteditable="true">[বিভাগ]</span>-এর <span class="placeholder" contenteditable="true">[পদবী]</span>। আমার স্ত্রী <span class="placeholder" contenteditable="true">[স্ত্রীর নাম]</span> অত্যন্ত শীঘ্রই সন্তান প্রসব করতে যাচ্ছেন।</p>
    <p>পরিবারে নবজাতকের যত্ন নেওয়ার জন্য এবং স্ত্রীর পাশে থাকার জন্য আমাকে <span class="placeholder" contenteditable="true">[সংখ্যা]</span> দিনের পিতৃত্বকালীন ছুটির প্রয়োজন।</p>
    <p>আমি ছুটি শেষে নিয়মিত কাজে যোগদান করব এবং সমস্ত দায়িত্ব সুন্দরভাবে সম্পন্ন করব।</p>
    <p>অতএব, বিনীত অনুরোধ জানাচ্ছি যে, আমাকে <span class="placeholder" contenteditable="true">[তারিখ]</span> থেকে <span class="placeholder" contenteditable="true">[তারিখ]</span> পর্যন্ত পিতৃত্বকালীন ছুটি মঞ্জুর করে বাধিত করবেন।</p>`,
    tips: ['সন্তান জন্মের প্রত্যশপত্র প্রস্তুত রাখুন', 'কাজের দায়িত্ব অন্য কর্মীর কাছে হস্তান্তর করুন', 'স্ত্রীর চিকিৎসা রেকর্ড সংযুক্ত করুন'],
    faq: ['পিতৃত্বকালীন ছুটি কতদিন? - সাধারণত ১৫ দিন থেকে ১ মাস', 'কখন আবেদন করতে হবে? - প্রসবের কমপক্ষে ১ মাস আগে']
  },
  'application-wedding-leave.html': {
    title: 'বিয়ের ছুটির আবেদন',
    body: `<p>সবিনয় নিবেদন এই যে, আমি <span class="placeholder" contenteditable="true">[আপনার নাম]</span>, <span class="placeholder" contenteditable="true">[বিভাগ]</span>-এর <span class="placeholder" contenteditable="true">[পদবী]</span>। আমার বিয়ের দিন নির্ধারিত হয়েছে <span class="placeholder" contenteditable="true">[তারিখ]</span>।</p>
    <p>বিয়ের প্রস্তুতি ও অনুষ্ঠানে সম্পূর্ণরূপে সম্পৃক্ত হতে এবং পরিবারের সকল দায়িত্ব পালন করতে আমাকে <span class="placeholder" contenteditable="true">[সংখ্যা]</span> দিনের ছুটি প্রয়োজন।</p>
    <p>ছুটি শেষে আমি <span class="placeholder" contenteditable="true">[তারিখ]</span> তারিখে কাজে যোগদান করব।</p>
    <p>অতএব, বিনীত অনুরোধ জানাচ্ছি যে, আমাকে <span class="placeholder" contenteditable="true">[তারিখ]</span> থেকে <span class="placeholder" contenteditable="true">[তারিখ]</span> পর্যন্ত বিয়ের ছুটি মঞ্জুর করে বাধিত করবেন।</p>`,
    tips: ['বিয়ের নিমন্ত্রণ কার্ড বা আমন্ত্রণপত্র সংযুক্ত করুন', 'কাজের দায়িত্ব অন্য কর্মীর কাছে হস্তান্তর করুন', 'ফিরে আসার তারিখ নিশ্চিত করুন'],
    faq: ['বিয়ের ছুটি কতদিন মিলতে পারে? - ৭ থেকে ১৫ দিন', 'অবাধ্য ছুটি হিসেবে নেওয়া যায় কি? - হ্যাঁ, নীতি অনুযায়ী']
  },
  'application-bereavement-leave.html': {
    title: 'শোকের ছুটির আবেদন',
    body: `<p>সবিনয় নিবেদন এই যে, আমি <span class="placeholder" contenteditable="true">[আপনার নাম]</span>, <span class="placeholder" contenteditable="true">[বিভাগ]</span>-এর <span class="placeholder" contenteditable="true">[পদবী]</span>। আমার পরিবারের একজন অত্যন্ত প্রিয় সদস্য <span class="placeholder" contenteditable="true">[সম্পর্ক যেমন: মাতা/পিতা/স্ত্রী/স্বামী]</span>, <span class="placeholder" contenteditable="true">[নাম]</span> <span class="placeholder" contenteditable="true">[তারিখ]</span> তারিখে পরলোক গমন করেছেন।</p>
    <p>পরিবারের শোক অনুষ্ঠান, প্রয়োজনীয় আনুষ্ঠানিকতা ও কাজকর্ম সম্পাদনের জন্য আমাকে <span class="placeholder" contenteditable="true">[সংখ্যা]</span> দিনের ছুটি প্রয়োজন।</p>
    <p>অতএব, বিনীত অনুরোধ জানাচ্ছি যে, আমাকে <span class="placeholder" contenteditable="true">[তারিখ]</span> থেকে <span class="placeholder" contenteditable="true">[তারিখ]</span> পর্যন্ত শোকের ছুটি মঞ্জুর করে বাধিত করবেন।</p>`,
    tips: ['মৃত্যু সনদের কপি অবশ্যই সংযুক্ত করুন', 'পারিবারিক সম্পর্কের প্রমাণপত্র রাখুন', 'কাজের দায়িত্ব অন্য কর্মীর কাছে হস্তান্তর করুন'],
    faq: ['শোকের ছুটি কতদিন পাওয়া যায়? - পরিস্থিতি অনুযায়ী ৩ থেকে ৭ দিন', 'কাদের জন্য ছুটি পাওয়া যায়? - মা-বাবা, স্বামী-স্ত্রী, সন্তান, ভাই-বোন']
  },
  'application-half-day-leave.html': {
    title: 'অর্ধদিনের ছুটির আবেদন',
    body: `<p>সবিনয় নিবেদন এই যে, আমি <span class="placeholder" contenteditable="true">[আপনার নাম]</span>, <span class="placeholder" contenteditable="true">[বিভাগ]</span>-এর <span class="placeholder" contenteditable="true">[পদবী]</span>। <span class="placeholder" contenteditable="true">[কারণ যেমন: ডাক্তারের চেম্বারে যাওয়া, পারিবারিক জরুরি কাজ]</span> এর জন্য আমাকে <span class="placeholder" contenteditable="true">[তারিখ]</span> তারিখে <span class="placeholder" contenteditable="true">[সকাল/বিকাল]</span> অর্ধদিনের ছুটি প্রয়োজন।</p>
    <p>ছুটির সময় আমার দায়িত্ব <span class="placeholder" contenteditable="true">[সহকর্মীর নাম]</span> গ্রহণ করবেন এবং কোনো জরুরি কাজ থাকলে তিনি সামলাবেন।</p>
    <p>অতএব, বিনীত অনুরোধ জানাচ্ছি যে, আমাকে উক্ত দিন <span class="placeholder" contenteditable="true">[সকাল ১০টা থেকে দুপুর ২টা/বিকাল ৩টা থেকে সন্ধ্যা ৬টা]</span> অর্ধদিনের ছুটি মঞ্জুর করে বাধিত করবেন।</p>`,
    tips: ['ছুটির কারণ স্পষ্টভাবে উল্লেখ করুন', 'কখন ছুটি নেবেন তা নির্দিষ্ট করুন', 'কাজের বিকল্প ব্যবস্থা অবশ্যই করুন'],
    faq: ['অর্ধদিনের ছুটি বেতন কর্তন করে কি? - নীতি অনুযায়ী হ্রাস হতে পারে', 'মাসে কতবার অর্ধদিনের ছুটি নেওয়া যায়? - সাধারণত মাসে সর্বোচ্চ ২ দিন']
  }
};

// Update each application letter
Object.keys(applicationLetters).forEach(file => {
  const filePath = path.join('./formats', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    const data = applicationLetters[file];
    
    // Update title
    content = content.replace(/<title>.*? — LetterFormat.in<\/title>/, `<title>${data.title} — LetterFormat.in</title>`);
    
    // Update letter body
    content = content.replace(/<div class="letter-body">[\s\S]*?<\/div>\s*<div class="letter-closing">/, `<div class="letter-body">${data.body}</div>\n          <div class="letter-closing">`);
    
    // Update tips
    content = content.replace(/<div class="tips-box">[\s\S]*?<div class="tips-header">[\s\S]*?<\/div>[\s\S]*?<\/div>/, 
      `<div class="tips-box">
        <div class="tips-header"><span class="tips-icon">💡</span><h3>টিপস</h3></div>
        ${data.tips.map((tip, i) => `<div class="tip-item"><div class="tip-num">${i+1}</div><div class="tip-text">${tip}</div></div>`).join('\n          ')}
      </div>`);
    
    // Update FAQ
    content = content.replace(/<div class="faq-box">[\s\S]*?<\/div>\s*<\/div>/, 
      `<div class="faq-box">
        <h3 style="font-size:0.95rem;font-weight:700;color:var(--gray-900);margin-bottom:14px;">❓ সচরাচর জিজ্ঞাসা</h3>
        ${data.faq.map(item => {
          const [q, a] = item.split(' - ');
          return `<div class="faq-item"><h3>❓ ${q}</h3><p>${a}</p></div>`;
        }).join('\n          ')}
      </div>
    </div>`);
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated: ${file}`);
  }
});

console.log('\n✅ Application letters updated with Bengali content');