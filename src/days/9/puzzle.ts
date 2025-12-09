import { splitIntoLines } from '../../helpers/split-into-lines';
import Puzzle from '../../types/abstract-puzzle';
import { PuzzleResult } from '../../types/puzzle.types';

export default class ConcretePuzzle extends Puzzle {
  solveFirst(): PuzzleResult {
    const points = this.getPoints();
    let maxArea = 0;

    for (let i = 0; i < points.length - 1; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const pointA = points[i];
        const pointB = points[j];

        const height = Math.abs(pointA.x - pointB.x) + 1;
        const width = Math.abs(pointA.y - pointB.y) + 1;
        const area = height * width;
        maxArea = Math.max(maxArea, area);
      }
    }

    return maxArea;
  }

  solveSecond(): PuzzleResult {
    return 'unknown';
  }

  private getPoints(): Point[] {
    const lines = splitIntoLines(this.input);
    return lines.map((line) => {
      const parts = line.split(',');
      return {
        x: Number(parts[1]),
        y: Number(parts[0]),
      } as Point;
    });
  }
}

type Point = { x: number; y: number };
