import Slider from './slider/slider';
import Sort from './sort/sort';


var slider = new Slider(document.querySelector('.new-bikes__container'));
slider.loadContent();

var sort1 = new Sort(document.querySelector('section.bestsellers'));
sort1.loadContent('./api/bestsellers.json');

var sort2 = new Sort(document.querySelector('section.all-bikes'));
sort2.loadContent('./api/all-modeles.json');
