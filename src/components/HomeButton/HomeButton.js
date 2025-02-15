export default function HomeButton() {
    const homeButton = document.createElement('button');
    homeButton.textContent = "🏠";
    homeButton.classList.add('home-button');

    homeButton.addEventListener('click', () => {
        location.reload();
    });

    return homeButton;
}
