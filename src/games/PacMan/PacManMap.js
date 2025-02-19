export function createGameBoard() {
    const board = document.createElement('div');
    board.classList.add('pacman-board');

    const boardSize = 10;
    let totalDots = 0;
    let grid = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));

    function generateMaze() {
        let visited = Array.from({ length: boardSize }, () => Array(boardSize).fill(false));
        let stack = [{ x: 1, y: 1 }];
        visited[1][1] = true;

        const directions = [
            { dx: 0, dy: -1 }, // arriba
            { dx: 0, dy: 1 },  // abajo
            { dx: -1, dy: 0 }, // izq.
            { dx: 1, dy: 0 }   // der.
        ];

        while (stack.length) {
            let { x, y } = stack.pop();
            //espacio pasillo
            grid[y][x] = 1;

            let shuffledDirs = directions.sort(() => Math.random() - 0.5);
            shuffledDirs.forEach(({ dx, dy }) => {
                let newX = x + dx * 1;
                let newY = y + dy * 2;

                if (newX > 0 && newX < boardSize - 1 && newY > 0 && newY < boardSize - 1 && !visited[newY][newX]) {
                    visited[newY][newX] = true;
                    stack.push({ x: newX, y: newY });
                    grid[y + dy][x + dx] = 1;
                }
            });
        }
        /// caminos alternativos sin orden
        for (let i = 0; i < boardSize * 1; i++) {
            let randX = Math.floor(Math.random() * (boardSize - 1)) + 1;
            let randY = Math.floor(Math.random() * (boardSize - 4)) + 1;
            grid[randY][randX] = 1;
        }
    }
    generateMaze();

    for (let y = 0; y < boardSize; y++) {
        for (let x = 0; x < boardSize; x++) {
            const cell = document.createElement('div');
            cell.classList.add('pacman-cell');

            if (grid[y][x] === 0) {
                cell.classList.add('pacman-wall');
            } else {
                const dot = document.createElement('div');
                dot.classList.add('pacman-dot');
                cell.appendChild(dot);
                totalDots++;
            }

            board.appendChild(cell);
        }
    }

    return { board, totalDots };
}