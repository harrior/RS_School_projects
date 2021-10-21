import * as Clock from "./clock.js";

export default class Slider{
    constructor() {
        this.setListeners()

        this.current = Math.floor(20 * Math.random()) + 1
        this.updateImage()
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
            this.updateImage()
        });

        document.addEventListener('changeImage', () => {
            this.updateImage()
        });
    }

    updateImage() {
        const timesOfDay = Clock.getTimesOfDay();
        const imgSource = localStorage.getItem('imgSource')

        switch (imgSource){
            case 'flickr':
                this.setFlickrImage();
                break;
            case 'unsplash':
                this.setUnsplashImage();
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

    setUnsplashImage(){
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

    setFlickrImage() {
        const API_KEY = 'f4bc45776245ae7bc86b6afe1a53d350'
        let categories = Clock.getTimesOfDay()
        let tags = localStorage.getItem('tag')
        if (tags){
            categories = tags.split(' ').join(',')
        }
        let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&tags=${categories}&media=photos&privacy_filter=1&api_key=${API_KEY}&format=json&nojsoncallback=?`

        this.request(url).then(date => {
            let photosInfo = date.photos.photo
            let randPhoto = photosInfo[Math.floor(Math.random()* photosInfo.length)]

            this.setImage(makeUrl(randPhoto))
        })
        function makeUrl(photo){
            url = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
            return url
        }
    }


    prev() {
        this.current = this.current - 1 > 0 ? this.current - 1 : 20;
        this.updateImage()
    }

    next() {
        this.current = this.current + 1 <= 20 ? this.current + 1 : 1
        this.updateImage()
    }

}