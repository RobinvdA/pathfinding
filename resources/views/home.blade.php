@extends('layouts.app')

@section('title', 'Pathfinding')

@section('content')

    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <grid v-if="activePage == 'Grid'"></grid>
                <canvas-engine v-if="activePage == 'CanvasEngine'"></canvas-engine>
                <canvas-signature v-if="activePage == 'CanvasSignature'"></canvas-signature>
            </div>
        </div>
    </div>

@endsection