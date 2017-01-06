<?php

namespace App\Http\Controllers\Api;

use App\Node;
use App\Http\Controllers\Controller;

class GridController extends Controller
{
    /**
     * Generate a grid with random blocked positions.
     *
     * @param int $height
     * @param int $width
     * @return \Illuminate\Http\JsonResponse
     */
    public function random(int $height, int $width)
    {
        $rows = [];

        // Build the array
    	for ($i = 0; $i < $height; $i++) {
    		$tempRow = [];
    		for ($j = 0; $j < $width; $j++) {
    		    // Randomly set if the node should be blocked
    		    $tempRow[] = Node::create($i, $j, rand(0, 10) < 8 ? 'node' : 'blocked');
	    	}
	    	$rows[] = $tempRow;
    	}

        return response()->json([
            'rows' => $rows
        ]);
    }

    /**
     * Generate a grid of roads.
     *
     * @param int $height
     * @param int $width
     * @return \Illuminate\Http\JsonResponse
     */
    public function roads(int $height, int $width)
    {
        $rows = [];

        $offsetA = 4;
        $offsetB = 8;

        $horizontalLanes = [];
        $verticalLanes = [];

        // Calculate some random horizontal starting points
        $x = 1;
        while ($x < $height) {
            $horizontalLanes[$x] = '';

            $x += rand($offsetA, $offsetB);
        }

        // Calculate some random vertical starting points
        $y = 1;
        while ($y < $height) {
            $verticalLanes[$y] = '';

            $y += rand($offsetA, $offsetB);
        }

        // Build the array
        for ($i = 0; $i < $height; $i++) {
            $tempRow = [];
            for ($j = 0; $j < $width; $j++) {
                // If it is part of a road, make it an open node
                // In all other cases, make it a blocked node
                $type = array_key_exists($i, $horizontalLanes) || array_key_exists($j, $verticalLanes) ? 'node' : 'blocked';

                $tempRow[] = Node::create($i, $j, $type);
            }
            $rows[] = $tempRow;
        }

        return response()->json([
            'rows' => $rows
        ]);
    }
}
