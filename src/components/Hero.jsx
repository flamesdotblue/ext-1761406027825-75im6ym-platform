import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative w-full h-[68vh] md:h-[72vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/Gt5HUob8aGDxOUep/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black pointer-events-none" />
      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
              Live Hackathons Scraped in Real Time
            </h1>
            <p className="mt-4 text-white/80 md:text-lg">
              Discover ongoing and upcoming hackathons from top platforms. Updated continuously, filter by mode, and never miss a ship window.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#live" className="inline-flex items-center px-5 py-2.5 rounded-md bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition">
                Explore Live Events
              </a>
              <a href="#sources" className="inline-flex items-center px-5 py-2.5 rounded-md border border-white/20 hover:bg-white/5 transition">
                View Sources
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
