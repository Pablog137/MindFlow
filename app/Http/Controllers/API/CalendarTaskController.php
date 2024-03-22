<?php

namespace App\Http\Controllers\API;

use App\Models\CalendarTask;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateCalendarTaskRequest;
use App\Http\Requests\UpdateCalendarTaskRequest;
use App\Http\Resources\CalendarTaskCollection;
use App\Http\Resources\CalendarTaskResource;

class CalendarTaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new CalendarTaskCollection(CalendarTask::paginate(5));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateCalendarTaskRequest $request)
    {
        return new CalendarTaskResource(CalendarTask::create($request->all()));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return new CalendarTaskResource(CalendarTask::find($id));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCalendarTaskRequest $request, string $id)
    {
        $calendarTask = CalendarTask::find($id);
        $calendarTask->update($request->all());
        return new CalendarTaskResource($calendarTask);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $calendarTask = CalendarTask::find($id);
        $calendarTask->delete();
        return response()->json([
            "message" => "Calendar Task deleted successfully"
        ]);
    }
}
