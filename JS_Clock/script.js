"use strict"

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const TIMER_DELAY = 2; //minutes // MUST BE 25!
const COLOR_DELTA = 255 / (TIMER_DELAY * 30)

//
showDescription();

// clock
const clock = document.querySelector('.clock');
const hoursArrow = document.querySelector('.hours');
const minutesArrow = document.querySelector('.minutes');
const secondsArrow = document.querySelector('.seconds');
const textTimeArea = document.querySelector('.plain-time');
const notice = document.querySelector('.notice');

setInterval(showCurrentTime, 1000)


function showCurrentTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const weekDay = DAYS_OF_WEEK[date.getDay()];
    const day = date.getDate();
    const month = MONTHS[date.getMonth()];
    const year = date.getFullYear()

    // fix trebling
    secondsArrow.style["transition"] = seconds === 0 ? "none" : "all 0.1s";

    hoursArrow.style["transform"] = `rotate(${30 * hours + minutes / 2}deg)`;
    minutesArrow.style["transform"] = `rotate(${6 * minutes + seconds / 10}deg)`;
    secondsArrow.style["transform"] = `rotate(${6 * seconds}deg)`;

    textTimeArea.innerHTML = `<p>${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}</p>
                              <p>${weekDay}</p>
                              <p>${day} ${month} ${year}</p>`;
}


//timer
let timerSecondsLeft = null;
let timerColorR = 0;
let timerColorG = 255;

clock.addEventListener('click', startStopTimer);
setInterval(checkTimer, 1000)

function startStopTimer() {
    if (!timerSecondsLeft) {
        timerSecondsLeft = TIMER_DELAY * 60 // 60 seconds
        timerColorR = 0;
        timerColorG = 255;
        clock.style['opacity'] = '100%';
    } else {
        // stop timer
        timerSecondsLeft = null;
        timerColorG = 255;
        timerColorR = 0;
        clock.style['opacity'] = '';
        notice.innerHTML = 'Click to start timer';
    }
}

function checkTimer() {
    if (timerSecondsLeft === 1) {
        makeSomeNoise();
        startStopTimer();
    } else if (timerSecondsLeft) {
        timerSecondsLeft -= 1;
        notice.innerHTML = `${String(Math.floor(timerSecondsLeft / 60)).padStart(2, '0')}:${String(timerSecondsLeft % 60).padStart(2, '0')}`;
        if ((timerColorR < 255) && (timerColorG === 255)) {
            timerColorR += COLOR_DELTA;
        } else {
            timerColorR = 255;
            timerColorG = timerColorG > 0 ? timerColorG - COLOR_DELTA : 0;
        }
    }

    clock.style['backgroundImage'] = `radial-gradient(rgb(${timerColorR}, ${timerColorG}, 0), black)`;

}

function makeSomeNoise() {
    let audio = new Audio();
    audio.src = 'beep.mp3';
    audio.autoplay = true;
}

//timer hint
clock.addEventListener('mouseover', showHint)
clock.addEventListener('mouseout', hideHint)

function showHint() {
    notice.style['display'] = 'block'
}

function hideHint() {
    notice.style['display'] = 'none'
}

function showDescription(){
    console.log("Score: 30/30\n" +
        "[x] Разобрался в исходном коде примера и воспроизвел его самостоятельно\n" +
        "[x] Реализован таймер на 25 минут как Pomodoro\n" +
        "[x] Дополнительный функционал:\n" +
        "Воспроизведение звука при окончании таймера\n" +
        "Изменение цвета фона таймера от зеленого к красному (по мере окончания времени, фон в начале желтеет, а потом краснеет, как зреющий помидор.\n" +
        "Выведение оставшегося времени таймера при наведении на него.\n" +
        "--Для удобства проверки таймер запускается на две минуты вместо 25--")

}