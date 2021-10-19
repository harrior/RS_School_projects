import {STRINGS} from './strings.js'

export function init(){
    setDateTime();
    setInterval(setDateTime, 1000);
}

function setDateTime(){
    const date = new Date();
    const timeString = document.querySelector('.time');
    const dateString = document.querySelector('.date');
    const lang = localStorage.getItem('lang');

    const hour = date.getHours().toString().padStart(2,'0');
    const minutes = date.getMinutes().toString().padStart(2,'0');
    const seconds = date.getSeconds().toString().padStart(2,'0');

    timeString.textContent = `${hour}:${minutes}:${seconds}`;

    const day = date.getDate();
    const month = date.getMonth();
    const dayOfWeek = date.getDay();
    let currentDate;

    switch (lang){
        case 'ru':
            currentDate = `${STRINGS.daysOfWeek[lang][dayOfWeek]}, ${day} ${STRINGS.months[lang][month]}`
            break;
        case 'en':
            currentDate = `${STRINGS.daysOfWeek[lang][dayOfWeek]}, ${STRINGS.months[lang][month]} ${day}`
            break;
    }

    dateString.textContent = currentDate
}
