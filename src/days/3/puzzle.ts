import { parse } from 'path';
import { parseIntoNumbers } from '../../helpers/parse-into-numbers';
import Puzzle from '../../types/abstract-puzzle';
import { PuzzleResult } from '../../types/puzzle.types';
import { splitIntoLines } from '../../helpers/split-into-lines';

export default class ConcretePuzzle extends Puzzle {
  solveFirst(): PuzzleResult {
    const lines = splitIntoLines(this.input);
    return this.getSumOfAllMaxDigits(lines, 2);
  }

  solveSecond(): PuzzleResult {
    const lines = splitIntoLines(this.input);
    return this.getSumOfAllMaxDigits(lines, 12);
  }

  private getSumOfAllMaxDigits(lines: string[], digits: number) {
    let result = 0;

    for (const line of lines) {
      const numbers = parseIntoNumbers(line, '');
      if (numbers.length < digits) {
        continue;
      }

      let maxDigits: number[] = [];
      for (let i = 0; i < numbers.length; i++) {
        const current = numbers[i];
        const nrElementsAfter = numbers.length - i - 1;
        const maxPos = digits - nrElementsAfter - 1;

        let used = false;
        for (let j = maxPos; j < maxDigits.length; j++) {
          if (current > maxDigits[j]) {
            const prev = maxDigits.slice(0, j);
            maxDigits = [...prev, current];
            used = true;
            break;
          }
        }

        if (!used && maxDigits.length < digits) {
          maxDigits.push(current);
        }
      }

      const final = parseInt(maxDigits.join(''), 10);
      result += final;
    }

    return result;
  }
}
