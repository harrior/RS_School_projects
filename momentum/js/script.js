import * as Settings from './settings.js'
import * as Clock from './clock.js';
import * as Greeting from './greeting.js';
import Slider from './slider.js';
import * as Weather from './weather.js';
import * as Quotes from './quotes.js'

Settings.init();
Clock.init();
Greeting.init();
const slider = new Slider();
Weather.init();
Quotes.init();
