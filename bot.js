var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

const PLEDGES_TEXT = "pledges: @Andy Demma @baljeet charvu @Ben Fiszel @Brandon Weiss @David Ramirez @Feddy @Jason Huang @Mike Montelli @Mitchell Negus @Noah Citron @Raymond Lin @RJ Shah @Thuan Tran @Tyler Feldman";


function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/cool guy$/;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    respondTo(request.text);
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function respondTo(trigger) {
  if (trigger === "@pledges") {
    postMessage(PLEDGES_TEXT);
  } else if (trigger === "test") {
    postMessage("Test successful!");
  }
}


function postMessage(msg) {
  var botResponse, options, body, botReq;

  botResponse = msg;    // cool();

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;