//EventLoop_基本原理
//////////////////////////第1关///////////////////////////////
setTimeout(()=>{
    function A() {
    console.log("A start");
    B();
    console.log("A end");
    }

    function B() {
        console.log("B start");
        C();
        console.log("B end");
    }

    function C() {
        console.log("C");
    }

    A();
    console.log("最后");
    },1000);


/////////////////////////////////第2关/////////////////////////////////
console.log("1");

setTimeout(() => {
    console.log("2");
}, 0);

console.log("3");


///////////////////////////////////第3关///////////////////////////////
console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

setTimeout(() => {
    console.log("C");
}, 0);

console.log("D");


///////////////////////////////////第4关///////////////////////////////
console.log("1");

setTimeout(() => {
    console.log("2");
}, 0);

Promise.resolve().then(() => {
    console.log("3");
});

console.log("4");


///////////////////////////////////第5关///////////////////////////////
console.log("1");

setTimeout(() => {
    console.log("2");

    Promise.resolve().then(() => {
        console.log("3");
    });

}, 0);

Promise.resolve().then(() => {
    console.log("4");

    setTimeout(() => {
        console.log("5");
    }, 0);
});

console.log("6");


