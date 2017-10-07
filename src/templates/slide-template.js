export default class SliderTemplate {
    static render(data) {
        let html = `
            <li>
                <article class="new-bikes__bike ${data.index == 0 ? null : "new-bikes__bike--hidden"}">
                    <div class="bike__image bike__image--preview${data.index + 1}">
                        <img src="${data.image}" alt="Image d'une selle de vélo">
                    </div>
                    <div class="bike__description">
                        <h1 class="bike__title">${data.title}</h1>
                        <p class="bike__text">${data.description}</p>
                        <a href="${data.url}" class="btn bike__btn">commander <span class="caret caret-right bike__caret"></span></a>
                    </div>
                </article>
            </li>
        `;

        let template = document.createElement('div');
        template.innerHTML = html;
        return template.childNodes[1];
    }
}