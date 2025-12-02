import Puzzle from '../../types/abstract-puzzle';
import { PuzzleResult } from '../../types/puzzle.types';

export default class ConcretePuzzle extends Puzzle {
  solveFirst(): PuzzleResult {
    let result = 0;
    const ranges = this.getRanges(this.input);
    ranges.forEach(([start, end]) => {
      for (let current = start; current <= end; current++) {
        const regex = /^(\d+)\1$/;
        const stringValue = current.toString();
        if (regex.test(stringValue)) {
          result += current;
        }
      }
    });
    return result;
  }

  solveSecond(): PuzzleResult {
    let result = 0;
    const ranges = this.getRanges(this.input);
    ranges.forEach(([start, end]) => {
      for (let current = start; current <= end; current++) {
        const regex = /^(\d+)\1+$/;
        const stringValue = current.toString();
        if (regex.test(stringValue)) {
          result += current;
        }
      }
    });
    return result;
  }

  private getRanges(input: string) {
    const ranges = input.split(',');
    return ranges.map((range) =>
      range.split('-').map((num) => parseInt(num, 10))
    );
  }
}
