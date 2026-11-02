import { createFileRoute } from "@tanstack/react-router";
import { UserRound, GraduationCap } from "lucide-react";
import { useSiteContent } from "@/data/site";
import { seo } from "@/lib/seo";
import { DetailHero, EnquiryCard, NotFoundBlock, Paragraphs } from "@/components/site/Detail";
import { AppointmentSection, Wrap } from "@/components/site/Sections";

export const Route = createFileRoute("/doctors_/$id")({
  head: () => seo("Doctor Profile | Drishti Eye Care, Bhopal", "Qualifications, specialisation and background of a Drishti Eye Care doctor, with appointment booking."),
  component: DoctorDetail,
});

function DoctorDetail() {
  const { id } = Route.useParams();
  const { doctors } = useSiteContent();
  const doctor = doctors.find((d) => d.id === id);
  const back = { to: "/doctors" as const, label: "All doctors" };
  if (!doctor) return <NotFoundBlock what="profile" back={back} />;
  return (
    <>
      <DetailHero eyebrow={doctor.specialization || "Eye Specialist"} title={doctor.name} back={back} />
      <section className="py-16 sm:py-20">
        <Wrap className="grid gap-10 lg:grid-cols-[320px_1fr_300px]">
          <div className="grid aspect-[4/5] place-items-center overflow-hidden rounded-3xl bg-secondary shadow-soft">
            {doctor.photo ? <img src={doctor.photo} alt={doctor.name} className="h-full w-full object-cover" /> : <UserRound className="h-24 w-24 text-primary/30" strokeWidth={1.2} />}
          </div>
          <article>
            {doctor.qualifications && <p className="flex items-center gap-2 font-semibold text-primary-deep"><GraduationCap className="h-5 w-5 text-brand-red" />{doctor.qualifications}</p>}
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground"><Paragraphs text={doctor.bio} /></div>
          </article>
          <EnquiryCard title={`Consult ${doctor.name}`} />
        </Wrap>
      </section>
      <AppointmentSection />
    </>
  );
}
