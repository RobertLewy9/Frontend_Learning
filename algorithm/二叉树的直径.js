
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

const diameterOfBinaryTree=function(root){
    let ans=1;
    function depth(node){
    if(node==null)
        return 0;

    const L=depth(node.left);
    const R=depth(node.right);

    ans=Math.max(ans,L+R+1);
    return Math.max(L,R)+1;二叉树的层序遍历
    }
    depth(root);
    return ans-1;

}

console.log(diameterOfBinaryTree(root));


