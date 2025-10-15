// back-office.js - ПЕРЕИМЕНОВАНО ДЛЯ ИЗБЕЖАНИЯ КОНФЛИКТОВ
document.addEventListener('DOMContentLoaded', function() {
    const adminSlider = document.querySelector('.admin-universal-slider');
    if (!adminSlider) return;
    
    const adminSlideTrack = adminSlider.querySelector('.admin-slide-track');
    const adminStepNumbers = adminSlider.querySelectorAll('.admin-step-number');
    const adminSlides = adminSlider.querySelectorAll('.admin-slide');
    const adminPrevBtn = adminSlider.querySelector('.admin-nav-btn.prev-btn');
    const adminNextBtn = adminSlider.querySelector('.admin-nav-btn.next-btn');
    
    let adminCurrentSlide = 0;
    const adminTotalSlides = adminSlides.length;
    
    // Создаем контейнер для точек - КАК В GLAVN
    const adminDotsContainer = document.createElement('div');
    adminDotsContainer.className = 'admin-dots-indicators';
    
    // Создаем точки для каждого слайда
    for (let i = 0; i < adminTotalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'admin-dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            adminCurrentSlide = i;
            updateAdminSlider();
        });
        adminDotsContainer.appendChild(dot);
    }
    
    // Добавляем точки ПЕРЕД слайдером (вверху) - КАК В GLAVN
    const adminSliderContainer = document.querySelector('.admin-slider-container');
    adminSliderContainer.insertBefore(adminDotsContainer, adminSliderContainer.firstChild);
    
    const adminDots = document.querySelectorAll('.admin-dot');
    
    // Функция для обновления состояния слайдера
    function updateAdminSlider() {
        // Перемещаем слайдер
        adminSlideTrack.style.transform = `translateX(-${adminCurrentSlide * 100}%)`;
        
        // Обновляем активный шаг
        adminStepNumbers.forEach((step, index) => {
            if (index === adminCurrentSlide) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Обновляем активную точку - КАК В GLAVN
        adminDots.forEach((dot, index) => {
            if (index === adminCurrentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Обновляем состояние кнопок
        adminPrevBtn.disabled = adminCurrentSlide === 0;
        adminNextBtn.disabled = adminCurrentSlide === adminTotalSlides - 1;
    }
    
    // Обработчик для кнопки "Назад"
    adminPrevBtn.addEventListener('click', function() {
        if (adminCurrentSlide > 0) {
            adminCurrentSlide--;
            updateAdminSlider();
        }
    });
    
    // Обработчик для кнопки "Вперед"
    adminNextBtn.addEventListener('click', function() {
        if (adminCurrentSlide < adminTotalSlides - 1) {
            adminCurrentSlide++;
            updateAdminSlider();
        }
    });
    
    // Обработчик для клика по элементам навигации
    adminStepNumbers.forEach((step, index) => {
        step.addEventListener('click', function() {
            adminCurrentSlide = index;
            updateAdminSlider();
        });
    });
    
    // Инициализация слайдера
    updateAdminSlider();
    
    // Обработка свайпов на мобильных устройствах
    let adminStartX = 0;
    let adminEndX = 0;
    
    adminSlideTrack.addEventListener('touchstart', function(e) {
        adminStartX = e.touches[0].clientX;
    });
    
    adminSlideTrack.addEventListener('touchend', function(e) {
        adminEndX = e.changedTouches[0].clientX;
        handleAdminSwipe();
    });
    
    function handleAdminSwipe() {
        const swipeThreshold = 50;
        
        if (adminStartX - adminEndX > swipeThreshold) {
            // Свайп влево - следующий слайд
            if (adminCurrentSlide < adminTotalSlides - 1) {
                adminCurrentSlide++;
                updateAdminSlider();
            }
        } else if (adminEndX - adminStartX > swipeThreshold) {
            // Свайп вправо - предыдущий слайд
            if (adminCurrentSlide > 0) {
                adminCurrentSlide--;
                updateAdminSlider();
            }
        }
    }
    
    // Обработка клавиш клавиатуры
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            if (adminCurrentSlide > 0) {
                adminCurrentSlide--;
                updateAdminSlider();
            }
        } else if (e.key === 'ArrowRight') {
            if (adminCurrentSlide < adminTotalSlides - 1) {
                adminCurrentSlide++;
                updateAdminSlider();
            }
        }
    });
});