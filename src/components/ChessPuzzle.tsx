'use client';

import confetti from 'canvas-confetti';
import { Chess, type Square } from 'chess.js';
import type { CSSProperties } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { type LichessDailyPuzzle, lichessDailyPuzzleSchema } from '@/lib/landing-schemas';

const PUZZLE_API = 'https://lichess.org/api/puzzle/daily';

const MOVE_DOT_STYLE: CSSProperties = {
  background:
    'radial-gradient(circle, rgba(41, 120, 255, 0.55) 18%, rgba(41, 120, 255, 0.15) 19%, transparent 20%)',
};

function uciToMove(uci: string) {
  const from = uci.slice(0, 2);
  const to = uci.slice(2, 4);
  const promotion = uci.length > 4 ? uci[4] : undefined;
  return { from, to, promotion };
}

function sameMove(played: { from: string; to: string; promotion?: string }, expectedUci: string) {
  const expected = uciToMove(expectedUci);
  return (
    played.from === expected.from &&
    played.to === expected.to &&
    (played.promotion ?? 'q') === (expected.promotion ?? 'q')
  );
}

function turnLabelFromFen(fen: string): string {
  const turn = fen === 'start' ? 'w' : fen.split(' ')[1];
  return turn === 'b' ? 'Juegan: Negras' : 'Juegan: Blancas';
}

function getMoveStylesForSquare(game: Chess, square: string): Record<string, CSSProperties> {
  const moves = game.moves({ square: square as Square, verbose: true });
  const styles: Record<string, CSSProperties> = {};

  for (const move of moves) {
    styles[move.to] = MOVE_DOT_STYLE;
  }

  return styles;
}

function isOwnPiece(pieceType: string, turn: 'w' | 'b'): boolean {
  const color = pieceType[0];
  return color === turn;
}

export function ChessPuzzle() {
  const [puzzle, setPuzzle] = useState<LichessDailyPuzzle['puzzle'] | null>(null);
  const [fen, setFen] = useState('start');
  const [moveIndex, setMoveIndex] = useState(0);
  const [solved, setSolved] = useState(false);
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [optionSquares, setOptionSquares] = useState<Record<string, CSSProperties>>({});
  const gameRef = useRef(new Chess());

  const turnLabel = turnLabelFromFen(fen);

  const clearOptionSquares = useCallback(() => {
    setOptionSquares({});
  }, []);

  const highlightSquareMoves = useCallback((square: string) => {
    setOptionSquares(getMoveStylesForSquare(gameRef.current, square));
  }, []);

  const celebrate = useCallback(() => {
    confetti({
      particleCount: 140,
      spread: 80,
      origin: { y: 0.6 },
    });
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });
  }, []);

  const finishPuzzle = useCallback(() => {
    setSolved(true);
    setShowVictoryModal(true);
    clearOptionSquares();
    celebrate();
  }, [celebrate, clearOptionSquares]);

  const applyUci = useCallback((uci: string) => {
    const game = gameRef.current;
    try {
      const move = game.move(uciToMove(uci));
      if (!move) return false;
      setFen(game.fen());
      return true;
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadPuzzle() {
      try {
        const res = await fetch(PUZZLE_API);
        if (!res.ok) throw new Error('No se pudo cargar el puzzle');
        const json = await res.json();
        const parsed = lichessDailyPuzzleSchema.parse(json);
        if (cancelled) return;

        const game = new Chess(parsed.puzzle.fen);
        gameRef.current = game;
        setPuzzle(parsed.puzzle);
        setFen(game.fen());
        setMoveIndex(0);
        setSolved(false);
        setShowVictoryModal(false);
        setOptionSquares({});
      } catch {
        if (!cancelled) setError('Error al cargar el ejercicio del día.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPuzzle();
    return () => {
      cancelled = true;
    };
  }, []);

  const onSquareClick = useCallback(
    ({ piece, square }: { piece: { pieceType: string } | null; square: string }) => {
      if (solved) return;

      if (!piece) {
        clearOptionSquares();
        return;
      }

      const game = gameRef.current;
      if (!isOwnPiece(piece.pieceType, game.turn())) {
        clearOptionSquares();
        return;
      }

      highlightSquareMoves(square);
    },
    [clearOptionSquares, highlightSquareMoves, solved],
  );

  const onSquareRightClick = useCallback(() => {
    clearOptionSquares();
  }, [clearOptionSquares]);

  const onPieceDrag = useCallback(
    ({ square }: { square: string | null }) => {
      if (solved || !square) {
        clearOptionSquares();
        return;
      }

      highlightSquareMoves(square);
    },
    [clearOptionSquares, highlightSquareMoves, solved],
  );

  const onPieceDrop = useCallback(
    ({ sourceSquare, targetSquare }: { sourceSquare: string; targetSquare: string | null }) => {
      clearOptionSquares();

      if (solved || !puzzle || !targetSquare) return false;

      const expectedUci = puzzle.solution[moveIndex];
      if (!expectedUci) return false;

      const game = gameRef.current;
      let played: ReturnType<Chess['move']> | null = null;

      try {
        played = game.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: 'q',
        });
      } catch {
        return false;
      }

      if (!played || !sameMove(played, expectedUci)) {
        try {
          game.undo();
        } catch {
          // ignore undo errors on invalid moves
        }
        return false;
      }

      setFen(game.fen());
      const nextIndex = moveIndex + 1;

      if (nextIndex >= puzzle.solution.length) {
        setMoveIndex(nextIndex);
        finishPuzzle();
        return true;
      }

      setMoveIndex(nextIndex);

      window.setTimeout(() => {
        const opponentUci = puzzle.solution[nextIndex];
        const applied = applyUci(opponentUci);
        if (!applied) return;

        const afterOpponent = nextIndex + 1;
        setMoveIndex(afterOpponent);

        if (afterOpponent >= puzzle.solution.length) {
          finishPuzzle();
        }
      }, 350);

      return true;
    },
    [applyUci, clearOptionSquares, finishPuzzle, moveIndex, puzzle, solved],
  );

  const boardOptions = useMemo(
    () => ({
      position: fen,
      allowDragging: !solved,
      animationDurationInMs: 200,
      showAnimations: true,
      squareStyles: optionSquares,
      onSquareClick,
      onSquareRightClick,
      onPieceDrag,
      onPieceDrop,
      darkSquareStyle: { backgroundColor: '#0a234c' },
      lightSquareStyle: { backgroundColor: '#1e4976' },
    }),
    [fen, onPieceDrag, onPieceDrop, onSquareClick, onSquareRightClick, optionSquares, solved],
  );

  if (loading) {
    return (
      <div className="rounded-xl border border-white/5 bg-black/30 p-6 text-center text-zinc-400 backdrop-blur-sm">
        Cargando ejercicio del día...
      </div>
    );
  }

  if (error || !puzzle) {
    return (
      <div className="rounded-xl border border-white/5 bg-black/30 p-6 text-center text-zinc-400 backdrop-blur-sm">
        {error ?? 'Puzzle no disponible.'}
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 md:px-0">
        <span className="rounded-full border border-white/5 bg-black/40 px-3 py-1 text-xs font-medium text-white sm:px-4 sm:py-1.5 sm:text-sm">
          {turnLabel}
        </span>
        <span className="text-xs text-zinc-400 sm:text-sm">
          Rating {puzzle.rating} · {puzzle.plays.toLocaleString('es')} jugadas
        </span>
      </div>

      <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 touch-none md:left-auto md:mx-auto md:w-full md:max-w-[500px] md:translate-x-0">
        <Chessboard options={boardOptions} />
      </div>

      {showVictoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-white/20 bg-white/10 p-6 text-center shadow-2xl backdrop-blur-xl">
            <p className="text-xl font-semibold text-text-light sm:text-2xl">
              ¡Ejercicio Completado!
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              Has resuelto el puzzle del día. Rating {puzzle.rating}.
            </p>
            <button
              type="button"
              className="mt-5 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
              onClick={() => setShowVictoryModal(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
