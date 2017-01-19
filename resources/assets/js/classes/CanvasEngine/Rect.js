import Shape from './Shape';

export default class Rect extends Shape {

    constructor(x, y, speed = 1, height = 20, width = 20) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;

        this.fillColor = '#000';
        this.strokeColor = '#000';
        this.strokeWidth = 1;

        this.speed = speed;

        this.ctx = null;
    }

    color(color) {
        this.fillColor = color;

        return this;
    }

    stroke(color, width = 1) {
        this.strokeColor = color;
        this.strokeWidth = width;

        return this;
    }

    render() {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.height, this.width);
        this.ctx.fillStyle = this.fillColor;
        this.ctx.fill();
        this.ctx.lineWidth = this.strokeWidth;
        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.stroke();
    }
}