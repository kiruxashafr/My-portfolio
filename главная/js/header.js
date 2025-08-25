document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const hamburgerInput = document.querySelector('.hamburger input');
    const closeBtn = document.querySelector('.close-btn');
    const menuItems = document.querySelectorAll('.modal-content ul li');
    const contactBtn = document.querySelector('.contact-btn');
    const aboutSection = document.querySelector('.about-section');
    const worksSection = document.querySelector('.works-section');

    // Select animatable elements for about-section and works-section
    const animatableElements = document.querySelectorAll('.about-section .about-image, .about-section .cardd, .about-section .about-text p, .works-section .phone-mockup');

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

    // Make contact button toggle the modal
    contactBtn.addEventListener('click', () => {
        hamburgerInput.checked = !hamburgerInput.checked;
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

    // IntersectionObserver to trigger animations for sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animatableElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add('visible');
                    }, index * 200);
                });
            }
        });
    }, {
        threshold: 0.05 // Trigger when 5% of the section is visible
    });

    observer.observe(aboutSection);
    if (worksSection) observer.observe(worksSection);
});

// Hide loader when page is fully loaded
window.addEventListener('load', () => {
    const loader = document.querySelector('.containerrr');
    if (loader) {
        loader.classList.add('hidden');
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

