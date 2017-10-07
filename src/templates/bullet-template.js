export default class BulletTemplate {
    static render(data) {
        let html = `
            <li class="preview__li">
                <a href="#">
                    <div class="preview__image ${data.index === 0 ? "preview__image--active" : null} preview__image--image-${data.index + 1}"></div>
                </a>
            </li>
        `;

        let template = document.createElement('div');
        template.innerHTML = html;
        return template.childNodes[1];
    }
}