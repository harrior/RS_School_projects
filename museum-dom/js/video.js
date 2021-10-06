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
    playerScreen.style.height = `${playerScreen.offsetWidth * 0.4513}px`
}
playerResize()

new ResizeObserver(playerResize).observe(playerScreen)


playlistPreviews = document.querySelectorAll('.playlist__preview')
playlistPreviews.forEach(item => {
    item.addEventListener('click', evt => {
        const imgPreview = evt.target
        const wrapPreview = imgPreview.parentNode
        let videoId = imgPreview.getAttribute('data-video');
        console.log(wrapPreview.innerHTML)
        wrapPreview.innerHTML += `<iframe allow="autoplay; clipboard-write; encrypted-media; picture-in-picture" allowfullscreen src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1" title="YouTube video player"></iframe>`;

        // .innerHTML = '<iframe src="//www.youtube.com/embed/' + videoId + '?autoplay=1" scrolling="no" style="width: 100%; height: 100%;" allow="autoplay"></iframe>';
    })
    //
     }
)