import * as Clock from './clock.js';
import * as Greeting from './greeting.js';
import * as Wallpapers from './wallpapers.js';
import * as Weather from './weather.js';

localStorage.setItem('lang', 'en'); // TODO replace debug value
localStorage.setItem('imgSource', 'git'); // TODO replace debug value

Clock.init();

Greeting.init();

Wallpapers.init();

Weather.init();

//TODO rewrite with using  custom EventS!!!!!!! (changeLang and Time)