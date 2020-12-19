import { CellValue } from '../Board';
import { Coord } from './boardUtils';
import { PieceType } from '../enums/PieceType';

export function orthogonalMoveCheck(pieces: CellValue[][], from: Coord, to: Coord): boolean {
    const leftBound = findBound(pieces, from.row, limit(from.col - 1), -1, 0);
    const rightBound = findBound(pieces, from.row, limit(from.col + 1), 1, 0);
    const topBound = findBound(pieces, limit(from.row - 1), from.col, 0, -1);
    const bottomBound = findBound(pieces, limit(from.row + 1), from.col, 0, 1);

    if (to.col !== from.col && to.row !== from.row) {
        return false;
    }

    if (to.col < leftBound.col || to.col > rightBound.col || to.row > bottomBound.row || to.row < topBound.row) {
        return false;
    }

    return true;
}

export function diagonalMoveCheck(to: Coord, from: Coord, pieces: CellValue[][]): boolean {
    const colDistance = Math.abs(to.col - from.col);
    const rowDistance = Math.abs(to.row - from.row);

    if (colDistance !== rowDistance) {
        return false;
    }

    const leftTopBound = findBound(pieces, limit(from.row - 1), limit(from.col - 1), -1, -1);
    const rightTopBound = findBound(pieces, limit(from.row - 1), limit(from.col + 1), 1, -1);
    const leftBottomBound = findBound(pieces, limit(from.row + 1), limit(from.col - 1), -1, 1);
    const rightBottomBound = findBound(pieces, limit(from.row + 1), limit(from.col + 1), 1, 1);

    if (to.col < leftTopBound.col && to.row < leftTopBound.row) {
        return false;
    }

    if (to.col > rightTopBound.col && to.row < rightTopBound.row) {
        return false;
    }

    if (to.col < leftBottomBound.col && to.row > leftBottomBound.row) {
        return false;
    }

    if (to.col > rightBottomBound.col && to.row > rightBottomBound.row) {
        return false;
    }

    return true;
}

function findBound(pieces: CellValue[][], row: number, col: number, directionX: number, directionY: number): Coord {
    let i = row;
    let j = col;

    while (i !== 0 && i !== pieces.length && j !== 0 && j !== pieces.length) {
        if (pieces[i][j].pieceType !== PieceType.None) {
            return { col: j, row: i };
        }
        i += directionY;
        j += directionX;
    }

    return { col: j, row: i };
}

function limit(value: number, start = 0, end = 7): number {
    return Math.max(start, Math.min(value, end));
}
