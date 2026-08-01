import type { Board, FixedBoard } from "./board";
import { isValidCell } from "./validator";

export class Game {
    board: Board;
    fixed: FixedBoard;

    selectedRow = -1;
    selectedCol = -1;

    startTime: number;

    initialBoard: Board;

    

    constructor(board: Board, fixed: FixedBoard) {
        this.board = board;
        this.fixed = fixed;
        this.startTime = Date.now();

        this.initialBoard = board.map(row => [...row]);
    }

    selectCell(row: number, col: number) {
        this.selectedRow = row;
        this.selectedCol = col;
    }

    setNumber(value: number) {
        if (
            this.selectedRow < 0 ||
            this.selectedCol < 0
        ) {
            return;
        }

        if (
            this.fixed[this.selectedRow][this.selectedCol]
        ) {
            return;
        }

        this.board[this.selectedRow][this.selectedCol] = value;
    }

    getElapsedSeconds(): number {
        return Math.floor(
            (Date.now() - this.startTime) / 1000
        );
    }

    resetTimer() {
        this.startTime = Date.now();
    }

    reset() {
        this.board = this.initialBoard.map(
            row => [...row]
        );

        this.selectedRow = -1;
        this.selectedCol = -1;
        this.resetTimer();
    }

    loadPuzzle(board: Board, fixed: FixedBoard) {
        this.board = board;
        this.fixed = fixed;

        this.initialBoard = board.map(
            row => [...row]
        );

        this.selectedRow = -1;
        this.selectedCol = -1;

        this.resetTimer();
    }

    isComplete(): boolean {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {

                // empty cell
                if (this.board[row][col] === 0) {
                    return false;
                }

                // invalid cell
                if (!isValidCell(this.board, row, col)) {
                    return false;
                }
            }
        }

        return true;
    }
}