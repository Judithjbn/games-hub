import Header from './components/Header/Header.js';
import Layout from './components/Layout.js';
import GamesGrid from './components/GamesCards/GamesGrid.js';
import Footer from './components/Footer/Footer.js';


// styles
import './components/Header/Header.scss';
import './components/GamesCards/GamesCards.scss';
import './components/Footer/Footer.scss';
import './components/HomeButton/HomeButton.scss';
import './games/TicTacToe/TicTacToe.scss';
import './games/PacMan/PacMan.scss';

// assets
const logo = '/logo.png';
const cover = '/cover.png'; 
const iconTicTacToe = '/icon_TicTac.svg';
const iconTetris = '/icon_tetris.svg';
const iconPacMan = '/icon_Pacman.svg';

export { Header, GamesGrid, Footer, Layout, logo, cover, iconTicTacToe, iconTetris, iconPacMan};