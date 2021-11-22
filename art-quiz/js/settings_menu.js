import Settings from './settings.js';

const volumeItem = document.querySelector('#volume');
const muteItem = document.querySelector('#mute');
const timeLimitItem = document.querySelector('#timeLimit');
const quizIntervalItem = document.querySelector('#quizInterval');
const defaultButton = document.querySelector('#default');
const saveButton = document.querySelector('#save');
updateSettings()

function updateSettings() {
  volumeItem.value = String(document.settings.volume);
  muteItem.checked = document.settings.mute;
  timeLimitItem.checked = document.settings.timeLimit;
  quizIntervalItem.value = String(document.settings.quizInterval);
}

defaultButton.addEventListener('click', () => {
  document.settings = new Settings();
  document.settings.save();
  updateSettings();
})

saveButton.addEventListener('click', () => {
  let volume = Number(volumeItem.value);
  let mute = muteItem.checked;
  let timeLimit = timeLimitItem.checked;
  let quizInterval = Number(quizIntervalItem.value);
  document.settings.setSettings(mute, volume, timeLimit, quizInterval)
  document.settings.save()
})