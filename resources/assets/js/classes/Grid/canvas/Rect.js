export default class Rect {

    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;

        this.color = '#fff';
        this.stroke = '#ddd';
    }

    static create(x, y, size) {
        return new Rect(x, y, size);
    }

    setColor(color) {
        this.color = color;
        return this;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.size * this.x, this.size * this.y, this.size, this.size);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.stroke;
        ctx.stroke();
    }
}