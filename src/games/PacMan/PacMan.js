import HomeButton from '../../components/HomeButton/HomeButton.js';
import { createPacMan } from './PacManController.js';
import { createGameBoard } from './PacManMap.js';

export default function PacManGame() {
    const gameContainer = document.createElement('div');
    gameContainer.classList.add('pacman-game');

    const homeButton = HomeButton();
    const gameBoard = createGameBoard();
    const pacMan = createPacMan();

    gameBoard.appendChild(pacMan);
    gameContainer.appendChild(homeButton);
    gameContainer.appendChild(gameBoard);

    return gameContainer;
}
