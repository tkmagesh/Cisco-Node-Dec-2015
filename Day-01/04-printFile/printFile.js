var fs = require('fs');
/*
try{
    fs.readFile('./sample.txt', {encoding : 'utf8'}, function(fileContents){
        console.log(fileContents);
        console.log('---------------- EOF ------------');
    });
} catch (err){
    console.log('something went wrong', err);
}
*/

fs.readFile('./sample.txt', {encoding : 'utf8'}, function(err, fileContents){
    if (err) {
        console.log('something went wrong', err);
        return;
    }
    console.log(fileContents);
    console.log('---------------- EOF ------------');
});
console.log('end of program');

