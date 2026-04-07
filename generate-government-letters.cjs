// generate-government-letters.cjs
// Generates all 60+ new government service letter pages

const fs = require('fs');
const path = require('path');

const baseTemplatePath = path.join(__dirname, 'formats', 'government-passport-status.html');
const template = fs.readFileSync(baseTemplatePath, 'utf8');

// Letter data for all pages
const letters = [
  // Electricity (22 pages)
  { file: 'government-electric-load-reduction.html', title: 'বিদ্যুৎ লোড হ্রাসের আবেদন', keywords: 'লোড হ্রাস, বিদ্যুৎ আবেদন', faqs: ['লোড হ্রাসে কতদিন লাগে?', 'হ্রাসের জন্য কী কী লাগে?', 'ফি কত?'] },
  { file: 'government-electric-new-connection.html', title: 'নতুন বিদ্যুৎ সংযোগের আবেদন', keywords: 'নতুন বিদ্যুৎ সংযোগ, বিদ্যুৎ আবেদন', faqs: ['নতুন সংযোগে কতদিন লাগে?', 'কী কী ডকুমেন্ট লাগে?', 'ফি কত?'] },
  { file: 'government-electric-temp-connection.html', title: 'সাময়িক বিদ্যুৎ সংযোগের আবেদন', keywords: 'সাময়িক সংযোগ, বিদ্যুৎ', faqs: ['সাময়িক সংযোগ কতদিনের জন্য?', 'ফি কত?', 'কী কী লাগে?'] },
  { file: 'government-electric-temp-to-perm.html', title: 'সাময়িক থেকে স্থায়ী সংযোগের আবেদন', keywords: 'সাময়িক থেকে স্থায়ী, বিদ্যুৎ', faqs: ['প্রক্রিয়া কতদিন?', 'কী কী ডকুমেন্ট লাগে?', 'অতিরিক্ত ফি লাগে কি?'] },
  { file: 'government-electric-meter-replacement.html', title: 'মিটার পরিবর্তনের আবেদন', keywords: 'মিটার পরিবর্তন, বিদ্যুৎ', faqs: ['মিটার পরিবর্তনে কতদিন লাগে?', 'ফি কত?', 'পুরোনো মিটার কি দিতে হবে?'] },
  { file: 'government-electric-faulty-meter.html', title: 'ত্রুটিপূর্ণ মিটারের অভিযোগ', keywords: 'ত্রুটিপূর্ণ মিটার, অভিযোগ', faqs: ['মিটার পরীক্ষা কতদিনে হবে?', 'ক্ষতিপূরণ পাওয়া যায় কি?', 'কীভাবে অভিযোগ করব?'] },
  { file: 'government-electric-high-bill.html', title: 'বেশি বিলের অভিযোগ', keywords: 'বেশি বিল, অভিযোগ', faqs: ['বিল সংশোধন কতদিনে হবে?', 'মিটার পড়তে পারে কি?', 'রিবেট পাওয়া যায় কি?'] },
  { file: 'government-electric-bill-correction.html', title: 'বিল সংশোধনের আবেদন', keywords: 'বিল সংশোধন, বিদ্যুৎ', faqs: ['সংশোধনে কতদিন লাগে?', 'কী ডকুমেন্ট লাগে?', 'অতিরিক্ত ফি আছে কি?'] },
  { file: 'government-electric-name-change.html', title: 'নাম পরিবর্তনের আবেদন', keywords: 'নাম পরিবর্তন, বিদ্যুৎ সংযোগ', faqs: ['নাম পরিবর্তনে কতদিন লাগে?', 'কী ডকুমেন্ট লাগে?', 'ফি কত?'] },
  { file: 'government-electric-address-change.html', title: 'ঠিকানা পরিবর্তনের আবেদন', keywords: 'ঠিকানা পরিবর্তন, বিদ্যুৎ', faqs: ['ঠিকানা পরিবর্তন কতদিন?', 'নতুন ঠিকানার প্রমাণ কী লাগে?', 'সংযোগ বিচ্ছিন্ন হবে কি?'] },
  { file: 'government-electric-duplicate-bill.html', title: 'ডুপ্লিকেট বিলের আবেদন', keywords: 'ডুপ্লিকেট বিল, বিদ্যুৎ', faqs: ['ডুপ্লিকেট বিল কতদিনে পাব?', 'অনলাইনে পাওয়া যায় কি?', 'ফি কত?'] },
  { file: 'government-electric-disconnection.html', title: 'বিদ্যুৎ সংযোগ বিচ্ছিন্নতার আবেদন', keywords: 'সংযোগ বিচ্ছিন্ন, বিদ্যুৎ', faqs: ['বিচ্ছিন্নতায় কতদিন লাগে?', 'বকেয়া বিল কি দিতে হবে?', 'পুনরায় সংযোগ কতদিন?'] },
  { file: 'government-electric-reconnection.html', title: 'বিদ্যুৎ পুনঃসংযোগের আবেদন', keywords: 'পুনঃসংযোগ, বিদ্যুৎ', faqs: ['পুনঃসংযোগে কতদিন লাগে?', 'রিজার্ভেশন ফি কত?', 'কী ডকুমেন্ট লাগে?'] },
  { file: 'government-electric-line-shifting.html', title: 'বিদ্যুৎ লাইন স্থানান্তরের আবেদন', keywords: 'লাইন স্থানান্তর, বিদ্যুৎ', faqs: ['স্থানান্তরে কতদিন লাগে?', 'ফি কত?', 'নতুন জায়গায় সংযোগ পাব কি?'] },
  { file: 'government-electric-transformer-repair.html', title: 'ট্রান্সফর্মার মেরামতের অভিযোগ', keywords: 'ট্রান্সফর্মার মেরামত, অভিযোগ', faqs: ['মেরামত কতদিনে হবে?', 'জরুরি মেরামত কিভাবে করব?', 'ক্ষতিপূরণ পাওয়া যায় কি?'] },
  { file: 'government-electric-power-cut.html', title: 'লোডশেডিং অভিযোগ', keywords: 'লোডশেডিং, অভিযোগ', faqs: ['লোডশেডিং কতটা কমানো যায়?', 'কখন লোডশেডিং হয়?', 'জরুরি সংযোগ পাওয়া যায় কি?'] },
  { file: 'government-electric-voltage-issue.html', title: 'ভোল্টেজ সমস্যার অভিযোগ', keywords: 'ভোল্টেজ সমস্যা, বিদ্যুৎ', faqs: ['ভোল্টেজ পরীক্ষা কতদিনে?', 'ক্ষতিপূরণ পাওয়া যায় কি?', 'সমাধান কিভাবে হবে?'] },
  { file: 'government-electric-commercial-connection.html', title: 'বাণিজ্যিক বিদ্যুৎ সংযোগের আবেদন', keywords: 'বাণিজ্যিক সংযোগ, বিদ্যুৎ', faqs: ['বাণিজ্যিক সংযোগে কতদিন?', 'ফি কত?', 'কী ডকুমেন্ট লাগে?'] },
  { file: 'government-electric-residential-to-commercial.html', title: 'আবাসিক থেকে বাণিজ্যিক সংযোগের আবেদন', keywords: 'শ্রেণি পরিবর্তন, বিদ্যুৎ', faqs: ['পরিবর্তনে কতদিন?', 'অতিরিক্ত ফি কত?', 'লাইসেন্স লাগে কি?'] },
  { file: 'government-electric-solar-net-metering.html', title: 'সোলার নেট মিটারিং সংযোগের আবেদন', keywords: 'সোলার নেট মিটারিং, সৌর', faqs: ['সোলার সংযোগে কতদিন?', 'ফি কত?', 'বিদ্যুৎ বিল কমবে কি?'] },
  { file: 'government-electric-new-lampost.html', title: 'নতুন ল্যাম্পপোস্ট স্থাপনের আবেদন', keywords: 'নতুন ল্যাম্পপোস্ট, স্ট্রিট লাইট', faqs: ['ল্যাম্পপোস্ট স্থাপনে কতদিন?', 'কোথায় স্থাপন হবে?', 'খরচ কে বহন করবে?'] },

  // Water (14 pages)
  { file: 'government-water-new-connection.html', title: 'নতুন পানি সংযোগের আবেদন', keywords: 'নতুন পানি সংযোগ, পৌরসভা', faqs: ['সংযোগে কতদিন লাগে?', 'ফি কত?', 'কী ডকুমেন্ট লাগে?'] },
  { file: 'government-water-transfer.html', title: 'পানি সংযোগ স্থানান্তরের আবেদন', keywords: 'পানি সংযোগ স্থানান্তর', faqs: ['স্থানান্তরে কতদিন?', 'ফি কত?', 'পুরোনো সংযোগ বন্ধ হবে কি?'] },
  { file: 'government-water-no-supply.html', title: 'পানি সরবরাহ না হওয়ার অভিযোগ', keywords: 'পানি নেই, অভিযোগ', faqs: ['সমস্যা সমাধান কতদিন?', 'কী কারণে হতে পারে?', 'ক্ষতিপূরণ পাওয়া যায় কি?'] },
  { file: 'government-water-low-pressure.html', title: 'কম পানি প্রেশারের অভিযোগ', keywords: 'কম পানি প্রেশার, অভিযোগ', faqs: ['প্রেশার বাড়তে কতদিন?', 'কারণ কী?', 'সমাধান কী?'] },
  { file: 'government-water-public-tap.html', title: 'পাবলিক ট্যাপ স্থাপনের আবেদন', keywords: 'পাবলিক ট্যাপ, পানি', faqs: ['স্থাপনে কতদিন?', 'কোথায় হবে?', 'রক্ষণাবেক্ষণ কে করবে?'] },
  { file: 'government-water-pipeline-extension.html', title: 'পানি পাইপলাইন বৃদ্ধির আবেদন', keywords: 'পাইপলাইন বৃদ্ধি, পানি', faqs: ['বৃদ্ধিতে কতদিন?', 'খরচ কে বহন করবে?', 'কী ডকুমেন্ট লাগে?'] },
  { file: 'government-water-leakage.html', title: 'পানি লিকের অভিযোগ', keywords: 'পানি লিক, পাইপ ফাটা', faqs: ['মেরামত কতদিনে?', 'ক্ষতিপূরণ পাওয়া যায় কি?', 'জরুরি মেরামত কিভাবে?'] },
  { file: 'government-water-contaminated.html', title: 'দূষিত পানির অভিযোগ', keywords: 'দূষিত পানি, অভিযোগ', faqs: ['পানি পরীক্ষা কতদিন?', 'সমাধান কী?', 'স্বাস্থ্য সমস্যা হলে কী করব?'] },
  { file: 'government-water-line-repair.html', title: 'পানি লাইন মেরামতের আবেদন', keywords: 'পানি লাইন মেরামত', faqs: ['মেরামতে কতদিন?', 'খরচ কে বহন করবে?', 'জরুরি মেরামত কিভাবে?'] },
  { file: 'government-water-borewell-permission.html', title: 'বোরওয়েল অনুমতির আবেদন', keywords: 'বোরওয়েল, অনুমতি', faqs: ['অনুমতি পেতে কতদিন?', 'কী ডকুমেন্ট লাগে?', 'ফি কত?'] },
  { file: 'government-water-tank-cleaning.html', title: 'পানি ট্যাংক পরিষ্কারের আবেদন', keywords: 'ট্যাংক পরিষ্কার, পানি', faqs: ['পরিষ্কারে কতদিন?', 'সার্ভিস ফি কত?', 'কতবার করা উচিত?'] },
  { file: 'government-water-bill-correction.html', title: 'পানি বিল সংশোধনের আবেদন', keywords: 'পানি বিল সংশোধন', faqs: ['সংশোধনে কতদিন?', 'কী ডকুমেন্ট লাগে?', 'অতিরিক্ত বিল ফেরত পাব কি?'] },
  { file: 'government-water-meter-faulty.html', title: 'পানি মিটার ত্রুটির অভিযোগ', keywords: 'পানি মিটার ত্রুটি', faqs: ['মিটার পরীক্ষা কতদিন?', 'পরিবর্তন কতদিনে?', 'ক্ষতিপূরণ পাওয়া যায় কি?'] },
  { file: 'government-water-disconnection.html', title: 'পানি সংযোগ বিচ্ছিন্নতার আবেদন', keywords: 'পানি সংযোগ বিচ্ছিন্ন', faqs: ['বিচ্ছিন্নতায় কতদিন?', 'বকেয়া বিল কি দিতে হবে?', 'পুনরায় সংযোগ কতদিন?'] },

  // Public Service (18 pages)
  { file: 'government-road-repair.html', title: 'রাস্তা মেরামতের আবেদন', keywords: 'রাস্তা মেরামত, সড়ক', faqs: ['মেরামতে কতদিন লাগে?', 'কোন রাস্তায় হবে?', 'খরচ কে বহন করবে?'] },
  { file: 'government-road-damaged.html', title: 'রাস্তা ক্ষতিগ্রস্ত অভিযোগ', keywords: 'রাস্তা ক্ষতি, অভিযোগ', faqs: ['সমাধান কতদিনে?', 'জরুরি মেরামত হবে কি?', 'ক্ষতিপূরণ পাওয়া যায় কি?'] },
  { file: 'government-road-construction.html', title: 'নতুন রাস্তা নির্মাণের আবেদন', keywords: 'নতুন রাস্তা, নির্মাণ', faqs: ['নির্মাণে কতদিন?', 'কোথায় হবে?', 'খরচ কে বহন করবে?'] },
  { file: 'government-road-waterlogging.html', title: 'রাস্তায় জলজমা অভিযোগ', keywords: 'জলজমা, রাস্তা', faqs: ['সমাধান কতদিনে?', 'ড্রেন পরিষ্কার হবে কি?', 'স্থায়ী সমাধান কী?'] },
  { file: 'government-drain-cleaning.html', title: 'ড্রেন পরিষ্কারের আবেদন', keywords: 'ড্রেন পরিষ্কার', faqs: ['পরিষ্কারে কতদিন?', 'নিয়মিত হবে কি?', 'ব্লক হলে কী করব?'] },
  { file: 'government-drain-blocked.html', title: 'ড্রেন বন্ধ অভিযোগ', keywords: 'ড্রেন বন্ধ, অভিযোগ', faqs: ['সমাধান কতদিনে?', 'কারণ কী?', 'স্থায়ী সমাধান কী?'] },
  { file: 'government-garbage-collection.html', title: 'ময়লা সংগ্রহ পরিষেবার আবেদন', keywords: 'ময়লা সংগ্রহ, পরিচ্ছন্নতা', faqs: ['সংগ্রহ কবে শুরু হবে?', 'কতদিন পর পর?', 'ফি কত?'] },
  { file: 'government-garbage-irregular.html', title: 'অনিয়মিত ময়লা সংগ্রহ অভিযোগ', keywords: 'ময়লা নেওয়া হয় না', faqs: ['নিয়মিত হবে কতদিনে?', 'জরুরি সংগ্রহ কিভাবে করব?', 'অভিযোগ করলে কী হবে?'] },
  { file: 'government-street-light-installation.html', title: 'স্ট্রিট লাইট স্থাপনের আবেদন', keywords: 'স্ট্রিট লাইট, আলো', faqs: ['স্থাপনে কতদিন?', 'কোথায় হবে?', 'খরচ কে বহন করবে?'] },
  { file: 'government-street-light-repair.html', title: 'স্ট্রিট লাইট মেরামতের অভিযোগ', keywords: 'লাইট জ্বলে না, মেরামত', faqs: ['মেরামত কতদিনে?', 'জরুরি মেরামত কিভাবে?', 'নতুন লাইট পাব কি?'] },
  { file: 'government-high-mast-light.html', title: 'হাইমাস্ট লাইট স্থাপনের আবেদন', keywords: 'হাইমাস্ট লাইট, এলইডি', faqs: ['স্থাপনে কতদিন?', 'কোথায় হবে?', 'খরচ কে বহন করবে?'] },
  { file: 'government-park-maintenance.html', title: 'পার্ক রক্ষণাবেক্ষণের আবেদন', keywords: 'পার্ক, রক্ষণাবেক্ষণ', faqs: ['রক্ষণাবেক্ষণ কবে হবে?', 'কতদিন পর পর?', 'নতুন গাছ লাগানো হবে কি?'] },
  { file: 'government-encroachment.html', title: 'অবৈধ দখল অভিযোগ', keywords: 'অবৈধ দখল, অভিযোগ', faqs: ['উচ্ছেদ কতদিনে হবে?', 'পুলিশ সাহায্য পাব কি?', 'আইনি ব্যবস্থা কী?'] },
  { file: 'government-public-toilet.html', title: 'পাবলিক টয়লেট নির্মাণের আবেদন', keywords: 'পাবলিক টয়লেট, শৌচাগার', faqs: ['নির্মাণে কতদিন?', 'কোথায় হবে?', 'রক্ষণাবেক্ষণ কে করবে?'] },
  { file: 'government-open-sewage.html', title: 'খোলা নর্দমা অভিযোগ', keywords: 'খোলা নর্দমা, অভিযোগ', faqs: ['সমাধান কতদিনে?', 'ড্রেন নির্মাণ হবে কি?', 'স্বাস্থ্য ঝুঁকি হলে কী করব?'] },
  { file: 'government-sanitation-service.html', title: 'পরিচ্ছন্নতা পরিষেবার আবেদন', keywords: 'পরিচ্ছন্নতা, পরিষেবা', faqs: ['পরিষেবা কবে শুরু হবে?', 'এলাকা কী কী অন্তর্ভুক্ত?', 'ফি কত?'] },
  { file: 'government-public-security.html', title: 'পাবলিক নিরাপত্তার আবেদন', keywords: 'নিরাপত্তা, পুলিশ', faqs: ['পেট্রোলিং হবে কি?', 'সার্ভেল্যান্স ক্যামেরা লাগানো হবে কি?', 'নিরাপত্তা বাড়বে কতদিনে?'] },
  { file: 'government-emergency-service.html', title: 'জরুরি পরিষেবার আবেদন', keywords: 'জরুরি পরিষেবা, সাহায্য', faqs: ['জরুরি সাহায্য কিভাবে পাব?', 'কতদিনে প্রতিক্রিয়া?', 'কোন নম্বরে যোগাযোগ করব?'] },

  // Infrastructure (10 pages)
  { file: 'government-speed-breaker.html', title: 'স্পিড ব্রেকার স্থাপনের আবেদন', keywords: 'স্পিড ব্রেকার, নিরাপত্তা', faqs: ['স্থাপনে কতদিন?', 'কোথায় হবে?', 'খরচ কে বহন করবে?'] },
  { file: 'government-traffic-signal.html', title: 'ট্রাফিক সিগন্যাল স্থাপনের আবেদন', keywords: 'ট্রাফিক সিগন্যাল, সড়ক', faqs: ['স্থাপনে কতদিন?', 'কোথায় হবে?', 'খরচ কে বহন করবে?'] },
  { file: 'government-illegal-construction.html', title: 'অবৈধ নির্মাণ অভিযোগ', keywords: 'অবৈধ নির্মাণ, অভিযোগ', faqs: ['উচ্ছেদ কতদিনে?', 'আইনি ব্যবস্থা কী?', 'পুলিশ সাহায্য পাব কি?'] },
  { file: 'government-footpath-repair.html', title: 'ফুটপাথ মেরামতের আবেদন', keywords: 'ফুটপাথ মেরামত', faqs: ['মেরামতে কতদিন?', 'নতুন ফুটপাথ হবে কি?', 'খরচ কে বহন করবে?'] },
  { file: 'government-bus-stop.html', title: 'বাস স্টপ নির্মাণের আবেদন', keywords: 'বাস স্টপ, পরিবহন', faqs: ['নির্মাণে কতদিন?', 'কোথায় হবে?', 'শেল্টার হবে কি?'] },
  { file: 'government-stray-animals.html', title: 'বেওয়ারিশ পশু অভিযোগ', keywords: 'বেওয়ারিশ পশু, অভিযোগ', faqs: ['পশু সরাতে কতদিন?', 'জন্তু হসপিটাল আছে কি?', 'পুলিশ সাহায্য পাব কি?'] },
  { file: 'government-tree-cutting.html', title: 'গাছ কাটার অনুমতির আবেদন', keywords: 'গাছ কাটা, অনুমতি', faqs: ['অনুমতি পেতে কতদিন?', 'কী ডকুমেন্ট লাগে?', 'নতুন গাছ লাগানো বাধ্যতামূলক কি?'] },
  { file: 'government-noise-pollution.html', title: 'শব্দ দূষণ অভিযোগ', keywords: 'শব্দ দূষণ, অভিযোগ', faqs: ['সমাধান কতদিনে?', 'জরুরি পদক্ষেপ কী?', 'আইনি ব্যবস্থা কী?'] },
  { file: 'government-cctv-installation.html', title: 'সিসিটিভি স্থাপনের আবেদন', keywords: 'সিসিটিভি, নিরাপত্তা', faqs: ['স্থাপনে কতদিন?', 'কোথায় কোথায়?', 'খরচ কে বহন করবে?'] },
  { file: 'government-bridge-repair.html', title: 'সেতু মেরামতের আবেদন', keywords: 'সেতু মেরামত, সড়ক', faqs: ['মেরামতে কতদিন?', 'অস্থায়ী ব্রিজ হবে কি?', 'খরচ কে বহন করবে?'] },
];

function generatePage(letter) {
  let content = template;
  
  // Replace metadata
  content = content.replace(/<title>[^—]+ — LetterFormat\.in<\/title>/, `<title>${letter.title} — LetterFormat.in</title>`);
  content = content.replace(/<meta name="description" content="[^"]+"/, `<meta name="description" content="বিনামূল্যে ${letter.title}। কপি-পেস্ট ফরম্যাট, এডিটেবল টেমপ্লেট, পূরণ করা নমুনা, টিপস সহ। আপডেট ২০২৬।"`);
  content = content.replace(/<link rel="canonical" href="[^"]+"/, `<link rel="canonical" href="https://sampark-lodge.github.io/letterformat/formats/${letter.file}"`);
  content = content.replace(/<meta property="og:title" content="[^"]+"/, `<meta property="og:title" content="${letter.title} — LetterFormat.in">`);
  content = content.replace(/<meta property="og:description" content="[^"]+"/, `<meta property="og:description" content="বিনামূল্যে ${letter.title}। কপি-পেস্ট ফরম্যাট, এডিটেবল টেমপ্লেট।">`);
  content = content.replace(/<meta property="og:url" content="[^"]+"/, `<meta property="og:url" content="https://sampark-lodge.github.io/letterformat/formats/${letter.file}"`);
  content = content.replace(/<meta name="twitter:title" content="[^"]+"/, `<meta name="twitter:title" content="${letter.title} — LetterFormat.in">`);
  content = content.replace(/<meta name="twitter:description" content="[^"]+"/, `<meta name="twitter:description" content="বিনামূল্যে ${letter.title}। কপি-পেস্ট ফরম্যাট।">`);
  content = content.replace(/<meta name="keywords" content="[^"]+"/, `<meta name="keywords" content="${letter.keywords}, বাংলা আবেদন, চিঠি ফরম্যাট, LetterFormat.in">`);
  
  // Update breadcrumb
  content = content.replace(/<span>[^<]+<\/span>/, `<span>${letter.title.replace('এর আবেদন', '').replace('এর অভিযোগ', '')}</span>`);
  
  // Update format-meta title and description
  content = content.replace(/<h1 class="format-title">[^<]+<\/h1>/, `<h1 class="format-title">${letter.title}</h1>`);
  content = content.replace(/<p class="format-title-desc">[^<]+<\/p>/, `<p class="format-title-desc">${letter.title}র জন্য আবেদন পত্রের সঠিক বাংলা ফরম্যাট।</p>`);
  
  // Update subject line placeholder
  content = content.replace(/<span class="placeholder" contenteditable="true">[^<]+<\/span>/, `<span class="placeholder" contenteditable="true">${letter.title}</span>`);
  
  // Update FAQs in the page (in .faq-box)
  const faqItems = letter.faqs.map((q, i) => {
    // Distribute answers based on question type
    let answer = 'সংশ্লিষ্ট বিভাগের সাথে যোগাযোগ করুন।';
    if (q.includes('কতদিন')) answer = 'সাধারণত ৭-১৫ কর্মদিবসের মধ্যে।';
    if (q.includes('ফি')) answer = 'ফি নির্ভর করে সেবার ধরনের উপর।';
    if (q.includes('কী')) answer = 'প্রয়োজনীয় ডকুমেন্ট ও ফি জমা দিতে হবে।';
    return `<div class="faq-item"><h3>❓ ${q}</h3><p>${answer}</p></div>`;
  }).join('\n          ');
  
  // Replace FAQ content in .faq-box
  content = content.replace(/<div class="faq-item">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, `<div class="faq-item"><h3>❓ ${letter.faqs[0]}</h3><p>সাধারণত ৭-১৫ কর্মদিবসের মধ্যে।</p></div>\n          <div class="faq-item"><h3>❓ ${letter.faqs[1]}</h3><p>প্রয়োজনীয় ডকুমেন্ট ও ফি জমা দিতে হবে।</p></div>\n          <div class="faq-item"><h3>❓ ${letter.faqs[2]}</h3><p>ফি নির্ভর করে সেবার ধরনের উপর।</p></div>`);
  
  // Update JSON-LD Article schema
  content = content.replace(/"headline": "[^"]+"/, `"headline": "${letter.title} — LetterFormat.in"`);
  
  // Update FAQPage JSON-LD
  const faqSchema = letter.faqs.map(q => {
    let answer = 'সংশ্লিষ্ট বিভাগের সাথে যোগাযোগ করুন।';
    if (q.includes('কতদিন')) answer = 'সাধারণত ৭-১৫ কর্মদিবসের মধ্যে।';
    if (q.includes('ফি')) answer = 'ফি নির্ভর করে সেবার ধরনের উপর।';
    if (q.includes('কী')) answer = 'প্রয়োজনীয় ডকুমেন্ট ও ফি জমা দিতে হবে।';
    return `{ "@type": "Question", "name": "${q}", "acceptedAnswer": { "@type": "Answer", "text": "${answer}" } }`;
  }).join(',\n      ');
  
  content = content.replace(/"mainEntity": \[[\s\S]*?\]\s*<\/script>/, `"mainEntity": [\n      ${faqSchema}\n    ]\n  </script>`);
  
  return content;
}

// Generate all pages
letters.forEach(letter => {
  const filepath = path.join(__dirname, 'formats', letter.file);
  const content = generatePage(letter);
  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`✅ ${letter.file}`);
});

console.log(`\n✨ Total: ${letters.length} pages generated`);
