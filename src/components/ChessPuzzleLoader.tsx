'use client';

import dynamic from 'next/dynamic';
import { SkeletonChessPuzzle } from '@/components/SkeletonChessPuzzle';

const ChessPuzzle = dynamic(
  () => import('@/components/ChessPuzzle').then((mod) => mod.ChessPuzzle),
  {
    ssr: false,
    loading: () => <SkeletonChessPuzzle />,
  },
);

export function ChessPuzzleLoader() {
  return <ChessPuzzle />;
}
