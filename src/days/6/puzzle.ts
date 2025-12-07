import { splitIntoLines } from '../../helpers/split-into-lines';
import Puzzle from '../../types/abstract-puzzle';
import { PuzzleResult } from '../../types/puzzle.types';

export default class ConcretePuzzle extends Puzzle {
  solveFirst(): PuzzleResult {
    const { lines, operators } = this.parseInputIntoNumbers(this.input);
    let result = 0;
    const cols = lines[0].length;
    const rows = lines.length;

    for (let col = 0; col < cols; col++) {
      const operator = operators[col];
      let localResult = lines[0][col];

      for (let row = 1; row < rows; row++) {
        const number = lines[row][col];
        localResult = eval(`${localResult} ${operator} ${number}`);
      }

      result += localResult;
    }

    return result;
  }

  solveSecond(): PuzzleResult {
    const { columnStrings, operators } = this.parseInputIntoStrings(this.input);
    let result = 0;

    for (let colIdx = 0; colIdx < columnStrings.length; colIdx++) {
      const operator = operators[colIdx];
      let numbers = this.getNumberArrayFromColumnStrings(columnStrings[colIdx]);
      let localResult = numbers[0];

      for (let nrIdx = 1; nrIdx < numbers.length; nrIdx++) {
        const number = numbers[nrIdx];
        localResult = eval(`${localResult} ${operator} ${number}`);
      }

      result += localResult;
    }
    return result;
  }

  private getNumberArrayFromColumnStrings(strings: string[]) {
    const numbers: number[] = [];
    let length = strings[0].length;

    for (let pos = length - 1; pos >= 0; pos--) {
      let currentNumber = 0;
      for (const str of strings) {
        if (str[pos]?.trim()) {
          currentNumber = currentNumber * 10 + Number(str[pos]);
        }
      }
      numbers.push(currentNumber);
    }
    return numbers;
  }

  private parseInputIntoNumbers(input: string) {
    const lines = splitIntoLines(input);
    const parsedLines: number[][] = [];
    for (let i = 0; i < lines.length - 1; i++) {
      parsedLines.push(
        lines[i]
          .split(' ')
          .filter(Boolean)
          .map((number) => Number(number.trim()))
      );
    }

    const operators = lines
      .at(-1)
      .split(' ')
      .filter(Boolean)
      .map((operator) => operator.trim());
    return { lines: parsedLines, operators };
  }

  private parseInputIntoStrings(input: string) {
    const lines = splitIntoLines(input);
    const columnStrings: string[][] = [];

    const operatorIndexes = lines
      .at(-1)
      .split('')
      .map((char, index) => (char === ' ' ? null : index))
      .filter((char) => char !== null);

    for (let i = 0; i < lines.length - 1; i++) {
      let tempLine = lines[i];

      for (let opIdx = 1; opIdx < operatorIndexes.length; opIdx++) {
        const prevOp = operatorIndexes[opIdx - 1];
        const nextOp = operatorIndexes[opIdx];
        const part = tempLine.slice(prevOp, nextOp - 1);

        const colIdx = opIdx - 1;
        if (!columnStrings[colIdx]) {
          columnStrings[colIdx] = [];
        }
        columnStrings[colIdx].push(part);
      }

      const lastColIdx = operatorIndexes.length - 1;
      if (!columnStrings[lastColIdx]) {
        columnStrings[lastColIdx] = [];
      }
      columnStrings[lastColIdx].push(tempLine.slice(operatorIndexes.at(-1)));
    }

    const operators = lines
      .at(-1)
      .split(' ')
      .filter(Boolean)
      .map((operator) => operator.trim());

    return { columnStrings, operators };
  }
}
