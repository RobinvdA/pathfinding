export default class Circle {

    constructor(x = 0, y = 0, radius = 1) {
        this.radius = radius;

        this.x = x;
        this.y = y;

        this.color = '#000';
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;

        return this;
    }

    setColor(color) {
        this.color = color;

        return this;
    }
}