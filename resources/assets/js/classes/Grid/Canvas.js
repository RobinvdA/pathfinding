import Rect from './canvas/Rect';

export default class Canvas {

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.rows = [];

        this.nodes = [];

        this.nodeSize = 10;

        this.colors = {
            node      : '#ffffff',
            blocked   : '#dddddd',
            start     : '#dff0d8',
            end       : '#f2dede',
            calculated: '#d9edf7',
            path      : '#337ab7'
        };

        this.animationStep = 0;

        this._onClick = () => {};

        this.canvas.addEventListener('click', this._clicked.bind(this), false);
    }

    onClick(callback) {
        this._onClick = callback;
    }

    showGrid(rows) {
        for (let i = 0; i < rows.length; i++) {
            this.rows[i] = [];

            for (let j = 0; j < rows[i].length; j++) {

                let rect = Rect.create(j, i, this.nodeSize);

                switch (rows[i][j]['type']) {
                    case 'node':       rect.setColor(this.colors.node); break;
                    case 'blocked':    rect.setColor(this.colors.blocked); break;
                    case 'start':      rect.setColor(this.colors.start); break;
                    case 'end':        rect.setColor(this.colors.end); break;
                    case 'calculated': rect.setColor(this.colors.calculated); break;
                    case 'path':       rect.setColor(this.colors.path); break;
                    default:           rect.setColor('#fff');
                }

                rect.draw(this.ctx);

                this.rows[i][j] = rect;
            }
        }
    }

    showPath(path) {
        setTimeout(() => {
            this.rows[path[this.animationStep].y][path[this.animationStep].x].setColor(this.colors.path).draw(this.ctx);

            this.animationStep++;

            if (this.animationStep < path.length) this.showPath(path);
            else this.animationStep = 0;
        }, 20);
    }

    setStart(x, y) {
        this.rows[y][x].setColor(this.colors.start).draw(this.ctx);
    }

    setEnd(x, y) {
        this.rows[y][x].setColor(this.colors.end).draw(this.ctx);
    }

    reset() {

    }

    _clicked(e) {
        let x = Math.floor((e.clientX - this.canvas.getBoundingClientRect().left) / 10);
        let y = Math.floor((e.clientY - this.canvas.getBoundingClientRect().top) / 10);

        this._onClick(x, y);
    }
}