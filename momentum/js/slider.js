import * as Clock from "./clock.js";

export default class Slider{
    constructor() {
        this.current = Math.floor(20 * Math.random()) + 1
        this.setListeners()
        this.setSlide(this.current)
    }

    setListeners() {
        const nextButton = document.querySelector('.slide-next');
        const prevButton = document.querySelector('.slide-prev');

        nextButton.addEventListener('click', ()=>{
            this.next();
        });

        prevButton.addEventListener('click', ()=>{
            this.prev();
        });

        document.addEventListener('changeTimesOfDay', () => {
            this.setSlide()
        });

        document.addEventListener('changeImage', () => {
            this.setSlide()
        });
    }

    setSlide() {
        const timesOfDay = Clock.getTimesOfDay();
        const imgSource = localStorage.getItem('imgSource')

        let imageUrl;
        switch (imgSource){
            case 'flickr':
                imageUrl = this.getFlickrImage();
                break;
            case 'unsplash':
                imageUrl = this.getUnsplashImage();
                break;
            default:
                imageUrl = `https://harrior.github.io/stage1-tasks/images/${timesOfDay}/${this.current.toString().padStart(2,'0')}.jpg`
        }

        const image = new Image();
        image.src = imageUrl
        image.addEventListener('load',()=>{
            document.body.style.backgroundImage = `url(${imageUrl})`;
        })
    }

    getUnsplashImage() {
        //fetch('https://source.unsplash.com/1920x1200/?morning')
        return undefined;
    }

    getFlickrImage() {
        //fetch('https://source.unsplash.com/1920x1200/?morning')
        return undefined;
    }

    prev() {
        this.current = this.current - 1 > 0 ? this.current - 1 : 20;
        this.setSlide()
    }

    next() {
        this.current = this.current + 1 <= 20 ? this.current + 1 : 1
        this.setSlide()
    }

}