let score = 0;

export function createPacMan(board, totalDots, onLose) {
    const pacMan = document.createElement('div');
    pacMan.classList.add('pacman-character');

    let position = { x: 1, y: 1 };
    const boardSize = 10;

    function updatePosition() {
        const index = position.y * boardSize + position.x;
        const cells = board.querySelectorAll('.pacman-cell');

        cells.forEach(cell => cell.classList.remove('pacman-active'));
        if (cells[index]) {
            cells[index].appendChild(pacMan);
            cells[index].classList.add('pacman-active');

            const dot = cells[index].querySelector('.pacman-dot');
            if (dot) {
                dot.remove();
                updateScore(10);
                totalDots--;
                checkWinCondition();
            }

            checkGhostCollision();
        }
    }

    function checkGhostCollision() {
        const ghosts = document.querySelectorAll('.pacman-ghost');
        ghosts.forEach(ghost => {
            const ghostX = parseInt(ghost.dataset.x);
            const ghostY = parseInt(ghost.dataset.y);

            if (ghostX === position.x && ghostY === position.y) {
                onLose();
            }
        });
    }

    document.addEventListener('keydown', (event) => {
        let newX = position.x;
        let newY = position.y;

        switch (event.key) {
            case 'ArrowUp': if (newY > 0) newY--; break;
            case 'ArrowDown': if (newY < boardSize - 1) newY++; break;
            case 'ArrowLeft': if (newX > 0) newX--; break;
            case 'ArrowRight': if (newX < boardSize - 1) newX++; break;
        }

        if (!checkCollision(newX, newY, board)) {
            position.x = newX;
            position.y = newY;
            updatePosition();
        }
    });

    function checkWinCondition() {
        if (totalDots === 0) {
            showWinMessage();
        }
    }

    updatePosition();
    return pacMan;
}

function checkCollision(x, y, board) {
    const cells = board.querySelectorAll('.pacman-cell');
    const index = y * 10 + x; 

    if (index < 0 || index >= cells.length) return true;
    return cells[index] && cells[index].classList.contains('pacman-wall');
}

function updateScore(points) {
    score += points;
    let scoreElement = document.querySelector('.pacman-score');
    
    if (scoreElement) {
        scoreElement.textContent = `Puntos: ${score}`;
    }
}

function showWinMessage() {
    if (document.querySelector('.win-message')) return;

    const winMessage = document.createElement('div');
    winMessage.classList.add('win-message');
    winMessage.textContent = '¡Has ganado! 🎉';

    const restartButton = document.createElement('button');
    restartButton.textContent = 'Reiniciar';
    restartButton.classList.add('restart-button');
    restartButton.addEventListener('click', () => {
        location.reload();
    });

    winMessage.appendChild(restartButton);
    document.body.appendChild(winMessage);
}