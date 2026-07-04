import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CairoChess — Academia de Ajedrez',
  description: 'Academia de ajedrez Cairo. Ejercicio del día, equipo y contacto.',
  icons: {
    icon: '/cairo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} font-sans`}>{children}</body>
    </html>
  );
}
