const root={
    val:2,
    left:{
        val:4,
        left:{
            val:7,
            left:{
                val:9,
                left:null,
                right:null
            },
            right:null
        },
        right:{
            val:9,
            left:{
                val:1,
                left:null,
                right:null
            },
            right:null
        }
    },
    right:{
        val:4,
        left:{
            val:7,
            left:{
                val:9,
                left:null,
                right:null
            },
            right:null
        },
        right:{
            val:9,
            left:{
                val:1,
                left:null,
                right:null
            },
            right:null
        }
    }
}

const root1 = {
    val: 2,

    left: {
        val: 4,

        left: {
            val: 7,

            left: {
                val: 9,
                left: null,
                right: null
            },

            right: null
        },

        right: {
            val: 9,

            left: {
                val: 1,
                left: null,
                right: null
            },

            right: null
        }
    },

    right: {
        val: 4,

        left: {
            val: 9,

            left: null,

            right: {
                val: 1,
                left: null,
                right: null
            }
        },

        right: {
            val: 7,

            left: null,

            right: {
                val: 9,
                left: null,
                right: null
            }
        }
    }
};

//////////////////////////1.递归///////////////////////////////
const isSymmetric = function(root){
    if(root==null) return true;

    return check(root.left,root.right);
}

function check(L,R){
    if(L===null&&R===null) return true;
    if(L===null||R===null||L.val!==R.val) return false;

    return check(L.left,R.right)&&check(L.right,R.left);
}

console.log('这是递归的结果：'+isSymmetric(root1));

//////////////////////////2.迭代///////////////////////////////

const isSymmetric1 = function(root){
    if(root==null) return true;

    const stack=[root.left,root.right];
    while(stack.length>0){
        const x=stack.pop();
        const y=stack.pop();

        if(x===null&&y===null) continue;
        if(x===null||y===null||x.val!==y.val) return false;

        if(x.left) stack.push(x.left);
        if(x.right) stack.push(x.right);
    }
    return true;
}

console.log('这是迭代的结果：'+isSymmetric(root1));
