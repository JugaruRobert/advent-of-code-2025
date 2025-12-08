import { splitIntoLines } from '../../helpers/split-into-lines';
import Puzzle from '../../types/abstract-puzzle';
import { PuzzleResult } from '../../types/puzzle.types';

export default class ConcretePuzzle extends Puzzle {
  solveFirst(): PuzzleResult {
    const nrDistances = 1000;
    const points = this.getPointsFromInput();
    const distances: PointsWithDistance[] = [];

    for (let i = 0; i < points.length - 1; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (i === j) {
          continue;
        }

        const pointA = points[i];
        const pointB = points[j];
        const distance = this.getEuclidianDistance(pointA, pointB);
        distances.push({ pointA, pointB, distance });
      }
    }

    const sortedDistances = distances.sort(
      (pointA, pointB) => pointA.distance - pointB.distance
    );

    const groups: Set<string>[] = [];
    for (let i = 0; i < nrDistances; i++) {
      const distance = sortedDistances[i];
      const keyA = this.getCompoundKey(distance.pointA);
      const keyB = this.getCompoundKey(distance.pointB);

      const groupIndexes: number[] = [];

      for (let g = 0; g < groups.length; g++) {
        const group = groups[g];
        const hasKeyA = group.has(keyA);
        const hasKeyB = group.has(keyB);

        if (hasKeyA || hasKeyB) {
          group.add(keyA);
          group.add(keyB);
          groupIndexes.push(g);
        }
      }

      if (groupIndexes.length === 0) {
        groups.push(new Set([keyA, keyB]));
      }

      if (groupIndexes.length === 2) {
        const groupA = groups[groupIndexes[0]];
        const groupB = groups[groupIndexes[1]];
        const mergedGroups = new Set([...groupA, ...groupB]);
        groups[groupIndexes[0]] = mergedGroups;
        groups.splice(groupIndexes[1], 1);
      }
    }

    return groups
      .map((group) => group.size)
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((a, b) => a * b, 1);
  }

  solveSecond(): PuzzleResult {
    const points = this.getPointsFromInput();
    const distances: PointsWithDistance[] = [];

    for (let i = 0; i < points.length - 1; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (i === j) {
          continue;
        }

        const pointA = points[i];
        const pointB = points[j];
        const distance = this.getEuclidianDistance(pointA, pointB);
        distances.push({ pointA, pointB, distance });
      }
    }

    const sortedDistances = distances.sort(
      (pointA, pointB) => pointA.distance - pointB.distance
    );

    const groups: Set<string>[] = [];
    let lastDistance: PointsWithDistance;
    const pointsLength = points.length;

    for (const distance of distances) {
      lastDistance = distance;
      const keyA = this.getCompoundKey(distance.pointA);
      const keyB = this.getCompoundKey(distance.pointB);

      const groupIndexes: number[] = [];

      for (let g = 0; g < groups.length; g++) {
        const group = groups[g];
        const hasKeyA = group.has(keyA);
        const hasKeyB = group.has(keyB);

        if (hasKeyA || hasKeyB) {
          group.add(keyA);
          group.add(keyB);
          groupIndexes.push(g);
        }
      }

      if (groupIndexes.length === 0) {
        groups.push(new Set([keyA, keyB]));
      }

      if (groupIndexes.length === 2) {
        const groupA = groups[groupIndexes[0]];
        const groupB = groups[groupIndexes[1]];
        const mergedGroups = new Set([...groupA, ...groupB]);
        groups[groupIndexes[0]] = mergedGroups;
        groups.splice(groupIndexes[1], 1);
      }

      if (groups.length === 1 && groups[0].size === pointsLength) {
        break;
      }
    }

    return lastDistance.pointA.x * lastDistance.pointB.x;
  }

  private getCompoundKey(point: Point) {
    return `${point.x},${point.y},${point.z}`;
  }

  private getEuclidianDistance(pointA: Point, pointB: Point) {
    const xDiff = pointA.x - pointB.x;
    const yDiff = pointA.y - pointB.y;
    const zDiff = pointA.z - pointB.z;
    const powSum = Math.pow(xDiff, 2) + Math.pow(yDiff, 2) + Math.pow(zDiff, 2);
    return Math.sqrt(powSum);
  }

  private getPointsFromInput() {
    const lines = splitIntoLines(this.input);
    return lines.map((line) => {
      const parts = line.split(',');
      return {
        x: Number(parts[0]),
        y: Number(parts[1]),
        z: Number(parts[2]),
      } as Point;
    });
  }
}

type Point = { x: number; y: number; z: number };
type PointsWithDistance = { pointA: Point; pointB: Point; distance: number };
