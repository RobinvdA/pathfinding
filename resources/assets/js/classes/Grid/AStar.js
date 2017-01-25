import Node from './Node';

export default class AStar {

    constructor() {

    }

    find(rows, start, end) {
        if (!start || !end) return;

        let openList = [];
        let closedList = [];
        let activeNode = null;
        let pathFound = false;

        openList.push(Node.create(start.x, start.y));

        while (openList.length) {

            // Find the node with the lowest F score
            activeNode = openList.reduce(function(prev, curr) {
                return prev.f < curr.f ? prev : curr;
            });

            // If the active node has the same position as the end point, we have found a path
            if (activeNode.x == end.x && activeNode.y == end.y) {
                pathFound = true;
                break;
            }

            // Remove the active node from the open list
            openList.splice(openList.findIndex((node) => {
                return node.x == activeNode.x && node.y == activeNode.y;
            }), 1);

            // Add the active node to the closed list
            closedList.push(activeNode);

            // Calculate the scores of all the neighbors and add them to the open list
            for (let row = activeNode.y-1; row < activeNode.y+2; row++) {

                // If the position exceeds the bounds, skip it
                if (row < 0 || !rows[row]) continue;

                for (let col = activeNode.x-1; col < activeNode.x+2; col++) {

                    // If the position is diagonal from the active node, skip it
                    if (col != activeNode.x && row != activeNode.y) continue;

                    // If the position exceeds the bounds, skip it
                    if (col < 0 || !rows[row][col]) continue;

                    // If the position is blocked, skip it
                    if (rows[row][col].type == 'blocked') continue;

                    // If the position is the same as the active node, skip it
                    if (col == activeNode.x && row == activeNode.y) continue;

                    // If the position already exists in the open list, skip it
                    if (openList.findIndex((node) => { return node.x == col && node.y == row; }) >= 0) continue;

                    // If the position already exists in the open list, skip it
                    if (closedList.findIndex((node) => { return node.x == col && node.y == row; }) >= 0) continue;

                    // Set the parent of this node to the active node and calculate the scores
                    let node = Node.create(col, row)
                        .setParent(activeNode)
                        .calcG()
                        .calcH(end)
                        .calcF();

                    // Add this node to the open list
                    openList.push(node);
                }
            }

        }

        if (!pathFound) return alert('There is no way!');

        // Determine shortest path
        let path = [];

        while (activeNode.parent) {
            path.push(activeNode);

            activeNode = activeNode.parent;
        }

        path.push(Node.create(start.x, start.y));

        return path.reverse();
    }

}