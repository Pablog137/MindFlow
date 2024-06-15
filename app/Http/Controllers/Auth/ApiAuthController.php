<?php

namespace App\Http\Controllers\Auth;


use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use App\Models\Calendar;
use App\Models\TodoList;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class ApiAuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6|confirmed',
            ]);
            if ($validator->fails()) {
                return response(['errors' => $validator->errors()->all()], 422);
            }
            $request['password'] = Hash::make($request['password']);
            $request['remember_token'] = Str::random(10);
            $user = User::create($request->toArray());
            Auth::login($user);
            TodoList::create([
                'id' => $user->id,
                'user_id' => $user->id,
            ]);
            Calendar::create([
                'id' => $user->id,
                'user_id' => $user->id,
            ]);
            $token = $user->createToken('Token');
            $response = [
                'user' => [
                    'name' => $user->name,
                    'email' => $user->email,
                ],
                'token' => $token->plainTextToken
            ];
            return response($response, 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
        ]);
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();

            $currentDate = now();
            $hasActiveSubscription = DB::table('payments')
                ->where('user_id', $user->id)
                ->where('expiration_date', '>=', $currentDate)
                ->exists();

            if ($hasActiveSubscription) {
                $user->user_type = 'premium';
            } else {
                $user->user_type = 'user';
            }

            $user->save();

            $token = $user->createToken('Token');
            $response = [
                'user' => [
                    'name' => $user->name,
                    'email' => $user->email,
                    'user_type' => $user->user_type,
                ],
                'token' => $token->plainTextToken
            ];
            return response($response, 200);
        } else {
            $response = ["message" => 'User does not exist'];
            return response($response, 422);
        }
    }


    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        $response = ['message' => 'You have been successfully logged out!'];
        return response($response, 200);
    }



    public function sendPasswordRecoveryEmail(Request $request)
    {
        $baseUrl = env('APP_BASE_URL');
        $resetLink = $baseUrl . "new-password?email=" . $request->email;
        $datos = [
            'email' => $request->email,
            'resetLink' => $resetLink
        ];
        if (!User::where('email', $request->email)->exists()) {
            return response()->json(['message' => 'The provided email does not exist.', "type" => "error"]);
        }

        try {
            Mail::send('emails.password_recovery', ['data' => $datos], function ($message) use ($datos) {
                $message->to($datos['email'])
                    ->subject('Password Recovery')
                    ->from(config('mail.from.address'), config('mail.from.name'));
            });

            return response()->json(['message' => 'The email has been sent successfully.', "type" => "success"]);
        } catch (Exception $e) {
            return response()->json(['message' => "An error occurred while sending the email: " . $e->getMessage(), "type" => "error"]);
        }
    }


    public function resetPassword(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => ['required', 'string', 'min:6'],
            ]);
            $user = User::where('email', $request->email)->first();
            $user->password = Hash::make($request->password);
            $user->save();
            return response()->json(['message' => 'Contraseña cambiada exitosamente', "type" => "success"]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), "type" => "error"], 500);
        }
    }
}
