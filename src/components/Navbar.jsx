import { Rocket } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 w-full backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-md bg-emerald-500/20 text-emerald-300">
            <Rocket size={18} />
          </div>
          <span className="font-semibold tracking-tight">HackScrape Live</span>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-white/80">
          <a href="#live" className="hover:text-white transition">Live</a>
          <a href="#sources" className="hover:text-white transition">Sources</a>
          <a href="#about" className="hover:text-white transition">About</a>
        </nav>
      </div>
    </header>
  );
}
