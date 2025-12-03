import { splitIntoLines } from '../../helpers/split-into-lines';
import Puzzle from '../../types/abstract-puzzle';
import { PuzzleResult } from '../../types/puzzle.types';

export default class ConcretePuzzle extends Puzzle {
  solveFirst(): PuzzleResult {
    let pos = 50;
    let counter = 0;
    const instructions = this.parseInput(this.input);
    instructions.forEach(({ dir, value }) => {
      const next = dir === 'L' ? pos - value : pos + value;
      pos = ((next % 100) + 100) % 100;
      if (pos === 0) {
        counter++;
      }
    });
    return counter;
  }

  solveSecond(): PuzzleResult {
    let pos = 50;
    let counter = 0;
    const instructions = this.parseInput(this.input);
    instructions.forEach(({ dir, value }) => {
      // For R1000 we have 10 overflows
      const overflow = Math.floor(value / 100);
      counter += overflow;

      const current = ((value % 100) + 100) % 100;
      const next = dir === 'L' ? pos - current : pos + current;
      const isOutside = next <= 0 || next >= 100;
      if (pos !== 0 && isOutside) {
        counter++;
      }
      pos = ((next % 100) + 100) % 100;
    });
    return counter;
  }

  private parseInput(input: string) {
    return splitIntoLines(input).map((line) => {
      const dir = line.charAt(0);
      const value = parseInt(line.slice(1), 10);
      return { dir, value };
    });
  }
}
