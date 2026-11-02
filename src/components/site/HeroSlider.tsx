import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { useSiteContent } from "@/data/site";
import { ctaClass } from "./Buttons";

export function HeroSlider() {
  const { contact, heroIntervalSeconds, heroSlides } = useSiteContent();
  const intervalMs = Math.min(30, Math.max(15, heroIntervalSeconds)) * 1000;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const n = heroSlides.length;
  const go = useCallback((d: number) => setI((c) => (c + d + n) % n), [n]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const f = () => setReduced(mq.matches);
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const t = setTimeout(() => go(1), intervalMs);
    return () => clearTimeout(t);
  }, [i, paused, reduced, go, intervalMs]);

  useEffect(() => { setI(0); }, [n]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Drishti Eye Care highlights"
      className="relative h-[620px] overflow-hidden bg-primary-deep sm:h-[640px] lg:h-[calc(100vh-5rem)] lg:max-h-[760px] lg:min-h-[580px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {heroSlides.map((s, k) => {
        const active = k === i;
        return (
          <div
            key={s.title}
            role="group"
            aria-roledescription="slide"
            aria-label={`${k + 1} of ${n}`}
            aria-hidden={!active}
            inert={!active}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out motion-reduce:transition-none ${active ? "z-10 opacity-100" : "z-0 opacity-0"}`}
          >
            <img
              src={s.img}
              alt={s.alt}
              width={1920}
              height={1088}
              loading={k === 0 ? "eager" : "lazy"}
              fetchPriority={k === 0 ? "high" : "auto"}
              className={`absolute inset-0 h-full w-full object-cover object-[70%_center] motion-reduce:!scale-100 ${active ? "scale-105 transition-transform duration-[20000ms] ease-linear" : "scale-100"}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/90 via-primary-deep/55 to-primary-deep/20 lg:bg-gradient-to-r lg:from-primary-deep/90 lg:via-primary-deep/55 lg:to-transparent" aria-hidden />
            <div className="relative mx-auto flex h-full max-w-7xl items-end px-5 pb-24 sm:px-8 lg:items-center lg:pb-0">
              <div className="max-w-xl text-primary-foreground">
                <p className="eyebrow !text-primary-foreground/85">{s.eyebrow}</p>
                <h1 className="mt-4 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">{s.title}</h1>
                <p className="mt-5 text-lg leading-relaxed opacity-90">{s.text}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link to={s.to} {...(s.hash ? { hash: s.hash } : {})} className={ctaClass({ variant: "red", size: "lg", className: "w-full sm:w-auto" })}>{s.cta}</Link>
                  <a href={contact.phoneHref} className={ctaClass({ variant: "ghostLight", size: "lg", className: "w-full sm:w-auto" })}><Phone className="h-4 w-4" />Call Us</a>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="absolute inset-x-0 bottom-16 sm:bottom-20 z-20 mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <div className="flex gap-2">
          {heroSlides.map((s, k) => (
            <button
              key={s.title}
              type="button"
              onClick={() => setI(k)}
              aria-label={`Go to slide ${k + 1}`}
              aria-current={k === i}
              className={`h-2 rounded-full transition-all ${k === i ? "w-8 bg-primary-foreground" : "w-2 bg-primary-foreground/45 hover:bg-primary-foreground/70"}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(-1)} aria-label="Previous slide" className="grid h-11 w-11 place-items-center rounded-full border border-primary-foreground/40 text-primary-foreground transition hover:bg-primary-foreground/15"><ChevronLeft className="h-5 w-5" /></button>
          <button type="button" onClick={() => go(1)} aria-label="Next slide" className="grid h-11 w-11 place-items-center rounded-full border border-primary-foreground/40 text-primary-foreground transition hover:bg-primary-foreground/15"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>
    </section>
  );
}
