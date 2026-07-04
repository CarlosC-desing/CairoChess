import Image from 'next/image';

type ProfileCardProps = {
  role: string;
  name: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  priority?: boolean;
};

const CARD_BG = 'rgb(0 0 0 / 0.3)';

const IMAGE_MASK =
  'linear-gradient(to right, #000 0%, #000 72%, rgb(0 0 0 / 0.45) 86%, transparent 100%)';

const TEXT_PANEL_MASK =
  'linear-gradient(to right, transparent 0%, rgb(0 0 0 / 0.35) 24%, #000 42%)';

const BLEND_OVERLAY = `linear-gradient(to right, transparent 0%, transparent 44%, rgb(0 0 0 / 0.3) 52%, rgb(0 0 0 / 0.5) 58%, ${CARD_BG} 66%, ${CARD_BG} 100%)`;

export function ProfileCard({
  role,
  name,
  description,
  imageSrc,
  imageAlt,
  priority = false,
}: ProfileCardProps) {
  return (
    <div className="flex flex-col">
      <article className="relative min-h-[148px] overflow-hidden rounded-2xl border border-white/5 bg-zinc-950/90 sm:min-h-[160px] md:bg-black/30 md:backdrop-blur-sm">
        <div
          className="absolute inset-y-0 left-0 w-[62%]"
          style={{
            WebkitMaskImage: IMAGE_MASK,
            maskImage: IMAGE_MASK,
          }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'low'}
            className="object-cover object-top"
            sizes="(max-width: 768px) 62vw, 280px"
          />
        </div>

        <div
          className="absolute inset-y-0 right-0 z-0 w-[58%] bg-black/85 md:bg-transparent md:backdrop-blur-sm"
          style={{
            background: CARD_BG,
            WebkitMaskImage: TEXT_PANEL_MASK,
            maskImage: TEXT_PANEL_MASK,
          }}
        />

        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-1 w-full"
          style={{ background: BLEND_OVERLAY }}
        />

        <div className="relative z-10 flex min-h-[148px] w-full flex-col items-center justify-center py-4 pl-[48%] pr-4 text-center sm:min-h-[160px] sm:pl-[46%] sm:pr-5">
          <p className="text-[10px] uppercase tracking-widest text-zinc-400 sm:text-xs">{role}</p>
          <h3 className="mt-1 text-sm font-semibold leading-tight text-white sm:text-base">
            {name}
          </h3>
        </div>
      </article>

      <p className="mt-3 px-1 text-center text-xs leading-relaxed text-zinc-400 sm:text-sm">
        {description}
      </p>
    </div>
  );
}
