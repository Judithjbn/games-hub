export function createGameBoard() {
    const board = document.createElement('div');
    board.classList.add('pacman-board');

    const boardSize = 10;
    for (let y = 0; y < boardSize; y++) {
        for (let x = 0; x < boardSize; x++) {
            const cell = document.createElement('div');
            cell.classList.add('pacman-cell');

            const isWall = Math.random() < 0.2;
            if (isWall) {
                cell.classList.add('pacman-wall');
            } else {
                const dot = document.createElement('div');
                dot.classList.add('pacman-dot');
                cell.appendChild(dot);
            }

            board.appendChild(cell);
        }
    }
    return board;
}
