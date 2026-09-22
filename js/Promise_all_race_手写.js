//Promise_all_race_手写
export function myPromiseAll(promises) {
    return new Promise((resolve, reject) => {
        const result = [];
        let count = 0;

        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then(value => {
                    result[index] = value;
                    count++;

                    if (count === promises.length) {
                        resolve(result);
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    });
}

export function myPromiseRace(promises) {
    return new Promise((resolve, reject) => {
        promises.forEach(promise => {
            Promise.resolve(promise)
                .then(value => {
                    resolve(value);
                })
                .catch(error => {
                    reject(error);
                });
        });
    });
}