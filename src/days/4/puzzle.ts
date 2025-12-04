import { isOutOfBounds } from '../../helpers/is-out-of-bounds';
import { readMatrix } from '../../helpers/read-matrix';
import { splitIntoLines } from '../../helpers/split-into-lines';
import Puzzle from '../../types/abstract-puzzle';
import { PuzzleResult } from '../../types/puzzle.types';

export default class ConcretePuzzle extends Puzzle {
  solveFirst(): PuzzleResult {
    const data = readMatrix(this.input);
    let accessibleRolls = 0;

    for (let row = 0; row < data.length; row++) {
      for (let col = 0; col < data[row].length; col++) {
        const current = data[row][col];
        if (current !== '@') {
          continue;
        }

        let adjacentRolls = 0;
        const directions = [-1, 0, 1];
        for (const dRow of directions) {
          for (const dCol of directions) {
            if (dRow === 0 && dCol === 0) {
              continue;
            }

            const nextRow = row + dRow;
            const nextCol = col + dCol;
            if (
              !isOutOfBounds(data, nextRow, nextCol) &&
              data[nextRow][nextCol] === '@'
            ) {
              adjacentRolls++;
            }
          }
        }

        if (adjacentRolls < 4) {
          accessibleRolls++;
        }
      }
    }
    return accessibleRolls;
  }

  solveSecond(): PuzzleResult {
    const data = readMatrix(this.input);
    let accessibleRolls = 0;
    let shouldContinue = true;

    while (shouldContinue) {
      shouldContinue = false;
      for (let row = 0; row < data.length; row++) {
        for (let col = 0; col < data[row].length; col++) {
          const current = data[row][col];
          if (current !== '@') {
            continue;
          }

          let adjacentRolls = 0;
          const directions = [-1, 0, 1];
          for (const dRow of directions) {
            for (const dCol of directions) {
              if (dRow === 0 && dCol === 0) {
                continue;
              }

              const nextRow = row + dRow;
              const nextCol = col + dCol;
              if (
                !isOutOfBounds(data, nextRow, nextCol) &&
                data[nextRow][nextCol] === '@'
              ) {
                adjacentRolls++;
              }
            }
          }

          if (adjacentRolls < 4) {
            accessibleRolls++;
            data[row][col] = '.';
            shouldContinue = true;
          }
        }
      }
    }
    return accessibleRolls;
  }
}
