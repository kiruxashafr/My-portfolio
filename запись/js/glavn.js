document.addEventListener('DOMContentLoaded', function() {
    const sliderTrack = document.querySelector('.slide-track');
    const stepNumbers = document.querySelectorAll('.step-number');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Функция для обновления состояния слайдера
    function updateSlider() {
        // Перемещаем слайдер
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Обновляем активный шаг
        stepNumbers.forEach((step, index) => {
            if (index === currentSlide) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
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
    
    // Обработчик для клика по номеру шага
    stepNumbers.forEach((step, index) => {
        step.addEventListener('click', function() {
            currentSlide = index;
            updateSlider();
        });
    });
    
    // Инициализация слайдера
    updateSlider();
    
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
});