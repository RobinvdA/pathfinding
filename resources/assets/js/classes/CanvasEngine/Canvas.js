import Rect from './Rect';

export default class Canvas {

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.nodeSize = 1;

        this.shapes = [];

        this._onClick = () => {};

        this.canvas.addEventListener('click', this._clicked.bind(this), false);

        this.continue = true;

        this._loop();
    }

    stop() {
        this.continue = false;
    }

    addShape(shape) {
        this.shapes.push(shape.context(this.ctx).canvas(this));
    }

    _clicked(e) {
        let x = Math.floor((e.clientX - this.canvas.getBoundingClientRect().left) / this.nodeSize);
        let y = Math.floor((e.clientY - this.canvas.getBoundingClientRect().top) / this.nodeSize);

        this._onClick(x, y);
    }

    _loop() {
        this._draw();

        setTimeout(() => {
            if (this.continue) this._loop();
        }, 16);
    }

    _draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.shapes.forEach((shape) => {

            if (shape.theta != null) shape.move();

            shape.render();

        });
    }
}