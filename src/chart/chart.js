export default class Chart {
    constructor(el) {
        this.el = el;
        this.config = this.config();
        this.ctx = this.el.getContext('2d');
    }

    init() {
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = this.config.canvas.color;
        this.ctx.fillRect(0, 0, this.el.width, this.el.height);
        this.ctx.save()
    }

    config() {
        return {
            canvas: {
                color: "#ff3f0c"
            },
            circle: {
                radius: 4.5,
                color: "#0cff54"
            },
            square: {
                length: 8,
                color: "#ffffff"
            },
            triangle: {
                length: 9,
                color: "#170cff"
            },
            axis: {
                stroke: "rgba(255, 255, 255, 0.3)"
            },
            text: {
                font: "bold 12px Arial",
                color: "#ffffff"
            },
            legend: {
                font: "9.5px Arial",
                color: "#ffffff"
            }
        }
    }

    drawCircle(x, y) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.config.circle.radius, 0, 2*Math.PI);
        this.ctx.fillStyle = this.config.circle.color;
        this.ctx.fill();
    }

    drawSquare(x, y) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + this.config.square.length, y);
        this.ctx.lineTo(x + this.config.square.length, y + this.config.square.length);
        this.ctx.lineTo(x, y + this.config.square.length);
        this.ctx.closePath();
        this.ctx.fillStyle = this.config.square.color;
        this.ctx.fill();
    }

    drawTriangle(x, y) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + this.config.triangle.length, y);
        this.ctx.lineTo(x + this.config.triangle.length / 2, y - Math.sqrt(3) * this.config.triangle.length / 2);
        this.ctx.closePath();
        this.ctx.fillStyle = this.config.triangle.color;
        this.ctx.fill();
    }

    drawAxis() {
        let y = 0;
        this.ctx.strokeStyle = this.config.axis.stroke;
        for(let i = 0; i < 7; i++) {
            y += 30;
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineWidth = 1;
            this.ctx.lineTo(this.el.width, y);
            this.ctx.stroke();
        }
    }

    drawText(x, text) {
        this.ctx.font = this.config.text.font;
        this.ctx.fillStyle = this.config.text.color;
        this.ctx.fillText(text, x, 241);
    }

    drawSmallText(x, text) {
        this.ctx.font = this.config.legend.font;
        this.ctx.fillStyle = this.config.legend.color;
        this.ctx.fillText(text, x, 294);
    }

    drawCurve() {
        this.ctx.beginPath();
        this.ctx.moveTo(111, 82);
        this.ctx.quadraticCurveTo(183, 21, 248, 34);
        this.ctx.quadraticCurveTo(283, 37, 336, 114);
        this.ctx.quadraticCurveTo(420, 230, 481, 148);
        this.ctx.quadraticCurveTo(566, 39, 657, 142);
        this.ctx.lineTo(709, 179);
        this.ctx.lineTo(709, 210);
        this.ctx.lineTo(111, 210);
        this.ctx.closePath();
        this.ctx.moveTo(111, 82);
        let gradient = this.ctx.createLinearGradient(0, 0, 598, 0);
        gradient.addColorStop(0, "#ff3f0c");
        gradient.addColorStop(0.08, "#d8350a");
        gradient.addColorStop(0.91, "#d8350a");
        gradient.addColorStop(1, "#ff3f0c");
        this.ctx.fillStyle = gradient;
        this.ctx.translate(111, 82);
        this.ctx.fill();
    }

    render() {
        this.init();

        this.drawCurve();

        this.ctx.restore();

        this.drawCircle(106, 182);
        this.drawCircle(260, 123);
        this.drawCircle(413, 62);
        this.drawCircle(327, 290);
        this.drawCircle(568, 122);
        this.drawCircle(723, 92);

        this.drawTriangle(256, 96);
        this.drawTriangle(384, 294);
        this.drawTriangle(564, 67);

        this.drawText(82, "octobre");
        this.drawText(231, "novembre");
        this.drawText(389, "décembre");
        this.drawText(549, "janvier");
        this.drawText(705, "février");

        this.drawSquare(469, 286);

        this.drawSmallText(337, "ventes");
        this.drawSmallText(398, "commandes");
        this.drawSmallText(482, "stock");

        this.drawAxis();
    }
}