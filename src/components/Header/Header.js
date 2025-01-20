import { logo } from '/src/import.js';

export default function Header() {
    const header = document.createElement('header');
    header.classList.add('header');

    const logoImg = document.createElement('img'); 
    logoImg.src = logo;
    logoImg.alt = 'Logo';
    logoImg.classList.add('header__logo');

    header.appendChild(logoImg);
    document.body.prepend(header);
}