export function createPacMan() {
    const pacMan = document.createElement('div');
    pacMan.classList.add('pacman');

    let position = { x: 1, y: 1 };
    const boardSize = 10; 

    function updatePosition() {
        pacMan.style.transform = `translate(${position.x * 40}px, ${position.y * 40}px)`;
    }

    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowUp': if (position.y > 0) position.y--; break;
            case 'ArrowDown': if (position.y < boardSize - 1) position.y++; break;
            case 'ArrowLeft': if (position.x > 0) position.x--; break;
            case 'ArrowRight': if (position.x < boardSize - 1) position.x++; break;
        }
        updatePosition();
    });

    updatePosition();
    return pacMan;
}
