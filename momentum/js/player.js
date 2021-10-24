export default class Player {
    constructor() {
        this.player = document.querySelector('#player');
        this.currentSongText = document.querySelector('.player-current-song');
        this.prevBtn = document.querySelector('.play-prev');
        this.nextBtn = document.querySelector('.play-next');
        this.playBtn = document.querySelector('.play');
        this.muteBtn = document.querySelector('.mute');
        this.progressBar = document.querySelector('.player-progress');
        this.volumeBar = document.querySelector('.player-volume');
        this.playerTime = document.querySelector('.player-time')
        this.playlistItems = []

        this.progress = 0;

        this.playlist = [];
        this.currentSong = 0;

        this.setListeners();
    }

    setListeners() {
        // Click on play button
        this.playBtn.addEventListener('click', () => {
            this.playToggle()
        })

        // Click on mute button
        this.muteBtn.addEventListener('click', () => {
            this.mute()
        })

        // Change current play progress
        this.progressBar.addEventListener('input', () => {
            this._setPlayProgress(this.progressBar.value)
        })
        // Update position of progress bar while playing
        this.player.addEventListener('timeupdate', () => {
            this._updatePlayingTime();
            this._updateBarPosition(this.progressBar, 100 / this.player.duration * this.player.currentTime);
        })

        // autoplay
        this.player.addEventListener('ended', () => {
            this.nextSong()
        })

        // update audio duration
        this.player.addEventListener('loadedmetadata', () => {
            this._updatePlayingTime()
        })

        // next and previous buttons
        this.nextBtn.addEventListener('click', () => {
            this.nextSong()
        })
        this.prevBtn.addEventListener('click', () => {
            this.prevSong()
        })

        // change volume level
        this.volumeBar.addEventListener('input', () => {
            const level = +this.volumeBar.value;
            if (level === 0) {
                this.mute()
            } else {
                this.mute()
                this._setVolumeLevel(level);
            }
        })

        // Set start position of bars after loading page
        window.addEventListener('load', () => {
            this._updateBarPosition(this.progressBar, this.progress);
            this._setVolumeLevel(50)
        })
    }

    _updatePlayingTime() {
        const prepareTime = time => String(Math.floor(time) || 0).padStart(2, '0')

        const curMin = prepareTime(this.player.currentTime / 60);
        const curSec = prepareTime(this.player.currentTime % 60);
        const totalMin = prepareTime(this.player.duration / 60);
        const totalSec = prepareTime(this.player.duration % 60);
        this.playerTime.textContent = `[${curMin}:${curSec} / ${totalMin}:${totalSec}]`
    }

    _setVolumeLevel(level) {
        level = +level;
        level = level > 100 ? 100 : level < 0 ? 0 : level;

        if (level === 0)
            this._muteOn();
        else
            this._muteOff()

        this.player.volume = level / 100;
        this._updateBarPosition(this.volumeBar, level)
    }

    _setPlayProgress(position) {
        position = +position;
        position = position > 100 ? 100 : position < 0 ? 0 : position;
        this.player.currentTime = this.player.duration / 100 * position;
        this._updateBarPosition(this.progressBar, position);
    }

    loadPlaylist(playlist) {
        this.playlist = playlist

        const playlistContainer = document.querySelector('.play-list')

        for (let item of playlist) {
            let playlistItem = document.createElement('div')
            playlistItem.classList.add('play-item')
            playlistItem.textContent = item.title
            playlistContainer.appendChild(playlistItem);
            this.playlistItems.push(playlistItem);
        }

        this._selectSong(0)
    }

    _updatePlaylistItems() {
        for (let i = 0; i < this.playlistItems.length; i++) {
            let item = this.playlistItems[i];
            if (i === this.currentSong)
                item.classList.add('item-active')
            else
                item.classList.remove('item-active')
        }
    }

    _selectSong(position) {
        this.currentSong = position;
        this.player.src = this.playlist[position]['src']

        this._updatePlaylistItems()

        this.currentSongText.textContent = this.playlist[this.currentSong]['title']

        this.player.load()
        this._updatePlayingTime()
    }

    nextSong() {
        const next = this.currentSong + 1 === this.playlist.length ? 0 : this.currentSong + 1;
        this._selectSong(next)
        this.play()
    }

    prevSong() {
        const prev = this.currentSong - 1 < 0 ? this.playlist.length - 1 : this.currentSong - 1;
        this._selectSong(prev)
        this.play()
    }

    play() {
        this.player.play();
        this.playBtn.classList.add('pause');
    }

    pause() {
        this.player.pause()
        this.playBtn.classList.remove('pause')
    }

    playToggle() {
        if (this.player.paused) {
            this.play();
        } else {
            this.pause()
        }
    }

    mute() {
        if (this.player.muted) {
            this._muteOff()
        } else {
            this._muteOn()
        }
    }

    _muteOn() {
        this.player.muted = true;
        this.muteBtn.classList.add('mute-on')
    }

    _muteOff() {
        this.player.muted = false;
        this.muteBtn.classList.remove('mute-on')
    }

    _updateBarPosition(bar, position) {
        position = Math.floor(position);
        position = isNaN(position) ? 0 : position;
        bar.style.background = `linear-gradient(to right, #FFFFFF 0%, #FFFFFF ${position}%, #909090 ${position}%, #909090 100%)`;
        bar.value = position;
    }
}