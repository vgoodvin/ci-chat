# CI-Chat

Simple web-chat build on Codeigniter and Node.js

## Used solutions

https://github.com/jamierumbelow/codeigniter-schema - Expressive table definitions
https://github.com/sockjs/sockjs-node - WebSocket emulation for Node.js server

## Requirements

* MySQL
* Node.js

## Installation

1. Create MySQL database
2. Configure your database connection in "application/config/database.php" and in "node-server/server.js"
3. Configure base_url in "application/config/config.php"
4. Run following commands

```bash
cd /project-root
chmod +x ./install
./install
node ./node-server/server.js
```

Visit "http://your-host/"
