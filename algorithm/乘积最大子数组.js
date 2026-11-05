/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
    //双层循环暴力枚举每个子序列的乘积，但是超时
    if(nums.length<=1) return nums[0];
    let maxMul=-Infinity;
    for(let start=0;start<nums.length;start++){
        let currentMul=1;
        for(let end=start;end<nums.length;end++){
           currentMul*=nums[end];
           maxMul=Math.max(maxMul,currentMul);
        }
    }
    return maxMul;
};

var maxProduct2 = function(nums) {
    //ai给出的超绝动态规划，记录上一轮的最大最小值乘以当前num后的最大最小值，
    // 进行比较
    let maxEnding=nums[0];
    let minEnding=nums[0];
    let maxMul=nums[0];
    for(let i=1;i<nums.length;i++){
        const num=nums[i];
        const prevMax=maxEnding;
        const prevMin=minEnding;
        maxEnding=Math.max(num,prevMax*num,prevMin*num);
        minEnding=Math.min(num,prevMax*num,prevMin*num);
        maxMul=Math.max(maxMul,maxEnding);
    }

    return maxMul;
};


var maxProduct3 = function(nums) {
    //最像之前做过的动态规划
    //借用两个最大最小数组存储以nums[i]结尾的最小乘积最大乘积
    //并非存储的
    const maxDp=Array(nums.length),minDp=Array(nums.length);
    let maxMul=nums[0];
    maxDp[0]=nums[0];
    minDp[0]=nums[0];
    for(let i=1;i<nums.length;i++){
        maxDp[i]=Math.max(nums[i],maxDp[i-1]*nums[i],minDp[i-1]*nums[i]);
        minDp[i]=Math.min(nums[i],maxDp[i-1]*nums[i],minDp[i-1]*nums[i]);
        maxMul=Math.max(maxMul,maxDp[i]);
    }
    return maxMul;
}