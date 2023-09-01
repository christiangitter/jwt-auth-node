# How to authenticate a node.js API with JWT

## Install required packages

we need to install the following packages:

1. express -> `npm i express`
2. jsonwebtoken -> `npm i jsonwebtoken`
3. dotenv -> `npm i dotenv`

## How to generate a random token secret using node

To generate a token oben up another terminal. <br>
Start node with typing the command `node`.
Generate a Token with the following command `require('crypto').randomBytes(64).toString('hex')`.<br>
This will generate a token which you can store in youre .env-File.

## Hot to get the secured data

To get the content from the route `/posts` you need to get a access token first.
To get an access token use the POST-Request `/login` with the following body:

```
{
    "username": "Max"
}
```

Copy the `accessToken`.

Now you can use this token in the GET-Request `/posts`.<br>
Only you have to do is set the authorization to `Bearer Token` and paste the `accessToken`.
