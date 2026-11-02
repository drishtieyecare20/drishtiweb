import { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { useSiteContent } from '@/data/site';
import { textData } from '@/lib/cms/types';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SectionHeading } from './Reveal';
import { Wrap } from './Sections';

export function WatchLearn() {
  const { videos } = useSiteContent(); const [selected, setSelected] = useState<string | null>(null);
  const video = videos.find(v => v.id === selected); const id = textData(video?.data, 'video_id');
  return <section className="py-20 sm:py-28"><Wrap>
    <SectionHeading eyebrow="Video Library" title="Watch & Learn" text="Explore eye-care awareness, expert guidance, and updates from Drishti Eye Care." />
    {videos.length ? <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{videos.map(v => {
      const videoId = textData(v.data, 'video_id');
      return <article key={v.id} className="overflow-hidden rounded-lg border bg-card">
        <Button variant="ghost" onClick={() => setSelected(v.id)} aria-label={`Play ${v.title}`} className="relative block aspect-video h-auto w-full overflow-hidden rounded-none p-0">
          <img src={v.image_url || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt={v.title} loading="lazy" className="h-full w-full object-cover" />
          <span className="absolute inset-0 grid place-items-center"><span className="grid h-12 w-12 place-items-center rounded-full bg-brand-red text-brand-red-foreground"><Play className="h-5 w-5" /></span></span>
        </Button><div className="p-5"><p className="text-xs font-semibold text-brand-red">{v.category}</p><h3 className="mt-1 text-xl">{v.title}</h3><p className="mt-2 text-sm text-muted-foreground">{v.description}</p><Button variant="link" asChild className="mt-3 px-0"><a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer"><ExternalLink />Watch on YouTube</a></Button></div>
      </article>;
    })}</div> : <p className="mt-8 border-t pt-6 text-muted-foreground">Eye-care videos will be available soon.</p>}
    <Dialog open={!!video} onOpenChange={open => { if (!open) setSelected(null); }}><DialogContent className="max-w-4xl"><DialogTitle>{video?.title}</DialogTitle><DialogDescription>{video?.description}</DialogDescription>{/^[A-Za-z0-9_-]{11}$/.test(id) && <iframe title={video?.title} src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`} className="aspect-video w-full rounded-md" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" sandbox="allow-scripts allow-same-origin allow-presentation" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />}<Button asChild variant="outline"><a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer">Watch on YouTube<ExternalLink /></a></Button></DialogContent></Dialog>
  </Wrap></section>;
}