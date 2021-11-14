class Settings {
  constructor() {
    this.mute = false;
    this.volume = 50;
    this.timeLimit = false;
    this.quizInterval = 20;
  }

  setSettings(mute, volume, timeLimit, quizInterval) {
    this.mute = mute;
    this.volume = volume;
    this.timeLimit = timeLimit;
    this.quizInterval = quizInterval;
  }

  save() {
    localStorage.setItem('settings', JSON.stringify(this))
    console.log(this)
  }

  load() {
    const savedSettings = JSON.parse(localStorage.getItem('settings'))
    if (savedSettings) {
      this.mute = savedSettings.mute;
      this.volume = savedSettings.volume;
      this.timeLimit = savedSettings.timeLimit;
      this.quizInterval = savedSettings.quizInterval;
    }
    console.log(this)
  }
}

let settings = new Settings();
settings.load()
