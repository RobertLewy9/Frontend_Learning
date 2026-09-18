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

var sortedArrayToBST = function(nums) {
    function build(left,right){
        if(left>right) return null;
        const mid=Math.floor((left+right)/2);
        const root=new TreeNode(nums[mid]);
        root.left=build(left,mid-1);
        root.right=build(mid+1,right);
        return root;
    }

    return build(0,nums.length-1);
}


