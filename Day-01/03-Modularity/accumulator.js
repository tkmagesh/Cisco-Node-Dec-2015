/*
create an accumulator object that exhibits the following methods
    - add(x)
    - subtract(x)
    - multiply(x)
    - divide(x)
    - getResult()

    Test Case
    acc.getResult() //=> 0
    acc.add(100);
    acc.subtract(50);
    acc.multiply(10);
    acc.divide(2);
    acc
    .getResult() //=> 250
*/
console.log('accumulator is being loaded');
var tranCount = 0;
function getAccumulator(){
    var result = 0;

    var accumulator = {
        add : function(x){
            ++tranCount;
            result += x;
        },
        subtract : function(x){
            ++tranCount;
            result -= x;
        },
        multiply : function(x){
            ++tranCount;
            result *= x;
        },
        divide : function(x){
            ++tranCount;
            result /= x;
        },
        getResult : function(){
            return result;
        },
        getTransactionCount : function(){
            return tranCount;
        }
    };
    return accumulator;
}
module.exports = getAccumulator;
