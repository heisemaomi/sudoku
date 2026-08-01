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