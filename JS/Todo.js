
const firstTab = document.querySelector('.firstTab');
const secondTab = document.querySelector('.secondTab');

const container = document.querySelector('.container');
var inputValue = document.querySelector('.input');
var dateValue = document.querySelector('.datepicker');
var timeValue = document.querySelector('.timepicker');
var homeAnchor = document.getElementById('myHome');
const add = document.querySelector('.add');
const completed = document.querySelector('.completed');


var tasksAnchor = document.getElementById('myTasks');
var isTab = "home";
// window.localStorage.setItem("isTab", isTab);
if (window.localStorage.getItem("isTab") === "home") {

    home();
} else if (window.localStorage.getItem("isTab") === "tasks") {
    tasks();

}else{
    homeAnchor.style.color = 'white';
    tasksAnchor.style.color = 'white';
    document.getElementById('tasks').style.borderLeft = 'none';
    document.getElementById('home').style.borderLeft = 'none';
}
function home() {
    // document.querySelector('h1').innerHTML = 'Add Task';
    isTab = "home";
    window.localStorage.setItem("isTab", isTab);
    
    console.log(homeAnchor);
   
    homeAnchor.style.color = 'lightgreen';
    document.getElementById('home').style.borderLeft = '10px solid lightgreen';
    document.getElementById('tasks').style.borderLeft = 'none';
    tasksAnchor.style.color = 'white';
    firstTab.style.display = 'block';
    secondTab.style.display = 'none';


}
function tasks() {
    // document.querySelector('h1').innerHTML = 'Tasks';
    isTab = "tasks";
    window.localStorage.setItem("isTab", isTab);
    document.getElementById('tasks').style.borderLeft = '10px solid lightgreen';
    document.getElementById('home').style.borderLeft = 'none';
    homeAnchor.style.color = 'white';
    tasksAnchor.style.color = 'lightgreen';
    firstTab.style.display = 'none';
    secondTab.style.display = 'block';
    console.log("kk");
}
if (window.localStorage.getItem("todos") == undefined) {
    var todos = [];

    window.localStorage.setItem("todos", JSON.stringify(todos));
}
if (window.localStorage.getItem("dateTime") == undefined) {
    var dateTime = [];

    window.localStorage.setItem("dateTime", JSON.stringify(dateTime));
}
if (window.localStorage.getItem("completeDateTime") == undefined) {
    var completeDateTime = [];

    window.localStorage.setItem("completeDateTime", JSON.stringify(completeDateTime));
}
if (window.localStorage.getItem("completedArray") == undefined) {
    var completedArray = [];

    window.localStorage.setItem("completedArray", JSON.stringify(completedArray));
}
if (window.localStorage.getItem("starArray") == undefined) {
    var starArray = [];

    window.localStorage.setItem("starArray", JSON.stringify(starArray));
}

var todosEX = window.localStorage.getItem("todos");
var todos = JSON.parse(todosEX);

var dateTimeEX = window.localStorage.getItem("dateTime");
var dateTime = JSON.parse(dateTimeEX);

var completeDateTimeEX = window.localStorage.getItem("completeDateTime");
var completeDateTime = JSON.parse(completeDateTimeEX);

var starArrayEX = window.localStorage.getItem("starArray");
var starArray = JSON.parse(starArrayEX);

var completedEX = window.localStorage.getItem("completedArray");
var completedArray = JSON.parse(completedEX);

class item {
    constructor(name, dateTimeValue, divContainer) {
        this.createItem(name, dateTimeValue, divContainer);
    }
    createItem(name, dateTimeValue, divContainer) {

        var itemBox = document.createElement('div');
        itemBox.classList.add('item');
        var dateBox = document.createElement('div');
        dateBox.classList.add('dateTime');

        var input = document.createElement('input');
        input.type = "text";
        input.disabled = true;
        input.value = name;
        input.classList.add('item_input');




        var checkForCompleted = document.createElement('INPUT');
        checkForCompleted.setAttribute("type", "checkbox");
        checkForCompleted.classList.add('checkbox');


        // due date
        var dueDate = document.createElement('p');
        dueDate.classList.add('dueDate');
        dueDate.innerHTML = '<i class="material-icons today" style="color:red; font-size:15px;">today</i> <span>' + `${dateTimeValue}` + '</span>';


        // change function to check important
        var arrayName;
        if (divContainer === "completed") {
            checkForCompleted.setAttribute("checked", "true");
            arrayName = "completedArray";
        } else {
            arrayName = "todos";
        }


        checkForCompleted.addEventListener('click', () => this.complete(checkForCompleted, dateTimeValue, dueDate, itemBox, input, arrayName));


        var star = document.createElement('button');
        star.classList.add('star');

        star.innerHTML = '<i class="material-icons star_rate">star_rate</i>';
        // change function to mark important
        star.addEventListener('click', () => this.star(star, name, arrayName));

        var edit = document.createElement('button');
        edit.classList.add('edit');
        edit.innerHTML = '<i class="material-icons create">create</i>';
        edit.addEventListener('click', () => this.edit(input, name, arrayName, edit));



        var remove = document.createElement('button');
        remove.classList.add('remove');
        remove.innerHTML = '<i class="material-icons delete">delete</i>';

        remove.addEventListener('click', () => this.remove(itemBox, name, arrayName));


        // if(divContainer === "container"){
        //     container.appendChild(itemBox);
        // }else if(divContainer === "completed"){
        //     completed.appendChild(itemBox);
        // }
        document.querySelector("." + `${divContainer}`).appendChild(itemBox);
        itemBox.appendChild(checkForCompleted);
        itemBox.appendChild(input);
        itemBox.appendChild(dueDate);
        itemBox.appendChild(edit);
        itemBox.appendChild(star);
        itemBox.appendChild(remove);


    }


    edit(input, name, arrayName, edit) {
        if (input.disabled == true) {
            input.disabled = !input.disabled;
            edit.innerHTML = '<i class="material-icons create" style="color:blue;">create</i>';
            window.addEventListener('keydown', (e) => {
                if (e.which == 13) {
                    // this.edit(input, name, arrayName, edit);
                    input.disabled = !input.disabled;
                    edit.innerHTML = '<i class="material-icons create" style="color:grey;">create</i>';
                    if (arrayName === "todos") {
                        let indexof = todos.indexOf(name);
                        todos[indexof] = input.value;
                        window.localStorage.setItem(`${arrayName}`, JSON.stringify(todos));
                    } else {
                        let indexof = completedArray.indexOf(name);
                        completedArray[indexof] = input.value;
                        window.localStorage.setItem(`${arrayName}`, JSON.stringify(completedArray));
                    }
                }
            });
        }
        else {
            input.disabled = !input.disabled;
            edit.innerHTML = '<i class="material-icons create" style="color:grey;">create</i>';
            if (arrayName === "todos") {
                let indexof = todos.indexOf(name);
                todos[indexof] = input.value;
                window.localStorage.setItem(`${arrayName}`, JSON.stringify(todos));
            } else {
                let indexof = completedArray.indexOf(name);
                completedArray[indexof] = input.value;
                window.localStorage.setItem(`${arrayName}`, JSON.stringify(completedArray));
            }

        }



    }

    star(star, name, arrayName) {
        let index = todos.indexOf(name);
        if (star.innerHTML === '<i class="material-icons star_rate">star_rate</i>') {
            starArray[index] = 1;
            window.localStorage.setItem("starArray", JSON.stringify(starArray));
            star.innerHTML = '<i class="material-icons star_rate" style="color:#FFBA00;">star_rate</i>';
        }
        else {
            starArray[index] = 0;
            window.localStorage.setItem("starArray", JSON.stringify(starArray));
            star.innerHTML = '<i class="material-icons star_rate">star_rate</i>';
        }


    }

    remove(itemBox, name, arrayName) {

        itemBox.parentNode.removeChild(itemBox);

        if (arrayName === "todos") {
            let index = todos.indexOf(name);
            // console.log(index);
            // console.log(name);
            todos.splice(index, 1);
            starArray.splice(index, 1);
            dateTime.splice(index, 1);
            window.localStorage.setItem("todos", JSON.stringify(todos));
            window.localStorage.setItem("starArray", JSON.stringify(starArray));
            window.localStorage.setItem("dateTime", JSON.stringify(dateTime));
        } else {
            let index = completedArray.indexOf(name);
            completedArray.splice(index, 1);
            completeDateTime.splice(index, 1);
            window.localStorage.setItem("completedArray", JSON.stringify(completedArray));
            window.localStorage.setItem("completeDateTime", JSON.stringify(completeDateTime));
            if (completedArray.length <= 0) {
                document.querySelector("h2").innerHTML = "";
            }
        }

    }

    complete(checkForCompleted, dateTimeValue, dueDate, itemBox, input, arrayName) {


        if (checkForCompleted.checked) {
            // console.log(checkForCompleted.checked);
            // console.log(dueDate.querySelector("span"));

            this.remove(itemBox, input.value, "todos");
            new item(input.value, dateTimeValue, "completed");
            completedArray.push(input.value);
            completeDateTime.push(dateTimeValue);
            window.localStorage.setItem("completedArray", JSON.stringify(completedArray));
            window.localStorage.setItem("completeDateTime", JSON.stringify(completeDateTime));
            input.style.textDecoration = "line-through";
            //dueDate.style.textDecoration ="line-through";
            //dueDate.querySelector("span").style.textDecoration = "line-through";
            itemBox.style.opacity = 0.5;
            // var checkboxes = document.getElementsByClassName("completed");
            // checkboxes.checked=true;


        } else {
            input.style.textDecoration = "none";
            dueDate.querySelector("span").style.textDecoration = "none";
            itemBox.style.opacity = 1;
            this.remove(itemBox, input.value, "completedArray");
            new item(input.value, dateTimeValue, "container");
            todos.push(input.value);
            dateTime.push(dateTimeValue);
            window.localStorage.setItem("todos", JSON.stringify(todos));
            window.localStorage.setItem("dateTime", JSON.stringify(dateTime));
        }
        if (completedArray.length > 0) {
            document.querySelector("h2").innerHTML = "COMPLETED";
        }
        else {
            document.querySelector("h2").innerHTML = "";
        }
    }

}

add.addEventListener('click', check);
inputValue.addEventListener('keydown', (e) => {
    if (e.which == 13) {
        check();
    }
})





// function check(){
// 	if(inputValue.value != ""){
//         new item(inputValue.value, divContainer);
//         // arrayName === "completed" ?completed.push(inputValue.value): todos.push(inputValue.value);
//         // arrayName.push(inputValue.value);
//         if(arrayName === "completedArray"){
//             completed.push(inputValue.value);
//             window.localStorage.setItem("completedArray", JSON.stringify(completed));
//         }else{
//             todos.push(inputValue.value);
//             window.localStorage.setItem("todos", JSON.stringify(todos));
//         }

// 		inputValue.value = "";
// 	}
// }

function check() {
    if (inputValue.value != "" && dateValue.value != "" && timeValue.value != "") {
        showSuccess(inputValue, "input-group");
        showSuccess(dateValue, "calendar");
        showSuccess(timeValue, "clock");
        var dateTimeValue = dateValue.value + " " + timeValue.value;
        new item(inputValue.value, dateTimeValue, "container");
        todos.push(inputValue.value);
        dateTime.push(dateTimeValue);
        starArray.push(0);
        window.localStorage.setItem("todos", JSON.stringify(todos));
        window.localStorage.setItem("dateTime", JSON.stringify(dateTime));
        window.localStorage.setItem("starArray", JSON.stringify(starArray));
        inputValue.value = "";
        dateValue.value = "";
        timeValue.value = "";
    } else {
        if (inputValue.value === "") {
            showError(inputValue, "input-group", "Enter Task");
        }
        else {
            showSuccess(inputValue, "input-group");
        }
        if (dateValue.value === "") {
            showError(dateValue, "calendar", "Enter date");
        }
        else {
            showSuccess(dateValue, "calendar");
        }
        if (timeValue.value === "") {
            showError(timeValue, "clock", "Enter time");
        }
        else {
            showSuccess(timeValue, "clock");
        }


    }
}

function showError(input, className, msg) {
    const formControl = input.parentNode;
    formControl.className = `${className}` + ' error';
    const small = formControl.querySelector('small');
    // console.log(formControl.className);
    small.innerHTML = msg;
}
function showSuccess(input, className) {
    const formControl = input.parentNode;
    formControl.className = `${className}`;
    // console.log(formControl.className);
}


for (var v = 0; v < todos.length; v++) {
    new item(todos[v], dateTime[v], "container");

    // var box = todos[v];
    // if (box.hasAttribute("store")) {
    //     setupBox(box);
    // }
}

for (var v = 0; v < completedArray.length; v++) {
    if (completedArray.length > 0) {
        document.querySelector("h2").innerHTML = "COMPLETED";
    }
    else {
        document.querySelector("h2").innerHTML = "";
    }
    new item(completedArray[v], completeDateTime[v], "completed");

}
// console.log(container);
var abc = document.querySelectorAll(".item");
// console.log(abc);
for (var v = 0; v < starArray.length; v++) {
    if (starArray[v] === 1) {
        // console.log(abc[v].childNodes[4]);
        var xyz = abc[v].childNodes[4];

        xyz.innerHTML = '<i class="material-icons star_rate" style="color:#FFBA00;">star_rate</i>';
    }

}
var boxes = document.querySelectorAll("input[type='checkbox']");



// function setupBox(box) {
//     var storageId = box.getAttribute("store");
//     var oldVal    = localStorage.getItem(storageId);
//     box.checked = oldVal === "true" ? true : false;

//     box.addEventListener("change", function() {
//         localStorage.setItem(storageId, this.checked); 
//     });
// }




// code for hiding input when task tab is opened

// var isTab;
// // window.localStorage.setItem("isTab", isTab);
// if (window.localStorage.getItem("isTab") === "home") {

//     home();
// } else if (window.localStorage.getItem("isTab") === "tasks") {
//     tasks();

// }


// function home() {
//     firstTab.style.display = 'block';
//     secondTab.style.display = 'none';
//     isTab = "home";
//     window.localStorage.setItem("isTab", isTab);
// }
// function tasks() {
//     firstTab.style.display = 'none';
//     secondTab.style.display = 'block';
//     isTab = "tasks";
//     window.localStorage.setItem("isTab", isTab);
// }