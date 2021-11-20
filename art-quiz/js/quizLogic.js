// Task.
import {quizResults} from "./quiz.js";

function createTaskForm(type, task) {
  const question = createQuestion(type, task);
  const answers = createAnswers(type, task);
  const container = document.querySelector('.task');

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  container.append(question);
  container.append(answers);
  updateProgressbar()
  updateAnswerForm(task)
}

function createQuestion(type, task) {
  const question = document.createElement('div');
  question.classList.add('question');
  question.classList.add('artists');

  const questionText = document.createElement('span');
  question.append(questionText);

  if (type === 1) {
    const artist = task.task.author;
    questionText.textContent = `Какую картину написал ${artist}?`;
  } else {
    questionText.textContent = 'Кто автор этой картины?';
    const image = document.createElement('img');
    image.src = `assets/img/${task.task.imageNum}.jpg`;
    question.append(image);
  }
  return question;
}

function createAnswers(type, task) {
  const answers = document.createElement('div');
  answers.classList.add('answers');
  // answers.classList.add('artists');

  for (let i = 0; i < 4; i++) {
    let answer = document.createElement('button');
    answer.dataset.id = String(task.answers[i].imageNum);
    if (type === 1) {
      answer.classList.add('artists');
      let image = document.createElement('img');
      image.src = `assets/img/${task.answers[i].imageNum}.jpg`;
      answer.append(image)
    } else {
      // answer.classList.add('picture');
      answer.classList.add('btn');
      answer.textContent = task.answers[i].author;
    }
    answer.addEventListener('click', checkAnswer)
    answers.append(answer);
  }

  return answers;
}

function updateProgressbar() {
  const counterList = document.querySelector('.counter-list');
  let j = 0;
  console.log(document.activeQuiz.solvedArray)
  for (let li of counterList.children) {
    li.classList.remove('counter-false')
    li.classList.remove('counter-true')
    if (document.activeQuiz.solvedArray[j] === null)
      continue
    if (document.activeQuiz.solvedArray[j] === true) {
      li.classList.add('counter-true')
    } else if (document.activeQuiz.solvedArray[j] === false) {
      li.classList.add('counter-false')
    }
    j++;
  }
}

// Results


// Answer form
function updateAnswerForm(task) {
  const answerImage = document.querySelector('.answer-image');
  const answerTitle = document.querySelector('.answer-title');
  const answerArtist = document.querySelector('.answer-artist');
  answerImage.src = `assets/img/${task.task.imageNum}.jpg`;

  answerTitle.textContent = task.task.name;
  answerArtist.textContent = `${task.task.author}, ${task.task.year}`;
}

function showAnswerForm(result) {
  const answerIcon = document.querySelector('.answer-icon');
  const answerForm = document.querySelector('.showAnswer')

  if (result) {
    answerIcon.src = 'assets/svg/win.svg'
  } else {
    answerIcon.src = 'assets/svg/fail.svg'
  }

  answerForm.style.display = 'flex'
}

function hideAnswerForm() {
  const answerForm = document.querySelector('.showAnswer');
  answerForm.style.display = 'none';
}

// Check answer
function checkAnswer(evt) {
  const answer = evt.target.dataset.id || evt.target.parentNode.dataset.id;
  const result = document.activeQuiz.checkSolve(answer);
  showAnswerForm(result);
}

// entry point
function init() {
  try {
    document.activeQuiz.type;
  } catch (err) {
    document.location = '#';
  }
  createTaskForm(document.activeQuiz.type, document.activeQuiz.getTask())

  const nextButton = document.querySelector('.answer-button');
  nextButton.addEventListener('click', function (evt) {
    hideAnswerForm()
    const nextTask = document.activeQuiz.getTask();
    if (nextTask !== null) {
      createTaskForm(document.activeQuiz.type, nextTask);
    } else {
      //finish
      const finish = document.querySelector('.finish')
      const finishRate = document.querySelector('.finish-rate')
      const finishNext = document.querySelector('.finish-next')
      finish.style.display = 'flex';
      finishRate.textContent = `${document.activeQuiz.solved}/10`;

      //save results
      let results = JSON.parse(localStorage.getItem('results'))
      let cat;
      if (+document.activeQuiz.type === 1){
        cat = 'artists'
      } else {
        cat = 'pictures'
      }
      results[cat][document.activeQuiz.id].solved = document.activeQuiz.solved;
      for (let i=0; i<10; i++){
        results[cat][document.activeQuiz.id].arr[i] = document.activeQuiz.solvedArray[i];
      }
      // if (localStorage.getItem('results') === null) {
      localStorage.setItem('results', JSON.stringify(results));

      finishNext.addEventListener('click', evt => {
        if (document.activeQuiz.type === 1)
          document.location = '#artists';
        else
          document.location = '#pictures';
      })

    }
  });

  const stopQuizBtn = document.querySelector('.exitButton')
  stopQuizBtn.addEventListener('click', () => {
    const stopQuiz = document.querySelector('.stopQuiz');
    stopQuiz.style.display = 'flex';
  })
  const stopQuizCancel = document.querySelector('.stopQuiz-cancel');
  stopQuizCancel.addEventListener('click', () => {
    const stopQuiz = document.querySelector('.stopQuiz');
    stopQuiz.style.display = 'none';
  })
  const stopQuizYes = document.querySelector('.stopQuiz-yes');
  stopQuizYes.addEventListener('click', () => {
    document.location = '#'
  })
}

// init
init();