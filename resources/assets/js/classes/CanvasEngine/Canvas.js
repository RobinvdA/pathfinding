export default class Canvas {

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.nodeSize = 1;

        this.shapes = [];

        this.continue = true;

        this._loop();
    }

    stop() {
        this.continue = false;
    }

    addShape(shape) {
        this.shapes.push(shape.context(this.ctx));
    }

    _loop() {
        this._render();

        setTimeout(() => {
            if (this.continue) this._loop();
        }, 16);
    }

    _render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.shapes.forEach((shape) => {

            if (shape.theta != null) shape.move();

            shape.render();

        });
    }
}