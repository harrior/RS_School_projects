export default class Slider{

    constructor() {
        this.slides = [];
        this.current = -1;

        const nextButton = document.querySelector('.slide-next');
        const prevButton = document.querySelector('.slide-prev');

        nextButton.addEventListener('click', ()=>{
            this.next();
        });

        prevButton.addEventListener('click', ()=>{
            this.prev();
        });
    }

    add(url) {
        this.slides.push(url);
    }

    clear() {
        this.slides = [];
        this.current = -1;
    }

    setSlide(position) {
        this.current = position;
        const image = new Image();
        image.src = `${this.slides[position]}`
        image.addEventListener('load',()=>{
            document.body.style.backgroundImage = `url(${this.slides[position]})`;
        })
    }

    prev() {
        this.setSlide( this.current - 1 >= 0 ? this.current - 1 : this.slides.length - 1)
    }

    next() {
        this.setSlide( this.current + 1 < this.slides.length ? this.current + 1 : 0 )
    }

    random(){
        const position = Math.floor(Math.random() * this.slides.length);
        this.setSlide(position);
    }
}