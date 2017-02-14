export default class Shape {

    constructor() {
        this.movingToX = 0;
        this.movingToY = 0;
        this.theta = null;

        this.collisions = false;

        this.collisionDetected = () => {};
    }

    context(ctx) {
        this.ctx = ctx;

        return this;
    }

    onCollision(func) {
        this.collisionDetected = func;
    }

    moveTo(x, y) {
        this.movingToX = x;
        this.movingToY = y;

        let diffX = x - this.x;
        let diffY = y - this.y;

        this.theta = Math.atan2(diffY, diffX);

        return this;
    }

    move() {
        if (
            (
                this.x - this.movingToX >= -this.speed &&
                this.x - this.movingToX <= this.speed
            ) && (
                this.y - this.movingToY >= -this.speed &&
                this.y - this.movingToY <= this.speed
            )
        ) {
            this.x = this.movingToX;
            this.y = this.movingToY;
            this.theta = null;
            this.movingToX = 0;
            this.movingToY = 0;
            return;
        }

        this.x += Math.cos(this.theta) * this.speed;
        this.y += Math.sin(this.theta) * this.speed;
    }

    collidesWith(shape) {
        let v = this.bounds().topLeft.x < shape.bounds().topRight.x && this.bounds().topRight.x > shape.bounds().topLeft.x;
        let h = this.bounds().topLeft.y < shape.bounds().bottomLeft.y && this.bounds().bottomLeft.y > shape.bounds().topLeft.y;

        return v && h;
    }

    bounds() {
        console.log('This shape has not yet implemented `bounds`');
    }

    render() {
        console.log('This shape has not yet implemented `render`');
    }
}