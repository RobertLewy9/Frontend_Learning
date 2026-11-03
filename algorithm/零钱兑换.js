/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (let currentAmount = 1; currentAmount <= amount; currentAmount++) {
        for (const coin of coins) {
            if (coin <= currentAmount) {
                dp[currentAmount] = Math.min(
                    dp[currentAmount],
                    dp[currentAmount - coin] + 1
                );
            }
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount];
};