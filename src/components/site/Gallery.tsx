import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useSiteContent } from "@/data/site";
import { cn } from "@/lib/utils";

export function Gallery({ filters = true, limit }: { filters?: boolean; limit?: number }) {
  const { gallery } = useSiteContent();
  const cats = ["All", ...Array.from(new Set(gallery.map((g) => g.category)))];
  const [cat, setCat] = useState("All");
  const [idx, setIdx] = useState<number | null>(null);
  const items = (cat === "All" ? gallery : gallery.filter((g) => g.category === cat)).slice(0, limit);

  useEffect(() => {
    if (idx === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIdx(null);
      if (e.key === "ArrowRight") setIdx((i) => i === null || !items.length ? null : (i + 1) % items.length);
      if (e.key === "ArrowLeft") setIdx((i) => i === null || !items.length ? null : (i - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [idx, items.length]);

  return (
    <div>
      {filters && (
        <div className="mb-8 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={cn("rounded-full border px-4 py-2 text-sm font-medium transition-colors", c === cat ? "border-primary bg-primary text-primary-foreground" : "bg-background hover:border-primary/40")}>
              {c}
            </button>
          ))}
        </div>
      )}
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map((g, i) => (
          <button key={g.alt} onClick={() => setIdx(i)} className="group relative mb-4 block w-full overflow-hidden rounded-2xl break-inside-avoid">
            <img src={g.src} alt={g.alt} loading="lazy" className="w-full transition-transform duration-700 group-hover:scale-[1.04]" />
            <span className="absolute bottom-3 left-3 rounded-full bg-background/95 px-3 py-1 text-xs font-semibold text-primary-deep">{g.category}</span>
          </button>
        ))}
      </div>
      {idx !== null && items[idx] && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-primary-deep/90 p-4" role="dialog" aria-modal onClick={() => setIdx(null)}>
          <img src={items[idx].src} alt={items[idx].alt} className="max-h-[85vh] max-w-full rounded-xl" onClick={(e) => e.stopPropagation()} />
          <button className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-background text-primary" aria-label="Close"><X className="h-5 w-5" /></button>
          <button onClick={(e) => { e.stopPropagation(); setIdx((idx - 1 + items.length) % items.length); }} className="absolute left-4 grid h-11 w-11 place-items-center rounded-full bg-background text-primary" aria-label="Previous"><ChevronLeft className="h-5 w-5" /></button>
          <button onClick={(e) => { e.stopPropagation(); setIdx((idx + 1) % items.length); }} className="absolute right-4 grid h-11 w-11 place-items-center rounded-full bg-background text-primary" aria-label="Next"><ChevronRight className="h-5 w-5" /></button>
        </div>
      )}
    </div>
  );
}
