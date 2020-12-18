import React from 'react';
import styled from 'styled-components';
import { CellValue } from './Board';
import Piece from './Piece';
import { DragObjectWithType, useDrop } from 'react-dnd';
import { Coord } from './chessUtils/boardUtils';
import { PieceColor } from './enums/PieceColor';

export interface ChessDragObject extends DragObjectWithType {
    cord: Coord;
    piece: CellValue;
}

type Props = {
    rowNumber: number;
    columnNumber: number;
    move: (from: Coord, to: Coord) => void;
    isMovePossible: (from: Coord, to: Coord) => boolean;
    cell: CellValue;
    isWhiteTurn: boolean;
};

const Cell: React.FC<Props> = (props: Props) => {
    const cord = { row: props.rowNumber, col: props.columnNumber };

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: 'a',
        canDrop: (item: ChessDragObject) => {
            if (
                (props.isWhiteTurn && item.piece.pieceColor !== PieceColor.white) ||
                (!props.isWhiteTurn && item.piece.pieceColor !== PieceColor.black)
            ) {
                return false;
            }
            return props.isMovePossible(item.cord, cord);
        },
        drop: (item: ChessDragObject) => {
            props.move(item.cord, cord);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    });

    return (
        <Wrapper
            ref={drop}
            rowNumber={props.rowNumber}
            isOver={isOver}
            canDrop={canDrop}
            columnNumber={props.columnNumber}
        >
            <Piece cord={cord} cell={props.cell} />
        </Wrapper>
    );
};

type WrapperProps = {
    columnNumber: number;
    rowNumber: number;
    isOver: boolean;
    canDrop: boolean;
};

const Wrapper = styled.div<WrapperProps>`
    background-color: ${(props) => getCellColor(props)};
    width: 2em;
    height: 2em;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

function getCellColor({ columnNumber, rowNumber, isOver, canDrop }: WrapperProps): string {
    if (isOver) {
        return canDrop ? 'green' : 'red';
    }
    if (canDrop) {
        return 'yellow';
    }
    return (columnNumber + rowNumber) % 2 === 0 ? '#557ea4' : '#f1f1f1';
}

export default Cell;
