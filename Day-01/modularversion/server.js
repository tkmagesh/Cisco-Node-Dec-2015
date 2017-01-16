var http = require('http');
var fs = require('fs');
var calculator = require('./calculator');
var urlDao = require('./processURLData');
var staticExtns = ['.html','.js','.css','.xml','.json'];
function isStatic(extn){
       return staticExtns.indexOf(extn) !== -1;
}

var server = http.createServer(function(req, res){
    console.log('a new connection is established for ', req.url);
    var customUrlObj = urlDao(req);
    if (isStatic(customUrlObj.fileExtension)){
        var resource = customUrlObj.filePhysicalPath;
         if (fs.existsSync(resource)){
            fs.createReadStream(resource).pipe(res);
        } else {
            res.statusCode = 404;
            res.end();
        }
    } else if (customUrlObj.fileName === '/calculator' && req.method === 'GET'){
         var n1 = parseInt(customUrlObj.query.n1, 10),
            n2 = parseInt(customUrlObj.query.n2, 10),
            operation = customUrlObj.query.operation;
        var result = calculator[operation](n1,n2);
        res.write(result.toString());
        res.end();

    } else if (customUrlObj.fileName === '/calculator' && req.method === 'POST'){
        var reqDataString = '';
        req.on('data', function(chunk){
            reqDataString += chunk;
        });
        req.on('end', function(){
            var reqData = customUrlObj.getQueryFromQS(reqDataString);
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
server.listen(1337, '127.0.0.1');
console.log('server listening on http://127.0.0.1:1337/');
