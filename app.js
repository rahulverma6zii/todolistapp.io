let itemList = document.querySelector(".item-list");
let item = document.querySelector(".item")
let input = document.querySelector("#input")
let current_date = new Date();
let refreshIcon=document.querySelector(".fa-refresh");
let task = document.querySelector("#task");
let LIST = JSON.parse(localStorage.getItem("LIST"));
let id = 0;
const dateType = { weekday: "long", month: "short", day: "numeric" }
let date = document.querySelector(".date")
date.innerHTML = current_date.toLocaleDateString("en-US", dateType);
LIST ? LIST.forEach(item => toDo(item.taskname, item.id, item.done, item.trash)) : "";
function toDo(x, id, isDone, isRemoved) {

    let DONE = isDone ? "fa-check-circle" : "fa-circle-o";

    let content = ` <li class="item py-1 border-1 border">
    <div class="row w-100 m-0 p-1 align-items-center">
        <i class="fa col-1 ml-0 float-none ${DONE} checkbox" type="checkbox" value="" onclick="taskUpdate(${id})"></i>
        <label class="col-9 ${isDone ? "text-decoration-line-through" : ""}" for="flexCheckDefault">
       ${x}
        </label>
       <button class="btn btn-sm text-white border-0 btn-outline-dark btn-danger col-2"  onclick="deleteItem(${id})">
        <i class=" fa fa-trash-o     ${isRemoved}" aria-hidden="true"></i>
        </button>
      </div>
</li>`;

    itemList.innerHTML += content;


}
function refreshApp() {
  
        refreshIcon.classList.toggle("refresh")
      
        itemList.innerHTML =""
    LIST=[];
    localStorage.setItem("LIST", JSON.stringify(LIST))

}
task.addEventListener("click", (e) => {
    if (input.value) {
        toDo(input.value, id, false, false)

        let ob = {
            taskname: input.value,
            id: id,
            done: false,
            trash: false
        };
        LIST.push(ob);
        localStorage.setItem("LIST", JSON.stringify(LIST))
        id++;
        input.value = "";
    }

})
function deleteItem(n) {
    let deletedTask = LIST.find(x => x.id == n);
    deletedTask.trash = true;
    LIST = LIST.filter(x => x.trash == false);
    updateLocalStorage();


}

function taskUpdate(n) {
    let requiredTask = LIST.find(x => x.id == n);
    if(LIST.some(x=>x.id==n)){
        requiredTask.done=!requiredTask.done
    }
    else{
       
        requiredTask.done = true;
       
    }
    updateLocalStorage();

}
function updateLocalStorage() {
    localStorage.setItem("LIST", JSON.stringify(LIST))
    itemList.innerHTML = "";
    LIST.forEach(item => toDo(item.taskname, item.id, item.done, item.trash))

}