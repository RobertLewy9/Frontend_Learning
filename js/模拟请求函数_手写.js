//模拟请求函数_手写
import { myPromiseAll } from "./Promise_all_race_手写.js";
//模拟请求成功
function mockRequest(name,delay){
    return new Promise((resolve,reject)=>{

        setTimeout(() => {
            resolve(name);
        }, delay);

    })

}

mockRequest("用户信息是？",1000).then(result=>{console.log(result)})

//模拟请求失败
function mockRequest1(name,delay,success){
    return new Promise((resolve,reject)=>{

        setTimeout(()=>{
            if (success) {
                resolve(name);
            } else {
                reject("请求失败："+name);
            }
        },delay)

    })
}

mockRequest1("用户密码是？",1100,false).then(result=>{console.log(result)})
                                    .catch(error=>{console.log("错误！");console.log(error)})

const user=mockRequest1("用户信息",1000,true);                                    
const product=mockRequest1("商品信息",500,true);                                    
const order=mockRequest1("订单信息",800,false);     

myPromiseAll([user,product,order])
            .then(result=>{console.log(result)})
            .catch(error=>{console.log(error)})
