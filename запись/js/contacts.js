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
        
        // Блокируем кнопку и меняем текст
        const submitBtn = form.querySelector('.contacts-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Отправляем...';
        submitBtn.disabled = true;
        
        // Отправляем сообщение в Telegram бот
        sendToTelegram(message)
            .then(() => {
                // Успешная отправка
                submitBtn.textContent = 'Отправлено!';
                submitBtn.style.background = '#4CAF50';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    form.reset();
                }, 2000);
            })
            .catch((error) => {
                // Ошибка отправки
                console.error('Ошибка отправки:', error);
                submitBtn.textContent = 'Ошибка отправки';
                submitBtn.style.background = '#f44336';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 2000);
            });
    });
    
    async function sendToTelegram(message) {
        const botToken = '8427043373:AAFZpj76jI9T3lx_45jSR5QitScWoGd4EwY';
        const chatIds = ['446179396', '8023919731'];
        
        console.log('Начинаем отправку для чатов:', chatIds);
        
        // Отправляем с задержкой между запросами
        for (let i = 0; i < chatIds.length; i++) {
            const chatId = chatIds[i];
            
            try {
                const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
                
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: message,
                        parse_mode: 'HTML'
                    })
                });
                
                const data = await response.json();
                console.log(`Сообщение отправлено для ${chatId}:`, data);
                
                // Добавляем задержку между отправками (1 секунда)
                if (i < chatIds.length - 1) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
                
            } catch (error) {
                console.error(`Ошибка для ${chatId}:`, error);
                // Продолжаем отправку следующему, даже если ошибка
            }
        }
        
        console.log('Отправка завершена для всех чатов');
    }
});