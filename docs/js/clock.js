let remainingTime = 0;
let timerInterval = null;
let blinkInterval = null;
let isBlinking = false;
let isRedBackground = false;

function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ja-JP');
    document.getElementById('clock').textContent = timeString;
}

function updateTimer() {
    if (remainingTime <= 0) {
        clearInterval(timerInterval);
        clearInterval(blinkInterval);
        timerInterval = null;
        blinkInterval = null;
        document.getElementById('timer').textContent = '00:00:00';
        document.body.style.backgroundColor = ''; // 背景色を元に戻す
        isBlinking = false;
        isRedBackground = false;
        return;
    }

    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    const timeString = [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0')
    ].join(':');

    document.getElementById('timer').textContent = timeString;

    // 10秒以下になったら背景色を点滅
    if (remainingTime <= 10) {
        if (!isBlinking) {
            isBlinking = true;
            document.body.style.transition = 'background-color 0.5s';
            // 点滅用のインターバルを設定
            blinkInterval = setInterval(() => {
                isRedBackground = !isRedBackground;
                document.body.style.backgroundColor = isRedBackground ? '#ffcccc' : '#ffffff';
            }, 500);
        }
    } else {
        // カウントダウン中は薄い緑色
        if (blinkInterval) {
            clearInterval(blinkInterval);
            blinkInterval = null;
        }
        document.body.style.backgroundColor = '#e6ffe6';
    }

    remainingTime--;
}

function addTime(minutes) {
    // 分を秒に変換（小数点も考慮）
    const seconds = Math.round(minutes * 60);
    remainingTime += seconds;
    
    if (!timerInterval) {
        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
    }
}

// ボタンのイベントリスナーを設定
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        const minutes = parseFloat(button.dataset.minutes);
        addTime(minutes);
    });
});

// 初回表示
updateClock();
// 1秒ごとに更新
setInterval(updateClock, 1000); 