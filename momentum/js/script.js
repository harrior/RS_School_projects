import * as Clock from './clock.js';
import * as Greeting from './greeting.js';

localStorage.setItem('lang', 'en'); // TODO replace debug value
Clock.init();

Greeting.init();

//TODO rewrite with using  custom EventS!!!!!!! (changeLang and Time)