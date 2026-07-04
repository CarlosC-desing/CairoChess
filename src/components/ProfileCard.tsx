type ProfileCardProps = {
  role: string;
  name: string;
  description: string;
};

export function ProfileCard({ role, name, description }: ProfileCardProps) {
  return (
    <div className="flex flex-col">
      <article className="relative flex min-h-[148px] overflow-hidden rounded-2xl border border-white/5 bg-black/30 backdrop-blur-sm sm:min-h-[160px]">
        <div className="absolute inset-y-0 left-0 w-[42%] bg-zinc-900">
          <div className="flex h-full items-center justify-center">
            <span className="text-xs text-zinc-600">Foto</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/50 to-black" />
        </div>

        <div className="relative z-10 flex w-full flex-col justify-center py-4 pl-[38%] pr-4 sm:py-5 sm:pl-[36%] sm:pr-5">
          <p className="text-[10px] uppercase tracking-widest text-zinc-400 sm:text-xs">{role}</p>
          <h3 className="mt-1 text-sm font-semibold leading-tight text-white sm:text-base">
            {name}
          </h3>
        </div>
      </article>

      <p className="mt-3 px-1 text-xs leading-relaxed text-zinc-400 sm:text-sm">{description}</p>
    </div>
  );
}
