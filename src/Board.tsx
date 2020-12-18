import React, { useState } from 'react';
import styled from 'styled-components';
import Cell from './Cell';
import { PieceType } from './enums/PieceType';
import { PieceColor } from './enums/PieceColor';
import { Coord, INITIAL_BOARD, movePiece } from './chessUtils/boardUtils';
import { isMovePossible } from './chessUtils/MoveLogic';

type Props = {
    name: string;
    size: string;
};

export interface CellValue {
    pieceColor: PieceColor;
    pieceType: PieceType;
}

function move(
    pieces: CellValue[][],
    setBoard: React.Dispatch<React.SetStateAction<CellValue[][]>>,
    setIsWhiteTurn: React.Dispatch<React.SetStateAction<boolean>>,
) {
    return (from: Coord, to: Coord): void => {
        setBoard(movePiece(pieces, from, to));
        setIsWhiteTurn((whiteTurn) => !whiteTurn);
    };
}

function canMove(pieces: CellValue[][]) {
    return (from: Coord, to: Coord): boolean => {
        return isMovePossible(pieces, from, to);
    };
}

const Board: React.FC<Props> = ({ name, size }: Props) => {
    const [pieces, setPieces] = useState<CellValue[][]>(INITIAL_BOARD);
    const [isWhiteTurn, setIsWhiteTurn] = useState(true);

    return (
        <Wrapper>
            <h1>
                {name} turn {isWhiteTurn ? 'white' : 'black'}
            </h1>
            <BoardWrapper fontSize={size}>
                {pieces.map((row, id) => (
                    <Row key={id}>
                        {row.map((cell, idx) => (
                            <Cell
                                isWhiteTurn={isWhiteTurn}
                                isMovePossible={canMove(pieces)}
                                move={move(pieces, setPieces, setIsWhiteTurn)}
                                key={idx}
                                rowNumber={id}
                                columnNumber={idx}
                                cell={cell}
                            />
                        ))}
                    </Row>
                ))}
            </BoardWrapper>
        </Wrapper>
    );
};

export default Board;

const Row = styled.div`
    display: flex;
`;

type BoradWrapperProps = {
    fontSize: string;
};

const BoardWrapper = styled.div<BoradWrapperProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    font-size: ${({ fontSize }) => fontSize};
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
`;
