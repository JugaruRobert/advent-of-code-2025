import { getGroups } from '../../helpers/get-groups';
import Puzzle from '../../types/abstract-puzzle';
import { PuzzleResult } from '../../types/puzzle.types';

export default class ConcretePuzzle extends Puzzle {
  solveFirst(): PuzzleResult {
    let freshIds = 0;
    const { ranges, ids } = this.parseRangesAndIds(this.input);
    for (const id of ids) {
      let isFresh = false;
      for (const [min, max] of ranges) {
        if (id >= min && id <= max) {
          isFresh = true;
          break;
        }
      }

      if (isFresh) {
        freshIds++;
      }
    }
    return freshIds;
  }

  solveSecond(): PuzzleResult {
    let freshIds = 0;
    const { ranges } = this.parseRangesAndIds(this.input);
    let mergedRanges: [number, number][] = [];

    for (const [min, max] of ranges) {
      const newMergedRanges: [number, number][] = [];
      let newRange: [number, number] = [min, max];

      for (const [mergedMin, mergedMax] of mergedRanges) {
        const isOverlapping =
          (min >= mergedMin && min <= mergedMax) ||
          (max >= mergedMin && max <= mergedMax);
        const isEnclosed = min <= mergedMin && max >= mergedMax;

        if (isOverlapping || isEnclosed) {
          const newMin = Math.min(newRange[0], mergedMin);
          const newMax = Math.max(newRange[1], mergedMax);
          newRange = [newMin, newMax];
        } else {
          newMergedRanges.push([mergedMin, mergedMax]);
        }
      }

      newMergedRanges.push(newRange);
      mergedRanges = newMergedRanges;
    }

    for (const [min, max] of mergedRanges) {
      freshIds += max - min + 1;
    }
    return freshIds;
  }

  private parseRangesAndIds(input: string) {
    const parts = getGroups(this.input);
    const ranges = parts[0].map((range) => range.split('-').map(Number));
    const ids = parts[1].map((id) => Number(id));
    return { ranges, ids };
  }
}
