const playerProgress = document.querySelector('.player__progress');
const playerVolume = document.querySelector('.player__volume');
const playerScreen = document.querySelector('.player__video')

playerProgress.addEventListener('input', function() {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
})

playerVolume.addEventListener('input', function() {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
})

function playerResize() {
    console.log(playerScreen.offsetWidth)
    playerScreen.style.height = `${playerScreen.offsetWidth * 0.4513}px`
}
playerResize()

new ResizeObserver(playerResize).observe(playerScreen)
