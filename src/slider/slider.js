import BUS from '../core/BUS';
import SliderItem from './slider-item';
import Bullet from './bullet';

export default class Slider {
    constructor(el) {
        this.el = el;
        this.slides = [];
        this.currentIndex = 0;
        this.init();
    }

    /**
     * On initialise le Slider
     */
    init() {
        this.previewUl = this.el.querySelector('.preview__ul');
        this.itemUl = this.el.querySelector('.new-bikes__ul');

        this.left = this.el.querySelector('.new-bikes__arrows--previous');
        this.right = this.el.querySelector('.new-bikes__arrows--next');

        this.listen();
    }

    /**
     * On charge en Ajax
     */
    loadContent() {
        let req = new XMLHttpRequest();
        req.open('GET', "./api/slides.json", true);
        req.addEventListener('readystatechange', () => this.loaded(req));
        req.send();
    }

    /**
     * Si la requète Ajax est un succès
     *
     * @param req Requête Ajax
     */
    loaded(req) {
        if(req.readyState == XMLHttpRequest.DONE && req.status == 200) {
            this.createHTMLStructure(JSON.parse(req.responseText));
        }
    }

    /**
     * On ajoute des EventListeners sur les flèches.
     */
    listen() {
        this.left.addEventListener('click', () => this.clicked(-1));
        this.right.addEventListener('click', () => this.clicked(1));
        BUS.listen('bullet:clicked', this.clicked, this);
    }

    /**
     * Au clic sur une flèche ou une bulle, on lance l'animation des slides.
     * @param direction
     */
    clicked(direction) {
        let sequence = new TimelineMax();
        let slideEl = this.slides[this.currentIndex].el;
        let image = slideEl.querySelector('img');
        let description = slideEl.querySelector('.bike__description');

        let next = (this.currentIndex + direction + this.slides.length) % this.slides.length;
        let d = direction;

        /**
         * Lors d'un clic sur une bulle, le paramètre est de type MouseClicked. Dans ce cas, on définit la direction
         * selon la slide de départ et celle d'arrivée.
         */
        if(direction instanceof Event) {
            next = direction.detail.index;
            d = (this.currentIndex < next) ? 1 : -1;
        }

        if(this.currentIndex !== next) {
            let nextSlide = this.slides[next].el;
            let imageNext = nextSlide.querySelector('img');
            let descriptionNext = nextSlide.querySelector('.bike__description');

            /**
             * Pas de SPAM !
             */
            if (!TweenMax.isTweening(image)) {
                sequence.set('.bike__image', {backfaceVisibility: "hidden"});

                sequence.to(image, 0.6, {
                    rotationY: 90 * d,
                    z: 300,
                    ease: Back.easeIn.config(1.7),
                    onComplete: () => {
                        nextSlide.querySelector('.new-bikes__bike').classList.remove('new-bikes__bike--hidden');
                        slideEl.querySelector('.new-bikes__bike').classList.add('new-bikes__bike--hidden');
                        this.previewUl.querySelector('.preview__image--active').classList.remove('preview__image--active');
                        this.previewUl.querySelectorAll('.preview__image')[next].classList.add('preview__image--active');
                    }
                });

                sequence.to(description, 0.6, {
                    opacity: 0,
                    scaleX: 0.5,
                    scaleY: 0.5,
                    ease: Back.easeIn.config(1.7)
                }, '-=0.6');

                sequence.set(imageNext, {
                    rotationY: 90 * -1 * d,
                    z: 300,
                }, 0.5);

                sequence.set(descriptionNext, {
                    opacity: 0,
                    scaleX: 0.5,
                    scaleY: 0.5
                }, 0.5);

                sequence.to(imageNext, 0.6, {
                    rotationY: 0,
                    z: 0,
                    ease: Back.easeOut.config(1.7),
                    onComplete: () => {
                        image.style.transform = null;
                        this.currentIndex = next;
                    }
                });

                sequence.to(descriptionNext, 0.6, {
                    opacity: 1,
                    scaleX: 1,
                    scaleY: 1,
                    ease: Back.easeOut.config(1.7)
                }, '-=0.6');

                sequence.play();
            }
        }
    }

    /**
     * On crée le contenu HTML pour chaque slide, ainsi que la bulle
     *
     * @param data Données récupérées en Ajax
     */
    createHTMLStructure(data) {
        data.forEach((element, index) => {
            this.slides[index] = new SliderItem(index, element);
            this.itemUl.appendChild(this.slides[index].createHTML());
            let bullet = new Bullet(index, element);
            this.previewUl.appendChild(bullet.createHTML());
        })
    }
}