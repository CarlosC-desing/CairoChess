export function SkeletonChessPuzzle() {
  return (
    <div className="space-y-3 sm:space-y-4" aria-busy="true" aria-label="Cargando ejercicio del día">
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 md:px-0">
        <div className="h-7 w-28 animate-pulse rounded-full border border-white/5 bg-white/10 sm:h-8 sm:w-32" />
        <div className="h-4 w-36 animate-pulse rounded bg-white/10" />
      </div>

      <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 touch-manipulation md:left-auto md:mx-auto md:w-full md:max-w-[500px] md:translate-x-0">
        <div className="aspect-square w-full overflow-hidden rounded-lg border border-white/5 bg-zinc-950/90 md:bg-zinc-900/80">
          <div className="grid h-full w-full grid-cols-8 grid-rows-8">
            {Array.from({ length: 64 }, (_, index) => (
              <div
                key={index}
                className={`animate-pulse ${index % 2 === Math.floor(index / 8) % 2 ? 'bg-white/5' : 'bg-white/2'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
