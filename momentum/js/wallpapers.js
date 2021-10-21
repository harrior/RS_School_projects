import Slider from './slider.js';
import * as Clock from './clock.js';

let slider = new Slider();

export function init() {
    document.addEventListener('changeTimesOfDay', () => {
        const imgSource = localStorage.getItem('imgSource')
        updateSlider(slider,imgSource)
    });
    document.addEventListener('changeImage', () => {
        const imgSource = localStorage.getItem('imgSource')
        updateSlider(slider,imgSource)
    });
}

function updateSlider(slider, imgSource) {
    slider.clear();
    switch (imgSource) {
        case 'git':
        case null:
            useGitImages(slider);
            break;
        case 'flickr':
            useFlickrImages(slider);
            break;
        case 'unsplash':
            useUnsplashImages(slider);
            break;
    }
    slider.random();
}

function useGitImages(slider) {
    const timesOfDay = Clock.getTimesOfDay()
    for (let i = 1; i <= 20; i++) {
        slider.add(`https://harrior.github.io/stage1-tasks/images/${timesOfDay}/${i.toString().padStart(2, '0')}.jpg`)
    }
}

function useFlickrImages(slider) {
    console.log('flicker!')
// TODO add flicker image source
}

function useUnsplashImages(slider) {
    console.log('upslash!')
// TODO add Unsplash image source
}