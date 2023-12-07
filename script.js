let tasks=document.getElementById("tasks");
let tbody=document.getElementsByTagName("tbody")[0];
let toDoList=JSON.parse(localStorage.getItem("toDoDatabase")) || [] ;
let refreshbutton=document.getElementsByClassName("fa-refresh")[0];
let id=0;
let date=document.getElementsByClassName("date");

renderFromLocalStorage();

function renderFromLocalStorage() {
    tbody.innerHTML=''
    toDoList.forEach(x=>{
        let line_through=x.isDone ? "text-decoration-line-through" : "";
        let checkedSquare=x.isDone? "fa-check-square-o" : "fa fa-square-o";
        tbody.innerHTML+=`<tr class="align-items-center">
        <td> <i class="fa ${checkedSquare}" onClick="taskDone(${x.id});"></i></td>
       
        <td class="${line_through}">${x.name}</td>
        <td class="text-end"> <button class="btn btn-danger btn-sm" onclick="deleteTask(${x.id});">
                Delete
            </button> </td>
    </tr>`

    })

    

}
setInterval(updateTime,1000)
function updateTime() {
    let dateNow=new Date();
    let dateType={weekday:"long",month:"short",day : "numeric",year:"numeric"};
    date[0].innerHTML=`${dateNow.toLocaleString("en-US",dateType)} ${dateNow.toLocaleTimeString()}`
}





function addtask() {
        let newTask={};
        newTask.name=tasks.value;
        newTask.id=id++
        newTask.isDone=false;
        newTask.isDelet=false;
        toDoList.push(newTask);

        localStorage.setItem("toDoDatabase",JSON.stringify(toDoList))
        
       renderFromLocalStorage();
       

    tasks.value="";
}
function taskDone(id) {
            toDoList=JSON.parse(localStorage.getItem("toDoDatabase"));
            let doneTask=toDoList.find(x=>x.id==id);
            doneTask.isDone=!doneTask.isDone;
            localStorage.setItem("toDoDatabase",JSON.stringify(toDoList))
          console.log(doneTask)
            renderFromLocalStorage();
}


function refresh() {
    localStorage.clear();
    refreshbutton.style.animationName="refresh-rotate";
    setTimeout(function(){
        refreshbutton.style.animationName=""
    },1000)
   tbody.innerHTML=''
   toDoList=[];
   tasks.value=''
}
function deleteTask(id) {
    toDoList=JSON.parse(localStorage.getItem("toDoDatabase"));
    let deleteTask=toDoList.find(x=>x.id==id);
    toDoList=toDoList.filter(x=>x.id!=deleteTask.id);
    localStorage.setItem("toDoDatabase",JSON.stringify(toDoList));
    renderFromLocalStorage();
}