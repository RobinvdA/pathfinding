import Shape from './Shape';

export default class Rect extends Shape {

    constructor(x, y, speed = 1, radius = 10) {
        this.x = x;
        this.y = y;
        this.radius = radius;

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

    bounds() {
        return {
            topLeft: { x: this.x - this.radius, y: this.y - this.radius },
            topRight: { x: this.x + this.radius, y: this.y - this.radius },
            bottomLeft: { x: this.x - this.radius, y: this.y + this.radius },
            bottomRight: { x: this.x + this.radius, y: this.y + this.radius },
        };
    }

    render() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = this.fillColor;
        this.ctx.fill();
        this.ctx.lineWidth = this.strokeWidth;
        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.stroke();
    }
}