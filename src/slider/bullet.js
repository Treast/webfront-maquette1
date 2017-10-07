import BUS from '../core/BUS';
import BulletTemplate from '../templates/bullet-template'

export default class Bullet {
    constructor(index, data) {
        this.index = index;
        this.data = data;
    }

    /**
     * Créer un bulle pour le slider
     *
     * @returns {Element} Node de la bulle
     */
    createHTML() {
        this.el = BulletTemplate.render({ index: this.index });
        this.el.addEventListener('click', (e) => this.clicked(e));

        return this.el;
    }

    /**
     * On lance l'évènement 'bullet:clicked' sur le BUS afin que le Slider l'intercepte
     *
     * @param e Évènement MouseClicked
     */
    clicked(e) {
        e.preventDefault();
        BUS.dispatch('bullet:clicked', {
            el: this.el,
            index: this.index
        });
    }
}