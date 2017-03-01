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
        background: rgba(0, 0, 0, 0) url('../../img/google.png') no-repeat scroll 0 0 / 1100px auto;
        cursor: crosshair;
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

                eraserWidth: 10
            }
        },

        watch: {
            pencilColor() {
                this.canvas.setDrawingColor(this.pencilColor);
            },
            pencilWidth() {
                this.canvas.setDrawingWidth(this.pencilWidth);
            },
            eraserWidth() {
                this.canvas.setEraserWidth(this.eraserWidth);
            }
        },

        mounted() {
            this.init();
        },

        methods: {
            init() {
                let canvasElement = document.getElementById('canvas-drawing');

                this.canvas = new Canvas(canvasElement);
                this.canvas.setDrawingColor(this.pencilColor)
                    .setDrawingWidth(this.pencilWidth)
                    .setEraserWidth(this.eraserWidth);
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
                this.canvas.undo();
            },

            save() {
                this.canvas.drawBackground('../img/google.png', () => {
                    this.$http.post(`/api/image`, { image: this.canvas.getPNG() })
                        .then((response) => {
                            console.log(response);
                        });
                });
            }
        }
    }
</script>