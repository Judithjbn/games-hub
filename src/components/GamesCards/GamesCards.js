function startGame(gameFunction) {
    document.body.innerHTML = '';
    const game = gameFunction();
    document.body.appendChild(game);
}

export function createCard(game) {
    const card = document.createElement('div');
    card.classList.add('game-card');

    const title = document.createElement('h3');
    title.textContent = game.title;
    title.classList.add('game-card__title');

    const description = document.createElement('p');
    description.textContent = game.description;
    description.classList.add('game-card__description');
    
    const icon = document.createElement('img');
    icon.src = game.icon;
    icon.alt = `${game.title} Icon`;
    icon.classList.add('game-card__icon');
    if (game.iconWidth) {
      icon.style.width = game.iconWidth;
    }

    if (game.action) {
      card.addEventListener('click', () => {
        startGame(game.action);
      });
    }

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(icon);

    return card
}