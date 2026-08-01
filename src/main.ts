import "./style.css";
import { Game } from "./game";
import { createPuzzle } from "./generator";
import { drawBoard } from "./ui";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
    throw new Error("Cannot find app element");
}

const puzzle = createPuzzle();

const game = new Game(
    puzzle.board,
    puzzle.fixed
);

// timer
const timer = document.createElement("div");
timer.id = "timer";

// message
const message = document.createElement("div");
message.id = "message";

// new game button
const newGameButton = document.createElement("button");
newGameButton.textContent = "New Game";

// board container
const boardContainer = document.createElement("div");

// add elements to page
app.appendChild(timer);
app.appendChild(message);
app.appendChild(newGameButton);
app.appendChild(boardContainer);


// timer update
setInterval(() => {
    timer.textContent =
        `Time: ${game.getElapsedSeconds()}s`;
}, 1000);


// win callback
const checkWin = () => {
    message.textContent =
        `🎉 Congratulations! Time: ${game.getElapsedSeconds()}s`;
};


// keyboard control
document.addEventListener("keydown", (event) => {
    const key = event.key;

    let row = game.selectedRow;
    let col = game.selectedCol;

    // move selection with arrow keys
    if (key === "ArrowUp") {
        row = Math.max(0, row - 1);
    }

    if (key === "ArrowDown") {
        row = Math.min(8, row + 1);
    }

    if (key === "ArrowLeft") {
        col = Math.max(0, col - 1);
    }

    if (key === "ArrowRight") {
        col = Math.min(8, col + 1);
    }

    if (
        key.startsWith("Arrow")
    ) {
        // if no cell selected, start at top-left
        if (game.selectedRow < 0 || game.selectedCol < 0) {
            game.selectCell(0, 0);
        } else {
            game.selectCell(row, col);
        }

        drawBoard(game, boardContainer, checkWin);
        return;
    }


    // number keys 1-9
    if (key >= "1" && key <= "9") {
        game.setNumber(Number(key));

        if (game.isComplete()) {
            checkWin();
        }

        drawBoard(game, boardContainer, checkWin);
    }


    // clear cell
    if (key === "Delete" || key === "Backspace") {
        game.clearCell();

        drawBoard(game, boardContainer, checkWin);
    }
});


// new puzzle
newGameButton.onclick = () => {
    const puzzle = createPuzzle();

    game.loadPuzzle(
        puzzle.board,
        puzzle.fixed
    );

    message.textContent = "";

    drawBoard(
        game,
        boardContainer,
        checkWin
    );
};


// first draw
drawBoard(
    game,
    boardContainer,
    checkWin
);