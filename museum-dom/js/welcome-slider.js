const wSlider = document.querySelector(".slider")

const wSliderItems = wSlider.querySelector('.slider__slides')

const wSliderLeftArrow = wSlider.querySelector('.slider__arrow-left')
const wSliderRightArrow = wSlider.querySelector('.slider__arrow-right')
const wSliderBullets = wSlider.querySelectorAll('.slider__item')

const wSliderCurrentText = wSlider.querySelector('.slider__current')
const wSliderTotalText = wSlider.querySelector('.slider__total')

const wSliderAmount = wSliderBullets.length
let wSliderCurrentPosition = 0
let wSliderCurrentOffset = 0
let wSliderTouchStart = 0

wSliderInit()

// Listeners
wSliderLeftArrow.addEventListener('click', wSliderPreviewSlide)
wSliderRightArrow.addEventListener('click', wSliderNextSlide)
wSliderBullets.forEach(item => {
    item.addEventListener('click', () => {
        wSliderSetSlide(Number(item.dataset.id))
    })
})

// function
function wSliderInit(){
    for (let image of wSliderBullets){
        wSliderItems.appendChild(wSliderCreateSlide(image.dataset.image))
    }
    wSliderItems.style.display = "flex"
    wSliderTotalText.textContent = String(wSliderAmount).padStart(2,'0')
}

function wSliderSetSlide(position){
    // change position
    wSliderCurrentPosition = position
    wSliderCurrentOffset = wSliderCurrentPosition * 100
    wSliderItems.style.transform = `translateX(-${wSliderCurrentOffset}%)`

    // change bullet
    wSliderBullets.forEach(item => {
        if (+item.dataset.id === position)
            item.classList.add('slider--checked')
        else
            item.classList.remove('slider--checked')
    })

    // change text position value
    wSliderCurrentText.textContent = String(wSliderCurrentPosition + 1).padStart(2,'0')
}

// Next-previous sliding
function wSliderNextSlide(){
    if (wSliderCurrentPosition + 1 === wSliderAmount) {
        wSlider.style.left = 0
        wSliderSetSlide( 0)
    }
    else {
        wSliderSetSlide(wSliderCurrentPosition + 1)
    }

}

function wSliderPreviewSlide(){
    if (wSliderCurrentPosition === 0) {
        wSliderSetSlide( wSliderAmount - 1)
    }
    else {
        wSliderSetSlide(wSliderCurrentPosition - 1)
    }
}

// Touch
wSlider.addEventListener('mousedown', evt => {
    wSliderTouchStart = evt
})

wSlider.addEventListener('mouseup', evt => {
    let swipeLength = wSliderTouchStart.pageX - evt.pageX
    if (Math.abs(swipeLength) > 20){
        if (swipeLength > 30){
            wSliderNextSlide()
        }
        else {
            wSliderPreviewSlide()
        }
    }
})

function wSliderCreateSlide(url){
    let slide = document.createElement('div')
    let img = document.createElement('img')
    img.src = url;
    img.classList.add('slider__image')
    slide.appendChild(img)
    return slide
}

