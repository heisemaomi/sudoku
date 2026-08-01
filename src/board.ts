export type Board = number[][];

export type FixedBoard = boolean[][];

export function createEmptyBoard(): Board {
    return Array.from(
        { length: 9 },
        () => Array(9).fill(0)
    );
}

export function createEmptyFixed(): FixedBoard {
    return Array.from(
        { length: 9 },
        () => Array(9).fill(false)
    );
}