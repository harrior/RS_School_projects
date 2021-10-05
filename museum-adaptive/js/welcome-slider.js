const wSlider = document.querySelector(".slider")
const wSliderImage = wSlider.querySelector('.slider__image')
const wSliderLeftArrow = wSlider.querySelector('.slider__arrow-left')
const wSliderRightArrow = wSlider.querySelector('.slider__arrow-right')
const wSliderBullets = wSlider.querySelectorAll('.slider__item')
const wSliderCurrentText = wSlider.querySelector('.slider__current')
const wSliderTotalText = wSlider.querySelector('.slider__total')

const wSliderAmount = wSliderBullets.length
wSliderTotalText.textContent = String(wSliderAmount).padStart(2,'0')
let wCurrentPosition = 0

wSliderUpdateState()

// add listeners
wSliderRightArrow.addEventListener('click', wSliderMoveToRight)
wSliderLeftArrow.addEventListener('click', wSliderMoveToLeft)

wSliderBullets.forEach(item => {
    item.addEventListener('click', (event) => {
        wCurrentPosition = +event.target.dataset.id
        wSliderUpdateState()
    })
})

// functions
function wSliderMoveToRight(){
    wCurrentPosition = (wCurrentPosition + 1) === wSliderAmount ? 0 : wCurrentPosition + 1;
    wSliderUpdateState()
}
function wSliderMoveToLeft(){
    wCurrentPosition = (wCurrentPosition - 1) < 0 ? wSliderAmount - 1 : wCurrentPosition - 1;
    wSliderUpdateState()
}

function wSliderUpdateState(){
    // change img
    wSliderImage.src = wSliderBullets[wCurrentPosition].dataset.image;
    // change bullet
    for (let i=0; i < wSliderAmount; i++){
        if (i === wCurrentPosition)
            wSliderBullets[i].classList.add('slider--checked')
        else
            wSliderBullets[i].classList.remove('slider--checked');
    }
    // change text
    wSliderCurrentText.textContent = String(wCurrentPosition + 1).padStart(2,'0')
}