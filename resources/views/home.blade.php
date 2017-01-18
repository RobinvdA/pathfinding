@extends('layouts.app')

@section('title', 'Pathfinding')

@section('content')

	<div id="app">
		<div class="row">
			<div class="col-lg-12">
				
			</div>
		</div>
		<div class="row">
			<div class="col-lg-12">
				<canvas-engine></canvas-engine>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-12">
				<grid></grid>
			</div>
		</div>
	</div>

@endsection