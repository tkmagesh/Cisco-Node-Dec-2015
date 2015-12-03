var http = require('http');
var fs = require('fs');
var path = require('path');

var server = http.createServer(function(req, res){
    console.log('a new connection is established for ', req.url);
    var resource = path.join(__dirname, req.url);
    if (fs.existsSync(resource)){
        fs.createReadStream(resource).pipe(res);
    } else {
        res.statusCode = 404;
        res.end();
    }
});
server.listen(8080);
console.log('server listening on 8080!');
