
nums = [3, 2, 1, 5, 6, 4];
k = 2;

var findKthLargest = function(nums, k) {
    const heap=[];

    //一路向上调整确保为最小堆
    function push(val){
        heap.push(val);
        let i=heap.length-1;
        while(i>0){
            const parent=Math.floor((i-1)/2);
            if(heap[parent]<=heap[i]) break;
            [heap[parent],heap[i]]=[heap[i],heap[parent]];
            i=parent;
        }
    }
    //
    function pop(){
        const min=heap[0];
        const last=heap.pop();
        if(heap.length>0){
            heap[0]=last;
            let i=0;
            while(true){
                let smallest=i;
                const left=2*i+1;
                const right=2*i+2;
                if(left<heap.length&&heap[left]<heap[smallest]){
                    smallest=left;
                }
                if(right<heap.length&&heap[right]<heap[smallest]){
                    smallest=right;
                }
                if(smallest===i) break;
                [heap[i],heap[smallest]]=[heap[smallest],heap[i]];
                i=smallest;
            }
        } 
        return min;
    }

    for(const num of nums){
        push(num);
        if(heap.length>k){
            pop();
        }
    }
    return heap[0];
}

console.log(findKthLargest(nums,k))