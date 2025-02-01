function checkWin(moves, player) {
    const winningCombinations =[
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [ 1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winningCombinations.some(combination =>
        combination.every(index => moves[index] === player)
    );
}

function checkDraw(moves) {
    return moves.every(move => move !== null);
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

        if(checkWin(moves, currentPlayer)) {
            info.textContent = `${currentPlayer} gana`;
            cell.disabled = true;
        } else if (checkDraw(moves)) {
            info.textContent = 'Empate';
        }
    }
};

export default function TicTacToe() {
    const gameContainer = document.createElement('div');
    gameContainer.className = 'tic-tac-toe';

    const info = document.createElement('p');
    info.classList.add('info');
    info.textContent = "Turno de X";

    const board = document.createElement('div');
    board.classList.add('board');

    const moves = Array (9).fill(null);
    let currentPlayer = 'X';

    for (let i = 0; i < 9 ; i ++){
        const cell = document.createElement('button');
        cell.classList.add('cell');
        cell.dataset.index = i;

        cell.addEventListener('click', () => {
            handleMove(cell, moves, i, currentPlayer, info, board);
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        });

        board.appendChild(cell);
    }

    gameContainer.appendChild(info);
    gameContainer.appendChild(board);

    return gameContainer;
}