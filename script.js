// Колесо фортуны с картинками и попапом
document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница загрузилась!');
    
    // НАСТРОЙКИ - 10 секторов
    const segments = [
        'Сектор 1', 'Сектор 2', 'Сектор 3', 'Сектор 4', 'Сектор 5',
        'Сектор 6', 'Сектор 7', 'Сектор 8', 'Сектор 9', 'Сектор 10'
    ];
    
    const colors = [
        '#B29079', '#E1DACA', '#B29079', '#E1DACA', 
        '#B29079', '#E1DACA', '#B29079', '#E1DACA', 
        '#B29079', '#E1DACA'
    ];
    
    // ПУТИ К КАРТИНКАМ НА СЕКТОРАХ (10 штук)
    const sectorImages = [
        'img/pic_1.png', 'img/pic_2.png', 'img/pic_3.png', 'img/pic_4.png',
        'img/pic_5.png', 'img/pic_6.png', 'img/pic_7.png', 'img/pic_8.png',
        'img/pic_9.png', 'img/pic_10.png'
    ];
    
    // ВАШИ 50 ПРИЗОВ
    const prizes = [
        '🔥Карамельная эйфория',
        '🔥Арахисовый латте',
        '🔥Цитрусовый раф',
        '🔥Кофе сгушёнка-какао',
        '🔥Бейлис горячий',
        '❄️Бейлис холодный',
        '❄️Милкшейк шоколад',
        '❄️Милкшейк крем брюле',
        '🔥кедровый раф',
        '🔥Медовый раф',
        '🔥Вишневый бамбл',
        '🔥Апельсиновый бамбл',
        '🔥Фисташковая халва',
        '🔥Лимонный тарт',
        '🔥Карамельная груша',
        '❄️Милшейк ваниль',
        '❄️Молочный коктейль ваниль',
        '❄️Молочный коктейль клубника-банан',
        '❄️Молочный коктейль шоколад',
        '❄️Молочный коктейль шоколад-мята',
        '❄️Молочный коктейль банан соленая карамель',
        '❄️Молочный коктейль орео',
        '❄️Молочный коктейль сырное мороженое',
        '❄️Молочный коктейль злаковое печенье',
        '🔥Чай манго-маракуйя (баблти)',
        '🔥чай мандарин-манго (баблти)',
        '🔥Медовый жасмин с лавандой (баблти)',
        '🔥Матча апельсин кокос (баблти)',
        '❄️Йогурт манго-клубника (баблти)',
        '❄️Йогурт - персик (баблти)',
        '🔥Латте апельсиновый ликер (баблти)',
        '🔥Раф ромовая баба (баблти)',
        '🔥Раф шоколад-мята (баблти)',
        '🔥Латте груша-попкорн (баблти)',
        '🔥Раф имбирный пряник (баблти)',
        '🔥Латте орео (баблти)',
        '🔥Латте Смородина-ель (баблти)',
        '🔥Чай таежный',
        '🔥Чай брусника-апельсин',
        '🔥Чай клубника-лайм',
        '🔥Ромашка-эвкалипт',
        '🔥Облепиха-каркадэ',
        '🔥Банановое какао',
        '🔥Глинтвейн',
        '🔥❄️алоэ-маракуйя',
        '🔥❄️лесной матча-латте',
        '🔥❄️мандариновый американо',
        '🔥❄️черный латте орео',
        '🔥❄️пряная маракуйя',
        '🔥❄️Матча батат лаванда'
    ];
    
    // СПИСОК НАПИТКОВ, ДЛЯ КОТОРЫХ НУЖНО ПОКАЗЫВАТЬ КАРТИНКУ (очищенный от эмодзи)
    const drinksWithImages = [
        'Чай манго-маракуйя (баблти)',
        'алоэ-маракуйя',
        'мандариновый американо',
        'черный латте орео',
        'Чай клубника-лайм',
        'Латте орео (баблти)',
        'Ромашка-эвкалипт',
        'Чай таежный',
        'шоколад-мята',
        'Чай брусника-апельсин',
        'лесной матча-латте',
        'Матча батат лаванда'
    ];
    
    // Элементы
    const canvas = document.getElementById('wheel');
    const spinBtn = document.getElementById('spinBtn');
    const resultDiv = document.getElementById('result');
    
    let rotation = 0;
    let spinning = false;
    
    // Загружаем картинки для секторов
    const sectorImagesList = [];
    for (let i = 0; i < sectorImages.length; i++) {
        const img = new Image();
        img.src = sectorImages[i];
        sectorImagesList.push(img);
    }
    
    // Функция для создания попапа
    function showPrizePopup(prizeText) {
        console.log('Пытаюсь показать попап для:', prizeText);
        
        // Удаляем старый попап, если есть
        const oldPopup = document.getElementById('prizePopup');
        if (oldPopup) oldPopup.remove();
        
        // ОЧИЩАЕМ текст от эмодзи для сравнения со списком
        let cleanPrizeText = prizeText
            .replace(/[🔥❄️⭐✨🎉]/g, '')      // убираем все эмодзи
            .replace(/\s+/g, ' ')              // множественные пробелы в один
            .trim();                           // обрезаем пробелы по краям
        
        console.log('Очищенный текст:', cleanPrizeText);
        
        // Проверяем, есть ли очищенный текст в списке
        let needsImage = false;
        let matchedDrink = '';
        
        for (let drink of drinksWithImages) {
            // Проверяем, содержится ли drink в cleanPrizeText ИЛИ наоборот
            if (cleanPrizeText.includes(drink) || drink.includes(cleanPrizeText)) {
                needsImage = true;
                matchedDrink = drink;
                console.log('Найдено совпадение:', drink);
                break;
            }
        }
        
        // Создаём новый попап
        const popup = document.createElement('div');
        popup.id = 'prizePopup';
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 25px;
            border-radius: 20px;
            box-shadow: 0 15px 50px rgba(0,0,0,0.3);
            text-align: center;
            z-index: 1000;
            min-width: 280px;
            max-width: 350px;
            border: 4px solid #ff99cc;
            animation: popupFadeIn 0.3s ease-out;
        `;
        
        // Создаём контент попапа
        let popupContent = `
            <h3 style="margin-top: 0; margin-bottom: 15px; color: #ff3399;">🎉 Ваш выигрыш! 🎉</h3>
        `;
        
        // Если нужна картинка, добавляем её
        if (needsImage) {
            // Используем matchedDrink для формирования имени файла
            let imageName = matchedDrink || cleanPrizeText;
            
            // Преобразуем в имя файла
            imageName = imageName
                .replace(/\s+/g, '_')             // пробелы на подчёркивания
                .replace(/[()]/g, '')              // убираем скобки
                .replace(/-/g, '_')                // дефисы на подчёркивания
                .toLowerCase();                     // в нижний регистр
            
            // Добавляем расширение .png
            imageName = imageName + '.png';
            
            console.log('Ищем картинку:', 'popup_images/' + imageName);
            
            popupContent += `
                <div style="margin-bottom: 15px;">
                    <img src="popup_images/${imageName}" alt="${prizeText}" 
                         style="max-width: 150px; max-height: 150px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2);"
                         onerror="this.style.display='none'; console.log('Картинка не найдена: ${imageName}');">
                </div>
            `;
        }
        
        // Добавляем текст с названием и кнопку закрытия
        popupContent += `
            <p style="font-size: 20px; font-weight: bold; margin: 15px 0; color: #333;">${prizeText}</p>
            <button id="closePopupBtn" style="
                background: linear-gradient(135deg, #ff99cc 0%, #ff66b2 100%);
                color: white;
                border: none;
                padding: 12px 30px;
                font-size: 18px;
                border-radius: 50px;
                cursor: pointer;
                font-weight: bold;
                box-shadow: 0 5px 15px rgba(255,102,178,0.3);
            ">ЗАКРЫТЬ</button>
        `;
        
        popup.innerHTML = popupContent;
        document.body.appendChild(popup);
        
        // Добавляем анимацию
        const style = document.createElement('style');
        style.textContent = `
            @keyframes popupFadeIn {
                from {
                    opacity: 0;
                    transform: translate(-50%, -30%);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%);
                }
            }
        `;
        document.head.appendChild(style);
        
        // Кнопка закрытия
        document.getElementById('closePopupBtn').onclick = function() {
            popup.remove();
        };
        
        // Закрытие по клику вне попапа
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                popup.remove();
            }
        });
    }
    
    // Функция рисования (с увеличенными картинками)
    function draw() {
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 200;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const anglePerSegment = (Math.PI * 2) / segments.length;
        
        // Рисуем сектора
        for (let i = 0; i < segments.length; i++) {
            const startAngle = i * anglePerSegment + rotation;
            const endAngle = (i + 1) * anglePerSegment + rotation;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = colors[i];
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
        
        // Рисуем картинки поверх секторов (УВЕЛИЧЕННЫЕ)
        for (let i = 0; i < segments.length; i++) {
            const startAngle = i * anglePerSegment + rotation;
            
            if (sectorImagesList[i] && sectorImagesList[i].complete) {
                try {
                    ctx.save();
                    // Картинки теперь 60x60 и чуть ближе к центру
                    const imgX = centerX + Math.cos(startAngle + anglePerSegment/2) * 120;
                    const imgY = centerY + Math.sin(startAngle + anglePerSegment/2) * 120;
                    ctx.translate(imgX, imgY);
                    ctx.rotate(startAngle + anglePerSegment/2 + Math.PI/2);
                    ctx.drawImage(sectorImagesList[i], -30, -30, 60, 60);
                    ctx.restore();
                } catch (e) {
                    console.log('Ошибка картинки', i);
                }
            }
        }
        
        // Рисуем центр колеса
        ctx.beginPath();
        ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
        ctx.fillStyle = '#333';
        ctx.fill();
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    
    // Функция вращения
    function spin() {
        console.log('Кнопка нажата!');
        
        if (spinning) return;
        
        spinning = true;
        spinBtn.disabled = true;
        resultDiv.textContent = 'Крутится...';
        
        // Случайный угол остановки
        const randomStopAngle = Math.random() * Math.PI * 2;
        
        // Случайное количество оборотов (8-12)
        const randomRotations = 8 + Math.floor(Math.random() * 5);
        const fullRotations = randomRotations * Math.PI * 2;
        
        const startRotation = rotation;
        const startNormalized = ((startRotation % (Math.PI * 2)) + (Math.PI * 2)) % (Math.PI * 2);
        
        let delta = randomStopAngle - startNormalized;
        if (delta > Math.PI) delta -= Math.PI * 2;
        if (delta < -Math.PI) delta += Math.PI * 2;
        
        const targetRotation = startRotation + fullRotations + delta;
        const startTime = Date.now();
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / 7000, 1);
            
            rotation = startRotation + (targetRotation - startRotation) * (1 - Math.pow(1 - progress, 3));
            draw();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                spinning = false;
                spinBtn.disabled = false;
                
                // Получаем случайный приз
                const randomIndex = Math.floor(Math.random() * prizes.length);
                const prize = prizes[randomIndex];
                
                // Показываем результат под кнопкой
                resultDiv.textContent = 'Выигрыш: ' + prize;
                
                // ПОКАЗЫВАЕМ ПОПАП
                showPrizePopup(prize);
                
                console.log('Результат:', prize);
            }
        }
        
        animate();
    }
    
    // Начальное рисование
    draw();
    
    // Привязываем кнопку
    spinBtn.onclick = spin;
    
    // Инициализация Telegram
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
    }
    
    console.log('Готово!');
});
