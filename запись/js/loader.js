// loader.js - БАЛАНС СКОРОСТИ И КАЧЕСТВА
document.addEventListener('DOMContentLoaded', function() {
    const loaderWrapper = document.querySelector('.loader-wrapper');
    const body = document.body;
    
    // Прокручиваем страницу наверх перед показом загрузчика
    window.scrollTo(0, 0);
    
    loaderWrapper.style.display = 'block';
    body.style.overflow = 'hidden';
    
    function hideLoader() {
        if (loaderWrapper.style.display === 'none') return;
        
        loaderWrapper.style.opacity = '0';
        body.style.overflow = '';
        
        // Дополнительно прокручиваем наверх после скрытия загрузчика
        setTimeout(() => {
            loaderWrapper.style.display = 'none';
            window.scrollTo(0, 0);
        }, 500);
    }
    
    // Ждем немного чтобы контент начал появляться
    setTimeout(hideLoader, 300);
    
    // Инициализируем первый слайдер сразу
    if (typeof updateSlider === 'function') {
        updateSlider();
    }
    
    // Дополнительная прокрутка наверх после полной загрузки
    window.addEventListener('load', function() {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    });
});