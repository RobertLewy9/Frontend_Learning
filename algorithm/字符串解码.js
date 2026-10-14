var decodeString = function(s) {
    const stack=[];
    let num=0;
    let str="";
    
    for(const char of s){
        if(char>='0'&&char<='9'){
            num=num*10+Number(char);
        }
        else if(char==='['){
            stack.push([str,num]);
            str="";
            num=0;
        }
        else if(char===']'){
            const [prvStr,repeat]=stack.pop();
            str=prvStr+str.repeat(repeat);
        }
        else{
            str+=char;
        }

    }


    return str;
};