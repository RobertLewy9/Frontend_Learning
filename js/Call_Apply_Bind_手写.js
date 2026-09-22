// ==================== call ====================

Function.prototype.myCall = function (context, ...args) {
    context = context || globalThis;

    const key = Symbol();
    context[key] = this;

    const result = context[key](...args);

    delete context[key];

    return result;
};
//所以手写 call 的灵魂就是：“借对象调用函数。”


// ==================== apply ====================

Function.prototype.myApply = function (context, args) {
    context = context || globalThis;

    const key = Symbol();
    context[key] = this;

    const result = args
        ? context[key](...args)
        : context[key]();

    delete context[key];

    return result;
};


// ==================== bind ====================

Function.prototype.myBind = function (context, ...args1) {
    const fn = this;

    return function (...args2) {
        return fn.apply(context, [...args1, ...args2]);
    };
};


// ==================== 测试====================

const person={
    name:"Alex"
}

function sayHi(age,city){
    console.log(this.name,age,city);
    return "Hello";
}

const fn=sayHi.myBind(person,20,"上海");

console.log(fn());
