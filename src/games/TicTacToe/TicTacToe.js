function checkWin(moves, player) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winningCombinations.find(combination =>
        combination.every(index => moves[index] === player)
    );

    return winningCombo || null; 
}

function checkDraw(moves) {
    return moves.every(move => move !== null);
}

function drawWinningLine(board, winningCombo) {
    if (!winningCombo || winningCombo.length !== 3) {
        console.error("Error: Combinación ganadora inválida", winningCombo);
        return;
    }

    const cells = board.querySelectorAll('.cell');

    const firstCell = cells[winningCombo[0]];
    const lastCell = cells[winningCombo[2]];

    if (!firstCell || !lastCell) {
        console.error("Error: No se encontraron las celdas correctas");
        return;
    }

    const firstRect = firstCell.getBoundingClientRect();
    const lastRect = lastCell.getBoundingClientRect();
    const boardRect = board.getBoundingClientRect();

    const deltaX = lastRect.left - firstRect.left;
    const deltaY = lastRect.top - firstRect.top;
    const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    const line = document.createElement('div');
    line.classList.add('winning-line');

    line.style.width = `${length}px`;
    line.style.left = `${firstRect.left - boardRect.left + firstRect.width / 2}px`;
    line.style.top = `${firstRect.top - boardRect.top + firstRect.height / 2}px`;
    line.style.transform = `rotate(${Math.atan2(deltaY, deltaX)}rad)`;

    board.appendChild(line);
}


function blockBoard(board) {
    const cells = board.querySelectorAll('.cell');
    cells.forEach(cell => cell.disabled = true);
}

function handleMove(cell, moves, index, currentPlayer, info, board) {
    if (moves[index] === null) {
        moves[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(`player-${currentPlayer.toLowerCase()}`);

        const winningCombo = checkWin(moves, currentPlayer);
        console.log("Combinación ganadora:", winningCombo); 

        if (winningCombo) {
            info.textContent = `${currentPlayer} ha ganado!!!`;
            updateScore(currentPlayer);
            blockBoard(board);
            drawWinningLine(board, winningCombo);
        } else if (checkDraw(moves)) {
            info.textContent = '¡Empate!';
            blockBoard(board);
        }
    }
}


function createScoreboard() {
    const scoreboard = document.createElement('div');
    scoreboard.classList.add('scoreboard');

    const xScore = document.createElement('span');
    xScore.classList.add('score-x');
    xScore.textContent = `X: ${getScore('X')}`;

    const oScore = document.createElement('span');
    oScore.classList.add('score-o');
    oScore.textContent = `O: ${getScore('O')}`;

    scoreboard.appendChild(xScore);
    scoreboard.appendChild(oScore);

    return scoreboard;
}

function getScore(player) {
    const scores = JSON.parse(localStorage.getItem('scores')) || { X: 0, O: 0 };
    return scores[player];
}

function updateScore(player) {
    const scores = JSON.parse(localStorage.getItem('scores')) || { X: 0, O: 0 };
    scores[player]++;
    localStorage.setItem('scores', JSON.stringify(scores));
    refreshScoreboard();
}

function refreshScoreboard() {
    document.querySelector('.score-x').textContent = `X: ${getScore('X')}`;
    document.querySelector('.score-o').textContent = `O: ${getScore('O')}`;
}

export default function TicTacToe() {
    const gameContainer = document.createElement('div');
    gameContainer.className = 'tic-tac-toe';

    const scoreboard = createScoreboard();
    const info = document.createElement('p');
    info.classList.add('info');
    info.textContent = "Turno de X";

    const board = document.createElement('div');
    board.classList.add('board');

    const moves = Array(9).fill(null);
    let currentPlayer = 'X';

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('button');
        cell.classList.add('cell');
        cell.dataset.index = i;

        cell.addEventListener('click', () => {
            handleMove(cell, moves, i, currentPlayer, info, board);
            if (!checkWin(moves, currentPlayer) && !checkDraw(moves)) {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                info.textContent = `Turno de ${currentPlayer}`;
            }
        });

        board.appendChild(cell);
    }

    const resetButton = document.createElement('button');
    resetButton.textContent = "Reiniciar";
    resetButton.classList.add('reset-button');

    resetButton.addEventListener('click', () => {
        const newGame = TicTacToe();
        gameContainer.replaceWith(newGame);
    });

    gameContainer.appendChild(scoreboard);
    gameContainer.appendChild(info);
    gameContainer.appendChild(board);
    gameContainer.appendChild(resetButton);

    return gameContainer;
}