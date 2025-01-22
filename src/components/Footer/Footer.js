export default function Footer() {
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    footer.innerHTML = `
        <nav class="footer__nav">
            <a href="#" class="footer__link">Inicio</a>
            <a href="#" class="footer__link">Tic Tac Toe</a>
            <a href="#" class="footer__link">Tetris</a>
            <a href="#" class="footer__link">Pac-Man</a>
            <a href="#" class="footer__link">Sobre el proyecto</a>
            <a href="#" class="footer__link">Contacto</a>
        </nav>
    `;

    return footer;
}
