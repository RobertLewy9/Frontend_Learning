// ==========================================
        // 【概念1：作用域 (Scope)】
        // 核心：变量在哪里能被看到？
        // ==========================================
        let globalVar = "我是全局变量"; // 全局作用域：全页面都能访问

        function outerFunc() {
            let outerVar = "我是外部函数变量"; // 函数作用域：只有函数内部能访问
            
            if (true) {
                let blockVar = "我是块级变量"; // 块级作用域：只有 {} 内部能访问
                var funcVar = "我是var变量"; // var 没有块级作用域，会泄露到 outerFunc 中
                console.log("在块内可以访问:", globalVar, outerVar, blockVar);
            }
            
            // console.log(blockVar); // ❌ 报错！出了 {} 就找不到了
            console.log("在函数内可以访问:", funcVar); // ✅ var 泄露出来了
        }
        outerFunc();


        // ==========================================
        // 【概念2：闭包 (Closure)】
        // 核心：函数记住了它出生的环境，即使环境已经销毁
        // ==========================================
        function createCounter() {
            let count = 0; // 局部变量，本应在函数执行完后被垃圾回收
            
            // 返回一个内部函数，这个函数“引用”了 count
            return function() {
                count++; // 内部函数记住了外部的 count
                console.log(`当前点击次数: ${count}`);
            };
        }

        const myCounter = createCounter(); // createCounter 已经执行完毕
        myCounter(); // 输出 1 （闭包生效，count 没被销毁）
        myCounter(); // 输出 2 （这就是为什么 Vue/React 里的状态能保持）
        console.log(myCounter);

        // ==========================================
        // 【概念3：原型链 (Prototype Chain)】
        // 核心：找属性时，自己找不到就找“爸爸”
        // ==========================================
        function Animal(name) {
            this.name = name;
        }
        // 给“爸爸”（原型）添加一个方法
        Animal.prototype.speak = function() {
            return `${this.name} 会发声`;
        };

        const dog = new Animal("旺财");
        console.log(dog.name);   // ✅ 自己找到了
        console.log(dog.speak()); // ✅ 自己没找到，顺着 __proto__ 找到了 Animal.prototype.speak
        console.log(dog.toString()); // ✅ 继续往上找，找到了 Object.prototype.toString


        // ==========================================
        // 【概念4：异步编程 (Async/Await)】
        // 核心：用同步的写法，处理异步的逻辑
        // ==========================================
        // 模拟一个耗时 1 秒的网络请求
        function fetchUserData() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ id: 1, name: "前端大佬" });
                }, 1000);
            });
        }

        async function showUser() {
            console.log("🚀 开始请求用户数据...");
            const user = await fetchUserData(); // 暂停在这里，但不卡死页面
            console.log("✅ 拿到数据:", user);
        }
        showUser();


        // ==========================================
        // 【概念5：事件循环 (Event Loop)】
        // 核心：同步 > 微任务 > 宏任务
        // ==========================================
        console.log("1. 我是同步代码 (主线程直接执行)");

        setTimeout(() => {
            console.log("4. 我是宏任务 (setTimeout)");
        }, 0);

        Promise.resolve().then(() => {
            console.log("3. 我是微任务 (Promise.then)");
        });

        console.log("2. 我也是同步代码");
        
        // 【控制台最终输出顺序】：1 -> 2 -> 3 -> 4
        // 【原理解析】：
        // 1. JS 引擎先执行所有同步代码，打印 1 和 2。
        // 2. 同步代码执行完，主线程空闲，Event Loop 开始检查队列。
        // 3. 【微任务优先】：发现 Promise.then，执行，打印 3。
        // 4. 【微任务清空后】：去宏任务队列拿 setTimeout，执行，打印 4。