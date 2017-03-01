import Line from './Line';
import Circle from './Circle';

export default class Canvas {

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this._pos = null;
        this._drawingLine = null;

        this._drawingColor = '#000';
        this._drawingWidth = '1';
        this._eraserWidth = '10';

        this._history = [];

        this._initListeners();
    }

    drawCircle(circle) {
        this.ctx.beginPath();
        this.ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = circle.color;
        this.ctx.fill();
    }

    drawLine(line) {
        this.ctx.beginPath();
        this.ctx.moveTo(line.start.x, line.start.y);
        this.ctx.lineTo(line.end.x, line.end.y);
        this.ctx.lineWidth = line.width;

        if (line.color == 'eraser') {
            this.ctx.globalCompositeOperation = 'destination-out';
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
        } else {
            this.ctx.globalCompositeOperation = 'source-over';
            this.ctx.strokeStyle = line.color;
        }

        this.ctx.lineCap = 'round';
        this.ctx.stroke();
    }

    drawBackground(url, callback) {
        this._drawImage(url, 'destination-over', callback);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    getPNG() {
        return this.canvas.toDataURL();
    }

    undo() {
        // Clear the canvas
        this.clear();

        // Remove last item from the history list
        this._history.pop();

        // Break if there is nothing left in the history
        if (this._history.length <= 0) return;

        // Draw the last item in the history list
        this._drawImage(_.last(this._history));
    }

    setDrawingColor(color) { this._drawingColor = color; return this; }
    setDrawingWidth(width) { this._drawingWidth = width; return this; }
    setEraserWidth(width) { this._eraserWidth = width; return this; }

    _drawImage(url, operation = 'source-over', callback = () => {}) {
        this.ctx.globalCompositeOperation = operation;

        let imageObj = new Image();
        imageObj.onload = () => {
            this.ctx.drawImage(imageObj, 0, 0, this.canvas.width, this.canvas.width * imageObj.height / imageObj.width);

            callback(imageObj);
        };

        imageObj.src = url;
    }

    _initListeners() {
        let hammer = new Hammer(this.canvas);
        hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });

        hammer.on('panstart', (e) => {
            this._pos = this.canvas.getBoundingClientRect();

            this._drawingLine = new Line();

            this._drawingLine.setStart(Math.round(e.center.x - this._pos.left), Math.round(e.center.y - this._pos.top));
            this._drawingLine.setColor(this._drawingColor);
            this._drawingLine.setWidth(this._drawingColor != 'eraser' ? this._drawingWidth : this._eraserWidth);
        });

        hammer.on('pan', (e) => {
            let newX = Math.round(e.center.x - this._pos.left);
            let newY = Math.round(e.center.y - this._pos.top);

            this._drawingLine.setEnd(newX, newY);

            this.drawLine(this._drawingLine);

            this._drawingLine.setStart(newX, newY);
        });

        hammer.on('panend', (e) => {
            this._pos = null;
            this._drawingLine = null;

            this._history.push(this.getPNG());
        });
    }
}