
document.addEventListener('DOMContentLoaded', () => {
    // Add loading class to body to hide content initially
    document.body.classList.add('loading');

    const modal = document.getElementById('modal');
    const hamburgerInput = document.querySelector('.hamburger input');
    const closeBtn = document.querySelector('.close-btn');
    const menuItems = document.querySelectorAll('.modal-content ul li');
    const contactBtn = document.querySelector('.contact-btn');

    // Toggle modal and animate lines when hamburger is clicked
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

    // Добавьте этот код в файл scroll.js или создайте новый
    function adjustAboutSectionHeight() {
        if (window.innerWidth >= 769) {
            const aboutText = document.querySelector('.about-text');
            const aboutImage = document.querySelector('.about-image[data-image="full"]');
            
            if (aboutText && aboutImage) {
                const textHeight = aboutText.offsetHeight;
                aboutImage.style.height = textHeight + 'px';
            }
        }
    }

    // Вызываем при загрузке и изменении размера окна
    window.addEventListener('load', adjustAboutSectionHeight);
    window.addEventListener('resize', adjustAboutSectionHeight);

    // Также можно вызвать после анимации появления
    setTimeout(adjustAboutSectionHeight, 1000);

    // Close modal and reset hamburger and lines when close button is clicked
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        hamburgerInput.checked = false;
        menuItems.forEach(item => {
            item.classList.remove('draw');
        });
    });

    // Close modal and reset hamburger and lines if clicking outside the modal content
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

// Hide loader and show content when page is fully loaded
window.addEventListener('load', () => {
    const loader = document.querySelector('.containerrr');
    if (loader) {
        loader.classList.add('hidden');
        document.body.classList.remove('loading');
    }
});

let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > lastScrollTop) {
        // Scrolling down
        header.classList.add('hidden');
    } else {
        // Scrolling up
        header.classList.remove('hidden');
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});
