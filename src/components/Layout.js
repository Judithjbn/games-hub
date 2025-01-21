import { GamesGrid } from '../import.js';
import { Footer } from '../import.js';

export default function Layout() {
    const layout = document.createElement('div');
    layout.classList.add('layout');

    const grid = GamesGrid();
    const footer = Footer(); 

    layout.appendChild(grid);
    layout.appendChild(footer);

    document.body.appendChild(layout);
}
