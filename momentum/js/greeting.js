import {STRINGS} from './strings.js'

export function init(){
    setInterval(updateGreeting, 1000)
    setInterval(updateUsername, 1000)

    const name = document.querySelector('.name');
    name.addEventListener('input', saveUsername);
}

function updateGreeting(){
    const lang = localStorage.getItem('lang')

    const date = new Date();
    const hour = date.getHours();

    let greeting;
    if ((hour >= 6) && (hour < 12)){
        greeting = STRINGS.greetings[lang].morning;
    } else if ((hour >= 12) && (hour < 18)) {
        greeting = STRINGS.greetings[lang].afternoon;
    } else if ((hour >= 18) && (hour <= 23)) {
        greeting = STRINGS.greetings[lang].evening;
    } else {
        greeting = STRINGS.greetings[lang].night;
    }

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