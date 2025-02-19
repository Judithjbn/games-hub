const ghostImages = [
    '/blue-ghost.png', 
    '/red-ghost.png', 
    '/yellow-ghost.png'
];

export function createGhosts(board, pacMan, onCollision) {
    const ghosts = [];
    const boardSize = 10;

    function createGhost(x, y, imageSrc) {
        const ghost = document.createElement('img');
        ghost.src = imageSrc;
        ghost.classList.add('pacman-ghost');
        ghost.dataset.x = x;
        ghost.dataset.y = y;
        updateGhostPosition(ghost, x, y);
        board.appendChild(ghost);
        ghosts.push(ghost);
    }

    function updateGhostPosition(ghost, x, y) {
        const index = y * boardSize + x;
        const cells = board.querySelectorAll('.pacman-cell');
        
        cells.forEach(cell => cell.classList.remove('ghost-active'));
        if (cells[index]) {
            cells[index].appendChild(ghost);
            ghost.dataset.x = x;
            ghost.dataset.y = y;
        }
    }

    function moveGhosts() {
        ghosts.forEach(ghost => {
            let x = parseInt(ghost.dataset.x);
            let y = parseInt(ghost.dataset.y);

            const directions = [
                { dx: 0, dy: -1 },
                { dx: 0, dy: 1 },
                { dx: -1, dy: 0 },
                { dx: 1, dy: 0 }   
            ];
            let validMoves = directions.filter(dir => {
                let newX = x + dir.dx;
                let newY = y + dir.dy;
                const index = newY * boardSize + newX;
                const cells = board.querySelectorAll('.pacman-cell');
                return (
                    newX >= 0 && newX < boardSize &&
                    newY >= 0 && newY < boardSize &&
                    !cells[index].classList.contains('pacman-wall')
                );
            });
            if (validMoves.length > 0) {
                const move = validMoves[Math.floor(Math.random() * validMoves.length)];
                x += move.dx;
                y += move.dy;
                updateGhostPosition(ghost, x, y);

                if (x == pacMan.x && y == pacMan.y) {
                    onCollision();
                }
            }
        });

        setTimeout(moveGhosts, 800);
    }
    for (let i = 0; i < ghostImages.length; i++) {
        let x, y;
        do {
            x = Math.floor(Math.random() * boardSize);
            y = Math.floor(Math.random() * boardSize);
        } while (board.querySelectorAll('.pacman-cell')[y * boardSize + x].classList.contains('pacman-wall'));

        createGhost(x, y, ghostImages[i]);
    }

    moveGhosts();
}