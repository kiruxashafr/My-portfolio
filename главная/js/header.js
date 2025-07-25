document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const hamburgerInput = document.querySelector('.hamburger input');
    const closeBtn = document.querySelector('.close-btn');
    const menuItems = document.querySelectorAll('.modal-content ul li');

    // Toggle modal and animate lines when hamburger is clicked
    hamburgerInput.addEventListener('change', () => {
        if (hamburgerInput.checked) {
            modal.style.display = 'flex';
            // Add draw class to each li with a staggered delay
            menuItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('draw');
                }, index * 100); // 100ms delay per item for staggered effect
            });
        } else {
            modal.style.display = 'none';
            // Remove draw class to reset animation
            menuItems.forEach(item => {
                item.classList.remove('draw');
            });
        }
    });

    // Close modal and reset hamburger and lines when close button is clicked
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        hamburgerInput.checked = false;
        // Remove draw class to reset animation
        menuItems.forEach(item => {
            item.classList.remove('draw');
        });
    });

    // Close modal and reset hamburger and lines if clicking outside the modal content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            hamburgerInput.checked = false;
            // Remove draw class to reset animation
            menuItems.forEach(item => {
                item.classList.remove('draw');
            });
        }
    });
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
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative scroll
});

// Make contact button toggle the modal
const contactBtn = document.querySelector('.contact-btn');
contactBtn.addEventListener('click', () => {
    hamburgerInput.checked = !hamburgerInput.checked; // Toggle checkbox state
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