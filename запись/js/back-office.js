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
    
    // Создаем контейнер для точек
    const adminDotsContainer = document.createElement('div');
    adminDotsContainer.className = 'admin-dots-indicators';

    // Улучшенная функция для обработки свайпа
    function setupAdminSwipe(element) {
        let startX = 0;
        let isScrolling;
        
        element.addEventListener('touchstart', function(e) {
            startX = e.touches[0].pageX;
            isScrolling = undefined;
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
                if (diffX > 0 && adminCurrentSlide > 0) {
                    // Свайп вправо
                    adminCurrentSlide--;
                    updateAdminSlider();
                } else if (diffX < 0 && adminCurrentSlide < adminTotalSlides - 1) {
                    // Свайп влево
                    adminCurrentSlide++;
                    updateAdminSlider();
                }
                
                // Предотвращаем клики после свайпа
                e.preventDefault();
            }
            
            startX = 0;
            isScrolling = undefined;
        }, { passive: true });
    }

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
    
    // Создаем элемент с подсказкой для свайпа для бек-офиса
    const adminSwipeHint = document.createElement('div');
    adminSwipeHint.className = 'admin-swipe-hint';
    adminSwipeHint.innerHTML = `
        <p class="swiper-admin">Листайте</p>
        <img src="/zapisall/photo/administ/Scroll Down.gif" alt="Swipe right" class="admin-swipe-hint-gif">
    `;

    // СОЗДАЕМ ОБЩИЙ КОНТЕЙНЕР ДЛЯ ПОДСКАЗКИ И ТОЧЕК
    const adminMobileIndicatorsContainer = document.createElement('div');
    adminMobileIndicatorsContainer.className = 'admin-mobile-indicators-container';
    
    // Добавляем подсказку и точки в общий контейнер
    adminMobileIndicatorsContainer.appendChild(adminSwipeHint);
    adminMobileIndicatorsContainer.appendChild(adminDotsContainer);
    
    // Добавляем общий контейнер ПЕРЕД слайдером
    const adminSliderContainer = document.querySelector('.admin-slider-container');
    adminSliderContainer.insertBefore(adminMobileIndicatorsContainer, adminSliderContainer.firstChild);
    
    const adminDots = document.querySelectorAll('.admin-dot');

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
        
        // Обновляем активную точку
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
    
    // Инициализация улучшенного свайпа
    setupAdminSwipe(adminSlideTrack);
    
    // Также добавляем обработчик для всего слайдера для дополнительной надежности
    setupAdminSwipe(document.querySelector('.admin-slider-content'));
    
    // Инициализация слайдера
    updateAdminSlider();
});