<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Firebase\JWT\JWT;
use Google_Client;

class GoogleController extends Controller
{
    public function handleGoogleLogin(Request $request)
    {
        $client = new Google_Client(['client_id' => config('services.google.client_id')]);

        // Đảm bảo rằng bạn có token từ request
        if (!$request->has('token')) {
            return response()->json(['error' => 'Token not provided'], 400);
        }

        $idToken = $request->token;
        $payload = $client->verifyIdToken($idToken);

        if ($payload) {
            $user = User::firstOrCreate(
                ['email' => $payload['email']],
                ['name' => $payload['name']]
            );
            Auth::login($user);

            // Create JWT for the authenticated user
            $key = env('JWT_SECRET');
            $jwt = JWT::encode(['sub' => $user->id, 'email' => $user->email], $key);

            return response()->json(['token' => $jwt]);
        } else {
            return response()->json(['error' => 'Invalid Google token'], 401);
        }
    }
}
