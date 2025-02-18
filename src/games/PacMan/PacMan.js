import HomeButton from '../../components/HomeButton/HomeButton.js';
import { createPacMan } from './PacManController.js';
import { createGameBoard } from './PacManMap.js';

function createMobileControls() {
    // mobile
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

function createScoreDisplay() {
    const scoreDisplay = document.createElement('div');
    scoreDisplay.classList.add('pacman-score');
    scoreDisplay.textContent = 'Puntos: 0';
    return scoreDisplay;
}

export default function PacManGame() {
    const gameContainer = document.createElement('div');
    gameContainer.classList.add('pacman-container');

    const homeButton = HomeButton();
    const gameBoard = createGameBoard();
    const pacMan = createPacMan(gameBoard);
    const controls = createMobileControls();
    const scoreDisplay = createScoreDisplay();

    gameContainer.appendChild(homeButton);
    gameContainer.appendChild(scoreDisplay);
    gameContainer.appendChild(gameBoard);
    if (controls) gameContainer.appendChild(controls);

    return gameContainer;
}
