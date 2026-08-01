import type { Board } from "./board";

export function isValidCell(
    board: Board,
    row: number,
    col: number
): boolean {
    const value = board[row][col];

    // empty cells are always valid
    if (value === 0) {
        return true;
    }

    // check row
    for (let c = 0; c < 9; c++) {
        if (c !== col && board[row][c] === value) {
            return false;
        }
    }

    // check column
    for (let r = 0; r < 9; r++) {
        if (r !== row && board[r][col] === value) {
            return false;
        }
    }

    // check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;

    for (let r = boxRow; r < boxRow + 3; r++) {
        for (let c = boxCol; c < boxCol + 3; c++) {
            if (r !== row || c !== col) {
                if (board[r][c] === value) {
                    return false;
                }
            }
        }
    }

    return true;
}