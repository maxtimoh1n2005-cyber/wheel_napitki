// Колесо фортуны с картинками, попапом и звуками
document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница загрузилась!');
    
    // НАСТРОЙКИ - 10 секторов
    const segments = [
        'Сектор 1', 'Сектор 2', 'Сектор 3', 'Сектор 4', 'Сектор 5',
        'Сектор 6', 'Сектор 7', 'Сектор 8', 'Сектор 9', 'Сектор 10'
    ];
    
    const colors = [
        '#F2DBE3', '#FAEDCD', '#F2DBE3', '#FAEDCD', 
        '#F2DBE3', '#FAEDCD', '#F2DBE3', '#FAEDCD', 
        '#F2DBE3', '#FAEDCD'
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
        '🔥Кедровый раф',
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
        '🔥Чай мандарин-манго (баблти)',
        '🔥Медовый жасмин с лавандой (баблти)',
        '🔥Матча апельсин кокос (баблти)',
        '❄️Йогурт манго-клубника (баблти)',
        '❄️Йогурт-персик (баблти)',
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
        '🔥❄️Алоэ-маракуйя',
        '🔥❄️Лесной матча-латте',
        '🔥❄️Мандариновый американо',
        '🔥❄️Черный латте орео',
        '🔥❄️Пряная маракуйя',
        '🔥❄️Матча батат лаванда'
    ];
    
    // СПИСОК НАПИТКОВ, ДЛЯ КОТОРЫХ НУЖНО ПОКАЗЫВАТЬ ПОПАП С КАРТИНКОЙ
    const drinksWithImages = [
        'Чай манго-маракуйя',
        'Алоэ-маракуйя',
        'Мандариновый американо',
        'Черный латте орео',
        'Чай клубника-лайм',
        'Латте орео',
        'Ромашка-эвкалипт',
        'Чай таежный',
        'Раф шоколад-мята',
        'Чай брусника-апельсин',
        'Лесной матча-латте',
        'Матча батат лаванда',
        'Пряная маракуйя',
        'Латте Смородина-ель',
        'Вишневый бамбл',
        'Глинтвейн',
        'Медовый жасмин с лавандой',
        'Раф имбирный пряник',
        'Йогурт манго-клубника',
        'Йогурт-персик',
        'Карамельная груша',
        'Кедровый раф',
        'Лимонный тарт',
        'Чай мандарин-манго',
        'Матча апельсин кокос',
        'Медовый раф',
        'Облепиха-каркадэ',
        'Латте груша-попкорн',
        'Раф ромовая баба',
        'Фисташковая халва',
        'Апельсиновый бамбл',
        'Латте апельсиновый ликер',
        'Банановое какао'
    ];
    
    // Элементы
    const canvas = document.getElementById('wheel');
    const spinBtn = document.getElementById('spinBtn');
    const resultDiv = document.getElementById('result');
    
    let rotation = 0;
    let spinning = false;
    
    // === ЗВУКОВЫЕ ЭФФЕКТЫ ===
    let spinSoundObj = null;
    let playStopSound = null;
    let soundEnabled = true;
    
    // ЗВУК ВРАЩЕНИЯ ИЗ MP3 ФАЙЛА
    function createSpinSound() {
        if (!soundEnabled) return null;
        
        try {
            const audio = new Audio();
            audio.src = 'sounds/spin.mp3';  // ПУТЬ К ВАШЕМУ MP3
            audio.loop = true;
            audio.volume = 0.5;
            
            return {
                start: function() {
                    audio.play().catch(e => console.log('Ошибка воспроизведения MP3:', e));
                },
                stop: function() {
                    audio.pause();
                    audio.currentTime = 0;
                }
            };
        } catch (e) {
            console.log('Ошибка загрузки MP3:', e);
            return null;
        }
    }
    
    // ЗВУК ОСТАНОВКИ (оставляем прежний - "динь")
    function createStopSound() {
        if (!soundEnabled) return null;
        
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const audioCtx = new AudioContext();
            
            return function() {
                const now = audioCtx.currentTime;
                const oscillator = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                
                oscillator.connect(gain);
                gain.connect(audioCtx.destination);
                
                oscillator.type = 'sine';
                oscillator.frequency.value = 880;
                
                gain.gain.value = 0;
                gain.gain.exponentialRampToValueAtTime(0.4, now + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
                
                oscillator.start();
                oscillator.stop(now + 0.5);
                
                if (audioCtx.state === 'suspended') {
                    audioCtx.resume();
                }
            };
        } catch (e) {
            console.log('Ошибка инициализации звука остановки:', e);
            return null;
        }
    }
    
    // Инициализация звуков
    function initSounds() {
        spinSoundObj = createSpinSound();
        playStopSound = createStopSound();
        console.log('Звуки инициализированы (MP3 вращение + динь остановки)');
    }
    
    // Загружаем картинки для секторов
    const sectorImagesList = [];
    for (let i = 0; i < sectorImages.length; i++) {
        const img = new Image();
        img.src = sectorImages[i];
        sectorImagesList.push(img);
    }
    
    // Функция для создания попапа (ТОЛЬКО для напитков с картинками)
    function showPrizePopup(prizeText) {
        console.log('=== ПРОВЕРКА ДЛЯ ПОПАПА ===');
        console.log('Исходный текст:', prizeText);
        
        // Убираем эмодзи для проверки
        let cleanText = prizeText
            .replace(/[🔥❄️]/g, '')
            .trim();
        
        console.log('Текст без эмодзи:', cleanText);
        
        // Проверяем, есть ли этот напиток в списке
        let shouldShowPopup = false;
        
        for (let drink of drinksWithImages) {
            if (cleanText.includes(drink)) {
                shouldShowPopup = true;
                console.log('✅ СОВПАДЕНИЕ! Напиток "' + drink + '" найден в "' + cleanText + '"');
                break;
            }
        }
        
        // Если напиток НЕ в списке - НИЧЕГО НЕ ДЕЛАЕМ
        if (!shouldShowPopup) {
            console.log('❌ Напиток НЕ в списке, попап НЕ нужен');
            return;
        }
        
        console.log('🎯 ПОКАЗЫВАЕМ ПОПАП для:', prizeText);
        
        // Удаляем старый попап, если есть
        const oldPopup = document.getElementById('prizePopup');
        if (oldPopup) oldPopup.remove();
        
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
        
        // Формируем имя файла из очищенного текста
        let imageName = cleanText
            .replace(/\s+/g, '_')
            .replace(/[()]/g, '')
            .replace(/-/g, '_')
            .toLowerCase()
            .replace(/[^a-zа-я0-9_]/g, '')
            + '.png';
        
        console.log('Ищем картинку:', 'popup_images/' + imageName);
        
        popup.innerHTML = `
            <h3 style="margin-top: 0; margin-bottom: 15px; color: #ff3399;">🎉 Ваш выигрыш! 🎉</h3>
            <div style="margin-bottom: 15px;">
                <img src="popup_images/${imageName}" alt="${prizeText}" 
                     style="max-width: 150px; max-height: 150px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2);"
                     onerror="this.style.display='none'; console.log('Картинка не найдена: ${imageName}');">
            </div>
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
        
        document.body.appendChild(popup);
        
        // Кнопка закрытия
        document.getElementById('closePopupBtn').onclick = function() {
            popup.remove();
        };
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
        
        // Рисуем картинки поверх секторов
        for (let i = 0; i < segments.length; i++) {
            const startAngle = i * anglePerSegment + rotation;
            
            if (sectorImagesList[i] && sectorImagesList[i].complete) {
                try {
                    ctx.save();
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
        ctx.fillStyle = '#E8D1D9';
        ctx.fill();
        ctx.strokeStyle = '#F0E3C3';
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
        
        // ВКЛЮЧАЕМ ЗВУК ВРАЩЕНИЯ (MP3)
        if (spinSoundObj) {
            spinSoundObj.start();
        }
        
        const randomStopAngle = Math.random() * Math.PI * 2;
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
                
                // ВЫКЛЮЧАЕМ ЗВУК ВРАЩЕНИЯ
                if (spinSoundObj) {
                    spinSoundObj.stop();
                }
                
                // ВКЛЮЧАЕМ ЗВУК ОСТАНОВКИ
                if (playStopSound) {
                    playStopSound();
                }
                
                const randomIndex = Math.floor(Math.random() * prizes.length);
                const prize = prizes[randomIndex];
                
                resultDiv.textContent = 'Выигрыш: ' + prize;
                showPrizePopup(prize);
                
                console.log('Результат:', prize);
            }
        }
        
        animate();
    }
    
    // Начальное рисование
    draw();
    
    // Инициализируем звуки
    initSounds();
    
    // Привязываем кнопку
    spinBtn.onclick = spin;
    
    // Инициализация Telegram с принудительной перерисовкой
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
        
        // Принудительно перерисовываем колесо после загрузки Telegram
        setTimeout(function() {
            draw();
            console.log('Принудительная перерисовка для Telegram');
        }, 100);
        
        // Также перерисовываем при изменении темы
        window.Telegram.WebApp.onEvent('themeChanged', function() {
            draw();
            console.log('Перерисовка после смены темы');
        });
    }
    
    // Дополнительная перерисовка после полной загрузки страницы
    window.addEventListener('load', function() {
        setTimeout(function() {
            draw();
            console.log('Перерисовка после полной загрузки');
        }, 200);
    });
    
    console.log('Готово!');
});
