/**
 * @param {number[]} nums
 * @return {number}
 */


let nums=[9,1,1,9];
var rob = function(nums) {
    let prev2 = 0;
    let prev1 = 0;

    for (const amount of nums) {
        const current = Math.max(prev1, prev2 + amount);
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
};

var rob2= function(nums){
    const dp=[0];
    for(let i=1;i<=nums.length;i++){
        const notRob=dp[i-1];
        const Rob=(i>=2?dp[i-2]:0)+nums[i-1];
        dp[i]=Math.max(notRob,Rob);
    }
    return dp[nums.length];
}