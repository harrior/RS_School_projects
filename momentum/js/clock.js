import {STRINGS} from './strings.js'

export function init(){
    setInterval(updateDateTime, 1000);
}

function updateDateTime(){
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

export function getTimesOfDay(){
    const hour = new Date().getHours();

    if ((hour >= 6) && (hour < 12)){
        return "morning";
    } else if ((hour >= 12) && (hour < 18)) {
        return "afternoon";
    } else if ((hour >= 18) && (hour <= 23)) {
        return "evening";
    } else {
        return "night";
    }
}