document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const hamburgerInput = document.querySelector('.hamburger input');
    const closeBtn = document.querySelector('.close-btn');
    const menuItems = document.querySelectorAll('.modal-content ul li');
    const menuLinks = document.querySelectorAll('.menu-link');
    const contactOrderBtn = document.querySelector('.contact-order-btn');
    const contactModal = document.getElementById('contact-modal');
    const closeContactModalBtn = document.querySelector('.close-contact-modal');

    // Переменные для управления скроллом
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    const headerHeight = header.offsetHeight;
    let ticking = false;

    // Улучшенная функция для скрытия/показа header при скролле
    function updateHeaderVisibility() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // Добавляем небольшой порог для предотвращения мерцания
        const scrollThreshold = 5;
        
        if (Math.abs(currentScroll - lastScrollTop) <= scrollThreshold) {
            ticking = false;
            return;
        }
        
        if (currentScroll > lastScrollTop && currentScroll > headerHeight) {
            // Скролл вниз - скрываем header
            header.classList.add('header-hidden');
        } else {
            // Скролл вверх - показываем header
            header.classList.remove('header-hidden');
        }
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        ticking = false;
    }

    // Оптимизированный обработчик скролла с requestAnimationFrame
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeaderVisibility);
            ticking = true;
        }
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
            // При открытии меню убедимся, что хедер виден
            header.classList.remove('header-hidden');
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
                    document.body.style.overflow = 'hidden';
                }
            } else {
                // Для других секций - плавная прокрутка
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    // Убедимся, что хедер виден перед скроллом
                    header.classList.remove('header-hidden');
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
            if (contactModal) {
                contactModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // Обработка кнопки "Контакты" в хедере
    const headerContactBtn = document.querySelector('.contact-btn');
    if (headerContactBtn) {
        headerContactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Убедимся, что хедер виден при открытии контактов
            header.classList.remove('header-hidden');
            if (contactModal) {
                contactModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // Закрытие модального окна контактов
    if (closeContactModalBtn) {
        closeContactModalBtn.addEventListener('click', () => {
            if (contactModal) {
                contactModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    // Закрытие модального окна контактов при клике вне его
    if (contactModal) {
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                contactModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (contactModal && contactModal.style.display === 'flex') {
                contactModal.style.display = 'none';
                document.body.style.overflow = '';
            }
            if (modal && modal.style.display === 'flex') {
                closeMenu();
            }
        }
    });
});