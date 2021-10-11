galleryInit()

function galleryInit() {

    let container = document.querySelector('.gallery__inner-wrapper')
    let images = []
    for (let i = 1; i <= 15; i++) {
        images.push(makeImage(i))
    }

    images.sort(() => Math.random() - 0.5);
    images.map((el) => {
        container.append(el)
    })

    function makeImage(n) {
        let imgTemplate = document.querySelector('#gallery__image-template').content.cloneNode(true);
        let img = imgTemplate.querySelector('img');
        img.src = `assets/img/galery/galery${n}.webp`;
        img.alt = `galery${n}`;
        return imgTemplate;
    }

}

function isVisible(elem) {
    let coords = elem.getBoundingClientRect();
    let windowHeight = document.documentElement.clientHeight;
    return coords.top > 0 && coords.top < windowHeight;
}

function showVisible() {
    let images = document.querySelectorAll('.gallery__image-container')
    for (let img of images) {
        if (isVisible(img)) {
            img.classList.add('gallery__image-show')
        }
    }

    if (images[0].classList.contains('gallery__image-show')) {
        const gallery = document.querySelector('#gallery')
        let coords = gallery.getBoundingClientRect();
        if (coords.top - document.documentElement.clientHeight > 0) {
            for (let img of images) {
                img.classList.remove('gallery__image-show')
            }
        }
    }
}

window.addEventListener('scroll', showVisible)