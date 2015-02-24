IPFS Middleware
===============

Server ipfs objects from `/ipfs/` on a server.

Install
```
npm install ipfs-node-server-static
```

*Currently only allows no mount point for express*


Express
```javascript
var ipfs_static = require('./')('localhost', 5001)

var express = require('express')
var app = express()

app.use(ipfs_static)

app.get('/', function (req, res) {
  res.send('Hello World!')
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
```

Stock Http
```javascript
var ipfs_static = require('./')('localhost', 5001)

var http = require('http')

var server = http.Server(function (req, res) {
	var send404 = (function() {
		return function send404() {
			res.writeHead(404)
			res.end()
		}
	})()

	ipfs_static(req, res, send404) 

}).listen(3000, function () { 
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})
```
