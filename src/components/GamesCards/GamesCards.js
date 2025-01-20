import { cover } from '/src/import.js';
// importar iconos de juegos para cards


export function createCard(game) {
    const card = document.createElement('div');
    card.classList.add('game-card');
    
    const img = document.createElement('img');
    img.src = cover;
    img.alt = game.title;
    img.classList.add('game-card__image');

    const title = document.createElement('h3');
    title.textContent = game.title;
    title.classList.add('game-card__title');

    const description = document.createElement('p');
    description.textContent = game.description;
    description.classList.add('game-card__description');

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(img);    

    return card
}