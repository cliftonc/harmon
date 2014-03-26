var http = require('http'),
	connect = require('connect'),
    httpProxy = require('http-proxy');

var selects = [];
var simpleselect = {};

simpleselect.query = '.b';
simpleselect.func = function (node) {
    node.createWriteStream().end('<div>+ Trumpet</div>');
}
selects.push(simpleselect);

var harmon = require('../')([], selects);
var proxy = httpProxy.createProxyServer({target: 'http://127.0.0.1:9000'});

connect.createServer(
  harmon,
  function (req, res) {
    proxy.web(req, res);
  }
).listen(8000);

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<html><head></head><body><div class="a">Nodejitsu Http Proxy</div><div class="b">&amp; Frames</div></body></html>');
  res.end();
}).listen(9000); 
