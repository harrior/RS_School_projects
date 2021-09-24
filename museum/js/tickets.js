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

