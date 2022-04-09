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
app.get("/search", (req, res) => {
    const searchQuery = req.query.search_query;
    res.send(searchQuery);
}


router.get("/youtube/callback", (req, res) => {
    console.log('here', req.body, req.query, req.params, req.headers)
    let query = req.query
    if('hub.challenge' in query){
        let channelID = query['hub.topic'].split('=').pop()
        /*if(!bot.youtube.pendingVerify.has(channelID)) {
            console.log('Invalid youtube hook sent to me', channelID, req.headers)
            return res.sendStatus(401)
        }*/
        bot.youtube.lease.set(channelID, Date.now() + (query['hub.lease_seconds'] * 1000))
        bot.youtube.pendingVerify.delete(channelID)
        return res.status(202).send(query['hub.challenge'])
    }
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





