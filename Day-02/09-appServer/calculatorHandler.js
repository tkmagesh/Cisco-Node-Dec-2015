var calculator = require('./calculator'),
    qs = require('querystring');

module.exports = function(req, res, next){
    if (req.url.pathname === '/calculator'){
        console.log('beginning calculator')
        if(req.method === 'GET'){
            var n1 = parseInt(req.url.query.n1, 10),
                n2 = parseInt(req.url.query.n2, 10),
                operation = req.url.query.operation;
            var result = calculator[operation](n1,n2);
            res.write(result.toString());
            res.end();

        } else if (req.method === 'POST'){
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
            next();
        }
        console.log('ending calculator')
    }
}
