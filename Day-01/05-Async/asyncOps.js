/* Sync */
function addSync(x,y){
    console.log('[SP] processing ', x , ' and ', y);
    if (!x || !y) throw new Error('insufficient arguments');
    var result = x + y;
    console.log('[SP] returning result');
    return result;
}

function addSyncClient(x,y){
    console.log('[SC] triggering add operation');
    try{
        var result = addSync(x,y);
        console.log('[SC] result = ', result);
    } catch (err){
        console.log('error - ', err);
    }
}

module.exports.addSyncClient = addSyncClient;

/* Async */
function add(x,y, onResult){
    console.log('[SP] processing ', x , ' and ', y);
    setTimeout(function(){
        if (!x || !y) {
            var e = new Error('insufficient arguments');
            onResult(e, null);
            return;
        }
        var result = x + y;
        console.log('[SP] returning result');
        if (typeof onResult === 'function')
            onResult(null, result);
    },3000);
}

function addClient(x,y){
    console.log('[SC] triggering add operation');
    add(x,y, function(err, result){
        if (err){
            console.log('error - ', err);
            return;
        }
        console.log('[SC] result = ', result);
    });
}

module.exports.addClient = addClient;
