var https = require("https");
//var cool = require("cool-ascii-faces");

var botID = process.env.BOT_ID;

const PLEDGES_TEXT =
  "pledges: @Andy Demma @baljeet charvu @Ben Fiszel @Brandon Weiss @David Ramirez @Feddy @Jason Huang @Mike Montelli @Mitchell Negus @Noah Citron @Raymond Lin @RJ Shah @Thuan Tran @Tyler Feldman";

function respond() {
  var request = JSON.parse(this.req.chunks[0]);

  var at_pledges_regex = /@pledges/;
  var bot_test_regex = /bot_test/;

  botRegex = /^\/cool guy$/;

  if (request.text) {
    if (at_pledges_regex.test(request.text)) {
      this.res.writeHead(200);
      respondTo("@pledges");
      this.res.end();
    } else if (bot_test_regex.test(request.text)) {
      this.res.writeHead(200);
      respondTo("test");
      this.res.end();
    } else {
      console.log("don't care");
      this.res.writeHead(200);
      this.res.end();
    }
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

  botResponse = msg; // cool();

  var postData = '{"text" : "' + botResponse + '", "bot_id" : "53e45d131d15b145aae90ff582"}';

  var options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST',
    headers: {
      'Content-Type': ''
    }
  }

  // options = {
  //   hostname: "api.groupme.com",
  //   path: "/v3/bots/post",
  //   method: "POST"
  // };

  // body = {
  //   bot_id: botID,
  //   text: botResponse
  // };

  // console.log("sending " + botResponse + " to " + botID);

  // var dataString = '{"text" : "' + botResponse + '", "bot_id" : "53e45d131d15b145aae90ff582"}';

  // var options = {
  //     url: 'https://api.groupme.com/v3/bots/post',
  //     method: 'POST',
  //     body: dataString
  // };

  // function callback(error, response, body) {
  //     if (!error && response.statusCode == 200) {
  //         console.log(body);
  //     }
  // }

  // request(options, callback);  

  // botReq = HTTPS.request(options, function(res) {
  //   if (res.statusCode == 202) {
  //     //neat
  //   } else {
  //     console.log("rejecting bad status code " + res.statusCode);
  //   }
  // });

  // botReq.on("error", function(err) {
  //   console.log("error posting message " + JSON.stringify(err));
  // });
  // botReq.on("timeout", function(err) {
  //   console.log("timeout posting message " + JSON.stringify(err));
  // });
  // botReq.end(JSON.stringify(body));
}

exports.respond = respond;





