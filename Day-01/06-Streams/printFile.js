var fs = require('fs');
var stream = fs.createReadStream('./sample.txt', {encoding : 'utf8'});
var readCount = 0;
stream.on('data', function(chunk){
    ++readCount;
    console.log(chunk.length);
});
stream.on('error', function(err){
    console.log('something went wrong', err);
});
stream.on('end', function(){
    console.log('---------------- EOF ------------ with ', readCount, ' reads!!');
})
console.log('end of program');
