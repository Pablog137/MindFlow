<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateCalendarRequest;
use App\Http\Requests\UpdateCalendarRequest;
use App\Http\Resources\CalendarCollection;
use App\Http\Resources\CalendarResource;
use App\Models\Calendar;
use Illuminate\Http\Request;

class CalendarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return new CalendarCollection(Calendar::paginate(5));
        $calendars = Calendar::with("calendarTasks")->paginate(5);
        return new CalendarCollection($calendars);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateCalendarRequest $request)
    {
        return new CalendarResource(Calendar::create($request->all()));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $calendar = Calendar::find($id);
        $calendar->load('calendarTasks');
        return new CalendarResource($calendar);
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
    public function update(UpdateCalendarRequest $request, string $id)
    {
        $calendar = Calendar::find($id);
        $calendar->update($request->all());
        return new CalendarResource($calendar);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $calendar = Calendar::find($id);
        $calendar->delete();
        return response()->json([
            "message" => "Calendar deleted successfully."
        ]);
    }
}
