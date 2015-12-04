var path = require('path'),
    fs = require('fs');

var staticExtns = ['.html','.js','.css','.xml','.json'];
function isStatic(resourcePath){
    var extn = path.extname(resourcePath);
    return staticExtns.indexOf(extn) !== -1;
}

module.exports = function(staticResourcePath){
    return function(req, res, next){
        if (isStatic(req.url.pathname)){
            var resource = path.join(staticResourcePath, req.url.pathname);
            if (fs.existsSync(resource)){
                //fs.createReadStream(resource).pipe(res);
                var stream = fs.createReadStream(resource);
                stream.on('data', function(chunk){
                    res.write(chunk);
                });
                stream.on('end', function(){
                    res.end();
                    //next()
                })
            } else {
                res.statusCode = 404;
                res.end();
            }
        } else {
            next();
        }
    }
};
