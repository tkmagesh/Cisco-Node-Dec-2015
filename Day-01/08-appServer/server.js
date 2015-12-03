var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var qs = require('querystring');
var calculator = require('./calculator');

/*
    - parsing req data
    - serving static resources
    - serving /calculator requests
    - serving 404

*/
var staticExtns = ['.html','.js','.css','.xml','.json'];
function isStatic(resourcePath){
    var extn = path.extname(resourcePath);
    return staticExtns.indexOf(extn) !== -1;
}

var server = http.createServer(function(req, res){
    console.log('a new connection is established for ', req.url);
    var urlObj = url.parse(req.url, true);
    if (isStatic(urlObj.pathname)){
        var resource = path.join(__dirname, urlObj.pathname);
        if (fs.existsSync(resource)){
            fs.createReadStream(resource).pipe(res);
        } else {
            res.statusCode = 404;
            res.end();
        }
    } else if (urlObj.pathname === '/calculator' && req.method === 'GET'){
        var n1 = parseInt(urlObj.query.n1, 10),
            n2 = parseInt(urlObj.query.n2, 10),
            operation = urlObj.query.operation;
        var result = calculator[operation](n1,n2);
        res.write(result.toString());
        res.end();

    } else if (urlObj.pathname === '/calculator' && req.method === 'POST'){
        var reqDataString = '';
        req.on('data', function(chunk){
            reqDataString += chunk;
        });
        req.on('end', function(){
            var reqData = qs.parse(reqDataString);
            var n1 = parseInt(reqData.n1, 10),
                n2 = parseInt(reqData.n2, 10),
                operation = reqData.operation;
            var result = calculator[operation](n1,n2);
            res.write(result.toString());
            res.end();
        });
    } else {
        res.statusCode = 404;
        res.end();
    }
});
server.listen(8080);
console.log('server listening on 8080!');
