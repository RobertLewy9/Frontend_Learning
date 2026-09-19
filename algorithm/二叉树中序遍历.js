//递归：
const inorderTraversal = function(root) {
const result=[];

Traversal(root,result);

return result;

};

function Traversal(root,result){

if(!root) return null;

Traversal(root.left,result); 
result.push(root.val);
Traversal(root.right,result);

}


//迭代：
const inorderTraversal1 = function(root) {
    const result = [];
    const stack = [];

    let cur = root;

    while (cur || stack.length) {
        // 1. 一直往左走，同时把经过的节点压栈
        while (cur) {
            stack.push(cur);
            cur = cur.left;
        }

        // 2. 左边走到底，弹出栈顶
        cur = stack.pop();

        // 3. 访问当前节点
        result.push(cur.val);

        // 4. 转向右子树
        cur = cur.right;
    }

    return result;
};

