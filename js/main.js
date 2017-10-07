function ready() {
    var BUS = {
        el : document.createElement('div'),

        dispatch: function(e, datas){

            var event = new CustomEvent(e, datas || {});
            this.el.dispatchEvent(event);
        },

        listen: function(e, method, scop){

            this.el.addEventListener(e, method.bind(scop));
        }
    };

    var Bullet = function(index, data) {
        this.index = index;
        this.data = data;
    };

    Bullet.prototype.createHTML = function() {
        var li = document.createElement('li');
        li.classList.add('preview__li');

        var link = document.createElement('a');
        link.href = "#";

        var div = document.createElement('div');
        div.classList.add('preview__image');
        div.classList.add('preview__image--image-' + (this.index + 1));

        if(this.index === 0)
            div.classList.add('preview__image--active');

        link.appendChild(div);
        li.appendChild(link);

        this.el = li;
        this.el.addEventListener('click', this.clicked.bind(this));

        return li;
    };

    Bullet.prototype.clicked = function(e) {
        e.preventDefault();
        BUS.dispatch('bullet:clicked', {
            detail: {
                el: this.el,
                index: this.index
            }
        });
    };

    var SliderItem = function(index, data) {
        this.index = index;
        this.data = data;
    };

    SliderItem.prototype.createHTML = function() {
        var li = document.createElement('li');
        li.setAttribute('data-id', this.index);

        var article = document.createElement('article');
        article.classList.add('new-bikes__bike');

        if(this.index > 0)
            article.classList.add('new-bikes__bike--hidden');

        var divImage = document.createElement('div');
        divImage.classList.add('bike__image');

        var image = document.createElement('img');
        image.src = this.data.image;


        var divDescription = document.createElement('div');
        divDescription.classList.add('bike__description');

        var title = document.createElement('h1');
        title.classList.add('bike__title');
        title.innerText = this.data.title;

        var description = document.createElement('p');
        description.classList.add('bike__text');
        description.innerText = this.data.description;

        var link = document.createElement('a');
        link.classList.add('bike__btn');
        link.href = this.data.url;
        link.innerHTML = "commander <span class=\"caret caret-right bike__caret\"></span>";

        divDescription.appendChild(title);
        divDescription.appendChild(description);
        divDescription.appendChild(link);

        divImage.appendChild(image);

        article.appendChild(divImage);
        article.appendChild(divDescription);

        li.appendChild(article);

        this.el = li;

        return li;
    };

    SliderItem.prototype.createPreview = function() {
        var li = document.createElement('li');
        li.classList.add('preview__li');

        var link = document.createElement('a');
        link.href = "#";

        var div = document.createElement('div');
        div.classList.add('preview__image');
        div.classList.add('preview__image--image-' + (this.index + 1));

        if(this.index === 0)
            div.classList.add('preview__image--active');

        link.appendChild(div);
        li.appendChild(link);

        return li;
    };

    var Slider = function(el) {
        this.el = el;
        this.slides = [];
        this.currentIndex = 0;
        this.init();
    };

    Slider.prototype.init = function () {
        this.previewUl = this.el.querySelector('.preview__ul');
        this.itemUl = this.el.querySelector('.new-bikes__ul');

        this.left = this.el.querySelector('.new-bikes__arrows--previous');
        this.right = this.el.querySelector('.new-bikes__arrows--next');

        this.listen();
    };

    Slider.prototype.loadContent = function() {
        var req = new XMLHttpRequest();
        req.open('GET', "./slides.json", true);
        req.addEventListener('readystatechange', this.loaded.bind(this, req));
        req.send();
    };

    Slider.prototype.loaded = function(req) {
        if(req.readyState == XMLHttpRequest.DONE && req.status == 200) {
            this.createHTMLStructure(JSON.parse(req.responseText));
        }
    };

    Slider.prototype.listen = function() {
        this.left.addEventListener('click', this.clicked.bind(this, -1));
        this.right.addEventListener('click', this.clicked.bind(this, 1));
        BUS.listen('bullet:clicked', this.clicked, this);
    };

    Slider.prototype.clicked = function(direction) {
        var sequence = new TimelineMax();
        var slideEl = this.slides[this.currentIndex].el;
        var image = slideEl.querySelector('img');
        var description = slideEl.querySelector('.bike__description');

        if(direction instanceof Event) {
            var next = direction.detail.index;
            var d = (this.currentIndex < next) ? 1 : -1;
        } else {
            var next = (this.currentIndex + direction + this.slides.length) % this.slides.length;
            var d = direction;
        }

        if(this.currentIndex !== next) {
            var nextSlide = this.slides[next].el;
            var imageNext = nextSlide.querySelector('img');
            var descriptionNext = nextSlide.querySelector('.bike__description');

            if (!TweenMax.isTweening(image)) {
                sequence.set('.bike__image', {backfaceVisibility: "hidden"});

                sequence.to(image, 0.6, {
                    rotationY: 90 * d,
                    z: 300,
                    ease: Back.easeIn.config(1.7),
                    onComplete: function () {
                        nextSlide.querySelector('.new-bikes__bike').classList.remove('new-bikes__bike--hidden');
                        slideEl.querySelector('.new-bikes__bike').classList.add('new-bikes__bike--hidden');
                        this.previewUl.querySelector('.preview__image--active').classList.remove('preview__image--active');
                        this.previewUl.querySelectorAll('.preview__image')[next].classList.add('preview__image--active');
                    }.bind(this)
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
                    onComplete: function () {
                        image.style.transform = null;
                        this.currentIndex = next;
                    }.bind(this)
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
    };

    Slider.prototype.createHTMLStructure = function(data) {
        var i = 0;
        var l = data.length;

        for(i; i < l; i++) {
            this.slides[i] = new SliderItem(i, data[i]);
            this.itemUl.appendChild(this.slides[i].createHTML());
            //this.previewUl.appendChild(this.slides[i].createPreview());
            var bullet = new Bullet(i, data[i]);
            this.previewUl.appendChild(bullet.createHTML());
        }
    };

    var slider = new Slider(document.querySelector('.new-bikes__container'));

    slider.loadContent();

}

if(document.readyState != 'loading') {
    ready();
} else {
    document.addEventListener('DOMContentLoaded', ready);
}