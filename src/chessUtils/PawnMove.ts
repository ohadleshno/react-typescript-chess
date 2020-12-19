import { CellValue } from '../Board';
import { Coord } from './boardUtils';
import { PieceColor } from '../enums/PieceColor';
import { PieceType } from '../enums/PieceType';

const SEVENTH_ROW = 6;
const SECOND_ROW = 1;

export function checkPawnMove(pieces: CellValue[][], from: Coord, to: Coord): boolean {
    const fromPiece = pieces[from.row][from.col];
    const toPiece = pieces[to.row][to.col];
    const moveDir: number = fromPiece.pieceColor === PieceColor.white ? 1 : -1;

    if (pawnCanEat(to, from, moveDir, toPiece, fromPiece)) {
        return true;
    }

    if (toPiece.pieceColor !== PieceColor.none && toPiece.pieceColor !== fromPiece.pieceColor) {
        return false;
    }

    if (pawnOnInitialPlace(fromPiece, from)) {
        return (
            ((to.row === from.row + 2 * moveDir && pieces[from.row + moveDir][from.col].pieceType === PieceType.None) ||
                to.row === from.row + moveDir) &&
            to.col === from.col
        );
    }

    return to.col === from.col && to.row === from.row + moveDir;
}

function pawnCanEat(to: Coord, from: Coord, moveDir: number, toPiece: CellValue, fromPiece: CellValue) {
    return (
        to.row === from.row + moveDir &&
        Math.abs(to.col - from.col) === 1 &&
        toPiece.pieceColor !== PieceColor.none &&
        toPiece.pieceColor !== fromPiece.pieceColor
    );
}

function pawnOnInitialPlace(fromPiece: CellValue, from: Coord) {
    return (
        (fromPiece.pieceColor === PieceColor.black && from.row === SEVENTH_ROW) ||
        (fromPiece.pieceColor === PieceColor.white && from.row === SECOND_ROW)
    );
}
