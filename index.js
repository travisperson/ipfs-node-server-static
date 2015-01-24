var ipfs = require('ipfs-api')
var http = require('http')
var url = require('url')
var merge = require('utils-merge')
var path = require('path')

exports = module.exports = function serveStatic(host, port, options) {
	console.log("Setup")
	if (!host || !port) {
		throw new TypeError('host and port required')
	}

	if (typeof host !== 'string') {
		throw new TypeError('host must be a string')
	}

	var ipfs_local= ipfs(host, port)

	return function serveStatic(req, res, next) {

		if (typeof next != "function") {
			next = function() {}
		}

		if (req.method !== 'GET' && req.method !== 'HEAD') {
			return next()
		}

		var p = url.parse(req.url)
			p = p.pathname
			p = path.normalize(p)
			p = p.split('/')

		if (p[0].length == 0) {
			p.shift()
		}

		if (p[0] != "ipfs" || p[1].length < 3) {
			return next();
		}

		if (p[0] == "ipfs") {
			ipfs_local.cat(p[1], function(err, data) {
				if(err) {
					return next()
				}

				if(data.readable) {
					data.pipe(res)
				} else {
					res.write(data)
				}
			})
		}
	}

}
