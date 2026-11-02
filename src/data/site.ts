// Central content store. Replace with CMS/database data later — components read only from here.
import hero from "@/assets/hero-exam.jpg";
import reception from "@/assets/reception.jpg";
import cataract from "@/assets/cataract.jpg";
import equipment from "@/assets/equipment.jpg";
import examRoom from "@/assets/exam-room.jpg";
import patientCare from "@/assets/patient-care.jpg";
import slide1 from "@/assets/slide-1.jpg";
import slide2 from "@/assets/slide-2.jpg";
import slide3 from "@/assets/slide-3.jpg";
import slide4 from "@/assets/slide-4.jpg";
import slide5 from "@/assets/slide-5.jpg";
import logoAsset from "@/assets/drishti-logo.png.asset.json";
import { useQuery, queryOptions } from '@tanstack/react-query';
import { readPublicContent } from '@/lib/cms/public.functions';
import { textData, objectData } from '@/lib/cms/types';
import { createContext, useContext } from 'react';
import type { ContentRow, SettingsRow } from '@/lib/cms/types';
import { allNav, arrangeNav, pageDefaults } from './pages';

export const images = { hero, reception, cataract, equipment, examRoom, patientCare };
export const logoUrl = logoAsset.url;

export const contact = {
  name: "Drishti Eye Care",
  tagline: "Affordable Care for Priceless Sight……",
  addressLines: ["17, Vidhya Nagar, Phase 2", "Near Her Health Hospital", "Narmadapuram Road", "Bhopal, Madhya Pradesh"],
  phones: ["99931 75735", "70490 12629"],
  phoneHref: "tel:+919993175735",
  whatsappHref: "https://wa.me/919993175735",
  directionsHref:
    "https://www.google.com/maps/dir/?api=1&destination=Drishti+Eye+Care+Vidhya+Nagar+Phase+2+Narmadapuram+Road+Bhopal",
  mapEmbed:
    "https://www.google.com/maps?q=Vidhya+Nagar+Phase+2+Narmadapuram+Road+Bhopal&output=embed",
};

export const nav = allNav;

export type IconName =
  | "eye" | "scan" | "user" | "wallet" | "heart" | "sofa" | "glasses" | "droplet"
  | "activity" | "baby" | "sun" | "stethoscope" | "smile" | "sparkles" | "shield";

export const whyChoose: { icon: IconName; title: string; text: string }[] = [
  { icon: "eye", title: "Experienced Eye Care", text: "Consultations led by qualified eye care professionals who take time to listen." },
  { icon: "scan", title: "Advanced Diagnostics", text: "Modern diagnostic equipment for precise, thorough eye evaluations." },
  { icon: "user", title: "Personalized Treatment", text: "Care plans shaped around your eyes, your lifestyle and your concerns." },
  { icon: "wallet", title: "Affordable Care", text: "Quality eye care with transparent, fair pricing for every family." },
  { icon: "heart", title: "Patient-Centred Approach", text: "Clear explanations and respectful care at every step of your visit." },
  { icon: "sofa", title: "Comfortable Environment", text: "A calm, clean and welcoming clinic designed for your comfort." },
];

// TODO(clinic): confirm which services are offered before publishing.
export const eyeServices: { icon: IconName; title: string; text: string }[] = [
  { icon: "eye", title: "Comprehensive Eye Examination", text: "Complete check of vision, eye pressure and eye health." },
  { icon: "sun", title: "Cataract Evaluation & Surgery", text: "Careful assessment and guidance on cataract treatment options." },
  { icon: "glasses", title: "LASIK / Vision Correction", text: "Evaluation for suitability and options to reduce dependence on glasses." },
  { icon: "activity", title: "Glaucoma Care", text: "Early detection, monitoring and management of eye pressure." },
  { icon: "scan", title: "Retina Care", text: "Assessment of the retina for conditions affecting central vision." },
  { icon: "droplet", title: "Diabetic Eye Care", text: "Regular screening to protect vision for people with diabetes." },
  { icon: "baby", title: "Pediatric Eye Care", text: "Gentle eye check-ups for infants, children and teens." },
  { icon: "sparkles", title: "Dry Eye Treatment", text: "Relief and management for irritated, dry or tired eyes." },
  { icon: "shield", title: "Cornea Care", text: "Diagnosis and care for conditions of the eye's front surface." },
  { icon: "stethoscope", title: "General Ophthalmology", text: "Everyday eye concerns, infections, redness and prescriptions." },
];

export const cataractSymptoms = [
  "Cloudy, blurry or dim vision",
  "Increasing difficulty seeing at night",
  "Sensitivity to light and glare",
  "Seeing halos around lights",
  "Frequent changes in glasses prescription",
  "Fading or yellowing of colours",
];

// PLACEHOLDER — replace with verified doctor profiles.
export const doctors = [
  { name: "Doctor Name", specialization: "Ophthalmologist", bio: "Profile details to be added. Replace with verified qualifications and experience.", photo: null as string | null },
  { name: "Doctor Name", specialization: "Eye Specialist", bio: "Profile details to be added. Replace with verified qualifications and experience.", photo: null as string | null },
  { name: "Doctor Name", specialization: "Optometrist", bio: "Profile details to be added. Replace with verified qualifications and experience.", photo: null as string | null },
];

// PLACEHOLDER — replace with verified Google / Justdial / patient reviews.
export const testimonials = [
  { name: "Patient Name", source: "Google Review", rating: 5, text: "Verified patient review will appear here. Replace this placeholder with a genuine review." },
  { name: "Patient Name", source: "Justdial", rating: 5, text: "Verified patient review will appear here. Replace this placeholder with a genuine review." },
  { name: "Patient Name", source: "Patient Feedback", rating: 5, text: "Verified patient review will appear here. Replace this placeholder with a genuine review." },
];

export const gallery = [
  { src: hero, category: "Eye Examination", alt: "Eye specialist examining a patient with a slit lamp" },
  { src: reception, category: "Reception", alt: "Bright reception and waiting area at Drishti Eye Care" },
  { src: equipment, category: "Equipment", alt: "Auto refractometer and phoropter in the examination room" },
  { src: patientCare, category: "Patient Care", alt: "Child trying on new spectacles with an eye care professional" },
  { src: examRoom, category: "Hospital", alt: "Eye examination room with patient chair and vision chart" },
  { src: cataract, category: "Doctors", alt: "Doctor examining an elderly patient's eye with an ophthalmoscope" },
  { src: slide2, category: "Equipment", alt: "Eye examination with an auto refractometer" },
];

export const facilities = [
  { title: "Diagnostic Equipment", src: equipment, text: "Modern instruments for accurate vision and eye health testing." },
  { title: "Examination Rooms", src: examRoom, text: "Quiet, well-equipped rooms for unhurried consultations." },
  { title: "Reception & Waiting", src: reception, text: "A calm, comfortable space for patients and families." },
  { title: "Consultation Rooms", src: slide4, text: "Calm consultation rooms where every question is answered." },
  { title: "Patient Facilities", src: patientCare, text: "Family-friendly care, including for our youngest patients." },
];

export const heroSlides: { eyebrow: string; title: string; text: string; cta: string; to: "/contact" | "/eye-care"; hash?: string; img: string; alt: string }[] = [
  { eyebrow: "Your Vision, Our Priority", title: "Your Vision, Our Priority", text: "Compassionate eye care with a patient-first approach.", cta: "Book an Appointment", to: "/contact", hash: "appointment", img: slide1, alt: "Ophthalmologist examining a patient with a slit lamp" },
  { eyebrow: "Modern Eye Diagnostics", title: "A Closer Look at Your Eye Health", text: "Thoughtful eye examinations supported by appropriate diagnostic technology.", cta: "Explore Eye Care", to: "/eye-care", img: slide2, alt: "Eye examination using ophthalmic diagnostic equipment" },
  { eyebrow: "Affordable Care for Priceless Sight", title: "Quality Eye Care Within Reach", text: "Our commitment is to make eye care accessible, compassionate, and patient-focused.", cta: "Contact Our Team", to: "/contact", img: slide3, alt: "Doctor consulting with a patient" },
  { eyebrow: "Eye Care for Every Stage of Life", title: "Care That Puts You First", text: "From routine eye check-ups to consultations for specific eye concerns.", cta: "View Our Services", to: "/eye-care", img: slide4, alt: "Ophthalmologist in consultation with a patient and family member" },
  { eyebrow: "Take the First Step Towards Better Vision", title: "A Clearer Tomorrow Starts Today", text: "Make time for your eye health. Connect with Drishti Eye Care to plan your visit.", cta: "Schedule Your Visit", to: "/contact", hash: "appointment", img: slide5, alt: "Welcoming eye clinic reception with doctor greeting a patient" },
];

/** Autoplay interval in seconds (clamped to 15–30). */
export const heroIntervalSeconds = 20;

export type PublicSiteContent = { content: ContentRow[]; settings: SettingsRow | null } | null;
export const SiteInitialContext = createContext<PublicSiteContent>(null);
export const siteContentOptions = queryOptions({ queryKey: ['site-content'], queryFn: (): Promise<PublicSiteContent> => readPublicContent(), staleTime: 30_000, refetchInterval: 60_000 });
export function useSiteContent() {
  const initial = useContext(SiteInitialContext);
  const { data: result } = useQuery({ ...siteContentOptions, initialData: initial });
  const rows = result?.content ?? [];
  const settings = result?.settings;
  const d = objectData(settings?.data);
  const managedContact = { ...contact, ...d, name: textData(d, 'name', contact.name), tagline: textData(d, 'tagline', contact.tagline),
    phones: Array.isArray(d['phones']) ? d['phones'].filter((v): v is string => typeof v === 'string') : contact.phones,
    addressLines: Array.isArray(d['addressLines']) ? d['addressLines'].filter((v): v is string => typeof v === 'string') : contact.addressLines,
    phoneHref: textData(d, 'phoneHref', contact.phoneHref), whatsappHref: textData(d, 'whatsappHref', contact.whatsappHref),
    directionsHref: textData(d, 'directionsHref', contact.directionsHref), mapEmbed: textData(d, 'mapEmbed', contact.mapEmbed), openingHours: textData(d, 'openingHours'), facebook: textData(d, 'facebook'), instagram: textData(d, 'instagram'), youtube: textData(d, 'youtube'),
  };
  const slides = rows.filter(r => r.kind === 'slideshow' && r.image_url).map(r => {
    const path = textData(r.data, 'cta_destination', '/contact');
    return { title: r.title, eyebrow: textData(r.data, 'eyebrow', managedContact.name), text: r.description, cta: textData(r.data, 'cta_label', 'Book an Appointment'),
      to: (path.split('#')[0] === '/eye-care' ? '/eye-care' : '/contact') as '/eye-care' | '/contact', hash: path.includes('#') ? path.split('#')[1] : undefined,
      img: r.image_url ?? '', alt: textData(r.data, 'alt') || r.title };
  });
  const pagesData = objectData((settings as { pages?: unknown } | null | undefined)?.pages);
  const text = (key: string) => { const v = pagesData[key]; return typeof v === 'string' ? v : pageDefaults[key] ?? ''; };
  const managedFacilities = rows.filter(r => r.kind === 'facilities').map(r => ({ id: r.id, title: r.title, src: r.image_url ?? images.examRoom, text: r.description }));
  const jobs = rows.filter(r => r.kind === 'jobs').map(r => ({ id: r.id, title: r.title, summary: r.description, department: r.category, location: textData(r.data, 'location', 'Bhopal'), type: textData(r.data, 'employment_type', 'Full-time'), experience: textData(r.data, 'experience'), requirements: textData(r.data, 'requirements'), details: textData(r.data, 'details'), image: r.image_url ?? null }));
  return {
    contact: managedContact, logoUrl: settings?.logo_url || logoUrl, nav: arrangeNav(pagesData['nav.order'], pagesData['nav.hidden']), images, whyChoose, cataractSymptoms,
    facilities: managedFacilities.length ? managedFacilities : facilities.map(f => ({ id: null as string | null, ...f })), jobs, text,
    heroSlides: slides.length ? slides : heroSlides, heroIntervalSeconds: settings?.slideshow_interval ?? heroIntervalSeconds,
    eyeServices: result ? rows.filter(r => r.kind === 'services').map(r => ({ id: r.id as string | null, title: r.title, text: r.description, icon: 'eye' as IconName, image: r.image_url ?? null, details: textData(r.data, 'details') })) : [],
    doctors: result ? rows.filter(r => r.kind === 'doctors').map(r => ({ id: r.id as string | null, name: r.title, specialization: textData(r.data, 'specialization'), bio: r.description, qualifications: textData(r.data, 'qualifications'), photo: r.image_url ?? null, verified: true })) : [],
    team: rows.filter(r => r.kind === 'team').map(r => ({ id: r.id, name: r.title, role: textData(r.data, 'specialization'), bio: r.description, photo: r.image_url ?? null })),
    testimonials: result ? rows.filter(r => r.kind === 'testimonials').map(r => ({ name: r.title, source: textData(r.data, 'source', 'Patient Feedback'), rating: Number(objectData(r.data)['rating']) || 0, text: r.description, verified: true })) : [],
    gallery: result ? rows.filter(r => r.kind === 'gallery' && r.image_url).map(r => ({ src: r.image_url ?? '', category: r.category || 'Clinic', alt: textData(r.data, 'alt') || r.title })) : gallery,
    videos: rows.filter(r => r.kind === 'youtube').sort((a, b) => Number(b.featured) - Number(a.featured) || a.display_order - b.display_order),
    ready: !!result,
  };
}
