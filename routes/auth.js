module.exports = {

    'facebookAuth' : {
        'clientID'      : 'your-secret-clientID-here', // your App ID
        'clientSecret'  : 'your-client-secret-here', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '507526581695-n36gbr1lh5ktp1i3egaea4oujobt7f1a.apps.googleusercontent.com',
        'clientSecret'  : 'RI73ju3UQzhF8Pxul7GJOw_s',
        'callbackURL'   : 'http://127.0.0.1:3000/built-login/'
    }

};
