import * as Settings from './settings.js'
import * as Clock from './clock.js';
import * as Greeting from './greeting.js';
import Slider from './slider.js';
import * as Weather from './weather.js';
import * as Quotes from './quotes.js';
import Player from './player.js';
import playList from "./playlist.js";
import ToDoList from "./todo.js"


Settings.init();
Clock.init();
Greeting.init();
const slider = new Slider();

const player = new Player();
player.loadPlaylist(playList);

const list = new ToDoList();
Weather.init();
Quotes.init();