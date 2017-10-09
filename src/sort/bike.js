import BikeTemplate from '../templates/bike-template';

export default class Bike {
    constructor(index, data) {
        this.index = index;
        this.data = data;
    }

    createHTML() {
        this.el = BikeTemplate.render(this.data);
        this.el.addEventListener('mouseenter', (e) => this.move(e));
        this.el.addEventListener('mouseleave', (e) => this.reset(e));
        return this.el;
    }

    move(e) {
        TweenMax.to(this.el, 0.4, {
            scaleX: 1.05,
            scaleY: 1.05
        });
    }

    reset(e) {
        TweenMax.to(this.el, 0.4, {
            scaleX: 1,
            scaleY: 1
        });
    }
}