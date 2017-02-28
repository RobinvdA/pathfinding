export default class Line {

    constructor(startX = 0, startY = 0, endX = 0, endY = 0) {
        this.width = 5;

        this.color = '#000';

        this.start = {
            x: startX,
            y: startY
        };

        this.end = {
            x: endX,
            y: endY
        }
    }

    setStart(x, y) {
        this.start.x = x;
        this.start.y = y;

        return this;
    }

    setEnd(x, y) {
        this.end.x = x;
        this.end.y = y;

        return this;
    }

    setColor(color) {
        this.color = color;

        return this;
    }

    setWidth(width) {
        this.width = width;

        return this;
    }
}