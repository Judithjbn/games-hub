async function TicTacToe() {
    const gameContainer = document.createElement('div');
    gameContainer.className.add('tic-tac-toe');

    const {board,moves} = createBoard();
    const info = document.createElement('p');
    info.className.add('info');
    gameContainer.append(board);
    gameContainer.append(info);

    document.body.append(gameContainer);

    let currentPlayer = await choosePlayer();
    info.textContent = `Es el turno de ${currentPlayer}`;

    board.addEventListener('click', (event) => {
        const cell = event.target;

        if (cell.classList.contains('cell')) {
            if (handleMode(cell, moves, currentPlayer)){
                if (checkWin(moves, currentPlayer)){
                    blockBoard(board);
                    updateScore(currentPlayer);
                } else if (checkDraw(moves)){
                    info.textContent = 'Empate';
                } else{
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    info.textContent = `Le toca a ${currentPlayer}`;
                }
            }
        }
    })
}