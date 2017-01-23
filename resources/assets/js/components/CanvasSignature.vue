<template>

    <div class="panel panel-default">
        <div class="panel-heading">CanvasSignature</div>

        <div class="panel-body">

            <div class="form-group">
                <button class="btn btn-primary" @click="save">Save</button>
                <button class="btn btn-primary" @click="toggle">{{ isDrawing ? 'Drawing' : 'Erasing' }}</button>
            </div>

            <canvas id="canvas-signature" width="1100" height="200"></canvas>

        </div>
    </div>

</template>

<style>



</style>

<script>

    export default {

        data() {
            return {
                drawingBoard: null,

                isDrawing: true
            }
        },

        mounted() {
            this.init();
        },

        methods: {
            init() {
                let SimpleDrawingBoard = require('simple-drawing-board');

                this.drawingBoard = new SimpleDrawingBoard(document.getElementById('canvas-signature'));
            },

            toggle() {
                this.drawingBoard.toggleMode();

                this.isDrawing = !this.isDrawing;
            },

            save() {
                console.log(this.drawingBoard.getImg());
            }
        }

    }

</script>