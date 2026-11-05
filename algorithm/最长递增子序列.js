/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    const tails=[];
    for(const num of nums){
        let left=0,right=tails.length;
        while(left<right){
            let mid=Math.floor((left+right)/2);
            if(num>tails[mid]){
                left=mid+1;
            }
            else{
                right=mid;
            }
        }
        if(left===tails.length){
            tails.push(num);
        }
        else{
            tails[left]=num;
        }
    }
    return tails.length;
};

var lengthOfLIS2 = function(nums) {
    if(nums.length<=1) return nums.length;
    const dp=Array(nums.length).fill(1);
    let maxLen=1;
    for(let end=1;end<nums.length;end++){
        for(let start=0;start<end;start++){
            if(nums[start]<nums[end]){
                dp[end]=Math.max(dp[end],dp[start]+1);
            }
        }
        maxLen=Math.max(maxLen,dp[end]);
    }
    return maxLen;
};