import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { PageHero } from "@/components/site/Reveal";
import { Gallery } from "@/components/site/Gallery";
import { Wrap } from "@/components/site/Sections";

export const Route = createFileRoute("/gallery")({
  head: () => seo("Gallery | Drishti Eye Care, Bhopal", "A look inside Drishti Eye Care — our clinic, equipment, examination rooms and patient care."),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <>
      <PageHero eyebrow="Gallery" title="Inside Drishti Eye Care" text="Our clinic, our equipment and the care we offer every day." />
      <section className="py-16"><Wrap><Gallery /></Wrap></section>
    </>
  );
}
