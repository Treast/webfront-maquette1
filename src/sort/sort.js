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
        let bikes = [].slice.call(this.el.querySelectorAll('.bestsellers-list__li'));

        // TweenMax.to(list, 0.5, {
        //     alpha: 0,
        //     onComplete: () => {
        //         list.innerHTML = null;
        //
        //         this.bikes.forEach((element) => {
        //             if(element.el.innerHTML.toLowerCase().indexOf(this.searchInput.value.toLowerCase()) > -1)
        //                 list.appendChild(element.el);
        //         });
        //
        //         TweenMax.to(list, 0.5, {
        //             alpha: 1
        //         });
        //     }
        // });

        let sequence = new TimelineMax();

        sequence.fromTo(bikes, 0.2, {
            rotationY: 0,
            transformStyle: "preserve-3d"
        },{
            rotationY: 90,
            z: 100,
            onComplete: () => {
                list.innerHTML = null;

                this.bikes.forEach((element) => {
                    if(element.el.innerHTML.toLowerCase().indexOf(this.searchInput.value.toLowerCase()) > -1)
                        list.appendChild(element.el);
                });
            }
        });

        sequence.fromTo(bikes, 0.2, {
            rotationY: 270,
            z: 100
        }, {
            rotationY: 360,
            z: 0,
            onComplete: () => {
                bikes.forEach(element => {
                    element.style.transform = null;
                });
            }
        });
        sequence.play();
    }

    selectChanged() {
        let list = this.el.querySelector('ul.bestsellers-list');

        let sorter = "data-" + this.el.querySelector('form.bestsellers__form select').value;
        let bikes = [].slice.call(this.el.querySelectorAll('.bestsellers-list__li'));

        bikes.sort((a, b) => {
            return a.getAttribute(sorter) > b.getAttribute(sorter) ? 1 : -1;
        });

        let sequence = new TimelineMax();

        sequence.fromTo(bikes, 0.2, {
            rotationY: 0,
            transformStyle: "preserve-3d"
        },{
            rotationY: 90,
            z: 100,
            onComplete: () => {
                list.innerHTML = null;

                bikes.forEach((element) => {
                    list.appendChild(element);
                });
            }
        });


        sequence.fromTo(bikes, 0.2, {
            rotationY: 270,
            z: 100
        }, {
            rotationY: 360,
            z: 0,
            onComplete: () => {
                bikes.forEach(element => {
                    element.style.transform = null;
                });
            }
        });

        sequence.play();
    }
}