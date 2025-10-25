import { Calendar, MapPin, Globe, ExternalLink, Clock } from 'lucide-react';

export default function HackathonCard({ event }) {
  const {
    name,
    url,
    start,
    end,
    mode,
    location,
    image,
    source,
  } = event;

  const timeframe = `${new Date(start).toLocaleDateString()} - ${new Date(end).toLocaleDateString()}`;

  return (
    <div className="group rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition shadow-sm overflow-hidden">
      {image ? (
        <div className="aspect-[16/9] w-full overflow-hidden bg-white/5">
          <img src={image} alt={name} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
        </div>
      ) : (
        <div className="aspect-[16/9] w-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/10" />
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-snug line-clamp-2">{name}</h3>
          {source && (
            <span className="shrink-0 text-[10px] uppercase tracking-wider text-white/60 bg-white/5 border border-white/10 px-2 py-1 rounded">
              {source}
            </span>
          )}
        </div>
        <div className="mt-3 space-y-2 text-sm text-white/80">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-white/60" />
            <span>{timeframe}</span>
          </div>
          <div className="flex items-center gap-2">
            {mode === 'online' ? <Globe size={16} className="text-white/60" /> : <MapPin size={16} className="text-white/60" />}
            <span>{mode === 'online' ? 'Online' : location || 'In-person'}</span>
          </div>
          {event.live && (
            <div className="flex items-center gap-2 text-emerald-300">
              <Clock size={16} />
              <span>Happening now</span>
            </div>
          )}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200"
          >
            View Details <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
