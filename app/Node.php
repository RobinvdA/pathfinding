<?php

namespace App;

class Node
{
    public $x;
    public $y;

    public $type;

    public $g;
    public $h;
    public $f;

    public $parent;

    /**
     * Node constructor.
     *
     * @param int    $x
     * @param int    $y
     * @param string $type
     */
    function __construct(int $x, int $y, string $type)
    {
        $this->x = $x;
        $this->y = $y;

        $this->type = $type;

        $this->g = 0;
        $this->h = 0;
        $this->f = 0;

        $this->parent = null;
    }

    /**
     * @param int    $x
     * @param int    $y
     * @param string $type
     * @return static
     */
    public static function create(int $x, int $y, string $type = 'node')
    {
        return new static($x, $y, $type);
    }

    /**
     * @return static
     */
    public function calcG()
    {
        $a = abs($this->x - $this->parent->x);
        $b = abs($this->y - $this->parent->y);

        $this->g = sqrt( $a * $a + $b * $b ) + $this->parent->g;

        return $this;
    }

    /**
     * @param \App\Node $endNode
     * @return static
     */
    public function calcH(Node $endNode)
    {
        $a = abs($this->x - $endNode->x);
        $b = abs($this->y - $endNode->y);

        $this->h = sqrt( $a * $a + $b * $b );

        return $this;
    }

    /**
     * @return static
     */
    public function calcF()
    {
        $this->f = $this->g + $this->h;

        return $this;
    }

    /**
     * @param mixed $parent
     * @return static
     */
    public function setParent(Node $parent)
    {
        $this->parent = $parent;

        return $this;
    }
}