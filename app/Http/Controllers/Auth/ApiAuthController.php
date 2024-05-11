<?php

namespace App\Http\Controllers\Auth;


use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;


use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
}
