const p1=Promise.resolve("p1");
const p2=Promise.resolve("p2");
const p3 = new Promise(resolve => {
    setTimeout(() => {
        resolve("p3");
    }, 1000);
});

//const p4=Promise.reject("p4");


Promise.all([p1,p2,p3])
        .then((result)=>console.log(result))
        .catch(error=>{
            console.log(error)
        })

const p5=new Promise(resolve=>{
    setTimeout(()=>{resolve("p5")},600) //setTimeout(回调函数，延迟时间)
})

const p6=new Promise(resolve=>{
    setTimeout(()=>{resolve("p6")},300)
})

Promise.race([p5,p6])
        .then(result=>{
            console.log(result);
        })
        .catch(error=>{console.log(error)})


const p7 = Promise.resolve("p7");
const p8 = Promise.reject("p8超时失败");
const p9 = Promise.resolve("p9");
;
Promise.allSettled([p7,p8,p9])

        .then(result=>{
            console.log("AllSettled:")
            console.log(result);
        });


const p10 = Promise.reject("p10");
const p11 = Promise.reject("p11");
const p12 = Promise.reject("p12");

Promise.any([p10,p11,p12])
        .then(result=>{
            console.log("Any:")
            console.log(result)
        })
        .catch(aminos=>{
            console.log(aminos)
        })

