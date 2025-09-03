const toggleBtn = document.querySelector('.menu-toggle');
const menu = document.querySelector('.lista ul');

toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
});