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
    application: 'Applications',
    letter: 'Letters',
    format: 'Formats',
  };
  return labels[category] || category;
}

export function getSubcategoryLabel(subcategory: string): string {
  const labels: Record<string, string> = {
    leave: 'Leave Applications',
    complaint: 'Complaint Letters',
    certificate: 'Certificate Requests',
    bank: 'Bank Letters',
    government: 'Government Applications',
    school: 'School Applications',
    employment: 'Employment Letters',
  };
  return labels[subcategory] || subcategory;
}

export function getUserSegmentLabel(segment: string): string {
  const labels: Record<string, string> = {
    student: 'For Students',
    employee: 'For Employees',
    general: 'For General Public',
    government: 'For Government',
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
