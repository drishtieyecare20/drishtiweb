import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { PageHero } from "@/components/site/Reveal";
import { AppointmentSection, ContactSection } from "@/components/site/Sections";

export const Route = createFileRoute("/contact")({
  head: () => seo("Contact & Book Appointment | Drishti Eye Care, Bhopal", "Visit Drishti Eye Care at Vidhya Nagar, Narmadapuram Road, Bhopal. Call 99931 75735 or book an appointment online."),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Visit or book your consultation." text="Call, WhatsApp or request an appointment — we'll confirm your visit." />
      <ContactSection />
      <AppointmentSection />
    </>
  );
}
