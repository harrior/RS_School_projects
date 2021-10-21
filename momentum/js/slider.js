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

        switch (imgSource){
            case 'flickr':
                this.getFlickrImage();
                break;
            case 'unsplash':
                this.getUnsplashImage();
                break;
            default:
                let imageUrl = `https://harrior.github.io/stage1-tasks/images/${timesOfDay}/${this.current.toString().padStart(2,'0')}.jpg`
                this.setImage(imageUrl)
        }
    }

    setImage(url){
        const image = new Image();
        image.src = url
        image.addEventListener('load',()=>{
            document.body.style.backgroundImage = `url(${url})`;
        })
    }

    async request(url){
        const response = await fetch(url)
        return response.json()
    }

    getUnsplashImage(){
        const API_KEY = 'ONENqNjJ2MN7oESbVXkCSAVBc14sZmJjNBL65CKvrs4'
        let categories = Clock.getTimesOfDay()
        let tags = localStorage.getItem('tag')
        if (tags){
            categories = tags.split(' ').join(',')
        }
        let url = `https://api.unsplash.com/search/photos/?orientation=landscape&query=${categories}&per_page=30&client_id=${API_KEY}`
        this.request(url).then(date => {
            let results = date.results
            let links = results.map(item => {
                return item.urls.full + '&w=1440'
            })
            this.setImage(links[Math.floor(Math.random()*30)])
        })
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