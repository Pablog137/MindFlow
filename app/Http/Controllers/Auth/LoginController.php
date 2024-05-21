<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;




class LoginController extends Controller
{

    public function loginGithub(Request $request)
    {
        // Accede al código que se le pasa por la URL
        $code = $request->query('code');

        if (!$code) {
            return response()->json(['error' => 'Code parameter missing'], 400);
        }
        // Consigue el token
        $client = new Client();
        $response = $client->post('https://github.com/login/oauth/access_token', [
            'json' => [
                'client_id' => env("GITHUB_CLIENT_ID"),
                'client_secret' => env('GITHUB_CLIENT_SECRET'),
                'code' => $code,
                // 'scope' => 'repo'
            ],
            'headers' => [
                'Accept' => 'application/json',
            ],
        ]);
        // Consigue los datos del user
        $data = json_decode($response->getBody(), true);
        $accessToken = $data['access_token'];
        $userResponse = $client->get('https://api.github.com/user', [
            'headers' => [
                'Authorization' => 'Bearer ' . $accessToken,
                'Accept' => 'application/json',
            ],
        ]);

        $userData = json_decode($userResponse->getBody(), true);

        return response()->json([
            'data' => [
                'username' => $userData['login'],
                'access_token' => $accessToken,
            ]
        ]);
    }
 
}
