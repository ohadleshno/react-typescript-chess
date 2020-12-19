import { CellValue } from '../Board';
import { PieceType } from '../enums/PieceType';
import { Coord } from './boardUtils';
import { checkPawnMove } from './PawnMove';
import { diagonalMoveCheck, orthogonalMoveCheck } from './BoundCheck';

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
            return checkBishopMove(pieces, from, to);
        case PieceType.pawn:
            return checkPawnMove(pieces, from, to);
        case PieceType.king:
            return checkKingMove(from, to);
        case PieceType.knight:
            return checkKnightMove(from, to);
        case PieceType.queen:
            return checkQueenMove(pieces, from, to);
        case PieceType.rok:
            return checkRokMove(pieces, from, to);
        default:
            return true;
    }
}

function checkKingMove(from: Coord, to: Coord) {
    const colDistance = Math.abs(to.col - from.col);
    const rowDistance = Math.abs(to.row - from.row);

    return !(colDistance > 1 || rowDistance > 1);
}

function checkKnightMove(from: Coord, to: Coord): boolean {
    const colDistance = Math.abs(to.col - from.col);
    const rowDistance = Math.abs(to.row - from.row);

    return (colDistance == 2 && rowDistance == 1) || (colDistance == 1 && rowDistance == 2);
}

function checkRokMove(pieces: CellValue[][], from: Coord, to: Coord): boolean {
    return orthogonalMoveCheck(pieces, from, to);
}

function checkBishopMove(pieces: CellValue[][], from: Coord, to: Coord): boolean {
    return diagonalMoveCheck(to, from, pieces);
}

function checkQueenMove(pieces: CellValue[][], from: Coord, to: Coord): boolean {
    return diagonalMoveCheck(to, from, pieces) || orthogonalMoveCheck(pieces, from, to);
}
