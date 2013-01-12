var http = require('http');
var sockjs = require('sockjs');
//var redis = require('redis');

/*var redisClient = redis.createClient(6379, 'localhost');
redisClient.subscribe('ci-chat');*/

var echo = sockjs.createServer();
echo.on('connection', function (conn) {
  conn.on('data', function (message) {
    conn.write('new message');
  });

  /*redisClient.on('message', function (channel, rawMsgData) {
    if (channel == 'ci-chat') {
      var msgData = JSON.parse(rawMsgData);
      console.log(msgData);
      var msgName = msgData[0];
      var msgArgs = msgData[1];
      switch(msgName) {
        case 'message': {
          console.log(msgArgs);
          //conn.write(message);
          break;
        }
        case 'login': {
          console.log(msgArgs);
          //conn.write(message);
          break;
        }
        case 'logout': {
          console.log(msgArgs);
          //conn.write(message);
          break;
        }
      }
    }
  });*/
});

var server = http.createServer();
echo.installHandlers(server, {prefix:'/chat'});
server.listen(9999, 'ci-chat');
