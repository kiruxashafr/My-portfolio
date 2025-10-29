document.addEventListener('DOMContentLoaded', function() {
    // Элементы модального окна
    const contactModal = document.getElementById('contact-modal');
    const closeModalBtn = document.querySelector('.close-contact-modal');
    const contactForm = document.getElementById('contact-modal-form');
    
    // Кнопки для открытия модального окна
    const openModalButtons = [
        ...document.querySelectorAll('.order-btn'), // Кнопки "Заказать сайт"
        ...document.querySelectorAll('.zakaz-btn'), // Кнопки в секции заказа
        document.querySelector('.contact-btn') // Кнопка "Контакты" в хедере
    ].filter(btn => btn !== null);

    // Открытие модального окна
    openModalButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openContactModal();
        });
    });

    // Закрытие модального окна
    closeModalBtn.addEventListener('click', closeContactModal);
    
    // Закрытие при клике вне модального окна
    contactModal.addEventListener('click', function(e) {
        if (e.target === contactModal) {
            closeContactModal();
        }
    });

    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && contactModal.classList.contains('show')) {
            closeContactModal();
        }
    });

    // Обработка формы
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('modal-name').value;
        const phone = document.getElementById('modal-phone').value;
        const submitBtn = contactForm.querySelector('.contact-modal-btn');
        
        // Валидация
        if (!name || !phone) {
            alert('Пожалуйста, заполните все поля');
            return;
        }
        
        // Создаем сообщение для Telegram
        const timestamp = new Date().toLocaleString('ru-RU');
        const message = `🟢 НОВАЯ ЗАЯВКА С САЙТА ZAPISALL\n\n` +
                       `📅 Время: ${timestamp}\n` +
                       `👤 Имя: ${name}\n` +
                       `📞 Телефон: ${phone}\n`;
        
        // Блокируем кнопку и меняем текст
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Отправляем...';
        submitBtn.disabled = true;
        
        // Отправляем в Telegram
        sendToTelegram(message)
            .then(() => {
                submitBtn.textContent = 'Отправлено!';
                submitBtn.style.background = '#4CAF50';
                
                setTimeout(() => {
                    closeContactModal();
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 1500);
            })
            .catch(error => {
                console.error('Ошибка отправки:', error);
                submitBtn.textContent = 'Ошибка!';
                submitBtn.style.background = '#f44336';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 2000);
            });
    });

    function openContactModal() {
        contactModal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Блокируем скролл
    }

    function closeContactModal() {
        contactModal.classList.remove('show');
        document.body.style.overflow = ''; // Разблокируем скролл
        contactForm.reset(); // Сбрасываем форму
    }

function sendToTelegram(message) {
    const botToken = '8427043373:AAFZpj76jI9T3lx_45jSR5QitScWoGd4EwY';
    const chatIds = ['446179396', '8023919731'];
    
    // Создаем массив промисов для всех отправок
    const sendPromises = chatIds.map(chatId => {
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        
        const formData = new FormData();
        formData.append('chat_id', chatId);
        formData.append('text', message);
        formData.append('parse_mode', 'HTML');
        
        return fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }
            return response.json();
        });
    });
    
    // Возвращаем промис, который выполнится когда все отправки завершатся
    return Promise.all(sendPromises);
}
});