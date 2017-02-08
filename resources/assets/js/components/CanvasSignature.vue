<template>

    <div class="panel panel-default">
        <div class="panel-heading">CanvasSignature</div>

        <div class="panel-body">

            <div class="form-group">
                <button class="btn btn-primary" @click="save">Save</button>
                <button class="btn btn-primary" @click="toggle">{{ isDrawing ? 'Drawing' : 'Erasing' }}</button>
                <button class="btn btn-primary" @click="increaseSize">+ Size</button>
                <button class="btn btn-primary" @click="decreaseSize">- Size</button>
                <div class="size-preview" :style="{ height: (lineSize + 2) + 'px', width: (lineSize + 2) + 'px' }"></div>
            </div>

            <canvas id="canvas-signature" width="1100" height="200"></canvas>

        </div>
    </div>

</template>

<style>

    .size-preview {
        border-radius: 50%;
        background-color: #333;
        display: inline-block;
    }

</style>

<script>

    export default {

        data() {
            return {
                drawingBoard: null,

                isDrawing: true,

                lineSize: 2
            }
        },

        mounted() {
            this.init();
        },

        methods: {
            init() {
                let SimpleDrawingBoard = require('simple-drawing-board');

                this.drawingBoard = new SimpleDrawingBoard(document.getElementById('canvas-signature'), {
                    lineColor: '#333',
                    lineSize: this.lineSize,
                    boardColor: 'transparent'
                });
            },

            toggle() {
                this.drawingBoard.toggleMode();

                if (this.isDrawing) {
                    this.drawingBoard.setLineSize(10);
                } else {
                    this.drawingBoard.setLineSize(this.lineSize);
                }

                this.isDrawing = !this.isDrawing;
            },

            increaseSize() {
                this.drawingBoard.setLineSize(++this.lineSize);
            },

            decreaseSize() {
                this.drawingBoard.setLineSize(--this.lineSize);
            },

            save() {
                console.log(this.drawingBoard.getImg());
            }
        }

    }

</script>