import Settings from './settings.js';
import * as Router from './router.js'

import * as Quiz from './quiz.js';
import images from "./images.js";

function init() {

  const router = new Router.Router([
    new Router.Route('main', 'main.html', true),
    new Router.Route('settings', 'settings.html'),
    new Router.Route('quiz', 'quiz.html'),
    new Router.Route('artists', 'artists.html'),
    new Router.Route('pictures', 'pictures.html'),
    new Router.Route('results', 'results.html'),
  ]);
  document.settings = new Settings();
  document.settings.load();
}

init();
