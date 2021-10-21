import {STRINGS} from './strings.js'
import * as Clock from './clock.js';

export function init(){
    document.addEventListener('changeLang', () => {
        updateGreeting()
        updateUsername()
    });

    const name = document.querySelector('.name');
    name.addEventListener('input', saveUsername);

    // setInterval(updateGreeting, 1000) // ToDo добавить изменение времени суток

    updateGreeting()
    updateUsername()
}

function updateGreeting(){
    const lang = localStorage.getItem('lang')

    const timesOfDay = Clock.getTimesOfDay()
    let greeting = STRINGS.greetings[lang][timesOfDay]

    const greetingText = document.querySelector('.greeting');
    greetingText.textContent = greeting;
}

function updateUsername() {
    const lang = localStorage.getItem('lang')

    const name = localStorage.getItem('name')
    const nameText = document.querySelector('.name')

    nameText.placeholder = STRINGS.greetingPlaceholder[lang]
    if (name) {
        nameText.value = name
    }
}

function saveUsername(evt){
    localStorage.setItem('name', evt.target.value )
}