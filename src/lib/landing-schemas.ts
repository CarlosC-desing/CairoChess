export type LichessDailyPuzzle = {
  puzzle: {
    id: string;
    rating: number;
    plays: number;
    solution: string[];
    fen: string;
    themes: string[];
  };
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isLichessDailyPuzzle(value: unknown): value is LichessDailyPuzzle {
  if (!isRecord(value)) return false;
  const { puzzle } = value;
  if (!isRecord(puzzle)) return false;
  return (
    typeof puzzle.id === 'string' &&
    typeof puzzle.rating === 'number' &&
    typeof puzzle.plays === 'number' &&
    Array.isArray(puzzle.solution) &&
    puzzle.solution.every((move) => typeof move === 'string') &&
    typeof puzzle.fen === 'string' &&
    Array.isArray(puzzle.themes) &&
    puzzle.themes.every((theme) => typeof theme === 'string')
  );
}
