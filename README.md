IPFS Middleware
===============

Server ipfs objects from `/ipfs/` on a server through the API 
interface. 

By default only objects are served and actual api access is disabled.
See other options at the end to enable the API.

If you wish to simply serve static files through the ipfs gateway
I guess you guys [proxy-middleware](https://www.npmjs.com/package/proxy-middleware)

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

Other options

*API*
By default `ipfs-node-server-static` uses the api to fullfil requests. You
can enable the pass of `/api/` as well by passing true to the `api` option.

```
var ipfs_static = require('./')('localhost', 5001, {api: true})
```
