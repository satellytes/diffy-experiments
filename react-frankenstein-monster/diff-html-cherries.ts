/**
 * things I cherry picked from diff2html
 *
 */

import {
  DiffBlock, DiffFile,
  DiffLineContent,
  DiffLineContext,
  DiffLineDeleted,
  DiffLineInserted, LineType
} from 'diff2html/lib-esm/types';

type DiffLineGroups = [
  (DiffLineContext & DiffLineContent)[],
  (DiffLineDeleted & DiffLineContent)[],
  (DiffLineInserted & DiffLineContent)[],
][];

/**
 * return multiple triplet os context, deleted & inserted
 */
export function applyLineGroupping(block: DiffBlock): DiffLineGroups {
  const blockLinesGroups: DiffLineGroups = [];

  let oldLines: (DiffLineDeleted & DiffLineContent)[] = [];
  let newLines: (DiffLineInserted & DiffLineContent)[] = [];

  for (let i = 0; i < block.lines.length; i++) {
    const diffLine = block.lines[i];

    if (
      (diffLine.type !== LineType.INSERT && newLines.length) ||
      (diffLine.type === LineType.CONTEXT && oldLines.length > 0)
    ) {
      blockLinesGroups.push([[], oldLines, newLines]);
      oldLines = [];
      newLines = [];
    }

    if (diffLine.type === LineType.CONTEXT) {
      blockLinesGroups.push([[diffLine], [], []]);
    } else if (diffLine.type === LineType.INSERT && oldLines.length === 0) {
      blockLinesGroups.push([[], [], [diffLine]]);
    } else if (diffLine.type === LineType.INSERT && oldLines.length > 0) {
      newLines.push(diffLine);
    } else if (diffLine.type === LineType.DELETE) {
      oldLines.push(diffLine);
    }
  }

  if (oldLines.length || newLines.length) {
    blockLinesGroups.push([[], oldLines, newLines]);
    oldLines = [];
    newLines = [];
  }

  return blockLinesGroups;
}

