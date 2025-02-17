export function createGameBoard() {
    const board = document.createElement('div');
    board.classList.add('pacman-board');

    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div');
        cell.classList.add('pacman-cell');

        if (Math.random() > 0.8) {
            cell.classList.add('pacman-wall');
        }

        board.appendChild(cell);
    }

    return board;
}
