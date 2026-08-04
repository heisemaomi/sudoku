import { Game } from "./game";
import { isValidCell } from "./validator";

export function drawBoard(
    game: Game,
    container: HTMLDivElement,
    onComplete?: () => void
) {
    // Only redraw the board area
    container.innerHTML = "";

    const grid = document.createElement("div");
    grid.className = "sudoku-grid";

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {

            const cell = document.createElement("button");
            cell.className = "cell";

            // thick borders for 3x3 boxes
            if (row % 3 === 0) {
                cell.classList.add("top-border");
            }

            if (col % 3 === 0) {
                cell.classList.add("left-border");
            }

            if (row === 8) {
                cell.classList.add("bottom-border");
            }

            if (col === 8) {
                cell.classList.add("right-border");
            }

            // highlight row and column
            if (
                row === game.selectedRow ||
                col === game.selectedCol
            ) {
                cell.classList.add("highlight");
            }
            
            // selected cell
            if (
                row === game.selectedRow &&
                col === game.selectedCol
            ) {
                cell.classList.add("selected");
            }

            // fixed puzzle numbers
            if (game.fixed[row][col]) {
                cell.classList.add("fixed");
            } else if (game.board[row][col] !== 0) {
                cell.classList.add("user-entered-number");
            }

            // invalid numbers
            if (!isValidCell(game.board, row, col)) {
                cell.classList.add("invalid");
            }

            const value = game.board[row][col];

            if (value !== 0) {
                cell.textContent = String(value);
            }

            cell.addEventListener("click", () => {
                if (game.fixed[row][col]) {
                    return;
                }

                game.selectCell(row, col);
                drawBoard(game, container, onComplete);
            });

            grid.appendChild(cell);
        }
    }

    container.appendChild(grid);


    // number buttons
    const numbers = document.createElement("div");
    numbers.className = "number-pad";

    for (let n = 1; n <= 9; n++) {
        const button = document.createElement("button");

        button.className = "number-button";
        button.textContent = String(n);

        button.onclick = () => {
            game.setNumber(n);

            if (game.isComplete() && onComplete) {
                onComplete();
            }

            drawBoard(game, container, onComplete);
        };

        numbers.appendChild(button);
    }

    container.appendChild(numbers);

    // clear button
    const clearButton = document.createElement("button");
    clearButton.className = "number-button clear-button";
    clearButton.textContent = "Clear";

    clearButton.onclick = () => {
        game.clearCell();
        drawBoard(game, container, onComplete);
    };

    numbers.appendChild(clearButton);
}