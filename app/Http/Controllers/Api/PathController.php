<?php

namespace App\Http\Controllers\Api;

use App\Node;
use App\AStar;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PathController extends Controller
{
    /**
     * @var \App\AStar
     */
    private $aStar;

    /**
     * PathController constructor.
     *
     * @param \App\AStar $aStar
     */
    function __construct(AStar $aStar)
    {
        $this->aStar = $aStar;
    }

    /**
     * Find a path in the given grid.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function find(Request $request)
    {
        $start = Node::create($request->start['x'], $request->start['y']);
        $end = Node::create($request->end['x'], $request->end['y']);

        $this->aStar->findPath($request->rows, $start, $end);

        return response()->json([
            'path' => $this->aStar->path,
            'openList' => $this->aStar->openList,
            'closedList' => $this->aStar->closedList
        ]);
    }
}
