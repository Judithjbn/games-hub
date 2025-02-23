export default function TetrisGame() {
    // cambio de crear array manualmente, cuantos elementos vs posciones, fill ppara dejarlo vacio
    const rows = 12;
    const cols = 8;
    const arrayTetris = Array.from({ length: rows }, () => Array(cols).fill(""));
    
    const pieces = [
        {
            valor: "L",
            render: [
                ["", "", ""],
                ["L", "", ""],
                ["L", "", ""],
                ["L", "L", ""]
            ],
            color: "red"
        },
        {
            valor: "I",
            render: [
                ["I", "", ""],
                ["I", "", ""],
                ["I", "", ""],
                ["I", "", ""]
            ],
            color: "orange"
        }
    ];
    
    let currentPiece = getRandomPiece();
    let nextPiece = getRandomPiece();
    let currentRow = 0;
    let currentCol = Math.floor(Math.random() * (cols - 3));
    
    function getRandomPiece() {
        return JSON.parse(JSON.stringify(pieces[Math.floor(Math.random() * pieces.length)]));
    }
    
    const divTetrisContainer = document.createElement('div');
    const tetrisGame = document.createElement('div');
    divTetrisContainer.classList.add('tetris-container');
    tetrisGame.classList.add('tetris-game');
    divTetrisContainer.appendChild(tetrisGame);
    
    const divPiece = document.createElement('div');
    divPiece.classList.add('tetris-piece');
    divTetrisContainer.appendChild(divPiece);
    
    function renderNextPiece() {
        divPiece.innerHTML = "";
        for (const row of nextPiece.render) {
            const divRow = document.createElement('div');
            for (const col of row) {
                const divPartPiece = document.createElement('div');
                if (col) {
                    divPartPiece.style.background = nextPiece.color;
                }
                divPiece.appendChild(divPartPiece);
            }
            divPiece.appendChild(divRow);
        }
    }
    
    function drawBoard() {
        tetrisGame.innerHTML = "";
        const tempBoard = JSON.parse(JSON.stringify(arrayTetris));
        
        for (let i = 0; i < currentPiece.render.length; i++) {
            for (let j = 0; j < currentPiece.render[i].length; j++) {
                if (currentPiece.render[i][j]) {
                    tempBoard[currentRow + i][currentCol + j] = currentPiece.color;
                }
            }
        }
        
        for (const row of tempBoard) {
            for (const cell of row) {
                const divCell = document.createElement('div');
                divCell.classList.add('tetris-cell');
                if (cell) {
                    divCell.style.backgroundColor = cell;
                }
                tetrisGame.appendChild(divCell);
            }
        }
    }
    
    function dropPiece() {
        const interval = setInterval(() => {
            if (currentRow + currentPiece.render.length >= rows || collision(currentRow + 1, currentCol)) {
                placePiece();
                currentPiece = nextPiece;
                nextPiece = getRandomPiece();
                currentRow = 0;
                currentCol = Math.floor(Math.random() * (cols - currentPiece.render[0].length));
                renderNextPiece();
                clearInterval(interval);
                dropPiece();
                return;
            }
            currentRow++;
            drawBoard();
        }, 500);
    }
    
    function collision(row, col) {
        for (let i = 0; i < currentPiece.render.length; i++) {
            for (let j = 0; j < currentPiece.render[i].length; j++) {
                if (currentPiece.render[i][j] && arrayTetris[row + i]?.[col + j]) {
                    return true;
                }
            }
        }
        return false;
    }
    
    function placePiece() {
        for (let i = 0; i < currentPiece.render.length; i++) {
            for (let j = 0; j < currentPiece.render[i].length; j++) {
                if (currentPiece.render[i][j]) {
                    arrayTetris[currentRow + i][currentCol + j] = currentPiece.color;
                }
            }
        }
        drawBoard();
    }
    
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft" && currentCol > 0 && !collision(currentRow, currentCol - 1)) {
            currentCol--;
        } else if (event.key === "ArrowRight" && currentCol + currentPiece.render[0].length <= cols && !collision(currentRow, currentCol + 1)) {
            currentCol++;
        } else if (event.key === "ArrowDown") {
            dropPiece();
        }
        drawBoard();
    });
    
    drawBoard();
    renderNextPiece();
    dropPiece();
    
    return divTetrisContainer;
}
