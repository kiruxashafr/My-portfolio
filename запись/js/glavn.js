document.addEventListener('DOMContentLoaded', function() {
    const sliderTrack = document.querySelector('.slide-track');
    const stepNumbers = document.querySelectorAll('.step-number');
    const stepNumbersAll = document.querySelectorAll('.step-number, .step-numbers');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Создаем контейнер для точек
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'dots-indicators';
    
    // Создаем точки для каждого слайда
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentSlide = i;
            updateSlider();
        });
        dotsContainer.appendChild(dot);
    }
    
    // Добавляем точки ПЕРЕД слайдером (вверху)
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.insertBefore(dotsContainer, sliderContainer.firstChild);
    
    const dots = document.querySelectorAll('.dot');
    
    // Функция для обновления состояния слайдера
    function updateSlider() {
        // Перемещаем слайдер
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Обновляем активный шаг для всех элементов навигации (для десктопа)
        stepNumbersAll.forEach((step, index) => {
            if (index === currentSlide) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Обновляем активную точку
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Обновляем состояние кнопок
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === totalSlides - 1;
    }
    
    // Обработчик для кнопки "Назад"
    prevBtn.addEventListener('click', function() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
        }
    });
    
    // Обработчик для кнопки "Вперед"
    nextBtn.addEventListener('click', function() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlider();
        }
    });
    
    // Обработчик для клика по всем элементам навигации (для десктопа)
    stepNumbersAll.forEach((step, index) => {
        step.addEventListener('click', function() {
            currentSlide = index;
            updateSlider();
        });
    });
    
    // Добавляем обработчики для свайпа на мобильных устройствах
    let startX = 0;
    let endX = 0;
    
    sliderTrack.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });
    
    sliderTrack.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (startX - endX > swipeThreshold) {
            // Свайп влево - следующий слайд
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
                updateSlider();
            }
        } else if (endX - startX > swipeThreshold) {
            // Свайп вправо - предыдущий слайд
            if (currentSlide > 0) {
                currentSlide--;
                updateSlider();
            }
        }
    }
    
    // Инициализация слайдера
    updateSlider();
});