<template>

    <div class="panel panel-default">
        <div class="panel-heading">CanvasEngine</div>

        <div class="panel-body">

            <button class="btn btn-default" @click="addRect">Create</button>
            <button class="btn btn-default" @click="moveRect">Move</button>
            <button class="btn btn-default" @click="stop">Stop</button>
            <button class="btn btn-default" @click="clear">Clear</button>

            <canvas id="canvas-engine" width="1100" height="1100"></canvas>

        </div>
    </div>

</template>

<style>



</style>

<script>
    import Rect from '../classes/CanvasEngine/Rect';
    import Canvas from '../classes/CanvasEngine/Canvas';

    export default {

        data() {
            return {
                rects: []
            }
        },

        mounted() {
            this.clear();
        },

        methods: {
            addRect() {
                for (let i = 0; i < 100; i++) {
                    let rect = new Rect(Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000), 2);

                    this.rects.push(rect);

                    this.canvas.addShape(rect);
                }
            },

            moveRect() {
                for (let i = 0; i < this.rects.length; i++) {
                    this.rects[i].moveTo(500, 500);
                }
            },

            stop() {
                this.canvas.stop();
            },

            clear() {
                this.canvas = new Canvas(document.getElementById('canvas-engine'));
            }
        }

    }

</script>