function MyNew(Constructor,...args){
    //1.创建新对象
    const obj={};
    //2.将新对象原型与构造函数原型绑定,即obj._proto_=Constructor.prototype
    Object.setPrototypeOf(obj,Constructor.prototype);
    //3.以obj作为this调用构造函数通过apply传参
    const result=Constructor.apply(obj,args);
    //4.若构造函数已返回对象则优先返回该对象，否则返回新建对象
    return ((typeof result==="Object"&&result!==null)||(typeof result=== "function"))? result:obj;

}

//测试:

function Person(name,age){
    this.name=name;
    this.age=age;

}

Person.prototype.sayHi=function(){
    console.log("你好我是"+this.name);
}


const p=MyNew(Person,'Robert',20)
p.sayHi();

function MyNew1(Constructor,...args){
    const obj=[];

    Object.setPrototypeOf(obj,Constructor.prototype);

    const result=Constructor.apply(obj,args);

    return ((typeof result==="object"&&typeof result !==null)||typeof result==="function")? result:obj;

}

