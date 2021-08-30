// init control components
const player = document.querySelector('.player');

const video = player.querySelector('.player__screen');

const progressBar = player.querySelector('.player__progress-bar');
const volumeBar = player.querySelector('.player__volume');

const playButton = player.querySelector('.player__play');
const muteButton = player.querySelector('.player__mute');
const screenPlayButton = player.querySelector('.player__on_screen_play');
const fullscreenButton = player.querySelector('.player__fullscreen');

let volumeLevel = Number(volumeBar.value);
let playbackRate = 100;

window.addEventListener('load', function () {
    updateBarPosition(progressBar, progressBar.value);
    updateBarPosition(volumeBar, volumeBar.value);
})

// Show help in console.log
help();

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

video.addEventListener('ended', function () {
    stopPlayback();
})

// playback position listeners
progressBar.addEventListener('input', function () {
    setVideoPosition(progressBar.value)
})

video.addEventListener('timeupdate', function () {
    updateBarPosition(progressBar, 100 / video.duration * video.currentTime);
})

// sound listeners
muteButton.addEventListener('click', function () {
    switchMute();
})

volumeBar.addEventListener('input', function () {
    const level = Number(volumeBar.value);
    if (level === 0) {
        mute();
    } else {
        unmute();
        setVolumeLevel(level);
    }
})

// fullscreen listener
fullscreenButton.addEventListener('click', function () {
    switchFullscreen();
})

// keyboard listener
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case ' ' :
            e.preventDefault();
            switchPlayback();
            break;
        case 'f':
            switchFullscreen();
            break;
        case 'm':
            switchMute();
            break;
        case 'Home':
            setVideoPosition(0);
            break;
        case 'End':
            setVideoPosition(100);
            break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            setVideoPosition(Number(e.key * 10));
            break;
        case "ArrowUp":
            setVolumeLevel(volumeLevel + 10)
            break;
        case "ArrowDown":
            setVolumeLevel(volumeLevel - 10)
            break;
        case "<":
            setPlaybackRate(playbackRate - 10);
            break;
        case ">":
            setPlaybackRate(playbackRate + 10);
            break;
        case "/":
            setPlaybackRate(100);
            break;
        default:
            console.log(e)
    }
})

// start/stop functions
function switchPlayback() {
    if (video.paused) {
        startPlayback();
    } else {
        stopPlayback();
    }
}

function startPlayback() {
    video.play();
    playButton.classList.add('player__pause');
    screenPlayButton.style.display = 'none';
}

function stopPlayback() {
    video.pause();
    playButton.classList.remove('player__pause');
    screenPlayButton.style.display = 'block';
}

// audio functions
function switchMute() {
    if (video.muted) {
        unmute();
    } else {
        mute();
    }
}

function mute() {
    video.muted = true;
    //volumeLevel = Number(volumeBar.value);
    muteButton.classList.add('player__mute__on');
    //updateBarPosition(volumeBar, 0)
}

function unmute() {
    video.muted = false;
    muteButton.classList.remove('player__mute__on');
    //setVolumeLevel(volumeLevel)
}

function setVolumeLevel(level) {
    level = Number(level);
    level = level > 100 ? 100 : level < 0 ? 0 : level;

    if (level === 0)
        mute();
    else
        unmute()

    volumeLevel = level;
    video.volume = level / 100;
    volumeLevel.value = level;
    updateBarPosition(volumeBar, level)
}

// video position functions
function setVideoPosition(position) {
    position = Number(position);
    position = position > 100 ? 100 : position < 0 ? 0 : position;
    video.currentTime = video.duration / 100 * position;
    updateBarPosition(progressBar, position);
}

//fullscreen
function switchFullscreen() {
    if (document.fullscreenElement === player) {
        document.exitFullscreen();
    } else {
        player.requestFullscreen();
    }
}

// set playback speed
function setPlaybackRate(rate){
    rate = Number(rate);
    rate = rate < 0 ? 0 : rate;
    playbackRate = rate;
    video.playbackRate = rate/100;
}

// progress bar update
function updateBarPosition(bar, position) {
    position = Math.floor(position);
    bar.style.background = `linear-gradient(to right, var(--progress-bar-full) 0%, var(--progress-bar-full) ${position}%, var(--progress-bar-empty) ${position}%, var(--progress-bar-empty) 100%)`;
    bar.value = position;
}

function help() {
    console.log('управление плеером с клавиатуры: \n' +
        '1) клавиша Пробел — пауза, \n' +
        '2) Клавиша Home — переход в начало видео, \n' +
        '3) Клавиша End — переход в конец видео, \n' +
        '4) Клавиши 1-9 — переход к фрагментам видео в процентах 10-90%, \n' +
        '5) Клавиша M (англ) — отключение/включение звука, \n' +
        '6) Клавиша Стрелка вверх — увеличение громкости, \n' +
        '7) Клавиша Стрелка вниз — уменьшение громкости, \n' +
        '8) Клавиша F — включение/выключение полноэкранного режима, \n' +
        '9) Клавиша > — ускорение воспроизведения ролика, \n' +
        '10) Клавиша < — замедление воспроизведения ролика, \n' +
        '11) Клавиша / - стандартная скорость воспроизведения ролика,')
}