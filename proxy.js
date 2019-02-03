var http = require('http'),
httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({
	target: 'https://env14.calheers.local',
	secure: false
}).listen(8000);

proxy.on('proxyRes', function (proxyRes, req, res) {
	// workaround for OPTIONS disallowed
	if(proxyRes.statusCode === 403) {
		proxyRes.statusCode = 200;
		proxyRes.statusMessage = 'OK';
	}
	proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type';
	proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:8080';
	proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type,X-Auth-Token';
	proxyRes.headers['Access-Control-Allow-Origin'] = '*';
	proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
  console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
});
