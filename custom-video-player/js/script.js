// init control components
const player = document.querySelector('.player');

const video = player.querySelector('.player__screen');

const progressBar = player.querySelector('.player__progress-bar');
const volumeBar = player.querySelector('.player__volume')

const playButton = player.querySelector('.player__play');
const muteButton = player.querySelector('.player__mute');
const screenPlayButton = player.querySelector('.player__on_screen_play');
const fullscreenButton = player.querySelector('.player__on_screen_play');

let volumeLevel = Number(volumeBar.value);

// set play\pause listeners
playButton.addEventListener('click', () => {
    switchPlayback();
})

screenPlayButton.addEventListener('click', () => {
    switchPlayback();
})

video.addEventListener('click', () => {
    switchPlayback();
})

video.addEventListener('ended',function (){
    stopPlayback();
})

// playback position listeners
progressBar.addEventListener('input', function() {
    setVideoPosition(progressBar.value)
})

video.addEventListener('timeupdate', function (){
    updateProgressBarPosition(progressBar,100/video.duration *  video.currentTime);
})

// sound listeners
muteButton.addEventListener('click', function (){
    if (video.muted) {
        unmute();
    } else {
        mute();
    }
})

volumeBar.addEventListener('input', function (){
    const volumeLevel = Number(volumeBar.value);
    if (volumeLevel === 0){
        mute();
    }
    else {
        unmute();
        setVolumeLevel(volumeLevel);
    }
})

// start/stop functions
function switchPlayback(){
    if (video.paused) {
        startPlayback();
    }
    else {
        stopPlayback();
    }
}

function startPlayback(){
    video.play();
    playButton.classList.add('player__pause');
    screenPlayButton.style.display = 'none';
}
function stopPlayback(){
    video.pause();
    playButton.classList.remove('player__pause');
    screenPlayButton.style.display = 'block';
}

// audio functions
function mute(){
    video.muted = true;
    volumeLevel = Number(volumeBar.value);
    muteButton.classList.add('player__mute__on');
    updateProgressBarPosition(volumeBar, 0)
}

function unmute(){
    video.muted = false;
    muteButton.classList.remove('player__mute__on');
    setVolumeLevel(volumeLevel)
}

function setVolumeLevel(level) {
    volumeLevel = level;
    video.volume = level/100;
    volumeLevel.value = level;
    updateProgressBarPosition(volumeBar, level)
}

// video position functions
function setVideoPosition(position){
    progressBar.value = position;
    video.currentTime = video.duration/100 * position;
    updateProgressBarPosition(progressBar, position);
}

// progress bar update
function updateProgressBarPosition(bar, position){
    position = Math.floor(position)
    bar.style.background = `linear-gradient(to right, var(--progress-bar-full) 0%, var(--progress-bar-full) ${position}%, var(--progress-bar-empty) ${position}%, var(--progress-bar-empty) 100%)`
    bar.value = position;
}