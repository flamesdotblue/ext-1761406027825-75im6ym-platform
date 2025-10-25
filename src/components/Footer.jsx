export default function Footer() {
  return (
    <footer id="about" className="mt-16 border-t border-white/10 bg-white/[0.02]">
      <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-white/60">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            © {new Date().getFullYear()} HackScrape Live. Aggregating hackathons for builders.
          </p>
          <p>
            Built with React, Tailwind, and Spline.
          </p>
        </div>
      </div>
    </footer>
  );
}
