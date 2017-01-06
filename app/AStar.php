<?php

namespace App;

class AStar
{
    public $path;

    public $pathIsFound;
    public $openList;
    public $closedList;

    /**
     * @param array     $rows
     * @param \App\Node $start
     * @param \App\Node $end
     * @return array
     */
    public function findPath(array $rows, Node $start, Node $end)
    {
        $activeNode = null;

        $this->openList[] = $start;

        while (count($this->openList))
        {
            // Find the node with the lowest F score
            $activeNode = array_reduce($this->openList, function ($prevNode, $currNode) {
                return $prevNode->f < $currNode->f ? $prevNode : $currNode;
            }, array_values($this->openList)[0]);

            // If the active node has the same position as the end point, we have found a path
            if ($activeNode->x == $end->x && $activeNode->y == $end->y)
            {
                $this->pathIsFound = true;
                break;
            }

            // Remove the active node from the open list
            unset($this->openList[array_search($activeNode, $this->openList)]);

            // Add the active node to the closed list
            $this->closedList[] = $activeNode;

            // Calculate the scores of all the neighbors and add them to the open list
            for ($x = $activeNode->x - 1; $x < $activeNode->x + 2; $x++) {

                // If the position exceeds the width of the grid, skip it
                if ($x < 0 || $x >= count($rows[0])) continue;

                for ($y = $activeNode->y - 1; $y < $activeNode->y + 2; $y++) {

                    // If the position exceeds the height of the grid, skip it
                    if ($y < 0 || $y >= count($rows)) continue;

                    // If the position is diagonal from the active node, skip it
                    if ($x != $activeNode->x && $y != $activeNode->y) continue;

                    // If the position is blocked, skip it
                    if ($rows[$y][$x]['type'] == 'blocked') continue;

                    // If the position is the same as the active node, skip it
                    if ($x == $activeNode->x && $y == $activeNode->y) continue;

                    // If the position already exists in the open list, skip it
                    if (array_filter(
                        $this->openList,
                        function (Node $node) use ($x, $y) {
                            return $node->x == $x && $node->y == $y;
                        }
                    )) continue;

                    // If the position already exists in the closed list, skip it
                    if (array_filter(
                        $this->closedList,
                        function (Node $node) use ($x, $y) {
                            return $node->x == $x && $node->y == $y;
                        }
                    )) continue;

                    // Set the parent of this node to the active node and calculate the scores
                    $neighborNode = Node::create($x, $y, 'calculated')
                        ->setParent($activeNode)
                        ->calcG()
                        ->calcH($end)
                        ->calcF();

                    // Add this node to the open list
                    $this->openList[] = $neighborNode;

                }
            }
        }

        if (!$this->pathIsFound) return $this->path = [];

        $this->path = [];

        while ($activeNode->parent)
        {
            $this->path[] = $activeNode;

            $activeNode = $activeNode->parent;
        }

        $this->path[] = $start;

        $this->path = array_reverse($this->path);
    }
}