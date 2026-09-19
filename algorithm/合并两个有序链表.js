function ListNode(val, next) {
     this.val = (val===undefined ? 0 : val)
     this.next = (next===undefined ? null : next)
 }
 
const list1 = new ListNode(
    1,
    new ListNode(
        2,
        new ListNode(
            6,
            new ListNode(
                7,
                new ListNode(8)
            )
        )
    )
);

const list2 = new ListNode(
    0,
    new ListNode(
        1,
        new ListNode(
            2,
            new ListNode(
                6,
                new ListNode(9)
            )
        )
    )
);

const mergeTwoLists = function(list1, list2) {
    const prehead=new ListNode(-1);
    let point=prehead;
    while(list1!==null&&list2!==null){
        if(list1.val<=list2.val){
            point.next=list1;
            list1=list1.next;
        }
        else{
            point.next=list2;
            list2=list2.next;
        }
        point=point.next;
    }

    point.next=list1===null? list2:list1;
    return prehead.next;
};

console.log(mergeTwoLists(list1,list2));

const mergeTwoLists1=function(list1, list2) {
    if(!list1) return list2;
    if(!list2) return list1;

    if(list1.val<list2.val){
        list1.next=mergeTwoLists1(list1.next,list2);
        return list1;
    }
    else{
        list2.next=mergeTwoLists1(list2.next,list1);
        return list2;
    }
}

