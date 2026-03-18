// Колесо фортуны с картинками
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
    
    // ПУТИ К КАРТИНКАМ (10 штук)
    const images = [
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
        '🔥Ромашка-звкалипт',
        '🔥Облепиха-каркадэ',
        '🔥Банановое какао',
        '🔥Глинтвейн',
        '🔥❄️Алоэ-маракуйя',
        '🔥❄️Лесной матча-латте',
        '🔥❄️Мандариновый американо',
        '🔥❄️Черный латте opeo',
        '🔥❄️Пряная маракуйя',
        '🔥❄️Матча батат лаванда'
    ];
    
    // Элементы
    const canvas = document.getElementById('wheel');
    const spinBtn = document.getElementById('spinBtn');
    const resultDiv = document.getElementById('result');
    
    let rotation = 0;
    let spinning = false;
    
    // Загружаем картинки
    const wheelImages = [];
    for (let i = 0; i < images.length; i++) {
        const img = new Image();
        img.src = images[i];
        wheelImages.push(img);
    }
    
    // Функция рисования
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
            
            if (wheelImages[i] && wheelImages[i].complete) {
                try {
                    ctx.save();
                    const imgX = centerX + Math.cos(startAngle + anglePerSegment/2) * 130;
                    const imgY = centerY + Math.sin(startAngle + anglePerSegment/2) * 130;
                    ctx.translate(imgX, imgY);
                    ctx.rotate(startAngle + anglePerSegment/2 + Math.PI/2);
                    ctx.drawImage(wheelImages[i], -20, -20, 40, 40);
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
                
                // Простой random из массива prizes (50 призов)
                const randomIndex = Math.floor(Math.random() * prizes.length);
                const prize = prizes[randomIndex];
                
                resultDiv.textContent = 'Выигрыш: ' + prize;
                
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