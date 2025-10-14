// back-office.js - ОБНОВЛЕННЫЙ
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.admin-slider');
    if (!slider) return;
    
    const slidesContainer = slider.querySelector('.slides-container');
    const slideTrack = slider.querySelector('.slide-track') || slidesContainer;
    const slides = slider.querySelectorAll('.slide');
    const prevBtn = slider.querySelector('.prev-btn');
    const nextBtn = slider.querySelector('.next-btn');
    const indicators = slider.querySelectorAll('.indicator');
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalImageContainer = modal ? modal.querySelector('.modal-image-container') : null;
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalClose = document.getElementById('modal-close');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let isModalZoomed = false;
    
    // Функция обновления слайдера
    function updateSlider() {
        // Устанавливаем правильное смещение для слайдов
        slideTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Обновление индикаторов
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
        
        // Обновление состояния кнопок
        if (prevBtn) prevBtn.disabled = currentSlide === 0;
        if (nextBtn) nextBtn.disabled = currentSlide === totalSlides - 1;
    }
    
    // Переход к следующему слайду
    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlider();
        }
    }
    
    // Переход к предыдущему слайду
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
        }
    }
    
    // Переход к конкретному слайду
    function goToSlide(index) {
        if (index >= 0 && index < totalSlides) {
            currentSlide = index;
            updateSlider();
        }
    }
    
    // Открытие модального окна с изображением и приближением
    function openModal(slideIndex) {
        if (slideIndex >= 0 && slideIndex < totalSlides) {
            const slide = slides[slideIndex];
            const image = slide.querySelector('img').src;
            const title = slide.querySelector('.slide-title').textContent;
            const description = slide.querySelector('.slide-description').textContent;
            
            modalImage.src = image;
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            
            // Сбрасываем состояние приближения
            isModalZoomed = false;
            if (modalImageContainer) {
                modalImageContainer.classList.remove('zoomed');
            }
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Функция переключения приближения в модальном окне
    function toggleZoom() {
        if (!modalImageContainer) return;
        
        isModalZoomed = !isModalZoomed;
        modalImageContainer.classList.toggle('zoomed', isModalZoomed);
    }
    
    // Закрытие модального окна
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Сбрасываем состояние приближения
        isModalZoomed = false;
        if (modalImageContainer) {
            modalImageContainer.classList.remove('zoomed');
        }
    }
    
    // Обработчики событий для кнопок навигации
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Обработчики событий для индикаторов
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
    
    // Обработчики событий для модального окна
    if (modalClose) modalClose.addEventListener('click', closeModal);
    
    // Закрытие модального окна при клике на оверлей
    if (modal) modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Переключение приближения при клике на изображение в модальном окне
    if (modalImage) {
        modalImage.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleZoom();
        });
    }
    
    // Обработчики событий для слайдов на мобильных устройствах
    if (window.innerWidth <= 768) {
        slides.forEach((slide, index) => {
            slide.addEventListener('click', () => openModal(index));
        });
    }
    
    // Инициализация слайдера
    updateSlider();
    
    // Обработка свайпов на мобильных устройствах
    let startX = 0;
    let endX = 0;
    let isDragging = false;
    
    slideTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    slideTrack.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        endX = e.touches[0].clientX;
    });
    
    slideTrack.addEventListener('touchend', () => {
        if (!isDragging) return;
        handleSwipe();
        isDragging = false;
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Свайп влево - следующий слайд
                nextSlide();
            } else {
                // Свайп вправо - предыдущий слайд
                prevSlide();
            }
        }
    }
    
    // Обработка клавиш клавиатуры
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Обработка изменения размера окна
    window.addEventListener('resize', function() {
        // Обновляем слайдер при изменении размера окна
        updateSlider();
        
        // Обновляем обработчики для мобильной версии
        slides.forEach((slide, index) => {
            slide.removeEventListener('click', () => openModal(index));
            if (window.innerWidth <= 768) {
                slide.addEventListener('click', () => openModal(index));
            }
        });
    });
});