//const
const ticketsExhibitionTypes = {
    0: {
        'price': 20,
        'title': "Permanent exhibition"
    },
    1: {
        'price': 25,
        'title': "Temporary exhibition",
    },
    2: {
        'title': "Combined Admission",
        'price': 40,
    },
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

// Tickets Form
const tickets = document.querySelector('.tickets__form')
const ticketsTypes = tickets.querySelectorAll('.tickets__type-checkbox')
const ticketsCountBasic = tickets.querySelector('.tickets-basic .js-value')
const ticketsCountSenior = tickets.querySelector('.tickets-senior .js-value')
const ticketsTotalPrice = tickets.querySelector('.tickets__total-value')
const ticketsSubmitButton = document.querySelector('.tickets__submit-button')

ticketsInit()

// listeners
ticketsTypes.forEach(item => {
    item.addEventListener('click', ticketsUpdate)
})
ticketsSubmitButton.addEventListener('click', evt => {
    evt.preventDefault();
    ticketsUpdate()
    bookingInit()
    booking.classList.add('booking--show')
    booking.addEventListener("transitionend", () => {
        booking.style.background = "rgba(0, 0, 0, 0.5)"
    }, true);
})

// ticket
function ticketsInit() {
    ticketsCountBasic.value = +localStorage.getItem('CountBasic') || 0
    ticketsCountSenior.value = +localStorage.getItem('CountSenior') || 0
    let selectedTicketType = +localStorage.getItem('SelectedType') || 0
    ticketsTypes[selectedTicketType].checked = true
    ticketsUpdate()
}

function ticketsUpdate() {
    let price = 0;
    for (let i = 0; i < ticketsTypes.length; i++) {
        if (ticketsTypes[i].checked) {
            price = ticketsExhibitionTypes[i].price
            localStorage.setItem('SelectedType', String(i));
            break
        }
    }
    localStorage.setItem('CountBasic', ticketsCountBasic.value);
    localStorage.setItem('CountSenior', ticketsCountSenior.value);

    let total = (+ticketsCountBasic.value * price) + (+ticketsCountSenior.value * price) / 2;
    ticketsTotalPrice.textContent = String(total)
}


// +- button
let amountBoxes = Array(...document.querySelectorAll('.tickets__amount-box'))
amountBoxes.push(...Array(...document.querySelectorAll('.booking__amount-number')))

for (let box of amountBoxes) {
    numberInputAddEvents(box);
}

function numberInputAddEvents(box) {
    let minusButton = box.querySelector('.js-minus');
    let plusButton = box.querySelector('.js-plus');
    let amountValue = box.querySelector('.js-value');

    minusButton.addEventListener('click', (evt) => {
        evt.preventDefault();
        if (amountValue.value > 0)
            amountValue.value -= 1
        ticketsUpdate()
        bookingUpdate()
    })

    plusButton.addEventListener('click', (evt) => {
        evt.preventDefault();
        if (amountValue.value < 20) {
            amountValue.value = +amountValue.value + 1;
            ticketsUpdate()
            bookingUpdate()
        }
    })

}

// Booking form
const booking = document.querySelector('.booking')
const bookingCloseButton = booking.querySelector('.booking__close')
const bookingSubmit = booking.querySelector('.booking__submit')

const bookingDate = booking.querySelector('#booking-date')
const bookingTime = booking.querySelector('#booking-time')
const bookingName = booking.querySelector('#booking-name')
const bookingEmail = booking.querySelector('#booking-email')
const bookingPhone = booking.querySelector('#booking-phone')
const bookingTicketType = booking.querySelector('#booking-type')
const bookingCountBasic = booking.querySelector("#booking-count-basic")
const bookingCountSenior = booking.querySelector("#booking-count-senior")

const bookingCountBasicText = booking.querySelector(".booking__count-basic-text")
const bookingCountSeniorText = booking.querySelector(".booking__count-senior-text")

const bookingBasicPriceText = booking.querySelectorAll(".booking__basic-price-text")
const bookingSeniorPriceText = booking.querySelectorAll(".booking__senior-price-text")
const bookingBasicTotalText = booking.querySelector("#booking__basic-total-text")
const bookingSeniorTotalText = booking.querySelector("#booking__senior-total-text")
const bookingTotal = booking.querySelector('.booking__total-value')

const bookingDateText = booking.querySelector('.booking__overview-date')
const bookingTimeText = booking.querySelector('.booking__overview-time')
const bookingTicketTypeText = booking.querySelector('.booking__overview-type')


// listeners
bookingCloseButton.addEventListener('click', hideBookingForm)

booking.addEventListener('click', hideBookingForm)

bookingTicketType.addEventListener('change', bookingUpdate)

bookingDate.addEventListener('change', evt => {
    if (Date.parse(bookingDate.value) < Date.parse(bookingDate.getAttribute('min'))) {
        evt.target.value = bookingDate.getAttribute('min')
    }
    bookingUpdate()
})

bookingTime.addEventListener('change', bookingUpdate)

bookingName.addEventListener('keyup', evt => {
    bookingCheckInput(evt.target, 'error-message-name', /[^a-zA-ZА-Яа-я ]/g ,'Incorrect symbol. The name must contain only Russian and English letters and spaces.')
})

bookingPhone.addEventListener('keyup', evt => {
    bookingCheckInput(evt.target, 'error-message-phone', /[^0-9 -]/g ,'Incorrect symbol. The phone can contain numbers, spaces and dashes.')
})

bookingEmail.addEventListener('keyup', evt => {
    bookingCheckInput(evt.target, 'error-message-email', /[^a-zA-Z0-9@_.-]/g ,'Incorrect symbol. Email should consist of latin letters, numbers, @, . , - and _.')
})

function bookingCheckInput(element, idErrorElement, pattern, message){
    const errorMsg = booking.querySelector(`#${idErrorElement}`)
    if(element.value.match(pattern) !== null){
        errorMsg.style['display'] = 'block'
        element.classList.add('booking__field-error')
        errorMsg.textContent = message
    } else {
        element.classList.remove('booking__field-error')
        errorMsg.style['display'] = 'none'
        errorMsg.textContent = ''
    }
}


// functions
function bookingInit() {
    bookingCountBasic.value = +localStorage.getItem('CountBasic') || 0
    bookingCountSenior.value = +localStorage.getItem('CountSenior') || 0
    bookingCountSenior.value = +localStorage.getItem('CountSenior') || 0
    let selectedType = +localStorage.getItem('SelectedType') || 0

    localStorage.getItem('')
    bookingTicketType[selectedType + 1].selected = true

    const date = new Date()
    const todayDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    bookingDate.setAttribute('min', todayDate)

    bookingUpdate()
}

function bookingUpdate() {
    // Update Price
    const countBasic = +bookingCountBasic.value
    const countSenior = +bookingCountSenior.value
    const ticketType = bookingTicketType.selectedIndex - 1
    const basePrice = ticketsExhibitionTypes[ticketType].price
    const seniorPrice = basePrice / 2

    bookingBasicPriceText.forEach(item => {
        item.textContent = `${basePrice} €`
    })
    bookingSeniorPriceText.forEach(item => {
        item.textContent = `${seniorPrice} €`
    })

    bookingCountBasicText.textContent = String(countBasic)
    bookingCountSeniorText.textContent = String(countSenior)

    const totalBasic = countBasic * basePrice
    const totalSenior = countSenior * seniorPrice
    const totalPrice = totalBasic + totalSenior

    bookingBasicTotalText.textContent = `${totalBasic} €`
    bookingSeniorTotalText.textContent = `${totalSenior} €`
    bookingTotal.textContent = `${totalPrice} €`

    // update ticket type
    bookingTicketTypeText.textContent = ticketsExhibitionTypes[ticketType].title

    // update date
    const date = new Date(bookingDate.value)
    let dateText = '-'
    if (!isNaN(date.getTime())) {
        const dayOfWeek = daysOfWeek[date.getDay()]
        const month = months[date.getMonth()]
        const day = date.getDate()
        dateText = `${dayOfWeek}, ${month} ${day}`
    }

    bookingDateText.textContent = dateText

    //update time
    bookingTimeText.textContent = bookingTime.value ? bookingTime.value : '-'


    // localStorage
    localStorage.setItem('CountBasic', String(countBasic));
    localStorage.setItem('CountSenior', String(countSenior));
    localStorage.setItem('SelectedType', String(ticketType));
}

function hideBookingForm(evt) {
    if ((evt.target === bookingCloseButton) || (evt.target === booking)) {
        evt.preventDefault();
        ticketsInit()
        booking.style.background = "rgba(0, 0, 0, 0)"
        booking.classList.remove('booking--show')
        ticketsUpdate()
    }
}

function bookingRippleEffect(evt) {
    const x = evt.clientX
    const y = evt.clientY

    const br = evt.target.getBoundingClientRect()

    const buttonTop = br.top
    const buttonLeft = br.left

    const xInside = x - buttonLeft
    const yInside = y - buttonTop

    const circle = document.createElement('span')
    circle.classList.add('circle')
    circle.style.top = yInside + 'px'
    circle.style.left = xInside + 'px'

    evt.target.appendChild(circle)

    setTimeout(() => circle.remove(), 500)
}

function bookingValidateName() {
    let regexp = /^[a-zA-Zа-яА-Я ]{3,15}$/
    let name = bookingName.value
    if ((name.match(regexp) === null) || ((name.length < 3) || (name.length > 15))) {
        bookingName.setCustomValidity('The name must contain only Russian and English letters and spaces.\nThe name must be between 3 and 15 characters long')
        return false
    }
    bookingName.setCustomValidity('')
    return true
}

function bookingValidateEmail() {
    let regexp = /^([a-zA-Z _-]{3,15})@([a-zA-Z]{4,})\.[a-zA-Z]{2,}$/
    let email = bookingEmail.value
    if (email.match(regexp) === null) {
        bookingEmail.setCustomValidity('Incorrect e-mail.\nExample username@example.com')
        return false
    }
    bookingEmail.setCustomValidity('')
    return true
}

function bookingValidatePhone() {
    let phone = bookingPhone.value
    if (phone.match(/([^\d -])/g) === null) {
        let partNumber = phone.match(/(\d{2,3})/g)
        let joinedNumber = partNumber !== null ? partNumber.join('') : ''
        if ((joinedNumber.match(/^\d{1,10}$/) !== null) || (phone.match(/^\d{1,10}$/) !== null)) {
            bookingPhone.setCustomValidity('')
            return true
        }
    }
    bookingPhone.setCustomValidity('Incorrect phone.\nThe phone number must contain no more than 10 digits, as well as spaces and dashes.')
    return false
}

bookingSubmit.addEventListener('click', function (evt) {
    // evt.preventDefault()
    bookingRippleEffect(evt)
    bookingValidateName()
    bookingValidateEmail()
    bookingValidatePhone()
})