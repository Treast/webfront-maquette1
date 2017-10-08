import Slider from './slider/slider';
import Sort from './sort/sort';
import Chart from './chart/chart';

let slider = new Slider(document.querySelector('.new-bikes__container'));
slider.loadContent();

let sort1 = new Sort(document.querySelector('section.bestsellers'));
sort1.loadContent('./api/bestsellers.json');

let sort2 = new Sort(document.querySelector('section.all-bikes'));
sort2.loadContent('./api/all-modeles.json');

let chart = new Chart(document.querySelector('section.charts canvas'));
chart.render();