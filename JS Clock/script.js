"use strict"

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday', 'Saturday']
const MONTHS = ['January', 'February', 'March', 'April', 'May','June', 'July', 'August', 'September','October','November', 'December' ]
const TIMER_DELAY = 1; //minutes
const COLOR_DELTA = 255/(TIMER_DELAY*30)

// clock
const clock = document.querySelector('.clock');
const hoursArrow = document.querySelector('.hours')
const minutesArrow = document.querySelector('.minutes')
const secondsArrow = document.querySelector('.seconds')
const timerArrow = document.querySelector('.timer')
const textTimeArea = document.querySelector('.plain-time')

setInterval(showCurrentTime,1000)


function showCurrentTime(){
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

    hoursArrow.style["transform"] = `rotate(${30*hours + minutes/2}deg)`;
    minutesArrow.style["transform"] = `rotate(${6*minutes + seconds/10}deg)`;
    secondsArrow.style["transform"] = `rotate(${6*seconds}deg)`;

    textTimeArea.innerHTML = `<p>${hours}:${minutes }:${seconds}</p>
                              <p>${weekDay}</p>
                              <p>${day} ${month} ${year}</p>`;
}


//timer
let timerMinutes = null;
let timerColorR = 0;
let timerColorG = 255;

clock.addEventListener('click', startStopTimer);
setInterval(checkTimer, 1000)

function startStopTimer(){
    if (!timerMinutes) {
        //set timer for 25 minutes
        const date = new Date()
        timerMinutes = (date.getMinutes() + TIMER_DELAY) % 60

        timerArrow.style["transform"] = `rotate(${6 * timerMinutes}deg)`;
        timerArrow.style["display"] = 'block';
        timerColorR = 0;
        timerColorG = 255;
        clock.style['opacity'] = '100%';
    }
    else {
        // stop timer
        timerMinutes = null;
        timerArrow.style["display"] = 'none';
        timerColorG = 255;
        timerColorR = 0;
        clock.style['opacity'] = '30%';
    }
}

function checkTimer(){
    const date = new Date()
    if (timerMinutes === date.getMinutes()){
        alert('БЗЫНЬ!');
        startStopTimer();
    }
    else if (timerMinutes) {
        if ((timerColorR < 255) && (timerColorG === 255)){
            timerColorR += COLOR_DELTA;
        }
        else if (timerColorR => 255){
            timerColorR = 255;
            timerColorG = timerColorG > 0 ? timerColorG - COLOR_DELTA : 0;
        }
    }

    clock.style['backgroundImage'] = `radial-gradient(rgb(${timerColorR}, ${timerColorG}, 0), black)`;

}
