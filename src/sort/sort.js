import Bike from "./bike";

export default class Sort {
    constructor(element) {
        this.el = element;
        this.bikes = [];

        if(this.el.querySelector('.bestseller__search'))
            this.searchInput = this.el.querySelector('.bestseller__search');
    }

    loadContent(url) {
        let req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.addEventListener('readystatechange', () => this.loaded(req));
        req.send();
    }

    loaded(req) {
        if(req.readyState == XMLHttpRequest.DONE && req.status == 200) {
            this.createHTMLStructure(JSON.parse(req.responseText));
        }
    }

    createHTMLStructure(data) {
        data.forEach((element, index) => {
            let bike = new Bike(index, element);
            this.bikes.push(bike);
            this.el.querySelector('ul.bestsellers-list').appendChild(bike.createHTML());
        });

        this.listen();
    }

    listen() {
        this.el.querySelector('form.bestsellers__form select').addEventListener('change', () => this.selectChanged());

        if(this.searchInput)
            this.searchInput.addEventListener('input', () => this.searchChanged());
    }

    searchChanged() {
        let list = this.el.querySelector('ul.bestsellers-list');

        TweenMax.to(list, 0.5, {
            alpha: 0,
            onComplete: () => {
                list.innerHTML = null;

                this.bikes.forEach((element) => {
                    if(element.el.innerHTML.toLowerCase().indexOf(this.searchInput.value.toLowerCase()) > -1)
                        list.appendChild(element.el);
                });

                TweenMax.to(list, 0.5, {
                    alpha: 1
                });
            }
        });
    }

    selectChanged() {
        let list = this.el.querySelector('ul.bestsellers-list');

        let sorter = "data-" + this.el.querySelector('form.bestsellers__form select').value;
        let bikes = [].slice.call(this.el.querySelectorAll('.bestsellers-list__li'));

        bikes.sort((a, b) => {
            return a.getAttribute(sorter) > b.getAttribute(sorter) ? 1 : -1;
        });

        TweenMax.to(list, 0.5, {
            alpha: 0,
            onComplete: () => {
                list.innerHTML = null;

                bikes.forEach((element) => {
                    list.appendChild(element);
                });

                TweenMax.to(list, 0.5, {
                    alpha: 1
                });
            }
        });
    }
}