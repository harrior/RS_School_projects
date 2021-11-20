import * as Quiz from './quiz.js'

function createCategory(id, result, type) {
  const category = document.createElement('div')
  category.classList.add('cat');
  category.dataset.id = String(id);
  category.dataset.fail = String(id);
  category.dataset.type = type;

  const image = document.createElement('img');
  image.src = `assets/img/${+id * 10}.jpg`;
  image.classList.add('cat-image')
  if (+result === 0) {
    image.classList.add('cat-image-gray')
  }
  category.append(image)

  if (+result > 0) {
    const p = document.createElement('p')
    p.classList.add('cat-text')
    p.innerText = `${result}/10`
    category.append(p)
    p.addEventListener('click', (evt)=>{
      document.location = `#results$1$${evt.target.parentNode.dataset.id}`
      evt.stopPropagation()
    })
  }

  category.addEventListener('click', evt => {
    document.activeQuiz = new Quiz.Quiz(evt.target.parentNode.dataset.id, 1);
    document.location = '#quiz'
  })

  return category;
}

function init() {
  let container = document.querySelector('.category');
  const quizzes = JSON.parse(localStorage.getItem('results'));
  for (let i in quizzes.artists) {
    container.append(createCategory(i, quizzes.artists[i].solved, "artists"));
  }
}

init()
