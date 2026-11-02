// Editable page wording. Admin "Page Content" edits these keys; the website falls back to these defaults.
export type PageField = { key: string; label: string; group: string; long?: boolean; hint?: string };

export const pageDefaults: Record<string, string> = {
  'home.highlights': 'Experienced Eye Specialists\nModern Diagnostic Technology\nPatient-Centred Care',
  'home.stats': '',
  'home.aboutEyebrow': 'About Drishti',
  'home.aboutTitle': 'Your Vision Deserves the Best Care.',
  'home.aboutText': 'Drishti Eye Care is committed to providing accessible, compassionate and quality eye care with modern diagnostic technology and a patient-first approach.\nFrom routine eye check-ups to specialised consultations, every visit is guided by clear communication, careful examination and respect for your time.',
  'home.servicesTitle': 'Our Eye Care Specialities',
  'home.servicesText': 'Thorough, considerate care for every stage of life.',
  'home.whyTitle': 'Why Choose Drishti Eye Care?',
  'home.doctorsTitle': 'Meet Our Doctors',
  'home.doctorsText': 'Meet the team behind your care.',
  'home.teamTitle': 'Our Team',
  'home.teamText': 'The caring staff who make every visit smooth and comfortable.',
  'home.facilitiesTitle': 'Modern Care. Thoughtful Technology.',
  'home.testimonialsTitle': 'Trusted by Our Patients',
  'home.careersTitle': 'Work With Us',
  'home.careersText': 'Join a caring team dedicated to protecting sight in Bhopal. See current openings and apply online.',
  'about.heroTitle': 'Your Vision Deserves the Best Care.',
  'about.heroText': 'Accessible, compassionate and quality eye care for families in Bhopal.',
  'about.body': "Drishti Eye Care is committed to providing accessible, compassionate and quality eye care with modern diagnostic technology and a patient-first approach.\nOur name, Drishti, means vision. We believe clear sight should never be out of reach — which is why we focus on affordable care, honest guidance and a calm, welcoming clinic.\nWhether it's a routine check-up, a concern about changing vision, or care for a child's eyes, our team takes the time to explain every step.",
  'about.mission': '',
  'about.vision': '',
  'about.approachTitle': 'What guides our care',
  'facilities.heroTitle': 'Modern Care. Thoughtful Technology.',
  'facilities.heroText': 'A clean, calm clinic equipped for thorough eye examinations.',
  'careers.heroTitle': 'Build a career in eye care.',
  'careers.heroText': 'We welcome caring, skilled people who want to help our patients see better.',
  'careers.intro': 'At Drishti Eye Care we value kindness, accuracy and teamwork. If you would like to join us, apply for an open position below or send a general application.',
};

export const pageFields: PageField[] = [
  { group: 'Home page', key: 'home.highlights', label: 'Highlights under the slideshow', long: true, hint: 'One per line' },
  { group: 'Home page', key: 'home.stats', label: 'Numbers band', long: true, hint: 'One per line as number | label, e.g. 10+ | Years of care. Leave empty to hide. Only use verified figures.' },
  { group: 'Home page', key: 'home.aboutEyebrow', label: 'About small heading' },
  { group: 'Home page', key: 'home.aboutTitle', label: 'About heading' },
  { group: 'Home page', key: 'home.aboutText', label: 'About text', long: true, hint: 'One paragraph per line' },
  { group: 'Home page', key: 'home.servicesTitle', label: 'Services heading' },
  { group: 'Home page', key: 'home.servicesText', label: 'Services text' },
  { group: 'Home page', key: 'home.whyTitle', label: 'Why choose us heading' },
  { group: 'Home page', key: 'home.doctorsTitle', label: 'Doctors heading' },
  { group: 'Home page', key: 'home.doctorsText', label: 'Doctors text' },
  { group: 'Home page', key: 'home.teamTitle', label: 'Team heading' },
  { group: 'Home page', key: 'home.teamText', label: 'Team text' },
  { group: 'Home page', key: 'home.facilitiesTitle', label: 'Facilities heading' },
  { group: 'Home page', key: 'home.testimonialsTitle', label: 'Testimonials heading' },
  { group: 'Home page', key: 'home.careersTitle', label: 'Work With Us heading' },
  { group: 'Home page', key: 'home.careersText', label: 'Work With Us text', long: true },
  { group: 'About page', key: 'about.heroTitle', label: 'Page heading' },
  { group: 'About page', key: 'about.heroText', label: 'Page intro' },
  { group: 'About page', key: 'about.body', label: 'About text', long: true, hint: 'One paragraph per line' },
  { group: 'About page', key: 'about.mission', label: 'Our mission', long: true, hint: 'Leave empty to hide' },
  { group: 'About page', key: 'about.vision', label: 'Our vision', long: true, hint: 'Leave empty to hide' },
  { group: 'About page', key: 'about.approachTitle', label: 'Approach heading' },
  { group: 'Facilities page', key: 'facilities.heroTitle', label: 'Page heading' },
  { group: 'Facilities page', key: 'facilities.heroText', label: 'Page intro' },
  { group: 'Careers page', key: 'careers.heroTitle', label: 'Page heading' },
  { group: 'Careers page', key: 'careers.heroText', label: 'Page intro' },
  { group: 'Careers page', key: 'careers.intro', label: 'Introduction', long: true },
];

export const allNav = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/eye-care', label: 'Eye Care' },
  { to: '/doctors', label: 'Our Doctors' },
  { to: '/facilities', label: 'Facilities' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
] as const;
export type NavPath = typeof allNav[number]['to'];

/** Applies saved order/visibility to the menu. Home and Contact can never be hidden. */
export function arrangeNav(order: unknown, hidden: unknown) {
  const ord = Array.isArray(order) ? order.filter((v): v is string => typeof v === 'string') : [];
  const hide = new Set(Array.isArray(hidden) ? hidden.filter((v): v is string => typeof v === 'string') : []);
  const rank = (to: string) => { const i = ord.indexOf(to); return i === -1 ? 100 + allNav.findIndex(n => n.to === to) : i; };
  return [...allNav].sort((a, b) => rank(a.to) - rank(b.to)).filter(n => n.to === '/' || n.to === '/contact' || !hide.has(n.to));
}

export function lines(value: string) { return value.split('\n').map(v => v.trim()).filter(Boolean); }
export function parseStats(value: string) {
  return lines(value).map(l => { const [v, ...rest] = l.split('|'); return { value: (v ?? '').trim(), label: rest.join('|').trim() }; }).filter(s => s.value && s.label).slice(0, 6);
}
