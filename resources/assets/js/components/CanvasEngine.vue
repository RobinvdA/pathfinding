<template>

    <div class="panel panel-default">
        <div class="panel-heading">CanvasEngine</div>

        <div class="panel-body">

            <div class="form-group">
                <button class="btn btn-primary" @click="addRects">Rectangles</button>
                <button class="btn btn-primary" @click="addCircles">Circles</button>
                <button class="btn btn-primary" @click="moveShapes">Move</button>
                <button class="btn btn-primary" @click="stop">Stop</button>
                <button class="btn btn-primary" @click="clear">Clear</button>
            </div>

            <canvas id="canvas-engine" width="1100" height="1100"></canvas>

        </div>
    </div>

</template>

<style>



</style>

<script>
    import Rectangle from '../classes/CanvasEngine/Rectangle';
    import Circle from '../classes/CanvasEngine/Circle';
    import Canvas from '../classes/CanvasEngine/Canvas';

    export default {

        data() {
            return {
                rects: [],
                circs: []
            }
        },

        mounted() {
            this.clear();
        },

        methods: {
            addRects() {
                for (let i = 0; i < 50; i++) {
                    let rect = new Rectangle(Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000), 2);
                    this.rects.push(rect);
                    this.canvas.addShape(rect);
                }
            },

            addCircles() {
                for (let i = 0; i < 50; i++) {
                    let circ = new Circle(Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000), 2, Math.floor((Math.random() * 10) + 1));
                    this.circs.push(circ);
                    this.canvas.addShape(circ);
                }
            },

            moveShapes() {
                for (let i = 0; i < this.rects.length; i++) {
                    this.rects[i].moveTo(500, 500);
                }

                for (let i = 0; i < this.circs.length; i++) {
                    this.circs[i].moveTo(500, 500);
                }
            },

            stop() {
                this.canvas.stop();
            },

            clear() {
                this.rects = [];
                this.circs = [];

                this.canvas = new Canvas(document.getElementById('canvas-engine'));
            }
        }

    }

</script>