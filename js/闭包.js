
//闭包最常见的使用场景
//① 数据私有化
console.log("数据私有化：")
function createCounter() {
    let count = 0;

    return {
        add() {
            count++;
        },

        get() {
            return count;
        }
    };
}

const counter = createCounter();

counter.add();
counter.add();

console.log(counter.get()); // 2


//② 保存状态
let count=0;
function outer(){
    

    function inner(){
        count++;
        console.log(count);
    }
    return inner;
}

const fn=outer();

fn();
fn();
fn();


//③ 函数工厂
function createAdd(x) {
    return function(y) {
        return x + y;
    };
}

const add10 = createAdd(10);

console.log(add10(5));  // 15
console.log(add10(20)); // 30