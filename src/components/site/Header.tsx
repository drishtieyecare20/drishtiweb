import { Link } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useSiteContent } from "@/data/site";
import { ctaClass } from "./Buttons";
import { cn } from "@/lib/utils";

export function Header() {
  const { contact, logoUrl, nav } = useSiteContent();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={cn("sticky top-0 z-50 border-b bg-background/95 backdrop-blur transition-shadow", scrolled ? "shadow-soft" : "border-transparent")}>
      <div className="hidden border-b bg-primary-deep text-primary-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2 text-xs">
          <span className="opacity-80">{contact.addressLines.join(', ')}</span>
          <a href={contact.phoneHref} className="flex items-center gap-2 font-semibold hover:opacity-80">
            <Phone className="h-3.5 w-3.5" /> {contact.phones.join("  ·  ")}
          </a>
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 sm:px-8 xl:flex xl:justify-between">
        <Link to="/" className="flex min-w-0 shrink-0 items-center" aria-label="Drishti Eye Care home">
          <img src={logoUrl} alt="Drishti Eye Care logo" className="h-12 w-auto sm:h-14" width={1149} height={561} />
        </Link>
        <nav className="hidden items-center gap-1 xl:flex" aria-label="Main">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary data-[status=active]:text-primary data-[status=active]:font-semibold"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/contact" hash="appointment" className={ctaClass({ variant: "red", size: "sm", className: "hidden sm:inline-flex" })}>
            Book Appointment
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-11 w-11 place-items-center rounded-full border text-primary xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t bg-background xl:hidden" aria-label="Mobile">
          <div className="mx-auto grid max-w-7xl gap-1 px-5 py-4 sm:px-8">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: n.to === "/" }}
                className="rounded-xl px-4 py-3 text-base font-medium hover:bg-secondary data-[status=active]:bg-secondary data-[status=active]:text-primary"
              >
                {n.label}
              </Link>
            ))}
            <Link to="/contact" hash="appointment" onClick={() => setOpen(false)} className={ctaClass({ variant: "red", size: "lg", className: "mt-3" })}>
              Book Appointment
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
