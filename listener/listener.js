var http = require('http');
var sockjs = require('sockjs');
var mysql = require('mysql');
//var redis = require('redis');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'toor',
  database : 'cichat'
});

connection.connect();

/*var redisClient = redis.createClient(6379, 'localhost');
redisClient.subscribe('ci-chat');*/

var echo = sockjs.createServer();
var connections = [];

echo.on('connection', function (conn) {
  connections.push(conn);
  conn.on('data', function (message) {
    connection.query('SELECT * FROM messages ORDER BY id DESC LIMIT 1000', function(err, rows, fields) {
      if (err) throw err;

      var response = JSON.stringify(rows);
      connections.forEach(function (client) {
        client.write(response);
      });
    });


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
