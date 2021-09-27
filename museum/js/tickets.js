// +- button
let amountBoxes = Array(...document.querySelectorAll('.tickets__amount-box'))
amountBoxes.push(...Array(...document.querySelectorAll('.booking__amount-number')))

for (let box of amountBoxes) {
    console.log(box)
    numberAddEvents(box);
}

function numberAddEvents(box) {
    let minusButton = box.querySelector('.js-minus');
    let plusButton = box.querySelector('.js-plus');
    let amountValue = box.querySelector('.js-value');
    minusButton.addEventListener('click', (evt) => {
        evt.preventDefault();
        if (amountValue.value > 0)
            amountValue.value -= 1
    })
    plusButton.addEventListener('click', (evt) => {
        evt.preventDefault();
        if (amountValue.value < 20) {
            amountValue.value = +amountValue.value + 1;
        }
    })
}

// booking__close
let booking = document.querySelector('.booking')
let openButton = document.querySelector('.tickets__submit-button')
let closeButton = document.querySelector('.booking__close')
let bookingSection = document.querySelector('.booking')

let hideBookingForm = (e) => {
    if ((e.target === closeButton) || (e.target === bookingSection)) {
        e.preventDefault();
        bookingSection.style.background = "rgba(0, 0, 0, 0)"
        booking.classList.remove('booking--show')
    }
}

openButton.addEventListener('click', e => {
    e.preventDefault();
    booking.classList.add('booking--show')
    bookingSection.addEventListener("transitionend", () => {
        bookingSection.style.background = "rgba(0, 0, 0, 0.5)"
    }, true);
})

closeButton.addEventListener('click', hideBookingForm)

bookingSection.addEventListener('click', hideBookingForm)

const bookingSubmit = document.querySelector('.booking__submit')

bookingSubmit.addEventListener('click', function (e) {
    e.preventDefault()
    const x = e.clientX
    const y = e.clientY

    const br=this.getBoundingClientRect()

    const buttonTop = br.top
    const buttonLeft = br.left

    const xInside = x - buttonLeft
    const yInside = y - buttonTop

    const circle = document.createElement('span')
    circle.classList.add('circle')
    circle.style.top = yInside + 'px'
    circle.style.left = xInside + 'px'

    this.appendChild(circle)

    setTimeout(() => circle.remove(), 500)
})