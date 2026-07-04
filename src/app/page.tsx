import Image from 'next/image';
import { ChessPuzzle } from '@/components/ChessPuzzle';
import { ProfileCard } from '@/components/ProfileCard';
import { ScheduleCard } from '@/components/ScheduleCard';
import { SiteFooter } from '@/components/SiteFooter';
import { SocialLinks } from '@/components/SocialLinks';
import { ACADEMY_ADDRESS } from '@/lib/contact';

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#sobre-nosotros', label: 'Sobre Nosotros' },
  { href: '#contacto', label: 'Contáctanos' },
];

const profiles = [
  {
    id: 'fundador',
    role: 'Fundador',
    name: 'Ricardo Colmenarez',
    imageSrc: '/ricardo_colmenarez.png',
    imageAlt: 'Ricardo Colmenarez, Fundador de CairoChess',
    description:
      'Impulsa la academia con la visión de formar jugadores estratégicos y una comunidad apasionada por el ajedrez.',
  },
  {
    id: 'profesor',
    role: 'Profesor',
    name: 'Richard Singer',
    imageSrc: '/richard_singer.png',
    imageAlt: 'Richard Singer, Profesor de CairoChess',
    description:
      'Enseñanza progresiva desde táctica básica hasta planificación posicional, adaptada a cada nivel.',
  },
  {
    id: 'administracion',
    role: 'Administración',
    name: 'Albert Perdomo',
    imageSrc: '/albert_perdomo.png',
    imageAlt: 'Albert Perdomo, Administración de CairoChess',
    description:
      'Coordina horarios, torneos internos y soporte a familias para una experiencia fluida en la academia.',
  },
  {
    id: 'ubicacion',
    role: 'Ubicación',
    name: 'Sede Cairo',
    imageSrc: '/fachada.jpg',
    imageAlt: 'Fachada de la sede CairoChess',
    description: ACADEMY_ADDRESS,
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:px-4 sm:py-4">
          <a href="#inicio" className="flex min-w-0 shrink items-center">
            <Image
              src="/CairoLogo.png"
              alt="CairoChess"
              width={387}
              height={600}
              className="h-8 w-auto sm:h-9"
              priority
            />
          </a>
          <ul className="flex shrink-0 gap-2 text-xs sm:gap-4 sm:text-sm md:gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-zinc-400 transition-colors hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="flex-1 pt-14 sm:pt-16">
        <section id="inicio" className="mx-auto max-w-6xl px-3 py-8 sm:px-4 sm:py-10 md:py-16">
          <div className="mb-6 text-center sm:mb-8 md:mb-10">
            <h1 className="text-2xl font-bold text-text-light sm:text-3xl md:text-4xl">
              Ejercicio del Día
            </h1>
            <p className="mt-2 text-sm text-text-muted sm:text-base">
              Resuelve el puzzle diario de Lichess y mejora tu visión táctica.
            </p>
          </div>
          <ChessPuzzle />
        </section>

        <section id="sobre-nosotros" className="py-10 sm:py-14">
          <div className="mx-auto max-w-6xl px-3 sm:px-4">
            <h2 className="mb-6 text-center text-xl font-bold text-text-light sm:mb-8 sm:text-2xl md:text-3xl">
              Sobre Nosotros
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
              {profiles.map((profile) => (
                <ProfileCard
                  key={profile.id}
                  role={profile.role}
                  name={profile.name}
                  description={profile.description}
                  imageSrc={profile.imageSrc}
                  imageAlt={profile.imageAlt}
                />
              ))}
            </div>

            <div className="mt-6 flex justify-center sm:mt-8">
              <ScheduleCard />
            </div>
          </div>
        </section>

        <section
          id="contacto"
          className="mx-auto max-w-6xl px-3 py-10 text-center sm:px-4 sm:py-12"
        >
          <h2 className="text-lg font-semibold text-text-light sm:text-xl">Contáctanos</h2>
          <p className="mt-2 text-sm text-text-muted sm:text-base">
            Escríbenos para inscripciones, horarios y torneos.
          </p>
          <SocialLinks />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
