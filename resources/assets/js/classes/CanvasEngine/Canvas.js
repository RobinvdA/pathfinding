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

        let stopMoving = false;
        let s = [];
        let oldX = 0;
        let oldY = 0;

        this.shapes.forEach((shape, index) => {

            if (shape.theta != null) {
                oldX = shape.x;
                oldY = shape.y;

                shape.move();

                if (shape.collisions) {
                    s = _.filter(this.shapes, (s, i) => {
                        return index != i && shape.collidesWith(s);
                    });

                    if (s.length > 0) {
                        stopMoving = false;

                        _.each(s, (x) => {
                            stopMoving = !shape.collisionDetected(x);
                        });

                        if (stopMoving) shape.moveTo(oldX, oldY);
                    }
                }
            }

            shape.render();

        });
    }
}