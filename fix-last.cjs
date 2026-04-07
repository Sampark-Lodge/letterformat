const fs = require('fs');
const path = require('path');

const filePath = './formats/complaint-letter-water-leakage.html';
let content = fs.readFileSync(filePath, 'utf-8');

// Replace English body paragraphs with Bengali
content = content.replace(
  /<div class="letter-body">[\s\S]*?<\/div>/,
  `<div class="letter-body">
            <p>সবিনয় নিবেদন এই যে, আমি [আপনার নাম], [ঠিকানা] এর বাসিন্দা। আমাদের বাড়িতে/এলাকায় পানি লিকেজের সমস্যা চলছে।</p>
            <p>[লিকেজের স্থান] থেকে পানি পড়ছে যার কারণে দেয়াল ক্ষতিগ্রস্ত হচ্ছে এবং পরিবেশ অস্বাস্থ্যকর হয়ে উঠছে।</p>
            <p>অতএব, বিনীত অনুরোধ জানাচ্ছি যে, পানি লিকেজ সমস্যা সমাধানে প্রয়োজনীয় ব্যবস্থা গ্রহণ করে বাধিত করবেন।</p>
          </div>`
);

// Replace English title
content = content.replace(/<title>.*?<\/title>/, '<title>পানি লিকেজের অভিযোগ — LetterFormat.in</title>');
content = content.replace(/<h1 class="format-title">.*?<\/h1>/, '<h1 class="format-title">পানি লিকেজের অভিযোগ</h1>');
content = content.replace(/<p class="format-desc">.*?<\/p>/, '<p class="format-desc">পানি লিকেজের জন্য অভিযোগ পত্রের সঠিক বাংলা ফরম্যাট।</p>');

fs.writeFileSync(filePath, content);
console.log('✓ complaint-letter-water-leakage.html');
