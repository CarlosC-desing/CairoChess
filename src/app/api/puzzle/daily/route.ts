import { isLichessDailyPuzzle } from '@/lib/landing-schemas';

const LICHESS_DAILY_PUZZLE_URL = 'https://lichess.org/api/puzzle/daily';

export const revalidate = 3600;

export async function GET() {
  try {
    const res = await fetch(LICHESS_DAILY_PUZZLE_URL, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return Response.json({ error: 'No se pudo cargar el puzzle' }, { status: 502 });
    }

    const data: unknown = await res.json();

    if (!isLichessDailyPuzzle(data)) {
      return Response.json({ error: 'Respuesta de puzzle inválida' }, { status: 502 });
    }

    return Response.json(data);
  } catch {
    return Response.json({ error: 'No se pudo cargar el puzzle' }, { status: 502 });
  }
}
