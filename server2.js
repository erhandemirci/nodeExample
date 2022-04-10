var pubSubHubbub = require("pubsubhubbub");


var options = {
  callback: "https://youtubenotificationserverapp.herokuapp.com/youtube/callback",
  topic: "https://www.youtube.com/xml/feeds/videos.xml?channel_id=UC1zAttFQKikWoKH3Vb39ETA",
  mode: "subscribe",
  method: "POST",
  
};

var pubSubSubscriber = pubSubHubbub.createServer(options);
var topic = "https://www.youtube.com/xml/feeds/videos.xml?channel_id=UC1zAttFQKikWoKH3Vb39ETA";
var hub = "http://pubsubhubbub.appspot.com/";

pubSubSubscriber.on("subscribe", function(data){
    console.log(data.topic + " subscribed");
});



pubSubSubscriber.on("listen", function(){
    pubSubSubscriber.subscribe(topic, hub, function(err){
        if(err){
            console.log("Failed subscribing");
        }
    });
});   
    
  
