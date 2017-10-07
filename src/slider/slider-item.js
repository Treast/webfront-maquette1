import SlideTemplate from '../templates/slide-template';

export default class SliderItem {
    constructor(index, data) {
        this.index = index;
        this.data = data;
    }

    createHTML() {
        this.el = SlideTemplate.render(Object.assign({ index: this.index }, this.data));
        return this.el;
    }
}