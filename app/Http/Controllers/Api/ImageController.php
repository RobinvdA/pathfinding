<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    /**
     * PathController constructor.
     */
    function __construct()
    {

    }

    public function save(Request $request)
    {
        $data = explode(',', $request->image);

        Storage::disk('local')->put('/test.png', base64_decode($data[1]));

        return response()->json('saved');
    }
}
