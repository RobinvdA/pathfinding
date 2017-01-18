export default class Shape {

    constructor() {
        this.movingToX = 0;
        this.movingToY = 0;
        this.theta = null;
    }

    canvas(cvs) {
        this.cvs = cvs;

        return this;
    }

    context(ctx) {
        this.ctx = ctx;

        return this;
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
                this.x - this.movingToX >= -1 &&
                this.x - this.movingToX <= 1
            ) && (
                this.y - this.movingToY >= -1 &&
                this.y - this.movingToY <= 1
            )
        ) {
            this.x = this.movingToX;
            this.y = this.movingToY;
            this.theta = null;
            this.movingToX = 0;
            this.movingToY = 0;
            return;
        }

        this.x += Math.cos(this.theta);
        this.y += Math.sin(this.theta);
    }

    render() {
        console.log('This shape has not yet implemented `draw`');
    }
}