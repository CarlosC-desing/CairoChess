import Image from 'next/image';
import { ACADEMY_ADDRESS } from '@/lib/contact';

const footerLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#sobre-nosotros', label: 'Sobre Nosotros' },
  { href: '#contacto', label: 'Contáctanos' },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-neutral-950">
      <div className="mx-auto max-w-6xl px-3 py-10 sm:px-4 sm:py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-8">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <Image
              src="/title.png"
              alt="CairoChess"
              width={600}
              height={212}
              className="h-8 w-auto sm:h-9"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-400">
              Academia de ajedrez dedicada a formar jugadores estratégicos con pasión y disciplina.
            </p>
            <p className="mt-6 text-xs text-zinc-500 sm:text-sm">
              © {new Date().getFullYear()} CairoChess. Todos los derechos reservados.
            </p>
          </div>

          <div className="flex flex-col items-center text-center md:items-end md:text-right">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
              Navegación
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <p className="text-sm text-zinc-400">{ACADEMY_ADDRESS}</p>
            </div>
            <p className="mt-6 text-xs text-zinc-500 sm:text-sm">
              Desarrollado por: <span className="shimmer-name font-semibold">Carlos Canelón</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
