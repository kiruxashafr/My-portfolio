document.addEventListener('DOMContentLoaded', () => {
    const contactBtn = document.querySelector('.contact-btn');
    const worksBtn = document.querySelector('.works-btn');
    const modal = document.getElementById('modal');
    const hamburgerInput = document.querySelector('.hamburger input');
    const menuItems = document.querySelectorAll('.modal-content ul li');
    const sections = {
        'Главная': document.querySelector('.container'),
        'Обо мне': document.querySelector('.about-section'),
        'Мои работы': document.querySelector('.works-section'),
        'Контакты': document.querySelector('.contactwin')
    };

    // Smooth scroll to section
    const scrollToSection = (section) => {
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Contact button scroll
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            const contactSection = sections['Контакты'];
            scrollToSection(contactSection);
        });
    }

    // Works button scroll
    if (worksBtn) {
        worksBtn.addEventListener('click', () => {
            const worksSection = sections['Мои работы'];
            scrollToSection(worksSection);
        });
    }

    // Menu items scroll and modal close
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionName = item.textContent.trim();
            const targetSection = sections[sectionName];
            if (targetSection) {
                scrollToSection(targetSection);
                // Close modal and reset hamburger
                modal.style.display = 'none';
                hamburgerInput.checked = false;
                menuItems.forEach(menuItem => {
                    menuItem.classList.remove('draw');
                });
            }
        });
    });
});