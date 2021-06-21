//Selectors
const clear = document.querySelector(".clear");
const list = document.getElementById("list");
const date = document.getElementById("date");
const input = document.getElementById('input');

//typedef
const Check = "fa-check-circle";
const Uncheck = 'fa-circle-thin';
const LineThrough = 'lineThrough';

//List of items 
let List = [],
    id = 0;

//get item from local Storage
let data = localStorage.getItem('TODO');
if (data) {
    List = JSON.parse(data);
    id = List.length;
    LoadList(List);
} else {
    List = [];
    id = 0;
}

function LoadList(todo) {
    todo.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//add item to Local storage
localStorage.setItem("TODO", JSON.stringify(List));

//clear the Local storage
clear.addEventListener('click', function() {
    localStorage.clear();
    location.reload();
});

//Showing date
let today = new Date();
let options = { day: "numeric", weekday: "long", month: "short" };
date.innerHTML = today.toLocaleDateString('en-US', options);


function addToDo(toDo, id, done, trash) {
    if (trash) { return; }
    const Done = done ? Check : Uncheck;
    const line = done ? LineThrough : "";
    let item = `<li class='item'>
                <i class="fa ${Done} co" job='complete' id='${id}'></i>
                <p class ="text ${line}">${toDo}</p>
                <i class ="fa fa-trash de" job='delete' id='${id}'></i>
            </li>`;
    const position = 'beforeend';
    list.insertAdjacentHTML(position, item);
}

document.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        const toDo = input.value;
        if (toDo) {
            addToDo(toDo, id, false, false);
            List.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });

            localStorage.setItem("TODO", JSON.stringify(List));
            id++;
        }
        input.value = "";
    }
});

//complete to do
function completeToDo(element) {
    element.classList.toggle(Check);
    element.classList.toggle(Uncheck);
    element.parentNode.querySelector('.text').classList.toggle(LineThrough);
    List[element.id].done = List[element.id].done ? false : true;
}

//remove to do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    List[element.id].trash = true;
}

//eventListener
list.addEventListener("click", function(event) {
    let element = event.target;
    const elementJob = element.attributes.job.value;
    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }

    localStorage.setItem("TODO", JSON.stringify(List));
});

//button 
let btn = document.getElementById('hide');
btn.addEventListener("click", function() {
    let todo = document.querySelector('.container-todo');
    todo.classList.toggle('hidden');
});