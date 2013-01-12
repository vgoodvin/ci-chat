var http = require('http');
var sockjs = require('sockjs');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'toor',
  database : 'cichat'
});

connection.connect();

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
});

var server = http.createServer();
echo.installHandlers(server, {prefix:'/chat'});
server.listen(9999, 'ci-chat');
