export default class Canvas {

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
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

    drawImage(imgElement) {
        this.ctx.globalCompositeOperation = 'destination-over';
        this.ctx.drawImage(imgElement, 0, 0);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    getPNG() {
        return this.canvas.toDataURL();
    }
}