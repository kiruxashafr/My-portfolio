// back-office.js - ПЕРЕИМЕНОВАНО ДЛЯ ИЗБЕЖАНИЯ КОНФЛИКТОВ
document.addEventListener('DOMContentLoaded', function() {
    const adminSlider = document.querySelector('.admin-universal-slider');
    if (!adminSlider) return;
    
    const adminSlideTrack = adminSlider.querySelector('.admin-slide-track');
    const adminStepNumbers = adminSlider.querySelectorAll('.admin-step-number');
    const adminSlides = adminSlider.querySelectorAll('.admin-slide');
    const adminPrevBtn = adminSlider.querySelector('.admin-nav-btn.prev-btn');
    const adminNextBtn = adminSlider.querySelector('.admin-nav-btn.next-btn');
    const adminModal = document.getElementById('admin-image-modal');
    const adminModalImage = document.getElementById('admin-modal-image');
    const adminModalImageContainer = adminModal ? adminModal.querySelector('.admin-modal-image-container') : null;
    const adminModalTitle = document.getElementById('admin-modal-title');
    const adminModalDescription = document.getElementById('admin-modal-description');
    const adminModalClose = document.getElementById('admin-modal-close');
    
    let adminCurrentSlide = 0;
    const adminTotalSlides = adminSlides.length;
    let adminIsModalZoomed = false;
    
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
    
    // Открытие модального окна с изображением и приближением
    function openAdminModal(slideIndex) {
        if (slideIndex >= 0 && slideIndex < adminTotalSlides) {
            const slide = adminSlides[slideIndex];
            const image = slide.querySelector('img').src;
            const title = slide.querySelector('.admin-slide-text h3').textContent;
            const description = slide.querySelector('.admin-slide-text p').textContent;
            
            adminModalImage.src = image;
            adminModalTitle.textContent = title;
            adminModalDescription.textContent = description;
            
            // Сбрасываем состояние приближения
            adminIsModalZoomed = false;
            if (adminModalImageContainer) {
                adminModalImageContainer.classList.remove('zoomed');
            }
            
            adminModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Функция переключения приближения в модальном окне
    function toggleAdminZoom() {
        if (!adminModalImageContainer) return;
        
        adminIsModalZoomed = !adminIsModalZoomed;
        adminModalImageContainer.classList.toggle('zoomed', adminIsModalZoomed);
    }
    
    // Закрытие модального окна
    function closeAdminModal() {
        adminModal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Сбрасываем состояние приближения
        adminIsModalZoomed = false;
        if (adminModalImageContainer) {
            adminModalImageContainer.classList.remove('zoomed');
        }
    }
    
    // Обработчики событий для модального окна
    if (adminModalClose) adminModalClose.addEventListener('click', closeAdminModal);
    
    // Закрытие модального окна при клике на оверлей
    if (adminModal) adminModal.addEventListener('click', function(e) {
        if (e.target === adminModal) {
            closeAdminModal();
        }
    });
    
    // Переключение приближения при клике на изображение в модальном окне
    if (adminModalImage) {
        adminModalImage.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleAdminZoom();
        });
    }
    
    // Обработчики событий для слайдов на мобильных устройствах
    if (window.innerWidth <= 768) {
        adminSlides.forEach((slide, index) => {
            slide.addEventListener('click', () => openAdminModal(index));
        });
    }
    
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
        } else if (e.key === 'Escape' && adminModal && adminModal.classList.contains('active')) {
            closeAdminModal();
        }
    });

    // Обработка изменения размера окна
    window.addEventListener('resize', function() {
        // Обновляем обработчики для мобильной версии
        adminSlides.forEach((slide, index) => {
            slide.removeEventListener('click', () => openAdminModal(index));
            if (window.innerWidth <= 768) {
                slide.addEventListener('click', () => openAdminModal(index));
            }
        });
    });
});