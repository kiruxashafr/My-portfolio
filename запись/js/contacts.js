document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('consultation-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем данные формы
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        
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
        
        // Отправляем сообщение в Telegram бот
        sendToTelegram(message);
        
        // Блокируем кнопку и меняем текст
        const submitBtn = form.querySelector('.contacts-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Отправляем...';
        submitBtn.disabled = true;
        
        // Через 3 секунды возвращаем исходное состояние
        setTimeout(() => {
            submitBtn.textContent = 'Отправлено!';
            submitBtn.style.background = '#4CAF50';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                form.reset();
            }, 2000);
        }, 1000);
    });
    
    function sendToTelegram(message) {
        const botToken = '8427043373:AAFZpj76jI9T3lx_45jSR5QitScWoGd4EwY';
        const chatId = '446179396'; // Замените на ваш chat_id
        
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        
        const formData = new FormData();
        formData.append('chat_id', chatId);
        formData.append('text', message);
        formData.append('parse_mode', 'HTML');
        
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Сообщение отправлено в Telegram:', data);
        })
        .catch(error => {
            console.error('Ошибка отправки в Telegram:', error);
        });
    }
});