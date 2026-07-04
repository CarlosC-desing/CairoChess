import { ACADEMY_SCHEDULE } from '@/lib/contact';

export function ScheduleCard() {
  const openDays = ACADEMY_SCHEDULE.filter((entry) => entry.morning || entry.afternoon);

  return (
    <article className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/5 bg-black/30 backdrop-blur-sm">
      <div className="border-b border-white/5 bg-zinc-900/80 px-4 py-4 text-center sm:px-5">
        <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-black/50 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 9h18M4.5 21h15a1.5 1.5 0 001.5-1.5V7.5A1.5 1.5 0 0019.5 6h-15A1.5 1.5 0 003 7.5v12A1.5 1.5 0 004.5 21z"
            />
          </svg>
        </div>
        <p className="text-[10px] uppercase tracking-widest text-zinc-400 sm:text-xs">
          Horarios de Atención
        </p>
        <h3 className="mt-1 text-base font-semibold text-white sm:text-lg">Academia Cairo</h3>
      </div>

      <div className="p-4 sm:p-5">
        <div className="mb-3 grid grid-cols-7 gap-1">
          {ACADEMY_SCHEDULE.map((entry) => {
            const isOpen = entry.morning || entry.afternoon;
            return (
              <div key={entry.day} className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-medium text-zinc-500">{entry.short}</span>
                <div
                  className={`flex h-9 w-full items-center justify-center rounded-md border text-xs font-semibold sm:h-10 ${
                    isOpen
                      ? 'border-white/20 bg-white/10 text-white'
                      : 'border-white/5 bg-black/20 text-zinc-600'
                  }`}
                >
                  {isOpen ? '●' : '—'}
                </div>
              </div>
            );
          })}
        </div>

        <ul className="space-y-2 border-t border-white/5 pt-4">
          {openDays.map((entry) => (
            <li
              key={entry.day}
              className="flex items-center justify-between rounded-lg border border-white/5 bg-black/20 px-3 py-2 text-sm"
            >
              <span className="font-medium text-white">{entry.day}</span>
              <div className="flex gap-2 text-xs text-zinc-400">
                {entry.morning && (
                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-zinc-300">
                    Mañana
                  </span>
                )}
                {entry.afternoon && (
                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-zinc-300">
                    Tarde
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
