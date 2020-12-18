import { PieceColor } from '../enums/PieceColor';
import { PieceType } from '../enums/PieceType';
import { CellValue } from '../Board';
import { cloneDeep } from 'lodash';

const FirstRow: CellValue[] = [
    { pieceColor: PieceColor.white, pieceType: PieceType.rok },
    { pieceColor: PieceColor.white, pieceType: PieceType.knight },
    { pieceColor: PieceColor.white, pieceType: PieceType.bishop },
    { pieceColor: PieceColor.white, pieceType: PieceType.queen },
    { pieceColor: PieceColor.white, pieceType: PieceType.king },
    { pieceColor: PieceColor.white, pieceType: PieceType.bishop },
    { pieceColor: PieceColor.white, pieceType: PieceType.knight },
    { pieceColor: PieceColor.white, pieceType: PieceType.rok },
];

const LastRow: CellValue[] = FirstRow.map((item) => ({
    pieceColor: PieceColor.black,
    pieceType: item.pieceType,
}));

export type Coord = {
    row: number;
    col: number;
};

const SecondRow = new Array<CellValue>(8).fill({ pieceColor: PieceColor.white, pieceType: PieceType.pawn });
const SeventhRow = new Array<CellValue>(8).fill({ pieceColor: PieceColor.black, pieceType: PieceType.pawn });
const emptyRow = new Array<CellValue>(8).fill({ pieceColor: PieceColor.none, pieceType: PieceType.None });

export const INITIAL_BOARD: CellValue[][] = [
    FirstRow,
    SecondRow,
    cloneDeep(emptyRow),
    cloneDeep(emptyRow),
    cloneDeep(emptyRow),
    cloneDeep(emptyRow),
    SeventhRow,
    LastRow,
];

export function movePiece(pieces: CellValue[][], from: Coord, to: Coord): CellValue[][] {
    const clonedPieces = cloneDeep(pieces);
    clonedPieces[to.row][to.col] = pieces[from.row][from.col];
    clonedPieces[from.row][from.col] = { pieceType: PieceType.None, pieceColor: PieceColor.none };

    return clonedPieces;
}
