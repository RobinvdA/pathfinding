<template>

    <div class="panel panel-default">
        <div class="panel-heading">CanvasDrawing</div>

        <div class="panel-body">

            <div class="form-group">
                <button class="btn btn-primary" @click="save">Save</button>
                <button class="btn btn-primary" @click="undo">Undo</button>
                <button class="btn btn-primary" @click="increaseWidth">+ Size</button>
                <button class="btn btn-primary" @click="decreaseWidth">- Size</button>
                <button class="btn btn-primary" @click="color('#000')">Black</button>
                <button class="btn btn-primary" @click="color('#f00')">Red</button>
                <button class="btn btn-primary" @click="color('#0f0')">Green</button>
                <button class="btn btn-primary" @click="color('#00f')">Blue</button>
                <button class="btn btn-primary" @click="color('#fff')">White</button>
                <button class="btn btn-primary" @click="color('eraser')">Eraser</button>
                <div class="size-preview" :style="{ height: (pencilWidth + 2) + 'px', width: (pencilWidth + 2) + 'px', backgroundColor: pencilColor != 'eraser' ? pencilColor : '#fff' }"></div>
            </div>

            <canvas id="canvas-drawing" width="1100" height="600"></canvas>

        </div>
    </div>

</template>

<style>
    .size-preview {
        border-radius: 50%;
        border-color: #000;
        display: inline-block;
    }

    canvas#canvas-drawing {
        background: url('../../img/google.png') no-repeat;
    }
</style>

<script>
    import Canvas from '../classes/CanvasDrawing/Canvas';
    import Line from '../classes/CanvasDrawing/Line';
    import Circle from '../classes/CanvasDrawing/Circle';

    export default {
        data() {
            return {
                canvas: null,
                canvasPos: null,

                pencilColor: '#000',
                pencilWidth: 1,

                eraserWidth: 10,

                line: null,

                history: []
            }
        },

        mounted() {
            this.init();
        },

        methods: {
            init() {
                let canvasElement = document.getElementById('canvas-drawing');

                this.canvas = new Canvas(canvasElement);

                let hammer = new Hammer(canvasElement);
                hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });

                this.line = null;

                hammer.on('panstart', (e) => {
                    this.canvasPos = canvasElement.getBoundingClientRect();

                    this.line = new Line();

                    this.line.setStart(Math.round(e.center.x - this.canvasPos.left), Math.round(e.center.y - this.canvasPos.top));
                    this.line.setColor(this.pencilColor);
                    this.line.setWidth(this.pencilColor != 'eraser' ? this.pencilWidth : this.eraserWidth);
                });

                hammer.on('pan', (e) => {
                    let newX = Math.round(e.center.x - this.canvasPos.left);
                    let newY = Math.round(e.center.y - this.canvasPos.top);

                    this.line.setEnd(newX, newY);

                    this.canvas.drawLine(this.line);

                    this.line.setStart(newX, newY);
                });

                hammer.on('panend', (e) => {
                    this.canvasPos = null;
                    this.line = null;

                    this.history.push(this.canvas.getPNG());
                });
            },

            increaseWidth() {
                this.pencilColor == 'eraser' ? this.eraserWidth++ : this.pencilWidth++;
            },

            decreaseWidth() {
                if (this.pencilColor != 'eraser') {
                    if (this.pencilWidth > 1) this.pencilWidth--;
                } else {
                    if (this.eraserWidth > 1) this.eraserWidth--;
                }
            },

            color(color) {
                this.pencilColor = color;
            },

            undo() {
                if (this.history.length <= 1) return;

                this.canvas.clear();

                let imageObj = new Image();
                imageObj.onload = () => {
                    this.canvas.drawImage(imageObj);
                };
                imageObj.src = this.history[this.history.length-2];

                // TODO: Finish this function
            },

            save() {
                let imageObj = new Image();

                imageObj.onload = () => {
                    this.canvas.drawImage(imageObj);

                    this.$http.post(`/api/image`, { image: this.canvas.getPNG() })
                        .then((response) => {
                            console.log(response);
                        });
                };

                imageObj.src = '../img/google.png';
            }
        }
    }
</script>