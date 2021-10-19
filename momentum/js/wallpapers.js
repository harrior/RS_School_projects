import Slider from './slider.js';
import * as Clock from './clock.js';

export function init() {
    let slider = new Slider();

    const imgSource = localStorage.getItem('imgSource')
    updateSlider(slider,imgSource)
}

function updateSlider(slider, imgSource) {
    slider.clear();
    switch (imgSource) {
        case 'git':
        case null:
            addGitImages(slider);
            break;
        case 'flickr':
            addFlickrImages(slider);
            break;
        case 'unsplash':
            addUnsplashImages(slider);
            break;
    }
    slider.random();
}

function addGitImages(slider) {
    const timesOfDay = Clock.getTimesOfDay()
    for (let i = 1; i <= 20; i++) {
        slider.add(`https://harrior.github.io/stage1-tasks/images/${timesOfDay}/${i.toString().padStart(2, '0')}.jpg`)
    }
}

function addFlickrImages(slider) {
// TODO add flicker image source
}

function addUnsplashImages(slider) {
// TODO add Unsplash image source
}