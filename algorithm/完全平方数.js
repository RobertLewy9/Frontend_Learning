/**
 * @param {number} n
 * @return {number}
 * 279. 完全平方数
中等
给你一个整数 n ，返回 和为 n 的完全平方数的最少数量 。

完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，
其值等于一个整数自乘的积。例如，1、4、9 和 16 都是完全平方数，
而 3 和 11 不是。
 * 
 * 我的理解：最少能用m个完全平方数来表示整数n,求m.
 */
var numSquares = function(n) {
    const dp = Array(n + 1).fill(Infinity);
    dp[0] = 0;

    for (let i = 1; i <= n; i++) {
        for (let square = 1; square * square <= i; square++) {
            dp[i] = Math.min(dp[i], dp[i - square * square] + 1);
        }
    }

    return dp[n];
};