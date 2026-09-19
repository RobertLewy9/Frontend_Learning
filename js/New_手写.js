function MyNew(Constructor,...args){
    const obj={};

    Object.setPrototypeOf(obj,Constructor.prototype);

    const result=Constructor.apply(obj,args);

    return result instanceof Object? result:obj;

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