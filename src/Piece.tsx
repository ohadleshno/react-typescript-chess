import React from 'react';
import { CellValue } from './Board';
import styled from 'styled-components';
import { PieceColor } from './enums/PieceColor';
import { useDrag } from 'react-dnd';
import { Coord } from './chessUtils/boardUtils';
import { ChessDragObject } from './Cell';

type Props = {
    cord: Coord;
    cell: CellValue;
};

const Piece: React.FC<Props> = (props: Props) => {
    const item: ChessDragObject = { cord: props.cord, type: 'a', piece: props.cell };
    const [, drag] = useDrag({
        item: item,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return <Icon ref={drag} className={props.cell.pieceType} color={props.cell.pieceColor} />;
};

const Icon = styled.i<{ color: PieceColor }>`
    color: ${(props) => props.color};
    -webkit-text-stroke: 2px ${(props) => (props.color === PieceColor.white ? PieceColor.black : PieceColor.white)};

    &:before {
        margin: 0;
        padding: 0.5em;
        font-size: 1em;
    }
`;

export default Piece;
