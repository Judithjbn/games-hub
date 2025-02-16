import { createCard } from './GamesCards.js';
import { iconTicTacToe, iconTetris, iconPacMan } from '../../import.js';

import TicTacToe from '../../games/TicTacToe/TicTacToe.js';

export default function GamesGrid() {
  const games = [
    {
      title: 'Tic Tac Toe',
      description: 'El clásico juego del tres en raya.',
      icon: iconTicTacToe,
      iconWidth: '100px',
      action: TicTacToe,
    },
    {
      title: 'Tetris',
      description: 'Un desafío para construir líneas.',
      icon: iconTetris,
    },
    {
      title: 'Pac-Man',
      description: 'El juego de arcade más icónico.',
      icon: iconPacMan,
    },
  ];

  const grid = document.createElement('div');
  grid.classList.add('games-grid');

  games.forEach((game) => {
    const card = createCard(game);
    grid.appendChild(card);
  });

  return grid;
}
