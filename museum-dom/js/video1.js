const playerProgress = document.querySelector('.player__progress');
const playerVolume = document.querySelector('.player__volume');
const playerVideo = document.querySelector('.player__video')

playerProgress.addEventListener('input', function() {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
})

playerVolume.addEventListener('input', function() {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
})


function playerResize() {
    playerVideo.style.height = `${playerVideo.offsetWidth * 0.4513}px`
}
playerResize()

new ResizeObserver(playerResize).observe(playerVideo)

playlistPreviews = document.querySelectorAll('.playlist__preview')
playlistPreviews.forEach(item => {
    item.addEventListener('click', evt => {
        const imgPreview = evt.target
        const wrapPreview = imgPreview.parentNode
        let videoId = imgPreview.getAttribute('data-video');
        console.log(wrapPreview.innerHTML)
        wrapPreview.innerHTML += `<iframe allow="autoplay; clipboard-write; encrypted-media; picture-in-picture" allowfullscreen src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1" title="YouTube video player"></iframe>`;
    })
     }
)