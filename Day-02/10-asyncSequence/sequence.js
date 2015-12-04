function f1Sync(){
    console.log('f1Sync is triggered');
    console.log('f1Sync is completed');
}
function f2Sync(){
    console.log('f2Sync is triggered');
    console.log('f2Sync is completed');
}
function f3Sync(){
    console.log('f3Sync is triggered');
    console.log('f3Sync is completed');
}
function f4Sync(){
    console.log('f4Sync is triggered');
    console.log('f4Sync is completed');
}

module.exports.runSync = function(){
    f1Sync();
    f2Sync();
    f3Sync();
    f4Sync();
};

function f1(){
    console.log('f1 is triggered');
    setTimeout(function(){
        console.log('f1 is completed');
    },2000)

}
function f2(){
    console.log('f2 is triggered');
    setTimeout(function(){
        console.log('f2 is completed');
    },2000)

}
function f3(){
    console.log('f3 is triggered');
    setTimeout(function(){
        console.log('f3 is completed');
    },2000)

}
function f4(){
    console.log('f4 is triggered');
    setTimeout(function(){
        console.log('f4 is completed');
    },2000)
}

module.exports.run = function(){
    f1();
    f2();
    f3();
    f4();
};
