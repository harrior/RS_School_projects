"use strict"

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday', 'Saturday']
const MONTHS = ['January', 'February', 'March', 'April', 'May','June', 'July', 'August', 'September','October','November', 'December' ]

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
