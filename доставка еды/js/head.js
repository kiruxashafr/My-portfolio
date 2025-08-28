document.addEventListener('DOMContentLoaded', () => {
    // Add loading class to body to hide content initially
    document.body.classList.add('loading');

    const modal = document.getElementById('modal');
    const hamburgerInput = document.querySelector('.hamburger input');
    const closeBtn = document.querySelector('.close-btn');    
    const menuItems = document.querySelectorAll('.modal-content ul li');
    const contactBtn = document.querySelector('.contact-btn');
    const clientSection = document.querySelector('.client-section');
    const clientSectionTwo = document.querySelector('.client-section-two');
    const clientSectionThree = document.querySelector('.client-section-three');
    const contactWin = document.querySelector('.contactwin');
    const contactCloseBtn = document.createElement('button');
    const contactMenuItem = Array.from(menuItems).find(item => item.textContent === 'Контакты');

    // Configure close button for contact window
    contactCloseBtn.className = 'close-contact-btn';
    contactCloseBtn.textContent = '×';
    contactWin.querySelector('.conter').appendChild(contactCloseBtn);

    // Initially hide contact window
    contactWin.style.display = 'none';

    // Toggle modal and animate lines when hamburger is clicked
    if (hamburgerInput && modal) {
        hamburgerInput.addEventListener('change', () => {
            if (hamburgerInput.checked) {
                modal.style.display = 'flex';
                contactWin.style.display = 'none'; // Ensure contact window is hidden when modal opens
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
    }

    // Close modal and reset hamburger and lines when close button is clicked
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            if (hamburgerInput) hamburgerInput.checked = false;
            menuItems.forEach(item => {
                item.classList.remove('draw');
            });
        });
    }

    // Close modal and reset hamburger and lines if clicking outside the modal content
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                if (hamburgerInput) hamburgerInput.checked = false;
                menuItems.forEach(item => {
                    item.classList.remove('draw');
                });
            }
        });
    }

    // Show contact window when contact button is clicked
    if (contactBtn && contactWin) {
        contactBtn.addEventListener('click', () => {
            contactWin.style.display = 'flex';
            modal.style.display = 'none'; // Close hamburger modal if open
            if (hamburgerInput) hamburgerInput.checked = false;
            menuItems.forEach(item => {
                item.classList.remove('draw');
            });
        });
    }

    // Show contact window when "Контакты" menu item is clicked
    if (contactMenuItem && contactWin) {
        contactMenuItem.addEventListener('click', () => {
            contactWin.style.display = 'flex';
            modal.style.display = 'none'; // Close hamburger modal
            if (hamburgerInput) hamburgerInput.checked = false;
            menuItems.forEach(item => {
                item.classList.remove('draw');
            });
        });
    }

    // Close contact window when close button is clicked
    if (contactCloseBtn && contactWin) {
        contactCloseBtn.addEventListener('click', () => {
            contactWin.style.display = 'none';
        });
    }

    // Close contact window when clicking outside the content
    if (contactWin) {
        contactWin.addEventListener('click', (e) => {
            if (e.target === contactWin) {
                contactWin.style.display = 'none';
            }
        });
    }

    // Select animatable elements for client sections
    const animatableElements = document.querySelectorAll(
        '.client-section .photo-container img, .client-section-two .photo-container img, .client-section-three .photo-container img'
    );

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

    // Observe client sections if they exist and are valid elements
    console.log('clientSection:', clientSection);
    console.log('clientSectionTwo:', clientSectionTwo);
    console.log('clientSectionThree:', clientSectionThree);

    if (clientSection instanceof Element) observer.observe(clientSection);
    if (clientSectionTwo instanceof Element) observer.observe(clientSectionTwo);
    if (clientSectionThree instanceof Element) observer.observe(clientSectionThree);

    // Hide loader and show content when page is fully loaded
    window.addEventListener('load', () => {
        const loader = document.querySelector('.containerrr');
        if (loader) {
            loader.classList.add('hidden');
            document.body.classList.remove('loading');
        }
    });

    // Header scroll behavior
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    if (header) {
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
    }

    // Client section functionality
    const clientContainer = document.querySelector('.client-container');
    if (clientContainer) {
        const buttons = document.querySelectorAll('.client-container .buttons-container button');
        const imageElement = document.getElementById('feature-image');
        const isMobile = window.matchMedia("(max-width: 767px)").matches;

        if (!isMobile) {
            // Desktop: add hover event
            buttons.forEach(button => {
                button.addEventListener('mouseenter', () => {
                    if (imageElement) {
                        imageElement.src = button.getAttribute('data-image');
                        imageElement.alt = button.textContent;
                    }
                });
            });
        } else {
            // Mobile: add click event and start cycling
            let currentIndex = 0;
            let intervalId = null;

            const cycleImages = () => {
                const currentButton = buttons[currentIndex];
                if (imageElement && currentButton) {
                    imageElement.src = currentButton.getAttribute('data-image');
                    imageElement.alt = currentButton.textContent;
                    buttons.forEach(btn => btn.classList.remove('active'));
                    currentButton.classList.add('active');
                    currentIndex = (currentIndex + 1) % buttons.length;
                }
            };

            if (imageElement) {
                intervalId = setInterval(cycleImages, 3000);
            }

            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    clearInterval(intervalId);
                    if (imageElement) {
                        imageElement.src = button.getAttribute('data-image');
                        imageElement.alt = button.textContent;
                        buttons.forEach(btn => btn.classList.remove('active'));
                        button.classList.add('active');
                    }
                });
            });
        }
    }

    // Second client section functionality
    const clientContainerTwo = document.querySelector('.client-container-two');
    if (clientContainerTwo) {
        const buttons = document.querySelectorAll('.client-container-two .buttons-container button');
        const imageElement = document.getElementById('feature-image-two');
        const isMobile = window.matchMedia("(max-width: 767px)").matches;

        if (!isMobile) {
            // Desktop: add hover event
            buttons.forEach(button => {
                button.addEventListener('mouseenter', () => {
                    if (imageElement) {
                        imageElement.src = button.getAttribute('data-image');
                        imageElement.alt = button.textContent;
                    }
                });
            });
        } else {
            // Mobile: add click event and start cycling
            let currentIndex = 0;
            let intervalId = null;

            const cycleImages = () => {
                const currentButton = buttons[currentIndex];
                if (imageElement && currentButton) {
                    imageElement.src = currentButton.getAttribute('data-image');
                    imageElement.alt = currentButton.textContent;
                    buttons.forEach(btn => btn.classList.remove('active'));
                    currentButton.classList.add('active');
                    currentIndex = (currentIndex + 1) % buttons.length;
                }
            };

            if (imageElement) {
                intervalId = setInterval(cycleImages, 3000);
            }

            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    clearInterval(intervalId);
                    if (imageElement) {
                        imageElement.src = button.getAttribute('data-image');
                        imageElement.alt = button.textContent;
                        buttons.forEach(btn => btn.classList.remove('active'));
                        button.classList.add('active');
                    }
                });
            });
        }
    }

    // Third client section functionality
    const clientContainerThree = document.querySelector('.client-container-three');
    if (clientContainerThree) {
        const buttons = document.querySelectorAll('.client-container-three .buttons-container button');
        const imageElement = document.getElementById('feature-image-three');
        const isMobile = window.matchMedia("(max-width: 767px)").matches;

        if (!isMobile) {
            // Desktop: add hover event
            buttons.forEach(button => {
                button.addEventListener('mouseenter', () => {
                    if (imageElement) {
                        imageElement.src = button.getAttribute('data-image');
                        imageElement.alt = button.textContent;
                    }
                });
            });
        } else {
            // Mobile: add click event and start cycling
            let currentIndex = 0;
            let intervalId = null;

            const cycleImages = () => {
                const currentButton = buttons[currentIndex];
                if (imageElement && currentButton) {
                    imageElement.src = currentButton.getAttribute('data-image');
                    imageElement.alt = currentButton.textContent;
                    buttons.forEach(btn => btn.classList.remove('active'));
                    currentButton.classList.add('active');
                    currentIndex = (currentIndex + 1) % buttons.length;
                }
            };

            if (imageElement) {
                intervalId = setInterval(cycleImages, 3000);
            }

            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    clearInterval(intervalId);
                    if (imageElement) {
                        imageElement.src = button.getAttribute('data-image');
                        imageElement.alt = button.textContent;
                        buttons.forEach(btn => btn.classList.remove('active'));
                        button.classList.add('active');
                    }
                });
            });
        }
    }
});