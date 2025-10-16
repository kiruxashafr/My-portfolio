document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const hamburgerInput = document.querySelector('.hamburger input');
    const closeBtn = document.querySelector('.close-btn');
    const menuItems = document.querySelectorAll('.modal-content ul li');
    const menuLinks = document.querySelectorAll('.menu-link');
    const contactOrderBtn = document.querySelector('.contact-order-btn');
    const contactModal = document.getElementById('contact-modal');
    const closeContactModal = document.querySelector('.close-contact-modal');

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

    // Функция закрытия меню
    function closeMenu() {
        modal.style.display = 'none';
        hamburgerInput.checked = false;
        menuItems.forEach(item => {
            item.classList.remove('draw');
        });
    }

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
            closeMenu();
        }
    });

    // Закрытие меню по крестику
    closeBtn.addEventListener('click', closeMenu);

    // Закрытие меню при клике вне контента
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeMenu();
        }
    });

    // Навигация по ссылкам меню
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            closeMenu();
            
            const targetId = link.getAttribute('href');
            if (targetId === '#contacts') {
                // Для контактов открываем модальное окно
                if (contactModal) {
                    contactModal.style.display = 'flex';
                }
            } else {
                // Для других секций - плавная прокрутка
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

// Обработка кнопки "Заказать сайт" в меню
if (contactOrderBtn) {
    contactOrderBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeMenu();
        openContactModal();
    });
}

// Обработка кнопки "Контакты" в хедере
const headerContactBtn = document.querySelector('.contact-btn');
if (headerContactBtn) {
    headerContactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openContactModal();
    });
}

// Функция для открытия модального окна контактов
function openContactModal() {
    if (contactModal) {
        contactModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Блокируем скролл
    }
}

// Функция для закрытия модального окна контактов
function closeContactModal() {
    if (contactModal) {
        contactModal.style.display = 'none';
        document.body.style.overflow = ''; // Разблокируем скролл
    }
}

// Закрытие модального окна контактов
if (closeContactModal) {
    closeContactModal.addEventListener('click', closeContactModal);
}

// Закрытие модального окна контактов при клике вне его
if (contactModal) {
    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            closeContactModal();
        }
    });
}

// Закрытие по ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && contactModal && contactModal.style.display === 'flex') {
        closeContactModal();
    }
});
});