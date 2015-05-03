## What's needed

For this project you'll need Node.JS and grunt-cli installed.

## How to use

    git clone https://github.com/lucasbedout/JSFight.git
    cd JSFight
    npm install
    grunt

You can now see your app at `http://localhost:3000` !

## Develop

Once the server is up and running, you can modify CSS and JS files in public/src folder, Grunt will automatically compile and minify them each time you make a change.

## API routes

### User signup

    POST    /auth/signup

Paramètres : **username**, **password**

### User login

    POST    /auth/login

Paramètres : **username**, **password**

### User logout

    GET    /auth/logout
        