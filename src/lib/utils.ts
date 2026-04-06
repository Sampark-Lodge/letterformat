import type { PageData } from '../content/data/pages';

export function generateFormatHtml(
  recipientTitle: string,
  institution: string,
  city: string,
  date: string,
  subjectLine: string,
  paragraphs: string[],
  closingLine: string,
  signOff: string,
  name: string,
  extraInfo?: string
): string {
  const lines = [
    `To,`,
    `${recipientTitle},`,
    `${institution},`,
    `${city}`,
    ``,
    `Date: ${date}`,
    ``,
    `Subject: ${subjectLine}`,
    ``,
    `Respected Sir/Madam,`,
    ``,
    ...paragraphs.map((p) => `    ${p}`),
    ``,
    `    ${closingLine},`,
    ``,
    `    ${signOff},`,
    `    ${name}`,
    ...(extraInfo ? [`    ${extraInfo}`] : []),
  ];
  return lines.join('\n');
}

export function capitalizeTitle(str: string): string {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    application: 'আবেদন',
    letter: 'চিঠি',
    format: 'ফরম্যাট',
  };
  return labels[category] || category;
}

export function getSubcategoryLabel(subcategory: string): string {
  const labels: Record<string, string> = {
    leave: 'ছুটি আবেদন',
    complaint: 'অভিযোগ চিঠি',
    certificate: 'সার্টিফিকেট আবেদন',
    bank: 'ব্যাংক চিঠি',
    government: 'সরকারি আবেদন',
    school: 'স্কুল আবেদন',
    employment: 'চাকরির চিঠি',
  };
  return labels[subcategory] || subcategory;
}

export function getUserSegmentLabel(segment: string): string {
  const labels: Record<string, string> = {
    student: 'ছাত্রদের জন্য',
    employee: 'চাকরিজীবীদের জন্য',
    general: 'সাধারণ মানুষের জন্য',
    government: 'সরকারি কর্মচারীদের জন্য',
  };
  return labels[segment] || segment;
}

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    leave: '📝',
    complaint: '⚠️',
    certificate: '📜',
    bank: '🏦',
    government: '🏛️',
    school: '🎓',
    employment: '💼',
  };
  return icons[category] || '📄';
}
