const menuButton = document.querySelector('.nav__button')
const menu = document.querySelector('.nav')
const menuLinks = menu.querySelectorAll('.nav__item__text')

menuLinks.forEach(item => {
    item.addEventListener('click', () => {
        closeMenu()
    })
})

document.addEventListener('click', evt => {
    if (evt.target === menuButton){
        if (menuButton.classList.contains('nav__button-close')){
            closeMenu();
        }
        else {
            openMenu();
        }
    }
    else {
        if (menuButton.classList.contains('nav__button-close')){
            if (!(menu.contains(evt.target))){
                console.log(menu.contains(evt.target))
                closeMenu()
            }
        }
    }
})

function closeMenu(){
    menuButton.classList.remove('nav__button-close')
    menu.style.left = '-150vw'
}
function openMenu(){
    menuButton.classList.add('nav__button-close')
    menu.style.left = '0'
}