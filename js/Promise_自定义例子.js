//1
const a = new Promise((resolve, reject) => {
  resolve("yes");
  reject("no");
});

a.then((data)=>{
    console.log(data)
})
 .catch((err)=>
    {console.log(err)
 })


//2

const b=new Promise((x,y)=>{
    x("abc");
    y("abcd");
})

b.then((data)=>{
    console.log(data);
    return data;})
 .then((data)=>console.log(data+1))
 .catch((err)=>console.log(err))


//3

const c=new Promise((resolve)=>
    {
        const queue=[];
        resolve(queue);
    })

c.then((q)=>{
    return q.length;
})
.then((length)=>{
    if(length<=0) throw new Error("数组为空！");
    console.log("数组长度为"+length);
})
.catch((error)=>{
    console.log(error.message);
})


