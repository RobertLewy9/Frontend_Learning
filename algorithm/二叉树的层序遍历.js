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

const levelOrder = function(root) {
    const result=[];
    if (!root) return result;
    const queue=[];
    queue.push(root);
    let head=0;
    while(head<queue.length){
        const currentlevelSize=queue.length-head;
        const level=[];
        for(let i=1;i<=currentlevelSize;i++){
            const node=queue[head++];
            level.push(node.val);
            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }
        result.push(level);
    }
    return result;
};

console.log(levelOrder(root1));
