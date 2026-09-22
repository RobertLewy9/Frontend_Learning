const p1=Promise.resolve("a");
const p2=Promise.resolve("b");
const p3=Promise.resolve("c");
const p4=Promise.reject("d");


Promise.all([p1,p2,p4])
        .then((result)=>console.log(result))
        .catch(error=>{
            console.log(error)
        })

const p5=new Promise(resolve=>{
    setTimeout(()=>{resolve("A",200)})
})

const p6=new Promise(resolve=>{
    setTimeout(()=>{resolve("B",300)})
})

Promise.race([p5,p6])
        .then(result=>{
            console.log(result);
        })
        .catch(error=>{console.log(error)})

        

