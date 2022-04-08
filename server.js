const express = require('express');
const app = express();

// we'll create our routes here

    // get an instance of router
    var router = express.Router();

    // home page route (http://localhost:8080)
    router.get('/', function(req, res) {
        res.send('im the home page!');
    });

    // about page route (http://localhost:8080/about)
    router.get('/about', function(req, res) {
        res.send('im the about page!');
    });


router.get("/youtube/callback", (req, res) => {
    res.send('im the youtube page!');
    
})

router.post('/youtube/callback', (req, res) => {
    console.log('here post', req.body, req.query, req.params, req.headers)

    let hmac = generateHMAC(req.query['hub.challenge'], 'very_secret', "sha1")
})

function generateHMAC(hmac, secret, algo = 'sha256'){
    return `${algo}=${crypto.createHmac(algo, secret).update(hmac).digest('hex')}`
}

    // apply the routes to our application
    app.use('/', router);



 

 
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});





