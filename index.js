
const fs = require('fs');
const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;


const server = http.createServer((req, res) => {
	let reqPath = url.parse(req.url).pathname;
	console.log(reqPath);

	let mime = {
		html: 'text/html',
		txt: 'text/plain',
		css: 'text/css',
		gif: 'image/gif',
		jpg: 'image/jpeg',
		jpeg: 'image/jpeg',
		png: 'image/png',
		svg: 'image/svg+xml',
		xml: 'image/svg+xml',
		js: 'application/javascript',
		json: 'application/json',
		ico: 'image/vnd',
	};


	let parts = reqPath.split('.');
	let extn = parts.length > 1 ? parts.pop() : undefined;
	if(!extn) {
		reqPath = '/index.html';
		extn = 'html';
	}
	if(!Object.keys(mime).includes(extn)) {
		res.writeHeader(403, {'Content-Type': 'text/plain'});
        return res.end('Forbidden');
	} else {
		let s = fs.createReadStream(`.${reqPath}`);
		s.on('open', function () {
	        res.setHeader('Content-Type', mime[extn]);
	        s.pipe(res);
	    });
	    s.on('error', function () {
	        res.setHeader('Content-Type', 'text/plain');
	        res.statusCode = 404;
	        res.end('Not found');
	    });	
	}

}).listen(process.env.PORT || port, () => { console.log(`Server running. Port ${process.env.PORT} OR ${port}`); });

