import { useEffect, useMemo, useRef, useState } from 'react';
import HackathonCard from './HackathonCard';
import { Search, Filter, RefreshCw } from 'lucide-react';

const demoData = [
  {
    id: 'mlh-1',
    name: 'Hack the Planet',
    url: 'https://mlh.io',
    start: new Date(Date.now() + 86400000 * 2).toISOString(),
    end: new Date(Date.now() + 86400000 * 4).toISOString(),
    mode: 'online',
    location: '',
    image: '',
    source: 'MLH',
    live: false,
  },
  {
    id: 'dvf-1',
    name: 'Devfolio Dev Hack',
    url: 'https://devfolio.co',
    start: new Date(Date.now() - 86400000).toISOString(),
    end: new Date(Date.now() + 86400000).toISOString(),
    mode: 'in-person',
    location: 'Bengaluru, IN',
    image: '',
    source: 'Devfolio',
    live: true,
  },
  {
    id: 'gh-1',
    name: 'Open Source Ship Week',
    url: 'https://github.com',
    start: new Date(Date.now() + 86400000 * 6).toISOString(),
    end: new Date(Date.now() + 86400000 * 9).toISOString(),
    mode: 'online',
    location: '',
    image: '',
    source: 'Community',
    live: false,
  },
];

function usePolling(callback, delay) {
  const savedCallback = useRef(callback);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    if (delay == null) return;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

export default function LiveHackathons() {
  const [events, setEvents] = useState(demoData);
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState('all');
  const [onlyLive, setOnlyLive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  const fetchEvents = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setEvents((prev) => {
      // Simulate a rolling live status change to emulate real-time updates
      const updated = prev.map((e, i) => (i === Math.floor(Math.random() * prev.length) ? { ...e, live: !e.live } : e));
      return updated;
    });
    setLastUpdated(Date.now());
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  usePolling(fetchEvents, 60000);

  const filtered = useMemo(() => {
    return events
      .filter((e) => (mode === 'all' ? true : e.mode === mode))
      .filter((e) => (onlyLive ? e.live : true))
      .filter((e) => e.name.toLowerCase().includes(query.toLowerCase()));
  }, [events, mode, onlyLive, query]);

  return (
    <section id="live" className="relative py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Live Hackathons</h2>
            <p className="mt-1 text-white/70 text-sm">Real-time updates. Auto-refreshing every 60 seconds.</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/60">
            <span className="inline-flex items-center gap-2 px-2 py-1 rounded bg-white/5 border border-white/10">
              <span className={`h-2 w-2 rounded-full ${loading ? 'bg-yellow-400 animate-pulse' : 'bg-emerald-400'}`} />
              Updated {Math.max(0, Math.round((Date.now() - lastUpdated) / 1000))}s ago
            </span>
            <button
              onClick={fetchEvents}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition"
            >
              <RefreshCw size={14} />
              Refresh
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-3 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search hackathons"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-white/[0.06] border border-white/10 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: 'all', label: 'All' },
                { key: 'online', label: 'Online' },
                { key: 'in-person', label: 'In-person' },
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setMode(opt.key)}
                  className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg border text-sm transition ${
                    mode === opt.key
                      ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200'
                      : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.06] text-white'
                  }`}
                >
                  <Filter size={14} /> {opt.label}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={onlyLive}
                onChange={(e) => setOnlyLive(e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-transparent"
              />
              Show only happening now
            </label>

            <div id="sources" className="mt-6 rounded-lg border border-white/10 bg-white/[0.03] p-3">
              <p className="text-xs text-white/60">Sources</p>
              <ul className="mt-2 space-y-2 text-sm text-white/80 list-disc list-inside">
                <li>MLH directory (scraped server-side recommended)</li>
                <li>Devfolio listings</li>
                <li>Community submissions</li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-9">
            {filtered.length === 0 ? (
              <div className="h-40 rounded-lg border border-white/10 bg-white/[0.02] grid place-items-center text-white/60">
                No hackathons found.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((ev) => (
                  <HackathonCard key={ev.id} event={ev} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
