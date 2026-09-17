
    function getData(){
        return Promise.resolve("hello");
    }

    async function test() {
        const data =await getData();
        console.log(data);
    }

    test();

    function getData1(){
        return new Promise((resolve,reject)=>{
            fetch("/api/user").then(res=>{
                if(res.ok){
                    resolve('Success');
                }
                else{
                    reject("Failure");
                }
            })
            .catch(err=>{
                reject(err);
            })
        }
        );
    }