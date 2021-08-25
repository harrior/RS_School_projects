const player = document.querySelector('.player');
const video = player.querySelector('.player__screen');
const progressBar = player.querySelector('.player__progress-bar');
const progressVolume = player.querySelector('.player__volume');
const playerPlayButton = player.querySelector('.player__play');
const playerOnScreenPlay = player.querySelector('.player__on_screen_play');
const playerVolumeLevel = player.querySelector('.player__volume')



progressBar.addEventListener('input', function() {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
})

progressVolume.addEventListener('input', function() {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
})

playerVolumeLevel.addEventListener('input', function () {
    setVideoVolume(this.value);
})

playerPlayButton.addEventListener('click', () => {
    toggleVideo();
})
playerOnScreenPlay.addEventListener('click', () => {
    toggleVideo();
})
video.addEventListener('click', () => {
    toggleVideo();
})


function toggleVideo(){
    if (video.paused) {
        video.play();
        playerPlayButton.classList.toggle('player__pause');
        playerOnScreenPlay.style.display = 'none';
    }
    else {
        video.pause();
        playerPlayButton.classList.toggle('player__pause');
        playerOnScreenPlay.style.display = 'block';
    }
}

function setVideoVolume(level, mute=false){
    if (mute) {
        video.volume = 0;
    }
    else {
        video.volume = level/100;
    }
}