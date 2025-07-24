document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const hamburgerInput = document.querySelector('.hamburger input');
    const closeBtn = document.querySelector('.close-btn');

    // Toggle modal when hamburger is clicked
    hamburgerInput.addEventListener('change', () => {
        modal.style.display = hamburgerInput.checked ? 'flex' : 'none';
    });

    // Close modal and reset hamburger when close button is clicked
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        hamburgerInput.checked = false;
    });

    // Close modal and reset hamburger if clicking outside the modal content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            hamburgerInput.checked = false;
        }
    });
});