//新增数据函数
function addRow(){
    var table=document.getElementById('table');
    // console.log(table);
    //获取插入位置,即行数
    var length=table.rows.length;
    
    //插入行节点
    var newRow=table.insertRow(length);
    // console.log(newRow);
    
    //修改节点文本内容
    var nameCol =newRow.insertCell(0);
    var maleCol =newRow.insertCell(1);
    var ageCol =newRow.insertCell(2);
    var actionCol=newRow.insertCell(3);

    var inputName=prompt('请输入名字：');
    var inputMale=prompt('请输入性别：');
    var inputAge=prompt('请输入年龄：');

    nameCol.innerHTML=inputName;
    maleCol.innerHTML=inputMale;
    ageCol.innerHTML=inputAge;
    actionCol.innerHTML='<td><button onclick="editRow(this)">编辑</button><button onclick="deleteRow(this)">删除</button></td>';

}

//删除函数
function deleteRow(button){
    var row=button.parentNode.parentNode;
    console.log(row);
    row.parentNode.removeChild(row);
}

//编辑函数
function editRow(button){
    console.log(button);
    var row=button.parentNode.parentNode;
    var name=row.cells[0];
    var male=row.cells[1];
    var age=row.cells[2];
    var action=row.cells[3];

    var inputName=prompt('请输入名字：');
    var inputMale=prompt('请输入性别：');
    var inputAge=prompt('请输入年龄：');

    name.innerHTML=inputName;
    male.innerHTML=inputMale;
    age.innerHTML=inputAge;
    action.innerHTML='<td><button onclick="editRow(this)">编辑</button><button onclick="deleteRow(this)">删除</button></td>';


}





