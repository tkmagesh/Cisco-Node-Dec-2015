
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var calculator = require('./calculator');

/*
if (req -> static resource, serve it accordingly)
if (req -> /calculator, extract data from url , process and return the result)

/calculator?n1=100&n2=200&operation=add
*/

var staticExtns = ['.html','.js','.css','.xml','.json'];
function isStatic(resourcePath){
    var extn = path.extname(resourcePath);
    return staticExtns.indexOf(extn) !== -1;
}

var server = http.createServer(function(req, res){
    console.log('a new connection is established for ', req.url);
    var urlObj = url.parse(req.url, true);
    console.log(urlObj.pathname);
    if (isStatic(urlObj.pathname)){
        var resource = path.join(__dirname, urlObj.pathname);
        if (fs.existsSync(resource)){
            fs.createReadStream(resource).pipe(res);
        } else {
            res.statusCode = 404;
            res.end();
        }
    } else if (urlObj.pathname === '/calculator'){
        var n1 = parseInt(urlObj.query.n1, 10),
            n2 = parseInt(urlObj.query.n2, 10),
            operation = urlObj.query.operation;
        var result = calculator[operation](n1,n2);
        res.write(result.toString());
        res.end();

    } else {
        res.statusCode = 404;
        res.end();
    }
});
server.listen(8080);
console.log('server listening on 8080!');
