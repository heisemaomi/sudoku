import type { Board, FixedBoard } from "./board";
import { createEmptyBoard, createEmptyFixed } from "./board";

function shuffle<T>(array: T[]): T[] {
    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}

function isValid(
    board: Board,
    row: number,
    col: number,
    value: number
): boolean {

    // row
    for (let c = 0; c < 9; c++) {
        if (board[row][c] === value) {
            return false;
        }
    }

    // column
    for (let r = 0; r < 9; r++) {
        if (board[r][col] === value) {
            return false;
        }
    }

    // box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;

    for (let r = boxRow; r < boxRow + 3; r++) {
        for (let c = boxCol; c < boxCol + 3; c++) {
            if (board[r][c] === value) {
                return false;
            }
        }
    }

    return true;
}


function fillBoard(board: Board): boolean {

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {

            if (board[row][col] !== 0) {
                continue;
            }

            for (const n of shuffle([1,2,3,4,5,6,7,8,9])) {

                if (isValid(board, row, col, n)) {

                    board[row][col] = n;

                    if (fillBoard(board)) {
                        return true;
                    }

                    board[row][col] = 0;
                }
            }

            return false;
        }
    }

    return true;
}

export function createPuzzle(): {
    board: Board;
    fixed: FixedBoard;
} {

    const solution = createEmptyBoard();

    fillBoard(solution);


    const board = solution.map(row => [...row]);
    const fixed = createEmptyFixed();


    // remove numbers
    const removeCount = 45;

    for (const index of shuffle(
        Array.from({length: 81}, (_, i) => i)
    ).slice(0, removeCount)) {

        const row = Math.floor(index / 9);
        const col = index % 9;

        board[row][col] = 0;
    }


    // mark fixed cells
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {

            if (board[row][col] !== 0) {
                fixed[row][col] = true;
            }

        }
    }


    return {
        board,
        fixed
    };
}