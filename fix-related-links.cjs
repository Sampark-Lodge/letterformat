const fs = require('fs');

// Related links for each category - 3 links per file, no self-reference
const relatedLinks = {
  // Application (leave) category
  'application-sick-leave.html': [
    { href: 'application-casual-leave.html', icon: '📋', name: 'নৈমিত্তিক ছুটি', views: '১২,৪৫৬ বার দেখা' },
    { href: 'application-leave-due-to-fever.html', icon: '🌡️', name: 'জ্বরের ছুটি', views: '১০,২৩৪ বার দেখা' },
    { href: 'application-maternity-leave.html', icon: '👶', name: 'মাতৃত্বকালীন ছুটি', views: '৯,৮৭৬ বার দেখা' }
  ],
  'application-maternity-leave.html': [
    { href: 'application-sick-leave.html', icon: '🏥', name: 'অসুস্থতার ছুটি', views: '১২,৪৫৬ বার দেখা' },
    { href: 'application-paternity-leave.html', icon: '👨', name: 'পিতৃত্বকালীন ছুটি', views: '৮,৭৬৫ বার দেখা' },
    { href: 'application-casual-leave.html', icon: '📋', name: 'নৈমিত্তিক ছুটি', views: '১১,২৩৪ বার দেখা' }
  ],
  'application-paternity-leave.html': [
    { href: 'application-maternity-leave.html', icon: '👶', name: 'মাতৃত্বকালীন ছুটি', views: '৯,৮৭৬ বার দেখা' },
    { href: 'application-sick-leave.html', icon: '🏥', name: 'অসুস্থতার ছুটি', views: '১২,৪৫৬ বার দেখা' },
    { href: 'application-wedding-leave.html', icon: '💒', name: 'বিয়ের ছুটি', views: '৭,৬৫৪ বার দেখা' }
  ],
  'application-wedding-leave.html': [
    { href: 'application-casual-leave.html', icon: '📋', name: 'নৈমিত্তিক ছুটি', views: '১১,২৩৪ বার দেখা' },
    { href: 'application-sick-leave.html', icon: '🏥', name: 'অসুস্থতার ছুটি', views: '১২,৪৫৬ বার দেখা' },
    { href: 'application-family-function-leave.html', icon: '🎉', name: 'পারিবারিক অনুষ্ঠান ছুটি', views: '৬,৫৪৩ বার দেখা' }
  ],
  'application-bereavement-leave.html': [
    { href: 'application-sick-leave.html', icon: '🏥', name: 'অসুস্থতার ছুটি', views: '১২,৪৫৬ বার দেখা' },
    { href: 'application-casual-leave.html', icon: '📋', name: 'নৈমিত্তিক ছুটি', views: '১১,২৩৪ বার দেখা' },
    { href: 'application-half-day-leave.html', icon: '⏰', name: 'অর্ধদিবস ছুটি', views: '৫,৪৩২ বার দেখা' }
  ],
  'application-half-day-leave.html': [
    { href: 'application-casual-leave.html', icon: '📋', name: 'নৈমিত্তিক ছুটি', views: '১১,২৩৪ বার দেখা' },
    { href: 'application-sick-leave.html', icon: '🏥', name: 'অসুস্থতার ছুটি', views: '১২,৪৫৬ বার দেখা' },
    { href: 'application-urgent-piece-of-work.html', icon: '⚡', name: 'জরুরি কাজের ছুটি', views: '৪,৩২১ বার দেখা' }
  ],
  'application-casual-leave.html': [
    { href: 'application-sick-leave.html', icon: '🏥', name: 'অসুস্থতার ছুটি', views: '১২,৪৫৬ বার দেখা' },
    { href: 'application-maternity-leave.html', icon: '👶', name: 'মাতৃত্বকালীন ছুটি', views: '৯,৮৭৬ বার দেখা' },
    { href: 'application-leave-due-to-fever.html', icon: '🌡️', name: 'জ্বরের ছুটি', views: '১০,২৩৪ বার দেখা' }
  ],
  'application-bonafide-certificate.html': [
    { href: 'application-income-certificate.html', icon: '💰', name: 'আয় সার্টিফিকেট', views: '১১,২৩৪ বার দেখা' },
    { href: 'application-character-certificate.html', icon: '📝', name: 'চারিত্রিক সার্টিফিকেট', views: '৯,৮৭৬ বার দেখা' },
    { href: 'application-domicile-certificate.html', icon: '🏠', name: 'ডোমিসাইল সার্টিফিকেট', views: '৮,৭৬৫ বার দেখা' }
  ],
  'application-leave-due-to-fever.html': [
    { href: 'application-sick-leave.html', icon: '🏥', name: 'অসুস্থতার ছুটি', views: '১২,৪৫৬ বার দেখা' },
    { href: 'application-casual-leave.html', icon: '📋', name: 'নৈমিত্তিক ছুটি', views: '১১,২৩৪ বার দেখা' },
    { href: 'application-medical-appointment-leave.html', icon: '🩺', name: 'ডাক্তারি অ্যাপয়েন্টমেন্ট', views: '৫,৪৩২ বার দেখা' }
  ],
  'application-family-function-leave.html': [
    { href: 'application-wedding-leave.html', icon: '💒', name: 'বিয়ের ছুটি', views: '৭,৬৫৪ বার দেখা' },
    { href: 'application-casual-leave.html', icon: '📋', name: 'নৈমিত্তিক ছুটি', views: '১১,২৩৪ বার দেখা' },
    { href: 'application-sick-leave.html', icon: '🏥', name: 'অসুস্থতার ছুটি', views: '১২,৪৫৬ বার দেখা' }
  ],
  'application-sister-wedding-leave.html': [
    { href: 'application-wedding-leave.html', icon: '💒', name: 'বিয়ের ছুটি', views: '৭,৬৫৪ বার দেখা' },
    { href: 'application-family-function-leave.html', icon: '🎉', name: 'পারিবারিক অনুষ্ঠান ছুটি', views: '৬,৫৪৩ বার দেখা' },
    { href: 'application-casual-leave.html', icon: '📋', name: 'নৈমিত্তিক ছুটি', views: '১১,২৩৪ বার দেখা' }
  ],
  'application-going-home-leave.html': [
    { href: 'application-casual-leave.html', icon: '📋', name: 'নৈমিত্তিক ছুটি', views: '১১,২৩৪ বার দেখা' },
    { href: 'application-sick-leave.html', icon: '🏥', name: 'অসুস্থতার ছুটি', views: '১২,৪৫৬ বার দেখা' },
    { href: 'application-urgent-piece-of-work.html', icon: '⚡', name: 'জরুরি কাজের ছুটি', views: '৪,৩২১ বার দেখা' }
  ],
  'application-urgent-piece-of-work.html': [
    { href: 'application-casual-leave.html', icon: '📋', name: 'নৈমিত্তিক ছুটি', views: '১১,২৩৪ বার দেখা' },
    { href: 'application-half-day-leave.html', icon: '⏰', name: 'অর্ধদিবস ছুটি', views: '৫,৪৩২ বার দেখা' },
    { href: 'application-sick-leave.html', icon: '🏥', name: 'অসুস্থতার ছুটি', views: '১২,৪৫৬ বার দেখা' }
  ],
  'application-medical-appointment-leave.html': [
    { href: 'application-sick-leave.html', icon: '🏥', name: 'অসুস্থতার ছুটি', views: '১২,৪৫৬ বার দেখা' },
    { href: 'application-dental-appointment-leave.html', icon: '🦷', name: 'দাঁতের ডাক্তারি', views: '৩,২১০ বার দেখা' },
    { href: 'application-leave-due-to-fever.html', icon: '🌡️', name: 'জ্বরের ছুটি', views: '১০,২৩৪ বার দেখা' }
  ],
  'application-dental-appointment-leave.html': [
    { href: 'application-medical-appointment-leave.html', icon: '🩺', name: 'ডাক্তারি অ্যাপয়েন্টমেন্ট', views: '৩,২১০ বার দেখা' },
    { href: 'application-sick-leave.html', icon: '🏥', name: 'অসুস্থতার ছুটি', views: '১২,৪৫৬ বার দেখা' },
    { href: 'application-casual-leave.html', icon: '📋', name: 'নৈমিত্তিক ছুটি', views: '১১,২৩৪ বার দেখা' }
  ],

  // Academic category
  'academic-attendance.html': [
    { href: 'academic-result.html', icon: '📊', name: 'রেজাল্ট আবেদন', views: '৮,৭৬৫ বার দেখা' },
    { href: 'academic-course-completion.html', icon: '🎓', name: 'কোর্স সম্পন্ন সার্টিফিকেট', views: '৭,৬৫৪ বার দেখা' },
    { href: 'academic-transcript.html', icon: '📜', name: 'ট্রান্সক্রিপ্ট আবেদন', views: '৬,৫৪৩ বার দেখা' }
  ],
  'academic-course-completion.html': [
    { href: 'academic-attendance.html', icon: '📋', name: 'এটেন্ডেন্স সার্টিফিকেট', views: '৮,৭৬৫ বার দেখা' },
    { href: 'academic-transcript.html', icon: '📜', name: 'ট্রান্সক্রিপ্ট আবেদন', views: '৬,৫৪৩ বার দেখা' },
    { href: 'academic-result.html', icon: '📊', name: 'রেজাল্ট আবেদন', views: '৭,৬৫৪ বার দেখা' }
  ],
  'academic-grade-improvement.html': [
    { href: 'academic-result.html', icon: '📊', name: 'রেজাল্ট আবেদন', views: '৭,৬৫৪ বার দেখা' },
    { href: 'academic-attendance.html', icon: '📋', name: 'এটেন্ডেন্স সার্টিফিকেট', views: '৮,৭৬৫ বার দেখা' },
    { href: 'academic-rechecking-request.html', icon: '🔍', name: 'রি-চেকিং আবেদন', views: '৫,৪৩২ বার দেখা' }
  ],
  'academic-result.html': [
    { href: 'academic-attendance.html', icon: '📋', name: 'এটেন্ডেন্স সার্টিফিকেট', views: '৮,৭৬৫ বার দেখা' },
    { href: 'academic-grade-improvement.html', icon: '📈', name: 'গ্রেড উন্নতি আবেদন', views: '৬,৫৪৩ বার দেখা' },
    { href: 'academic-rechecking-request.html', icon: '🔍', name: 'রি-চেকিং আবেদন', views: '৫,৪৩২ বার দেখা' }
  ],
  'academic-transcript.html': [
    { href: 'academic-course-completion.html', icon: '🎓', name: 'কোর্স সম্পন্ন সার্টিফিকেট', views: '৭,৬৫৪ বার দেখা' },
    { href: 'academic-tc-request.html', icon: '📄', name: 'টিসি আবেদন', views: '৫,৪৩২ বার দেখা' },
    { href: 'academic-attendance.html', icon: '📋', name: 'এটেন্ডেন্স সার্টিফিকেট', views: '৮,৭৬৫ বার দেখা' }
  ],

  // Bank category
  'bank-account-reactivation.html': [
    { href: 'bank-minimum-balance.html', icon: '💰', name: 'মিনিমাম ব্যালেন্স', views: '৭,৬৫৪ বার দেখা' },
    { href: 'bank-credit-card-request.html', icon: '💳', name: 'ক্রেডিট কার্ড আবেদন', views: '৬,৫৪৩ বার দেখা' },
    { href: 'bank-debit-card-request.html', icon: '🏧', name: 'ডেবিট কার্ড আবেদন', views: '৫,৪৩২ বার দেখা' }
  ],
  'bank-credit-card-request.html': [
    { href: 'bank-debit-card-request.html', icon: '🏧', name: 'ডেবিট কার্ড আবেদন', views: '৫,৪৩২ বার দেখা' },
    { href: 'bank-account-reactivation.html', icon: '🔓', name: 'একাউন্ট পুনরায় সক্রিয়', views: '৭,৬৫৪ বার দেখা' },
    { href: 'bank-interest-certificate.html', icon: '📊', name: 'সুদ সার্টিফিকেট', views: '৪,৩২১ বার দেখা' }
  ],
  'bank-debit-card-request.html': [
    { href: 'bank-credit-card-request.html', icon: '💳', name: 'ক্রেডিট কার্ড আবেদন', views: '৬,৫৪৩ বার দেখা' },
    { href: 'bank-account-reactivation.html', icon: '🔓', name: 'একাউন্ট পুনরায় সক্রিয়', views: '৭,৬৫৪ বার দেখা' },
    { href: 'bank-minimum-balance.html', icon: '💰', name: 'মিনিমাম ব্যালেন্স', views: '৫,৪৩২ বার দেখা' }
  ],
  'bank-interest-certificate.html': [
    { href: 'bank-minimum-balance.html', icon: '💰', name: 'মিনিমাম ব্যালেন্স', views: '৫,৪৩২ বার দেখা' },
    { href: 'bank-account-reactivation.html', icon: '🔓', name: 'একাউন্ট পুনরায় সক্রিয়', views: '৭,৬৫৪ বার দেখা' },
    { href: 'bank-credit-card-request.html', icon: '💳', name: 'ক্রেডিট কার্ড আবেদন', views: '৬,৫৪৩ বার দেখা' }
  ],
  'bank-minimum-balance.html': [
    { href: 'bank-account-reactivation.html', icon: '🔓', name: 'একাউন্ট পুনরায় সক্রিয়', views: '৭,৬৫৪ বার দেখা' },
    { href: 'bank-debit-card-request.html', icon: '🏧', name: 'ডেবিট কার্ড আবেদন', views: '৫,৪৩২ বার দেখা' },
    { href: 'bank-interest-certificate.html', icon: '📊', name: 'সুদ সার্টিফিকেট', views: '৪,৩২১ বার দেখা' }
  ],

  // Certificate category
  'certificate-income.html': [
    { href: 'certificate-residence.html', icon: '🏠', name: 'রেসিডেন্স সার্টিফিকেট', views: '৯,৮৭৬ বার দেখা' },
    { href: 'certificate-non-marriage.html', icon: '💍', name: 'অবিবাহিত সার্টিফিকেট', views: '৮,৭৬৫ বার দেখা' },
    { href: 'certificate-senior-citizen.html', icon: '👴', name: 'প্রবীণ নাগরিক সার্টিফিকেট', views: '৭,৬৫৪ বার দেখা' }
  ],
  'certificate-residence.html': [
    { href: 'certificate-income.html', icon: '💰', name: 'আয় সার্টিফিকেট', views: '৯,৮৭৬ বার দেখা' },
    { href: 'certificate-non-marriage.html', icon: '💍', name: 'অবিবাহিত সার্টিফিকেট', views: '৮,৭৬৫ বার দেখা' },
    { href: 'certificate-orphan.html', icon: '👶', name: 'এতিম সার্টিফিকেট', views: '৬,৫৪৩ বার দেখা' }
  ],
  'certificate-non-marriage.html': [
    { href: 'certificate-residence.html', icon: '🏠', name: 'রেসিডেন্স সার্টিফিকেট', views: '৯,৮৭৬ বার দেখা' },
    { href: 'certificate-income.html', icon: '💰', name: 'আয় সার্টিফিকেট', views: '৮,৭৬৫ বার দেখা' },
    { href: 'certificate-senior-citizen.html', icon: '👴', name: 'প্রবীণ নাগরিক সার্টিফিকেট', views: '৭,৬৫৪ বার দেখা' }
  ],
  'certificate-orphan.html': [
    { href: 'certificate-income.html', icon: '💰', name: 'আয় সার্টিফিকেট', views: '৯,৮৭৬ বার দেখা' },
    { href: 'certificate-residence.html', icon: '🏠', name: 'রেসিডেন্স সার্টিফিকেট', views: '৮,৭৬৫ বার দেখা' },
    { href: 'certificate-non-marriage.html', icon: '💍', name: 'অবিবাহিত সার্টিফিকেট', views: '৭,৬৫৪ বার দেখা' }
  ],
  'certificate-senior-citizen.html': [
    { href: 'certificate-income.html', icon: '💰', name: 'আয় সার্টিফিকেট', views: '৯,৮৭৬ বার দেখা' },
    { href: 'certificate-residence.html', icon: '🏠', name: 'রেসিডেন্স সার্টিফিকেট', views: '৮,৭৬৫ বার দেখা' },
    { href: 'certificate-non-marriage.html', icon: '💍', name: 'অবিবাহিত সার্টিফিকেট', views: '৭,৬৫৪ বার দেখা' }
  ],

  // Complaint category
  'complaint-letter-bank.html': [
    { href: 'complaint-letter-internet.html', icon: '🌐', name: 'ইন্টারনেট সমস্যা', views: '৫,৪৩২ বার দেখা' },
    { href: 'complaint-letter-landlord.html', icon: '🏠', name: 'বাড়িওয়ালা অভিযোগ', views: '৬,৫৪৩ বার দেখা' },
    { href: 'complaint-letter-water-shortage.html', icon: '💧', name: 'পানি সংকট', views: '৪,৩২১ বার দেখা' }
  ],
  'complaint-letter-internet.html': [
    { href: 'complaint-letter-bank.html', icon: '🏦', name: 'ব্যাংক সমস্যা', views: '৫,৪৩২ বার দেখা' },
    { href: 'complaint-letter-water-shortage.html', icon: '💧', name: 'পানি সংকট', views: '৪,৩২১ বার দেখা' },
    { href: 'complaint-letter-noise.html', icon: '🔊', name: 'শব্দ দূষণ', views: '৩,২১০ বার দেখা' }
  ],
  'complaint-letter-landlord.html': [
    { href: 'complaint-letter-bank.html', icon: '🏦', name: 'ব্যাংক সমস্যা', views: '৫,৪৩২ বার দেখা' },
    { href: 'complaint-letter-school.html', icon: '🏫', name: 'স্কুল সমস্যা', views: '৪,৩২১ বার দেখা' },
    { href: 'complaint-letter-workplace.html', icon: '🏢', name: 'অফিস সমস্যা', views: '৩,২১০ বার দেখা' }
  ],
  'complaint-letter-road-damage.html': [
    { href: 'complaint-letter-water-shortage.html', icon: '💧', name: 'পানি সংকট', views: '৪,৩২১ বার দেখা' },
    { href: 'complaint-letter-noise.html', icon: '🔊', name: 'শব্দ দূষণ', views: '৩,২১০ বার দেখা' },
    { href: 'complaint-letter-bank.html', icon: '🏦', name: 'ব্যাংক সমস্যা', views: '৫,৪৩২ বার দেখা' }
  ],
  'complaint-letter-school.html': [
    { href: 'complaint-letter-workplace.html', icon: '🏢', name: 'অফিস সমস্যা', views: '৩,২১০ বার দেখা' },
    { href: 'complaint-letter-bank.html', icon: '🏦', name: 'ব্যাংক সমস্যা', views: '৫,৪৩২ বার দেখা' },
    { href: 'complaint-letter-landlord.html', icon: '🏠', name: 'বাড়িওয়ালা অভিযোগ', views: '৬,৫৪৩ বার দেখা' }
  ],
  'complaint-letter-water-shortage.html': [
    { href: 'complaint-letter-noise.html', icon: '🔊', name: 'শব্দ দূষণ', views: '৩,২১০ বার দেখা' },
    { href: 'complaint-letter-bank.html', icon: '🏦', name: 'ব্যাংক সমস্যা', views: '৫,৪৩২ বার দেখা' },
    { href: 'complaint-letter-road-damage.html', icon: '🛣️', name: 'রাস্তার সমস্যা', views: '৪,৩২১ বার দেখা' }
  ],
  'complaint-letter-workplace.html': [
    { href: 'complaint-letter-school.html', icon: '🏫', name: 'স্কুল সমস্যা', views: '৪,৩২১ বার দেখা' },
    { href: 'complaint-letter-bank.html', icon: '🏦', name: 'ব্যাংক সমস্যা', views: '৫,৪৩২ বার দেখা' },
    { href: 'complaint-letter-landlord.html', icon: '🏠', name: 'বাড়িওয়ালা অভিযোগ', views: '৬,৫৪৩ বার দেখা' }
  ],

  // Employment category
  'employment-appraisal.html': [
    { href: 'employment-offer-letter.html', icon: '📄', name: 'অফার লেটার', views: '৭,৬৫৪ বার দেখা' },
    { href: 'employment-joining.html', icon: '🤝', name: 'জয়েনিং লেটার', views: '৮,৭৬৫ বার দেখা' },
    { href: 'employment-transfer.html', icon: '🔄', name: 'ট্রান্সফার লেটার', views: '৬,৫৪৩ বার দেখা' }
  ],
  'employment-joining.html': [
    { href: 'employment-offer-letter.html', icon: '📄', name: 'অফার লেটার', views: '৭,৬৫৪ বার দেখা' },
    { href: 'employment-appraisal.html', icon: '📊', name: 'এপ্রেইজাল লেটার', views: '৬,৫৪৩ বার দেখা' },
    { href: 'employment-termination.html', icon: '📋', name: 'টার্মিনেশন লেটার', views: '৫,৪৩২ বার দেখা' }
  ],
  'employment-offer-letter.html': [
    { href: 'employment-joining.html', icon: '🤝', name: 'জয়েনিং লেটার', views: '৮,৭৬৫ বার দেখা' },
    { href: 'employment-appraisal.html', icon: '📊', name: 'এপ্রেইজাল লেটার', views: '৭,৬৫৪ বার দেখা' },
    { href: 'employment-transfer.html', icon: '🔄', name: 'ট্রান্সফার লেটার', views: '৬,৫৪৩ বার দেখা' }
  ],
  'employment-termination.html': [
    { href: 'employment-transfer.html', icon: '🔄', name: 'ট্রান্সফার লেটার', views: '৬,৫৪৩ বার দেখা' },
    { href: 'employment-appraisal.html', icon: '📊', name: 'এপ্রেইজাল লেটার', views: '৭,৬৫৪ বার দেখা' },
    { href: 'employment-offer-letter.html', icon: '📄', name: 'অফার লেটার', views: '৮,৭৬৫ বার দেখা' }
  ],
  'employment-transfer.html': [
    { href: 'employment-termination.html', icon: '📋', name: 'টার্মিনেশন লেটার', views: '৫,৪৩২ বার দেখা' },
    { href: 'employment-appraisal.html', icon: '📊', name: 'এপ্রেইজাল লেটার', views: '৭,৬৫৪ বার দেখা' },
    { href: 'employment-joining.html', icon: '🤝', name: 'জয়েনিং লেটার', views: '৮,৭৬৫ বার দেখা' }
  ],

  // Government category
  'government-passport-status.html': [
    { href: 'government-tax-certificate.html', icon: '📄', name: 'ট্যাক্স সার্টিফিকেট', views: '৬,৫৪৩ বার দেখা' },
    { href: 'government-old-age-pension.html', icon: '👴', name: 'বয়স্ক ভাতা', views: '৫,৪৩২ বার দেখা' },
    { href: 'government-disability-certificate.html', icon: '♿', name: 'প্রতিবন্ধী সার্টিফিকেট', views: '৪,৩২১ বার দেখা' }
  ],
  'government-tax-certificate.html': [
    { href: 'government-passport-status.html', icon: '🛂', name: 'পাসপোর্ট স্ট্যাটাস', views: '৬,৫৪৩ বার দেখা' },
    { href: 'government-old-age-pension.html', icon: '👴', name: 'বয়স্ক ভাতা', views: '৫,৪৩২ বার দেখা' },
    { href: 'government-unemployment.html', icon: '💼', name: 'বেকারত্ব ভাতা', views: '৪,৩২১ বার দেখা' }
  ],
  'government-old-age-pension.html': [
    { href: 'government-disability-certificate.html', icon: '♿', name: 'প্রতিবন্ধী সার্টিফিকেট', views: '৪,৩২১ বার দেখা' },
    { href: 'government-tax-certificate.html', icon: '📄', name: 'ট্যাক্স সার্টিফিকেট', views: '৬,৫৪৩ বার দেখা' },
    { href: 'government-unemployment.html', icon: '💼', name: 'বেকারত্ব ভাতা', views: '৫,৪৩২ বার দেখা' }
  ],
  'government-disability-certificate.html': [
    { href: 'government-old-age-pension.html', icon: '👴', name: 'বয়স্ক ভাতা', views: '৫,৪৩২ বার দেখা' },
    { href: 'government-passport-status.html', icon: '🛂', name: 'পাসপোর্ট স্ট্যাটাস', views: '৬,৫৪৩ বার দেখা' },
    { href: 'government-unemployment.html', icon: '💼', name: 'বেকারত্ব ভাতা', views: '৪,৩২১ বার দেখা' }
  ],
  'government-unemployment.html': [
    { href: 'government-old-age-pension.html', icon: '👴', name: 'বয়স্ক ভাতা', views: '৫,৪৩২ বার দেখা' },
    { href: 'government-disability-certificate.html', icon: '♿', name: 'প্রতিবন্ধী সার্টিফিকেট', views: '৪,৩২১ বার দেখা' },
    { href: 'government-tax-certificate.html', icon: '📄', name: 'ট্যাক্স সার্টিফিকেট', views: '৬,৫৪৩ বার দেখা' }
  ],

  // School category
  'school-admission.html': [
    { href: 'school-transfer.html', icon: '🔄', name: 'স্কুল ট্রান্সফার', views: '৮,৭৬৫ বার দেখা' },
    { href: 'school-re-admission.html', icon: '📝', name: 'পুনরায় ভর্তি', views: '৭,৬৫৪ বার দেখা' },
    { href: 'school-exam-permission.html', icon: '📋', name: 'পরীক্ষার অনুমতি', views: '৬,৫৪৩ বার দেখা' }
  ],
  'school-exam-permission.html': [
    { href: 'school-admission.html', icon: '🏫', name: 'ভর্তি আবেদন', views: '৮,৭৬৫ বার দেখা' },
    { href: 'school-uniform.html', icon: '👕', name: 'ইউনিফর্ম আবেদন', views: '৫,৪৩২ বার দেখা' },
    { href: 'school-transport.html', icon: '🚌', name: 'ট্রান্সপোর্ট আবেদন', views: '৪,৩২১ বার দেখা' }
  ],
  'school-id-card.html': [
    { href: 'school-admission.html', icon: '🏫', name: 'ভর্তি আবেদন', views: '৮,৭৬৫ বার দেখা' },
    { href: 'school-exam-permission.html', icon: '📋', name: 'পরীক্ষার অনুমতি', views: '৬,৫৪৩ বার দেখা' },
    { href: 'school-uniform.html', icon: '👕', name: 'ইউনিফর্ম আবেদন', views: '৫,৪৩২ বার দেখা' }
  ],
  'school-transport.html': [
    { href: 'school-uniform.html', icon: '👕', name: 'ইউনিফর্ম আবেদন', views: '৫,৪৩২ বার দেখা' },
    { href: 'school-exam-permission.html', icon: '📋', name: 'পরীক্ষার অনুমতি', views: '৬,৫৪৩ বার দেখা' },
    { href: 'school-id-card.html', icon: '🪪', name: 'আইডি কার্ড', views: '৪,৩২১ বার দেখা' }
  ],
  'school-uniform.html': [
    { href: 'school-transport.html', icon: '🚌', name: 'ট্রান্সপোর্ট আবেদন', views: '৪,৩২১ বার দেখা' },
    { href: 'school-exam-permission.html', icon: '📋', name: 'পরীক্ষার অনুমতি', views: '৬,৫৪৩ বার দেখা' },
    { href: 'school-admission.html', icon: '🏫', name: 'ভর্তি আবেদন', views: '৮,৭৬৫ বার দেখা' }
  ],

  // Job category
  'job-counter-offer.html': [
    { href: 'job-salary-negotiation.html', icon: '💰', name: 'বেতন নিয়োগ', views: '৫,৪৩২ বার দেখা' },
    { href: 'job-reference-letter.html', icon: '📝', name: 'রেফারেন্স লেটার', views: '৬,৫৪৩ বার দেখা' },
    { href: 'job-follow-up.html', icon: '📧', name: 'ফলো-আপ লেটার', views: '৭,৬৫৪ বার দেখা' }
  ],
  'job-decline-offer.html': [
    { href: 'job-follow-up.html', icon: '📧', name: 'ফলো-আপ লেটার', views: '৭,৬৫৪ বার দেখা' },
    { href: 'job-thank-you-letter.html', icon: '🙏', name: 'ধন্যবাদ জ্ঞাপন', views: '৮,৭৬৫ বার দেখা' },
    { href: 'job-reference-letter.html', icon: '📝', name: 'রেফারেন্স লেটার', views: '৬,৫৪৩ বার দেখা' }
  ],
  'job-follow-up.html': [
    { href: 'job-reference-letter.html', icon: '📝', name: 'রেফারেন্স লেটার', views: '৬,৫৪৩ বার দেখা' },
    { href: 'job-thank-you-letter.html', icon: '🙏', name: 'ধন্যবাদ জ্ঞাপন', views: '৮,৭৬৫ বার দেখা' },
    { href: 'job-counter-offer.html', icon: '💼', name: 'কাউন্টার অফার', views: '৫,৪৩২ বার দেখা' }
  ],
  'job-reference-letter.html': [
    { href: 'job-follow-up.html', icon: '📧', name: 'ফলো-আপ লেটার', views: '৭,৬৫৪ বার দেখা' },
    { href: 'job-thank-you-letter.html', icon: '🙏', name: 'ধন্যবাদ জ্ঞাপন', views: '৮,৭৬৫ বার দেখা' },
    { href: 'job-experience-letter.html', icon: '📋', name: 'অভিজ্ঞতা সার্টিফিকেট', views: '৬,৫৪৩ বার দেখা' }
  ],
  'job-thank-you-letter.html': [
    { href: 'job-reference-letter.html', icon: '📝', name: 'রেফারেন্স লেটার', views: '৬,৫৪৩ বার দেখা' },
    { href: 'job-follow-up.html', icon: '📧', name: 'ফলো-আপ লেটার', views: '৭,৬৫৪ বার দেখা' },
    { href: 'job-resignation.html', icon: '📄', name: 'রেজিগনেশন লেটার', views: '৫,৪৩২ বার দেখা' }
  ]
};

function buildRelatedHTML(links) {
  return links.map(l => 
    `<a href="${l.href}" class="related-item">
            <div class="related-icon">${l.icon}</div>
            <div class="related-text"><div class="r-name">${l.name}</div><div class="r-views">${l.views}</div></div>
          </a>`
  ).join('\n          ');
}

function fixFile(filepath) {
  const filename = path.basename(filepath);
  if (!relatedLinks[filename]) return null;
  
  const content = fs.readFileSync(filepath, 'utf8');
  const links = relatedLinks[filename];
  
  // Find the related-list section
  const relatedListStart = content.indexOf('<div class="related-list">');
  if (relatedListStart < 0) return null;
  
  const relatedListEnd = content.indexOf('</div>', relatedListStart + 20);
  if (relatedListEnd < 0) return null;
  
  const before = content.substring(0, relatedListStart + '<div class="related-list">'.length);
  const after = content.substring(relatedListEnd);
  
  const newContent = before + '\n          ' + buildRelatedHTML(links) + '\n        ' + after;
  
  fs.writeFileSync(filepath, newContent, 'utf8');
  return `✅ Fixed: ${filename}`;
}

const path = require('path');
const formatsDir = path.join(__dirname, 'formats');

const files = fs.readdirSync(formatsDir).filter(f => f.endsWith('.html'));
console.log(`\n📁 Processing ${files.length} files for related links fix\n`);
console.log('='.repeat(50));

let count = 0;
files.forEach(f => {
  const result = fixFile(path.join(formatsDir, f));
  if (result) {
    console.log(result);
    count++;
  }
});
console.log('\n' + '='.repeat(50));
console.log(`✨ Fixed ${count} files!`);
