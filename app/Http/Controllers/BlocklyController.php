<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BlocklyController extends Controller
{
    function index()
    {
        return view('blocky');
    }

    function store(Request $request)
    {
        file_put_contents(base_path('/blockly/route.xml'), $request->get('data'));
        // file_put_contents(base_path('/routes/blockly.php'), "<?php\n\n{$request->get('code')}");
        return response()->json(['status' => 'succuss']);
    }

    function show(Request $request)
    {
        return response()->json(['data' => file_get_contents(base_path('/blockly/route.xml'))]);
    }
}
