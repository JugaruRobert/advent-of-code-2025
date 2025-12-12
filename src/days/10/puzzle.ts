import { splitIntoLines } from '../../helpers/split-into-lines';
import Puzzle from '../../types/abstract-puzzle';
import { PuzzleResult } from '../../types/puzzle.types';

export default class ConcretePuzzle extends Puzzle {
  solveFirst(): PuzzleResult {
    const nodes = this.parseInput();
    return this.getPossiblePathsCount('you', 'out', nodes);
  }

  solveSecond(): PuzzleResult {
    return 'unsolved';
  }

  private getPossiblePathsCount(
    node: string,
    outNode: string,
    allNodes: Record<string, string[]>
  ) {
    if (node === outNode) {
      return 1;
    }

    let sum = 0;
    for (const nodeTo of allNodes[node]) {
      sum += this.getPossiblePathsCount(nodeTo, outNode, allNodes);
    }
    return sum;
  }

  private parseInput() {
    const lines = splitIntoLines(this.input);
    const nodes: Record<string, string[]> = {};
    lines.forEach((line) => {
      const parts = line.split(': ');
      const node = parts[0];
      const outNodes = parts[1].split(' ');
      nodes[node] = outNodes;
    });
    return nodes;
  }
}
