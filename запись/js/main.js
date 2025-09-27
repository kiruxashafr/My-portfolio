document.addEventListener('DOMContentLoaded', function() {
    const photoItems = document.querySelectorAll('.photo-item');
    
    // Функция для анимации разлетания при скролле
    function handleScrollAnimation() {
        const scrollPosition = window.scrollY;
        const triggerPoint = 0;
        
        if (scrollPosition > triggerPoint) {
            photoItems.forEach(item => {
                item.classList.add('scroll-animate');
            });
        } else {
            photoItems.forEach(item => {
                item.classList.remove('scroll-animate');
            });
        }
    }
    
    // Обработчики событий
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Обработчик для кнопки
    document.querySelector('.order-btn').addEventListener('click', function() {
        alert('Спасибо за интерес! Форма заказа будет здесь.');
    });
});