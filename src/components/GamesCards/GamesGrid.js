import Card from './GamesCards.js';

export default class GameGrid {
    constructor(games) {
        this.games = games;
    }

    render() {
        const section = document.createElement('section');
        section.className = 'games-section';
        
        const title = document.createElement('h2');
        title.className = 'section-title';
        title.textContent = 'Juegos Populares';
        
        const grid = document.createElement('div');
        grid.className = 'games-row';
        
        this.games.forEach(game => {
            const card = new Card(game);
            grid.appendChild(card.render());
        });
        
        section.appendChild(title);
        section.appendChild(grid);
        return section;
    }
}
