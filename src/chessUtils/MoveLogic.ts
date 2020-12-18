import { CellValue } from '../Board';
import { PieceType } from '../enums/PieceType';
import { Coord } from './boardUtils';
import { PieceColor } from '../enums/PieceColor';

export function isMovePossible(pieces: CellValue[][], from: Coord, to: Coord): boolean {
    const fromPiece = pieces[from.row][from.col];
    const toPiece = pieces[to.row][to.col];

    if (fromPiece.pieceType === PieceType.None) {
        return false;
    }

    if (fromPiece.pieceColor === toPiece.pieceColor) {
        return false;
    }

    switch (fromPiece.pieceType) {
        case PieceType.bishop:
            return true;
        case PieceType.pawn:
            return checkPawnMove(toPiece, fromPiece, from, to);
        case PieceType.king:
            return true;
        case PieceType.knight:
            return checkKnightMove(from, to);
        case PieceType.queen:
            return true;
        case PieceType.rok:
            return checkRokMove(pieces, from, to);
        default:
            return true;
    }
}

function checkPawnMove(toPiece: CellValue, fromPiece: CellValue, from: Coord, to: Coord): boolean {
    if (fromPiece.pieceColor === PieceColor.black && from.row === 6) {
        return (to.row === from.row - 2 || to.row === from.row - 1) && to.col === from.col;
    }

    if (fromPiece.pieceColor === PieceColor.white && from.row === 1) {
        return (to.row === from.row + 2 || to.row === from.row + 1) && to.col === from.col;
    }

    const moveDir: number = fromPiece.pieceColor === PieceColor.white ? 1 : -1;

    debugger;
    if (
        to.row === from.row + moveDir &&
        Math.abs(to.col - from.col) === 1 &&
        toPiece.pieceColor !== PieceColor.none &&
        toPiece.pieceColor !== fromPiece.pieceColor
    ) {
        return true;
    }

    return to.col === from.col && to.row === from.row + moveDir;
}

function checkKnightMove(from: Coord, to: Coord): boolean {
    const colDiverstion = Math.abs(to.col - from.col);
    const rowDiverstion = Math.abs(to.row - from.row);

    return (colDiverstion == 2 && rowDiverstion == 1) || (colDiverstion == 1 && rowDiverstion == 2);
}

function limit(value: number, start = 0, end = 7): number {
    return Math.max(start, Math.min(value, end));
}

function checkRokMove(pieces: CellValue[][], from: Coord, to: Coord): boolean {
    const maxLength = pieces.length;
    const leftBound = getBound(pieces, from.row, limit(from.col - 1), -1, 0, true);
    const rightBound = getBound(pieces, from.row, limit(from.col + 1), 1, maxLength, true);
    const topBound = getBound(pieces, from.col, limit(from.row - 1), -1, 0, false);
    const bottomBound = getBound(pieces, from.col, limit(from.row + 1), 1, maxLength, false);

    if (to.col !== from.col && to.row !== from.row) {
        return false;
    }

    if (to.col < leftBound || to.col > rightBound || to.row > bottomBound || to.row < topBound) {
        return false;
    }

    return true;
}

function getBound(
    pieces: CellValue[][],
    rowCol: number,
    start: number,
    direction: number,
    end: number,
    isXDirection: boolean,
): number {
    let i = start;
    const none = PieceType.None;

    while (i !== end) {
        const pieceType = isXDirection ? pieces[rowCol][i].pieceType : pieces[i][rowCol].pieceType;
        if (pieceType.valueOf() !== none.valueOf()) {
            return i;
        }
        i += direction;
    }

    return end;
}
