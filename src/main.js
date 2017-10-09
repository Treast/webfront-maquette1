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

let header = document.querySelector('header');
let burgerMenu = header.querySelector('header .header__burger');
let overlay = document.querySelector('.overlay');
burgerMenu.addEventListener('click', () => {
    header.classList.add('header__opened');
    overlay.style.display = "block";
    document.querySelector('body').style.overflowY = 'hidden';
    TweenMax.to(header.querySelector('.header__navs'), 0.4, {
        x: 0
    });
    TweenMax.to(overlay, 0.4, {
        alpha: 0.8
    });
});

overlay.addEventListener('click', () => {
    header.classList.remove('header__opened');
    TweenMax.to(header.querySelector('.header__navs'), 0.4, {
        x: -1 * header.getBoundingClientRect().width
    });
    TweenMax.to(document.querySelector('.overlay'), 0.4, {
        alpha: 0,
        onComplete: () => {
            overlay.style.display = "none";
            document.querySelector('body').style.overflowY = 'auto';
        }
    });
});