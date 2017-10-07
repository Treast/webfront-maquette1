export default class BikeTemplate {
    static render(data) {
        let html = `
            <li class="bestsellers-list__li" data-price="${data.price}" data-name="${data.title}" ${"stock" in data ? "data-stock=\"" + data.stock + "\"" : null} ${"popularity" in data ? "data-popularity=\"" + data.popularity + "\"" : null}>
                <article class="bestseller ${data.stock < 3 ? "bestseller--danger" : ''}">
                    <a href="#">
                        <div class="bestseller__image">
                            <img src="${data.image}" alt="Image de vélo">
                        </div> 
                        <h1 class="bestseller__title">${data.title}</h1>
                        <p class="bestseller__description">${data.description}</p>
                        <div class="bestseller-footer">
                            <p class="bestseller-footer__stock">${data.stock} en stock</p>
                            <div class="bestseller-footer__bar"></div>
                        </div>
                    </a>
                </article>
            </li>
        `;

        let template = document.createElement('div');
        template.innerHTML = html;
        return template.childNodes[1];
    }
}