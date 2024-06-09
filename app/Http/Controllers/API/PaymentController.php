<?php

namespace App\Http\Controllers\API;

use App\Models\Payment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\PaymentResource;
use App\Http\Resources\PaymentCollection;
use App\Http\Requests\CreatePaymentRequest;
use App\Models\User;
use Carbon\Carbon;


class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // public function index()
    // {
    //     return new PaymentCollection(Payment::paginate(5));
    // }

    /**
     * Show the form for creating a new resource.
     */
    // public function create()
    // {
    //     //
    // }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $userId = $request->user()->id;

            // Crear el objeto de fecha actual
            $currentDate = Carbon::now();

            // Calcular la fecha de expiración (dentro de un mes)
            $expirationDate = $currentDate->copy()->addMonth();

            // Actualizar el tipo de usuario a premium
            User::where('id', $userId)->update(['user_type' => 'premium']);

            $payment = new Payment();
            $payment->user_id = $userId;
            $payment->payment_date = $currentDate;
            $payment->expiration_date = $expirationDate;
            $payment->save();

            return response()->json([
                "message" => "Pago creado exitosamente",
                "payment" => new PaymentResource($payment)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "error" => "Error al crear el pago",
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    // public function show(string $id)
    // {
    //     $payment = Payment::find($id);
    //     return new PaymentResource($payment);
    // }

    /**
     * Show the form for editing the specified resource.
     */
    // public function edit(string $id)
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, string $id)
    // {
    //     $payment = Payment::find($id);
    //     $payment->update($request->all());
    //     return new PaymentResource($payment);
    // }

    /**
     * Remove the specified resource from storage.
     */
    // public function destroy(string $id)
    // {
    //     $payment = Payment::find($id);
    //     $payment->delete();
    //     return response()->json([
    //         "message" => "Pago borrado"
    //     ]);
    // }
}
