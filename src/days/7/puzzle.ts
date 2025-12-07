import { readMatrix } from '../../helpers/read-matrix';
import Puzzle from '../../types/abstract-puzzle';
import { PuzzleResult } from '../../types/puzzle.types';

export default class ConcretePuzzle extends Puzzle {
  solveFirst(): PuzzleResult {
    const { matrix, start } = this.parseInput();
    let nrSplits = 0;
    let toVisit: Point[] = [start];

    while (toVisit.length > 0) {
      const current = toVisit.shift();
      let nextPointsToVisit: Point[] = [];

      const nextPoint = { x: current.x + 1, y: current.y };
      if (!matrix[nextPoint.x]) {
        continue;
      }

      const nextValue = matrix[nextPoint.x][nextPoint.y];
      if (nextValue === '.') {
        nextPointsToVisit.push(nextPoint);
      } else if (nextValue === '^') {
        nrSplits++;
        nextPointsToVisit.push({ x: nextPoint.x, y: nextPoint.y - 1 });
        nextPointsToVisit.push({ x: nextPoint.x, y: nextPoint.y + 1 });
      }

      nextPointsToVisit.forEach((point) => (matrix[point.x][point.y] = '|'));
      toVisit.push(...nextPointsToVisit);
    }

    for (let i = 0; i < matrix.length; i++) {
      console.log(matrix[i].join(''));
    }
    return nrSplits;
  }

  solveSecond(): PuzzleResult {
    const { matrix, start } = this.parseInput();

    let toVisit: Point[] = [start];
    matrix[start.x][start.y] = '1';

    while (toVisit.length > 0) {
      const current = toVisit.shift();
      const currentPointValue = Number(matrix[current.x][current.y]);
      let nextPointsToVisit: Point[] = [];

      const nextPoint = { x: current.x + 1, y: current.y };
      if (!matrix[nextPoint.x]) {
        continue;
      }

      const nextValue = matrix[nextPoint.x][nextPoint.y];
      if (nextValue === '^') {
        nextPointsToVisit.push({ x: nextPoint.x, y: nextPoint.y - 1 });
        nextPointsToVisit.push({ x: nextPoint.x, y: nextPoint.y + 1 });
      } else {
        nextPointsToVisit.push(nextPoint);
      }

      let validNextPoints: Point[] = [];
      nextPointsToVisit.forEach((point) => {
        if (matrix[point.x][point.y] === '.') {
          matrix[point.x][point.y] = currentPointValue.toString();
          validNextPoints.push(point);
        } else {
          const existingValue = Number(matrix[point.x][point.y]);
          matrix[point.x][point.y] = (
            existingValue + currentPointValue
          ).toString();
        }
      });

      toVisit.push(...validNextPoints);
    }

    let nrTimelines = matrix
      .at(-1)
      .map((p) => (p === '.' ? 0 : Number(p)))
      .reduce((a, b) => a + b, 0);
    return nrTimelines;
  }

  private parseInput() {
    const matrix = readMatrix(this.input);

    let start = { x: 0, y: 0 };
    let found = false;
    for (let i = 0; i < matrix.length; i++) {
      if (found) {
        break;
      }

      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === 'S') {
          found = true;
          start = { x: i, y: j };
          break;
        }
      }
    }

    return { matrix, start };
  }
}

type Point = { x: number; y: number };
