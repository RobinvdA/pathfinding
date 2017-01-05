<?php

namespace App\Http\Controllers\Api;

use App\Classes\Node;
use App\Http\Controllers\Controller;

class GridController extends Controller
{
    /**
     * Generate a grid.
     *
     * @param int $height
     * @param int $width
     * @return \Illuminate\Http\JsonResponse
     */
    public function generate(int $height, int $width)
    {
        $rows = [];

    	for ($i = 0; $i < $height; $i++) {
    		$tempRow = [];
    		for ($j = 0; $j < $width; $j++) {
    		    $tempRow[] = new Node($i, $j, rand(0, 10) < 8 ? 'node' : 'blocked');
	    	}
	    	$rows[] = $tempRow;
    	}

        return response()->json([
            'rows' => $rows
        ]);
    }
}
