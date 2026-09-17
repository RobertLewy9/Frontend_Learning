
    // ==================== 第1题高级版 ====================
    console.log('第1题高级版如下：✋️');
    
    function createAsyncCache(fetchFn){
        let cache = null;
        return async () => {
            if(cache !== null){
                console.log('命中！');
                return cache;
            }
            console.log('发起请求');
            cache = fetchFn();
            return cache;
        };
    }
    
    const fetchData = () => new Promise(resolve =>
        setTimeout(() => resolve('用户数据'), 1000)
    );
    
    const cachedFetch = createAsyncCache(fetchData);
    cachedFetch().then(res => console.log(res));
    cachedFetch().then(res => console.log(res));

    // ==================== 第1题简化版 ====================
    // 等第1题高级版的异步操作（约1秒）执行完再开始
    setTimeout(() => {
        console.log('\n第1题简化版如下：✋️');
        
        const createBox = () => {
            let item = null;
            return async (newItem) => {
                if(item !== null){
                    console.log('盒子里有东西啦！');
                    return item;
                }
                console.log('盒子是空的，放东西进去');
                item = await newItem;
                return item;
            }
        }
        
        const myItem = (itemName) => new Promise(resolve => 
            setTimeout(() => resolve(itemName), 1000)
        );
        
        const myBox = createBox();
        console.time('苹果香蕉耗时');

        myBox(myItem('苹果'))
            .then(res => console.log(res))
            .then(() => myBox(myItem('香蕉')))
            .then(res => console.log(res))
            .then(() => {
                console.timeEnd('苹果香蕉耗时');
            });
    }, 1500); // 1.5秒后开始（留够第1题高级版的时间）

    // ==================== 第2题 ====================
    // 等第1题简化版的异步操作（约2秒）执行完再开始
    setTimeout(() => {
        console.log('\n第2题如下：✋️');
        
        class EventEmitter {
            constructor() {
                this.events = {};
            }

            on(eventName, callback) {
                if (!this.events[eventName]) {
                    this.events[eventName] = [];
                }
                this.events[eventName].push(callback);
            }

            emit(eventName, data) {
                const callbacks = this.events[eventName];
                if (callbacks) {
                    callbacks.forEach(cb => cb(data));
                }
            }
        }
        
        const emitter = new EventEmitter();

    // 1. 张三登记（on）
    emitter.on('红烧肉', () => {
        console.log('张三：我的红烧肉好了！');
    });

    // 此时 this.events 变成了：
    // { '红烧肉': [张三的回调函数] }

    // 2. 李四也登记（on）
    emitter.on('红烧肉', () => {
        console.log('李四：我的红烧肉好了！');
    });

    // 此时 this.events 变成了：
    // { '红烧肉': [张三的回调函数, 李四的回调函数] }

    emitter.on('红烧肉', (data) => {
        console.log('王五：'+ data);
    });

    // 3. 后厨喊：红烧肉好了！（emit）
    emitter.emit('红烧肉','我的红烧肉好了！');

    // emit 做的事：
    // 找到 this.events['红烧肉']，拿到 [张三的回调, 李四的回调]
    // 然后 forEach 挨个执行：
    //   张三的回调()  → 打印 "张三：我的红烧肉好了！"
    //   李四的回调()  → 打印 "李四：我的红烧肉好了！"
    }, 4000); // 4秒后开始（1.5 + 2.5，留够第1题简化版的时间）



    // ==================== 第3题 ====================\
    
    setTimeout(()=>{
    console.log('\n第3题如下：');
    console.log('1. 同步代码');

    setTimeout(() => {
        console.log('2. 宏任务 setTimeout');
    }, 0);

    const promise = new Promise((resolve) => {
        console.log('3. Promise 构造器内的同步代码');
        resolve('4. Promise resolve 的值');
    });

    promise.then((value) => {
        console.log(value); 
    });

    async function test() {
        console.log('5. async 函数内的同步代码');
        const res = await Promise.resolve('6. await 的值');
        console.log(res);
    }
    test();

    console.log('7. 最后的同步代码');} ,6000);

    //拓展---------------------------------------------------------------
    setTimeout(()=>{console.log('A. 同步代码');

    setTimeout(() => {
        console.log('B. setTimeout 1');
    }, 0);

    Promise.resolve().then(() => {
        console.log('C. Promise.then 1');
        setTimeout(() => {
            console.log('D. setTimeout 2（在微任务里注册的）');
        }, 0);
    });

    setTimeout(() => {
        console.log('E. setTimeout 3');
        Promise.resolve().then(() => {
            console.log('F. Promise.then 2（在宏任务里注册的）');
        });
    }, 0);

    async function foo() {
        console.log('G. async 同步部分');
        const res = await Promise.resolve('H. await 的值');
        console.log(res);
    }
    foo();

    console.log('I. 最后的同步代码');},7000);//答案：AGICH BEFD
                                            //错误：AGICH FBED



    function throttle(fn,delay){
        let lastTime=0;
        return function(...args){
            const now=Date.now();
            if(now-lastTime>=delay){
                fn.apply(this,args);
                lastTime=now;
            }
        };
    }     
    
    