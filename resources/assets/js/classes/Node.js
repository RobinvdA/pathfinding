export default class Node {

    constructor(x, y, type) {
        this.x = x;
        this.y = y;

        this.type = type;

        this.g = 0;
        this.h = 0;
        this.f = 0;

        this.parent = null;
    }

    static create(x, y, type = 'node') {
        return new Node(x, y, type);
    }

    calcG() {
        let a = Math.abs(this.x - this.parent.x);
        let b = Math.abs(this.y - this.parent.y);
        this.g = Math.sqrt( a*a + b*b ) + this.parent.g;
        return this;
    }

    calcH(end) {
        let a = Math.abs(this.x - end.x);
        let b = Math.abs(this.y - end.y);
        this.h = Math.sqrt( a*a + b*b );
        return this;
    }

    calcF() {
        this.f = this.g + this.h;
        return this;
    }

    setParent(parent) {
        this.parent = parent;
        return this;
    }

};