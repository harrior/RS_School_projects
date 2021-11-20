import images from './images.js'

export class Quiz {
  constructor(startId, type) {
    this.id = startId;
    this.type = type; // 1 - Artists, 2 - Pictures
    this._tasks = Array(10).fill().map((element, index) => index + startId * 10).map(item => new Task(images, item))
    this.current = this._tasks.shift()
    this.solved = 0;
    this.solvedArray = [null, null, null, null, null, null, null, null, null, null]
    this.count = 0;
  }

  isFinished() {
    return this._tasks.every(task => task.solved())
  }

  getTask() {
    if (this._tasks.length === 0) {
      return null
    }
    if (this?.current.solved) {
      this.current = this._tasks.shift()
    }
    return this.current.getTask();
  }

  getResult() {
    return this.solved;
  }

  checkSolve(id) {
    this.count += 1;
    const result = this.current.checkAnswer(id);
    this.solved += Number(result);
    this.solvedArray[this.count - 1] = result;
    // console.log(this.solvedArray)
    return result;
  }
}

export class Task {
  constructor(images, id) {
    this._id = id;
    this._task = images[id];
    this._solved = false;
    this._correct = false;
  }

  get solved() {
    return this._solved;
  }

  get correct() {
    return this._correct;
  }

  _generateAnswers() {
    let answers = [this._task]
    l: while (answers.length !== 4) {
      let id = Math.floor(Math.random() * images.length);
      for (let i = 0; i < answers.length; i++) {
        if ((this._id === id) || (answers[i].author === images[id].author)) {
          continue l;
        }
      }

      answers.push(images[id])
    }
    return answers;
  }

  getTask() {
    return {
      'task': this._task,
      'answers': this._generateAnswers().sort(() => Math.random() - 0.5),
    }
  }

  checkAnswer(id) {
    this._solved = true;
    this._correct = Number(id) === this._id;
    return this.correct;
  }
}


export class quizResults {
  constructor() {
    this.artists = {}
    this.pictures = {}
    this._fill()
  }

  _fill() {
    const countCategories = Math.floor(images.length / 10) - 1
    for (let i = 0; i <= countCategories; i++) {
      this.artists[i] = {
        solved: 0,
        arr: [0,0,0,0,0,0,0,0,0,0],
      };
      this.pictures[i] = {
        solved: 0,
        arr: [0,0,0,0,0,0,0,0,0,0],
      };
    }
  }
}

if (localStorage.getItem('results') === null) {
  localStorage.setItem('results', JSON.stringify(new quizResults()));
}
