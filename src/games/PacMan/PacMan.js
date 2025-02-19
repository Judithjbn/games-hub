import HomeButton from '../../components/HomeButton/HomeButton.js';
import { createPacMan } from './PacManController.js';
import { createGameBoard } from './PacManMap.js';
import { createGhosts } from './PacManGhosts.js';

function createMobileControls() {
    if (window.innerWidth > 600) return null; 
    const controls = document.createElement('div');
    controls.classList.add('mobile-controls');

    ['⬆️', '⬅️', '⬇️', '➡️'].forEach((arrow, index) => {
        const button = document.createElement('button');
        button.textContent = arrow;
        button.classList.add('control-button');
        button.addEventListener('click', () => {
            const event = new KeyboardEvent('keydown', { key: ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'][index] });
            document.dispatchEvent(event);
        });
        controls.appendChild(button);
    });

    return controls;
}

function showLoseMessage() {
    if (document.querySelector('.lose-message')) return;

    const loseMessage = document.createElement('div');
    loseMessage.classList.add('lose-message');
    loseMessage.textContent = '¡Has perdido! 👻';

    const restartButton = document.createElement('button');
    restartButton.textContent = 'Reiniciar';
    restartButton.classList.add('restart-button');
    restartButton.addEventListener('click', () => {
        location.reload();
    });

    loseMessage.appendChild(restartButton);
    document.body.appendChild(loseMessage);
}



export default function PacManGame() {
    const gameContainer = document.createElement('div');
    gameContainer.classList.add('pacman-container');

    const homeButton = HomeButton();
    const { board, totalDots } = createGameBoard();
    const pacMan = createPacMan(board, totalDots, showLoseMessage);

    createGhosts(board, pacMan, showLoseMessage);
    const controls = createMobileControls();

    gameContainer.appendChild(homeButton);
    gameContainer.appendChild(board);
    if (controls) gameContainer.appendChild(controls);

    return gameContainer;
}