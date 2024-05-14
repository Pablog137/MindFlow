<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Recovery</title>
</head>

<body>
    <p>Hello,</p>

    <p>You recently requested to reset your password. Please click the link below to proceed with the password reset process:</p>

    <p><a href="{{ $data['resetLink'] }}">Reset Password</a></p>

    <p>If you did not request a password reset, you can safely ignore this email.</p>

    <p>Thank you,</p>
    <p>{{ config('app.name') }}</p>
</body>

</html>