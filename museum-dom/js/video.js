// init control components
const player = document.querySelector('.player');

const playerVideo = player.querySelector('.player__video');

const playerProgress = player.querySelector('.player__progress');
const playerVolume = player.querySelector('.player__volume');

const playerPlayButton = player.querySelector('.player__play');
const playerMuteButton = player.querySelector('.player__mute');
const playerScreenPlayButton = player.querySelector('.player__screen-button');
const playerFullscreenButton = player.querySelector('.player__fullscreen');

const playerScreenText = player.querySelector('.player__screen-text')

const playlistItems = document.querySelectorAll('.playlist__video')

let volumeLevel = Number(playerVolume.value);
let playbackRate = 100;

const playerVideos = {
    '1': {'file': 'assets/video/video0.mp4', 'poster': 'assets/video/poster0.jpg'},
    '2': {'file': 'assets/video/video1.mp4', 'poster': 'assets/video/poster1.jpg'},
    '3': {'file': 'assets/video/video2.mp4', 'poster': 'assets/video/poster2.jpg'},
    '4': {'file': 'assets/video/video3.mp4', 'poster': 'assets/video/poster3.jpg'},
    '5': {'file': 'assets/video/video4.mp4', 'poster': 'assets/video/poster4.jpg'},
}

//load first video from playlist
let currentVideoNumber = 0
playerVideo.src = "assets/video/video0.mp4"
//playlistItems[currentVideoNumber].src;
playerVideo.load();

window.addEventListener('load', function () {
    updateBarPosition(playerProgress, playerProgress.value);
    updateBarPosition(playerVolume, playerVolume.value);
})

// Show help in console.log
help();

// set play\pause listeners
playerPlayButton.addEventListener('click', () => {
    switchPlayback();
})

playerScreenPlayButton.addEventListener('click', () => {
    switchPlayback();
})

playerVideo.addEventListener('click', () => {
    switchPlayback();
})

playerVideo.addEventListener('ended', function () {
    stopPlayback();
})

// playback position listeners
playerProgress.addEventListener('input', function () {
    setVideoPosition(playerProgress.value)
})

playerVideo.addEventListener('timeupdate', function () {
    updateBarPosition(playerProgress, 100 / playerVideo.duration * playerVideo.currentTime);
})

// sound listeners
playerMuteButton.addEventListener('click', function () {
    switchMute();
})

playerVolume.addEventListener('input', function () {
    const level = Number(playerVolume.value);
    if (level === 0) {
        mute();
    } else {
        unmute();
        setVolumeLevel(level);
    }
})

// fullscreen listener
playerFullscreenButton.addEventListener('click', function () {
    switchFullscreen();
})

// keyboard listener
document.addEventListener('keydown', (e) => {
    const video = document.querySelector('#video').getBoundingClientRect();
    if ((document.fullscreenElement === player) || (
        (video.top - document.documentElement.clientHeight < 0) &&
        (video.bottom - document.documentElement.clientHeight > 0))
    ) {
        e.preventDefault()

        switch (e.key) {
            case ' ' :
                e.preventDefault();
                switchPlayback();
                break;
            case 'f':
            case 'F':
            case 'а':
            case 'А':
                switchFullscreen();
                break;
            case 'm':
            case 'M':
            case 'ь':
            case 'Ь':
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
            case ",":
                if (e.shiftKey) {
                    setPlaybackRate(playbackRate - 10);
                }
                break;
            case ">":
            case ".":
                if (e.shiftKey) {
                    setPlaybackRate(playbackRate + 10);
                }
                break;
            case "/":
                setPlaybackRate(100);
                break;
            case "p":
                playPreviousVideo();
                break;
            case "n":
                PlayNextVideo();
                break;
            default:
            // console.log(e)
        }
    }
})

// start/stop functions
function switchPlayback() {
    if (playerVideo.paused) {
        startPlayback();
    } else {
        stopPlayback();
    }
}

function startPlayback() {
    playerVideo.play();
    playerPlayButton.classList.add('player__pause');
    playerScreenPlayButton.style.display = 'none';
}

function stopPlayback() {
    playerVideo.pause();
    playerPlayButton.classList.remove('player__pause');
    playerScreenPlayButton.style.display = 'block';
}

// audio functions
function switchMute() {
    if (playerVideo.muted) {
        unmute();
    } else {
        mute();
    }
}

function mute() {
    playerVideo.muted = true;
    playerMuteButton.classList.add('player__mute__on');
}

function unmute() {
    playerVideo.muted = false;
    playerMuteButton.classList.remove('player__mute__on');
}

function setVolumeLevel(level) {
    level = Number(level);
    level = level > 100 ? 100 : level < 0 ? 0 : level;

    if (level === 0)
        mute();
    else
        unmute()

    volumeLevel = level;
    playerVideo.volume = level / 100;
    volumeLevel.value = level;
    updateBarPosition(playerVolume, level)
}

// video position functions
function setVideoPosition(position) {
    position = Number(position);
    position = position > 100 ? 100 : position < 0 ? 0 : position;

    playerVideo.currentTime = playerVideo.duration / 100 * position;

    updateBarPosition(playerProgress, position);
}

//fullscreen
function switchFullscreen() {
    if (document.fullscreenElement === player) {
        playerFullscreenButton.classList.remove('player__fullscreen__exit')
        playerVideo.classList.remove('player__video-fullscreen')
        document.exitFullscreen();
    } else {
        playerFullscreenButton.classList.add('player__fullscreen__exit')
        playerVideo.classList.add('player__video-fullscreen')
        player.requestFullscreen();
    }
}

// set playback speed
function setPlaybackRate(rate) {
    rate = Number(rate);
    rate = rate < 0 ? 0 : rate;
    playbackRate = rate;
    playerVideo.playbackRate = rate / 100;
    playerScreenText.style['opacity'] = '0.8'
    playerScreenText.textContent = `${rate / 100}x`
    setTimeout(() => {
        playerScreenText.style['opacity'] = '0'
    }, 1000)

}

// progress bar update
function updateBarPosition(bar, position) {
    position = Math.floor(position);
    position = isNaN(position) ? 0 : position;
    bar.style.background = `linear-gradient(to right, var(--progress-bar-full) 0%, var(--progress-bar-full) ${position}%, var(--progress-bar-empty) ${position}%, var(--progress-bar-empty) 100%)`;
    bar.value = position;
}

function help() {
    console.log('Привет!\n ' +
        'Реализован базовый функционал плеера + горячие клавиши + playlist\n' +
        'Управление плеером с клавиатуры: \n' +
        '1) клавиша Пробел — пауза, \n' +
        '2) Клавиша Home — переход в начало видео, \n' +
        '3) Клавиша End — переход в конец видео, \n' +
        '4) Клавиши 1-9 — переход к фрагментам видео в процентах 10-90%, \n' +
        '5) Клавиша M (англ) — отключение/включение звука, \n' +
        '6) Клавиша Стрелка вверх — увеличение громкости, \n' +
        '7) Клавиша Стрелка вниз — уменьшение громкости, \n' +
        '8) Клавиша F — включение/выключение полноэкранного режима, \n' +
        '9) Клавиша Shift + > — ускорение воспроизведения ролика, \n' +
        '10) Клавиша Shift + < — замедление воспроизведения ролика, \n' +
        '11) Клавиша / - стандартная скорость воспроизведения ролика,\n' +
        '12) Клавиша N - включить следующий ролик,\n' +
        '13) Клавиша P - включить предыдущий ролик')
}

//Playlist
function playVideoFromPlaylist(position) {
    playerVideo.src = playlistItems[position].src;
    playerVideo.load();
    stopPlayback()
    currentVideoNumber = position
}

function playPreviousVideo() {
    setSlide(currentSlide - 1)
    // let newNumber = currentVideoNumber - 1;
    // newNumber = newNumber < 0 ? 0 : newNumber;
    // playVideoFromPlaylist(newNumber);
}

function PlayNextVideo() {
    setSlide(currentSlide + 1 > 5 ? 1 : currentSlide + 1)
}

playlistItems.forEach((item) => {
    item.addEventListener('mouseover', () => {
        item.play();
    })
    item.addEventListener('mouseout', () => {
        item.pause();
    })
    item.addEventListener('click', () => {
        playVideoFromPlaylist(item.dataset.position);
    })
})
// Playlist

const playlistSlider = document.querySelector('.playlist__slider')
const playlistBullets = document.querySelectorAll('.playlist__item')
const playlistLeftButton = document.querySelector('.playlist__arrow-left')
const playlistRightButton = document.querySelector('.playlist__arrow-right')

let currentSlide = 1
let currentOffset = 0
let offset = -(452 + 42)


playlistBullets.forEach(item => {
    item.addEventListener('click', evt => {
        currentSlide = +evt.target.dataset.id
        setSlide(currentSlide)
    })
})

playlistLeftButton.addEventListener('click', evt => {
    setSlide(currentSlide - 1)
})
playlistRightButton.addEventListener('click', evt => {
    setSlide(currentSlide + 1 > 5 ? 1 : currentSlide + 1)
})

playlistSlider.addEventListener('transitionend', evt => {
    if (currentSlide === 5) {
        playlistSlider.style['transition'] = 'none';
        if (currentOffset < 0) {
            playlistSlider.style['transform'] = `translateX(0)`
        } else {
            playlistSlider.style['transform'] = `translateX(${offset * (5)}px)`
        }
    }

})

function setSlide(n) {
    currentSlide = n
    console.log(currentSlide)
    playlistSlider.style['transition'] = 'transform 0.5s linear';
    currentOffset = offset * (currentSlide)
    playlistSlider.style['transform'] = `translateX(${currentOffset}px)`

    currentSlide = currentSlide === 0 ? 5 : currentSlide

    playlistBullets.forEach(item => {
        item.classList.remove('playlist__item--checked')
    })
    playlistBullets[currentSlide - 1].classList.add('playlist__item--checked')

    playlistPauseAll()

    // load new video
    playerVideo.src = playerVideos[currentSlide].file
    playerVideo.load();
    stopPlayback()

    playerVideo.setAttribute('poster', playerVideos[currentSlide].poster);
}

// YouTube. Dynamical creation slides ans other stuff
const vidWrapper = document.querySelector('.playlist__slider')
const ytIDs = ['2OR0OCr6uRE', 'zp1BXPX8jcU', 'Vi5D6FKhRmo', 'NOhDysLnTvY', 'aWmJ5DgyWPI', '2OR0OCr6uRE', 'zp1BXPX8jcU', 'Vi5D6FKhRmo']
const ytPlayers = []

for (let i = 0; i < ytIDs.length; i++) {
    vidWrapper.appendChild(playlistCreateVideo(ytIDs[i], `YTplayer${i}`))
}

function playlistCreateVideo(divID, ytID) {
    let elWrap = document.createElement('div')
    elWrap.classList.add('playlist__preview')
    let player = document.createElement('div')
    player.setAttribute('id', ytID)
    let img = document.createElement('img')
    img.src = "assets/img/player/preview1.webp"
    elWrap.appendChild(player)
    elWrap.appendChild(img)
    return elWrap
}

function playlistPauseAll(except = '') {
    for (let i of ytPlayers) {
        if (except === i.h.id) {
            continue
        }
        i.pauseVideo()
    }
}

function onYouTubeIframeAPIReady() {
    for (let i = 0; i < ytIDs.length; i++) {

        let player = new YT.Player(`YTplayer${i}`, {
            videoId: ytIDs[i],
            playerVars: {
                'playsinline': 1
            },
            events: {
                'onStateChange': (evt) => {
                    if (evt.data === 1) {
                        playlistPauseAll(evt.target.h.id)
                    }
                }
            }
        });
        ytPlayers.push(player)
    }
}