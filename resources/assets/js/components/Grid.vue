<template>

    <div class="panel panel-default">
        <div class="panel-heading">Grid</div>

        <div class="panel-body">
            <div style="margin-bottom: 14px">
                <div class="form-group">
                    <label for="height">Height</label>
                    <input id="height" type="text" class="form-control" placeholder="Hoogte" v-model="height" />
                </div>
                <div class="form-group">
                    <label for="width">Width</label>
                    <input id="width" type="text" class="form-control" placeholder="Breedte" v-model="width" />
                </div>

                <button class="btn btn-primary" @click="generate">Generate grid</button>
                <button class="btn btn-primary" @click="findPath">Find path</button>
                <button v-if="!showScores" class="btn btn-primary" @click="showScores = true">Show scores</button>
                <button v-else class="btn btn-primary" @click="showScores = false">Hide scores</button>

                <span v-if="steps">Path found in {{ steps }} steps!</span>
            </div>

            <div class="grid-container">
                <div v-for="(row, rowIndex) in rows" class="grid-row">
                    <div v-for="(column, columnIndex) in row" class="grid-column" :class="column.type" @click="setPoint(rowIndex, columnIndex)">
                        <p v-if="showScores" class="g-score">{{ column.g ? column.g : '' }}</p>
                        <p v-if="showScores" class="h-score">{{ column.h ? column.h : '' }}</p>
                        <p v-if="showScores" class="f-score">{{ column.f ? column.f : '' }}</p>
                    </div>
                </div>
            </div>
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
        height: 30px;
        width: -moz-fit-content;
    }

    .grid-container > .grid-row:last-child {
        border-bottom: 1px solid #ddd;
    }

    .grid-container > .grid-row > .grid-column {
        border-left: 1px solid #ddd;
        color: #fff;
        float: left;
        font-size: 10px;
        height: 100%;
        position: relative;
        text-align: center;
        width: 30px;
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
        color: #000 !important;
    }

    .grid-column > p {
        margin: 0;
    }

    .grid-column > .g-score{
        left: 2px;
        position: absolute;
        top: 0;
    }

    .grid-column > .h-score{
        bottom: 0;
        left: 2px;
        position: absolute;
    }

    .grid-column > .f-score{
        position: absolute;
        right: 2px;
        top: 0;
    }

</style>

<script>

    import Node from '../classes/Node';

    export default {

        data() {
            return {
                height: null,
                width: null,

                rows: [],

                start: null,
                end: null,

                animationStep: 0,
                steps: 0,

                showScores: false,
                pathFound: false
            }
        },

    	methods: {
    		generate() {
    		    this.reset();

    		    if (!this.height || !this.width) return;

    			this.$http.get(`/api/grid/${this.height}/${this.width}`)
                    .then((response) => {
                        this.rows = response.body.rows;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
    		},

            setPoint(row, column) {
    		    if (this.rows[row][column].type == 'blocked') return;

                if (!this.start) {
                    this.start = {
                        x: column,
                        y: row
                    };

                    this.updateNode(row, column, Node.create(column, row, 'start'));
                } else if (!this.end) {
                    if (this.start.y == row && this.start.x == column) return;

                    this.end = {
                        x: column,
                        y: row
                    };

                    this.updateNode(row, column, Node.create(column, row, 'end'));
                } else {
                    this.updateNode(this.start.y, this.start.x, Node.create(this.start.x, this.start.y, 'node'));

                    this.updateNode(this.end.y, this.end.x, Node.create(this.start.x, this.start.y, 'node'));
                }
            },

            findPath() {
                if (!this.start || !this.end) return;

                let openList = [];
                let closedList = [];
                let activeNode = null;

                openList.push(Node.create(this.start.x, this.start.y));

                while (openList.length) {

                    // Find the node with the lowest F score
                    activeNode = openList.reduce(function(prev, curr) {
                        return prev.f < curr.f ? prev : curr;
                    });

                    // If the active node has the same position as the end point, we have found a path
                    if (activeNode.x == this.end.x && activeNode.y == this.end.y) {
                        this.pathFound = true;
                        break;
                    }

                    // Remove the active node from the open list
                    openList.splice(openList.findIndex((node) => {
                        return node.x == activeNode.x && node.y == activeNode.y;
                    }), 1);

                    // Add the active node to the closed list
                    closedList.push(activeNode);

                    // Calculate the scores of all the neighbors and add them to the open list
                    for (let x = activeNode.x-1; x < activeNode.x+2; x++) {

                        // If the position exceeds the bounds, skip it
                        if (x < 0 || x > this.width-1) continue;

                        for (let y = activeNode.y-1; y < activeNode.y+2; y++) {

                            // If the position is diagonal from the active node, skip it
                            if (x != activeNode.x && y != activeNode.y) continue;

                            // If the position exceeds the bounds, skip it
                            if (y < 0 || y > this.height-1) continue;

                            // If the position is blocked, skip it
                            if (this.rows[y][x].type == 'blocked') continue;

                            // If the position is the same as the active node, skip it
                            if (x == activeNode.x && y == activeNode.y) continue;

                            // If the position already exists in the open list, skip it
                            if (openList.findIndex((node) => { return node.x == x && node.y == y; }) >= 0) continue;

                            // If the position already exists in the open list, skip it
                            if (closedList.findIndex((node) => { return node.x == x && node.y == y; }) >= 0) continue;

                            // Set the parent of this node to the active node and calculate the scores
                            let node = Node.create(x, y)
                                .setParent(activeNode)
                                .calcG()
                                .calcH(this.end)
                                .calcF();

                            // Add this node to the open list
                            openList.push(node);

                            // Draw the calculation
                            node.type = 'calculated';
                            this.updateNode(node.y, node.x, node);
                        }
                    }

                }

                if (!this.pathFound) return alert('There is no way!');

                // Determine shortest path
                let path = [];

                while (activeNode.parent) {
                    path.push(activeNode);

                    activeNode = activeNode.parent;
                }

                path.push(Node.create(this.start.x, this.start.y));

                this.steps = path.length;

                this.animationStep = 0;
                this.drawPath(path.reverse());
            },

            drawPath(list) {
                setTimeout(() => {
                    list[this.animationStep].type = 'path';

                    this.updateNode(list[this.animationStep].y, list[this.animationStep].x, list[this.animationStep]);

                    this.animationStep++;

                    if (this.animationStep < list.length) this.drawPath(list);
                }, 20);
            },

            updateNode(row, column, value) {
                let r = this.rows[row];
                r[column] = value;
                Vue.set(this.rows, row, r);
            },

            reset() {
                this.rows = [];
                this.start = null;
                this.end = null;
                this.animationStep = 0;
                this.steps = 0;
            }
    	}

    }

</script>