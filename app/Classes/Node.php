<?php

namespace App\Classes;

class Node
{
    public $x;
    public $y;

    public $type;

    public $g;
    public $h;
    public $f;

    function __construct(int $x, int $y, string $type = 'node')
    {
        $this->x = $x;
        $this->y = $y;

        $this->type = $type;

        $this->g = 0;
        $this->h = 0;
        $this->f = 0;
    }
}