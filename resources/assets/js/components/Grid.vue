<template>

    <div class="panel panel-default">
        <div class="panel-heading">Grid</div>

        <div class="panel-body">
                <div class="form-group">
                    <label for="height">Height</label>
                    <input id="height" type="text" class="form-control" placeholder="Hoogte" v-model="height" />
                </div>
                <div class="form-group">
                    <label for="width">Width</label>
                    <input id="width" type="text" class="form-control" placeholder="Breedte" v-model="width" />
                </div>

                <div class="form-group">
                    <button class="btn btn-primary" @click="generateRandom">Generate random grid</button>
                    <button class="btn btn-primary" @click="generateRoads">Generate road grid</button>
                    <button class="btn btn-primary" @click="findPathPHP">Find path (PHP)</button>
                    <button class="btn btn-primary" @click="findPathJS">Find path (JS)</button>

                    <span v-if="steps">Path found in {{ steps }} steps!</span>
                </div>

            <canvas id="canvas" width="1100" height="1100"></canvas>

        </div>
    </div>

</template>

<style>
    
    .grid-container {
        margin: 0 0 10px 0;
    }

    .grid-container > .grid-row {
        border-top: 1px solid #ddd;
        clear: both;
        height: 10px;
        width: -moz-fit-content;
    }

    .grid-container > .grid-row:last-child {
        border-bottom: 1px solid #ddd;
    }

    .grid-container > .grid-row > .grid-column {
        border-left: 1px solid #ddd;
        color: #fff;
        float: left;
        height: 100%;
        position: relative;
        width: 10px;
    }

    .grid-container > .grid-row > .grid-column:last-child {
        border-right: 1px solid #ddd;
    }

    .grid-column.blocked {
        background-color: #ddd;
    }

    .grid-column.start {
        background-color: #dff0d8;
    }

    .grid-column.end {
        background-color: #f2dede;
    }

    .grid-column.path {
        background-color: #337ab7;
    }

    .grid-column.calculated {
        background-color: #d9edf7;
    }

</style>

<script>

    import Node from '../classes/Grid/Node';
    import AStar from '../classes/Grid/AStar';
    import Canvas from '../classes/Grid/Canvas';

    export default {

        watch: {
//            path() {
//                this.steps = this.path.length;
//
//                this.animationStep = 0;
//                this.drawPath();
//            }
        },

        data() {
            return {
                height: null,
                width: null,

                rows: [],
                path: [],

                start: null,
                end: null,

                steps: 0,

                canvas: null,
                nodeSize: 10,

                aStar: null
            }
        },

        mounted() {
            this.canvas = new Canvas(document.getElementById('canvas'));
            this.canvas.onClick(this.setPoint.bind(this));

            this.aStar = new AStar();
        },

    	methods: {
            generateRandom() {
                this.reset();

                if (!this.height || !this.width) return;

                this.$http.get(`/api/grid/${this.height}/${this.width}/random`)
                    .then((response) => {
                        this.rows = response.body.rows;

                        this.canvas.showGrid(this.rows);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },

            generateRoads() {
                this.reset();

                if (!this.height || !this.width) return;

                this.$http.get(`/api/grid/${this.height}/${this.width}/roads`)
                    .then((response) => {
                        this.rows = response.body.rows;

                        this.canvas.showGrid(this.rows);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },

            findPathPHP() {
                if (!this.start || !this.end) return;

                this.$http.post(`/api/path/find`, {
                    rows: this.rows,
                    start: this.start,
                    end: this.end
                })
                    .then((response) => {
                        this.path = response.body.path;

                        this.canvas.showPath(this.path);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },

            findPathJS() {
                let path = this.aStar.find(this.rows, this.start, this.end);

                this.canvas.showPath(path);
            },

            setPoint(x, y) {
                if (!this.start) {
                    this.start = { x: x, y: y };

                    this.canvas.setStart(x, y);
                } else if (!this.end) {
                    this.end = { x: x, y: y };

                    this.canvas.setEnd(x, y);
                } else {
                    this.canvas.showGrid(this.rows);
                }
            },

            reset() {
                this.rows = [];
                this.start = null;
                this.end = null;
                this.steps = 0;
            }
    	}

    }

</script>