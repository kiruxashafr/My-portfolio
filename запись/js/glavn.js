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

    // Улучшенная функция для обработки свайпа
    function setupSwipe(element) {
        let startX = 0;
        let isScrolling;
        
        element.addEventListener('touchstart', function(e) {
            startX = e.touches[0].pageX;
            isScrolling = undefined;
            // Останавливаем распространение события
            e.stopPropagation();
        }, { passive: true });
        
        element.addEventListener('touchmove', function(e) {
            if (!startX) return;
            
            const x = e.touches[0].pageX;
            const diffX = x - startX;
            
            // Если движение в основном горизонтальное - предотвращаем вертикальный скролл
            if (isScrolling === undefined) {
                isScrolling = Math.abs(diffX) > 5;
            }
            
            if (isScrolling) {
                e.preventDefault();
            }
        }, { passive: false });
        
        element.addEventListener('touchend', function(e) {
            if (!startX) return;
            
            const endX = e.changedTouches[0].pageX;
            const diffX = endX - startX;
            const swipeThreshold = 50;
            
            // Определяем направление свайпа
            if (Math.abs(diffX) > swipeThreshold) {
                if (diffX > 0 && currentSlide > 0) {
                    // Свайп вправо
                    currentSlide--;
                    updateSlider();
                } else if (diffX < 0 && currentSlide < totalSlides - 1) {
                    // Свайп влево
                    currentSlide++;
                    updateSlider();
                }
                
                // Предотвращаем клики после свайпа
                e.preventDefault();
            }
            
            startX = 0;
            isScrolling = undefined;
        }, { passive: true });
    }

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
    
    // Создаем элемент с подсказкой для свайпа
    const swipeHint = document.createElement('div');
    swipeHint.className = 'swipe-hint';
    swipeHint.innerHTML = `
        <p class="swiper">Листайте</p>
        <img src="/zapisall/photo/administ/Scroll Down.gif" alt="Swipe right" class="swipe-hint-gif">
    `;

    // СОЗДАЕМ ОБЩИЙ КОНТЕЙНЕР ДЛЯ ПОДСКАЗКИ И ТОЧЕК
    const mobileIndicatorsContainer = document.createElement('div');
    mobileIndicatorsContainer.className = 'mobile-indicators-container';
    
    // Добавляем подсказку и точки в общий контейнер
    mobileIndicatorsContainer.appendChild(swipeHint);
    mobileIndicatorsContainer.appendChild(dotsContainer);
    
    // Добавляем общий контейнер ПЕРЕД слайдером
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.insertBefore(mobileIndicatorsContainer, sliderContainer.firstChild);
    
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
    
    // Инициализация улучшенного свайпа
    setupSwipe(sliderTrack);
    
    // Также добавляем обработчик для всего слайдера для дополнительной надежности
    setupSwipe(document.querySelector('.slider-content'));
    
    // Инициализация слайдера
    updateSlider();
});