import {STRINGS} from './strings.js';

const defaultSettings = {
    'lang': 'en',
    'name': '',
    'city': 'Minsk',
    'imgSource': 'git',
    'time-module': 'true',
    'date-module': 'true',
    'greeting-module': 'true',
    'quotes-module': 'true',
    'weather-module': 'true',
    'player-module': 'true',
    'todo-module': 'true',
    'tag': '',
}

const textStrings = {
    'language-text':'lang_section',
    'background-text':'bg_section',
    'modules-text':'modules_section',
    'time-module-text': 'time_module',
    'data-module-text': 'date_module',
    'greeting-module-text': 'greeting_module',
    'quotes-module-text': 'quotes_module',
    'weather-module-text': 'weather_module',
    'player-module-text': 'player_module',
    'todo-module-text': 'todo_module'}

export function init(){
    // initial storage
    setDefaultSettings(defaultSettings)

    // Set Event Listeners
    setListeners()

    // apply settings
    updateSettings()

}

function setListeners() {
    // open-close buttons
    const openBtn = document.querySelector('.open-settings')
    const closeBtn = document.querySelector('.close-settings')
    openBtn.addEventListener('click', () => {
        openMenu();
    })
    closeBtn.addEventListener('click', () => {
        closeMenu();
    })

    // lang
    const langRu = document.querySelector('#lang-ru')
    const langEn = document.querySelector('#lang-en')
    langRu.addEventListener('click', ()=>{
        localStorage.setItem('lang', 'ru')
        document.dispatchEvent(new CustomEvent('changeLang'))
    })
    langEn.addEventListener('click', ()=>{
        localStorage.setItem('lang', 'en')
        document.dispatchEvent(new CustomEvent('changeLang'))
    })
    document.addEventListener('changeLang', () => {
        localeMenu()
    });

    // Image Source
    const imageGit = document.querySelector('#image-git')
    const imageFlickr = document.querySelector('#image-flickr')
    const imageUnsplash = document.querySelector('#image-unsplash')
    const tag = document.querySelector('#tag')
    imageGit.addEventListener('click', () => {
        localStorage.setItem('imgSource', 'git')
        document.dispatchEvent(new CustomEvent('changeImage'))
    })
    imageFlickr.addEventListener('click', () => {
        localStorage.setItem('imgSource', 'flickr')
        document.dispatchEvent(new CustomEvent('changeImage'))
    })
    imageUnsplash.addEventListener('click', () => {
        localStorage.setItem('imgSource', 'unsplash')
        document.dispatchEvent(new CustomEvent('changeImage'))
    })
    tag.addEventListener('change', () => {
        localStorage.setItem('tag', tag.value)
        document.dispatchEvent(new CustomEvent('changeImage'))
    })

    // modules
    for (let param in defaultSettings){
        if (param.search('module') >= 0){
            let module = document.querySelector(`#${param}`)
            module.addEventListener('change', ()=>{
                localStorage.setItem(param, module.checked)
                hideModules()
            })
        }
    }
}

function setDefaultSettings(defaultSettings){
    for (let param in defaultSettings) {
        if (!localStorage.getItem(param))
            localStorage.setItem(param, defaultSettings[param]);
    }
}

function hideModules() {
    const modules = {
        'time-module': 'time',
        'date-module': 'date',
        'greeting-module': 'greeting-container',
        'quotes-module': 'quote-wrap',
        'weather-module': 'weather',
        'player-module': 'player',
        'todo-module': 'todo',
    }
    for (let module in modules){
        let value = localStorage.getItem(module);
        if (value === 'true') {
            document.querySelector(`.${modules[module]}`).classList.remove('hide-block')
        } else {
            document.querySelector(`.${modules[module]}`).classList.add('hide-block')
        }
    }
}

function updateSettings(){
    localeMenu();
    getCurrentSettings();
    hideModules();
}

function getCurrentSettings(){
    let settings = Object.assign({}, defaultSettings);
    for (let param in settings){
        settings[param] = localStorage.getItem(param)
    }

    // lang
    if (settings.lang === 'ru') {
        document.querySelector('#lang-ru').checked = 'true';
    }
    else {
        document.querySelector('#lang-en').checked = 'true';
    }
    // img
    if (settings.imgSource === 'git') {
        document.querySelector('#image-git').checked = 'true';
    }
    else if (settings.imgSource === 'flickr'){
        document.querySelector('#image-flickr').checked = 'true';
    }
    else {
        document.querySelector('#image-unsplash').checked = 'true';
    }
    if (settings.tag){
        document.querySelector('#tag').value = settings.tag;
    }
    // modules
    for (let param in settings){
        if (param.search('module') >= 0){
            document.querySelector(`#${param}`).checked = settings[param] === 'true'
        }
    }
}

function localeMenu(){
    const lang = localStorage.getItem('lang');

    for (let module in textStrings) {
        let obj = document.querySelector(`.${module}`)
        obj.textContent = ` ${STRINGS.settings[lang][textStrings[module]]} `
    }
}

function openMenu (){
    const menu = document.querySelector('.settings')
    menu.classList.toggle('settings-show')
}

function closeMenu(){
    const menu = document.querySelector('.settings')
    menu.classList.remove('settings-show')
}

