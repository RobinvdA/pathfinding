<template>

    <div class="panel panel-default">
        <div class="panel-heading">Movement</div>

        <div class="panel-body">

            <div class="form-group">
                <button class="btn btn-primary" @click="reset">Reset</button>
                <span>Score: {{ score }}</span>
            </div>

            <canvas id="movement-canvas" :width="width" :height="height" @click="move"></canvas>

        </div>
    </div>

</template>

<style>

    canvas#movement-canvas {
        cursor: pointer;
    }

</style>

<script>
    import Canvas from '../classes/CanvasEngine/Canvas';
    import Circle from '../classes/CanvasEngine/Circle';
    import Rectangle from '../classes/CanvasEngine/Rectangle';

    export default {

        data() {
            return {
                score: 0,

                user: {},

                width: 400,
                height: 400
            }
        },

        mounted() {
            this.reset();

            document.addEventListener('keydown', (event) => {
                if (!this.user) return;

                switch (event.keyCode) {
                    case 87: // Up
                        this.user.moveUp();
                        break;
                    case 83: // Down
                        this.user.moveDown();
                        break;
                    case 65: // Left
                        this.user.moveLeft();
                        break;
                    case 68: // Right
                        this.user.moveRight();
                        break;
                }
            }, false);

            document.addEventListener('keyup', (event) => {
                if (!this.user) return;

                // Stop movement
                this.user.stopMoving();
            }, false);
        },

        methods: {
            move(e) {
                let rect = document.getElementById('movement-canvas').getBoundingClientRect();

                this.user.moveTo(e.clientX - rect.left, e.clientY - rect.top);
            },

            collected(collectible) {
                collectible.x = Math.floor(Math.random() * 350);
                collectible.y = Math.floor(Math.random() * 350);

                this.canvas.addShape(new Rectangle(Math.floor(Math.random() * 350), Math.floor(Math.random() * 350)));

                this.score++;

                return true;
            },

            reset() {
                this.canvas = new Canvas(document.getElementById('movement-canvas'));

                this.user = new Circle(50, 50, 4);
                this.user.collisions = true;
                this.user.onCollision(this.collected);

                this.canvas.addShape(this.user);

                this.canvas.addShape(new Rectangle(100, 100));
            }
        }

    }

</script>