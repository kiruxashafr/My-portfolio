document.addEventListener('DOMContentLoaded', function() {
    const photoItems = document.querySelectorAll('.photo-item');
    const content = document.querySelector('.content');
    
    // Функция для проверки видимости элемента
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }
    
    // Функция для плавного появления фото при загрузке
    function showPhotosOnLoad() {
        photoItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 200);
        });
    }
    
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
    
    // Инициализация
    showPhotosOnLoad();
    
    // Обработчики событий
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Обработчик для кнопки
    document.querySelector('.order-btn').addEventListener('click', function() {
        alert('Спасибо за интерес! Форма заказа будет здесь.');
    });
    
    // Параллакс эффект для фона
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.container');
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
});