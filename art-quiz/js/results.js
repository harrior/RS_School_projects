import images from "./images.js";
import * as Quiz from './quiz.js';
import {Task} from "./quiz.js";

function init() {
  addListenerClose();

  let [cat, num] = window.location.hash.split('$').slice(1)

  if ((cat === undefined) && (num === undefined)) {
    document.location = '#';
  } else {
    const results = JSON.parse(localStorage.getItem('results'));
    let answers;
    if (+cat === 1)
      answers = results['artists'][+num]
    else
      answers = results['pictures'][+num]

    let quiz = Array(10).fill().map((element, index) => index + num * 10).map(item => new Quiz.Task(images, item))

    const container = document.querySelector('.results')

    for (let i = 0; i < 10; i++) {
      let image = document.createElement('img')
      image.dataset.author = quiz[i]._task.author;
      image.dataset.name = quiz[i]._task.name;
      image.dataset.imageNum = quiz[i]._task.imageNum;
      image.dataset.year = quiz[i]._task.year;

      image.src = `assets/img/${image.dataset.imageNum}.jpg`;
      image.alt = quiz[i]._task.name;
      image.classList.add('answer')
      if (!answers.arr[i]) {
        image.classList.add('answer-gray')
      }
      container.append(image)

      image.addEventListener('click', evt => {
        showAnswer(evt.target)
      })
    }
  }
}

function showAnswer(image) {
  const answerForm = document.querySelector('.showAnswer');
  const answerImage = document.querySelector('.answer-image');
  const answerTitle = document.querySelector('.answer-title');
  const answerArtist = document.querySelector('.answer-artist');

  answerImage.src = image.src;
  answerTitle.textContent = image.dataset.name;
  answerArtist.textContent = `${image.dataset.author}, ${image.dataset.year}`;

  answerForm.style.display = 'flex';
}

function addListenerClose() {
  const answerButton = document.querySelector('.answer-button')
  answerButton.addEventListener('click', evt => {
    evt.target.parentNode.style.display = 'none';
  })
}

init()

