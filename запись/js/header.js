document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const hamburgerInput = document.querySelector('.hamburger input');
    const closeBtn = document.querySelector('.close-btn');
    const menuItems = document.querySelectorAll('.modal-content ul li');

    // Переменные для управления скроллом
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    const headerHeight = header.offsetHeight;

    // Функция для скрытия/показа header при скролле
    window.addEventListener('scroll', () => {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScroll > lastScrollTop && currentScroll > headerHeight) {
            // Скролл вниз - скрываем header
            header.classList.add('header-hidden');
        } else {
            // Скролл вверх - показываем header
            header.classList.remove('header-hidden');
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });

    // Открытие/закрытие меню по клику на гамбургер
    hamburgerInput.addEventListener('change', () => {
        if (hamburgerInput.checked) {
            modal.style.display = 'flex';
            menuItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('draw');
                }, index * 100);
            });
        } else {
            modal.style.display = 'none';
            menuItems.forEach(item => {
                item.classList.remove('draw');
            });
        }
    });

    // Закрытие меню по крестику
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        hamburgerInput.checked = false;
        menuItems.forEach(item => {
            item.classList.remove('draw');
        });
    });

    // Закрытие меню при клике вне контента
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            hamburgerInput.checked = false;
            menuItems.forEach(item => {
                item.classList.remove('draw');
            });
        }
    });
});