// +- button
const amountBoxes = document.querySelectorAll('.tickets__amount-box')
for (let box of amountBoxes) {
    let minusButton = box.querySelector('.tickets__amount-minus');
    let plusButton = box.querySelector('.tickets__amount-plus');
    let amountValue = box.querySelector('.tickets__amount-value');
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

let hideBookingForm = (evt) => {
    evt.preventDefault();
    bookingSection.style.background = "rgba(0, 0, 0, 0)"
    booking.classList.remove('booking--show')
}

openButton.addEventListener('click', evt => {
    evt.preventDefault();
    booking.classList.add('booking--show')
    bookingSection.addEventListener("transitionend", evt => {
        bookingSection.style.background = "rgba(0, 0, 0, 0.5)"
    }, true);
})

closeButton.addEventListener('click', hideBookingForm)

bookingSection.addEventListener('click', hideBookingForm)
