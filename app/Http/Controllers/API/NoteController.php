<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateNoteRequest;
use App\Http\Requests\UpdateNoteRequest;
use App\Http\Resources\NoteCollection;
use App\Http\Resources\NoteResource;
use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new NoteCollection(Note::paginate(5));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateNoteRequest $request)
    {
        return new NoteResource(Note::create($request->all()));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return new NoteResource(Note::find($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNoteRequest $request, string $id)
    {
        $note = Note::find($id);
        $note->update($request->all());
        return new NoteResource($note);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $note = Note::find($id);
        $note->delete();
        return response()->json([
            "message" => "Note deleted successfully"
        ]);
    }
}
