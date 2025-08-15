export default function Footer() {
  return (
    <footer className="mt-16 py-10 border-t border-white/10">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-white/70">Designed with ♥ for your next adventure</div>
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-white/70">Dynamic Portfolio</span>
        </div>
      </div>
    </footer>
  );
}


