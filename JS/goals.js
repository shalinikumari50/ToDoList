

const container = document.querySelector('.container');
var inputValue = document.querySelector('.input');

const add = document.querySelector('.add');
const completed = document.querySelector('.completed');
const taskVector = document.getElementById('goals-vector');

function home() {
    isTab = "home";
    window.sessionStorage.setItem("isTab", isTab);
} function tasks() {
    isTab = "tasks";
    window.sessionStorage.setItem("isTab", isTab);
}
if (window.localStorage.getItem("goalsTodos") == undefined) {
    var goalsTodos = [];

    window.localStorage.setItem("goalsTodos", JSON.stringify(goalsTodos));
}

if (window.localStorage.getItem("goalsCompletedArray") == undefined) {
    var goalsCompletedArray = [];

    window.localStorage.setItem("goalsCompletedArray", JSON.stringify(goalsCompletedArray));
}
if (window.localStorage.getItem("goalsStarArray") == undefined) {
    var goalsStarArray = [];

    window.localStorage.setItem("goalsStarArray", JSON.stringify(goalsStarArray));
}

var goalsTodosEX = window.localStorage.getItem("goalsTodos");
var goalsTodos = JSON.parse(goalsTodosEX);



var goalsStarArrayEX = window.localStorage.getItem("goalsStarArray");
var goalsStarArray = JSON.parse(goalsStarArrayEX);

var completedEX = window.localStorage.getItem("goalsCompletedArray");
var goalsCompletedArray = JSON.parse(completedEX);
class item {
    constructor(name, divContainer) {
        this.createItem(name, divContainer);
    }
    createItem(name, divContainer) {
        var itemBox = document.createElement('div');
        itemBox.classList.add('item');


        var input = document.createElement('input');
        input.type = "text";
        input.disabled = true;
        input.value = name;
        input.classList.add('item_input');

        var checkForCompleted = document.createElement('INPUT');
        checkForCompleted.setAttribute("type", "checkbox");
        checkForCompleted.classList.add('checkbox');




        // change function to check important
        var arrayName;
        if (divContainer === "completed") {
            checkForCompleted.setAttribute("checked", "true");
            arrayName = "goalsCompletedArray";
        } else {
            arrayName = "goalsTodos";
        }
        checkForCompleted.addEventListener('click', () => this.complete(checkForCompleted, itemBox, input, arrayName));


        var star = document.createElement('button');
        star.classList.add('star');

        star.innerHTML = '<i class="material-icons star_rate">star_rate</i>';
        // change function to mark important
        star.addEventListener('click', () => this.star(star, name, arrayName));

        var edit = document.createElement('button');
        edit.classList.add('edit');
        edit.innerHTML = '<i class="material-icons create">create</i>';
        edit.addEventListener('click', () => this.edit(input, name, edit, arrayName));

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

        itemBox.appendChild(edit);
        itemBox.appendChild(star);
        itemBox.appendChild(remove);

    }

    edit(input, name, edit, arrayName) {
        if (input.disabled == true) {
            input.disabled = !input.disabled;

            edit.innerHTML = '<i class="material-icons create" style="color:blue;">create</i>';
            window.addEventListener('keydown', (e) => {
                if (e.which == 13) {
                    // this.edit(input, name, arrayName, edit);
                    input.disabled = !input.disabled;
                    edit.innerHTML = '<i class="material-icons create" style="color:grey;">create</i>';
                    if (arrayName === "goalsTodos") {
                        let indexof = goalsTodos.indexOf(name);
                        goalsTodos[indexof] = input.value;
                        window.localStorage.setItem(`${arrayName}`, JSON.stringify(goalsTodos));
                    } else {
                        let indexof = goalsCompletedArray.indexOf(name);
                        goalsCompletedArray[indexof] = input.value;
                        window.localStorage.setItem(`${arrayName}`, JSON.stringify(goalsCompletedArray));
                    }
                }
            });
        }
        else {
            input.disabled = !input.disabled;
            edit.innerHTML = '<i class="material-icons create" style="color:grey;">create</i>';
            if (arrayName === "goalsTodos") {
                let indexof = goalsTodos.indexOf(name);
                goalsTodos[indexof] = input.value;
                window.localStorage.setItem(`${arrayName}`, JSON.stringify(goalsTodos));
            } else {
                let indexof = goalsCompletedArray.indexOf(name);
                goalsCompletedArray[indexof] = input.value;
                window.localStorage.setItem(`${arrayName}`, JSON.stringify(goalsCompletedArray));
            }

        }
    }

    star(star, name, arrayName) {
        let index = goalsTodos.indexOf(name);
        if (star.innerHTML === '<i class="material-icons star_rate">star_rate</i>') {
            goalsStarArray[index] = 1;
            window.localStorage.setItem("goalsStarArray", JSON.stringify(goalsStarArray));
            star.innerHTML = '<i class="material-icons star_rate" style="color:yellow;">star_rate</i>';
        }
        else {
            goalsStarArray[index] = 0;
            window.localStorage.setItem("goalsStarArray", JSON.stringify(goalsStarArray));
            star.innerHTML = '<i class="material-icons star_rate">star_rate</i>';
        }


    }

    remove(itemBox, name, arrayName) {

        itemBox.parentNode.removeChild(itemBox);

        if (arrayName === "goalsTodos") {
            let index = goalsTodos.indexOf(name);
            console.log(index);
            console.log(name);
            goalsTodos.splice(index, 1);
            goalsStarArray.splice(index, 1);

            window.localStorage.setItem("goalsTodos", JSON.stringify(goalsTodos));
            window.localStorage.setItem("goalsStarArray", JSON.stringify(goalsStarArray));

        } else {
            let index = goalsCompletedArray.indexOf(name);
            goalsCompletedArray.splice(index, 1);

            window.localStorage.setItem("goalsCompletedArray", JSON.stringify(goalsCompletedArray));

            if (goalsCompletedArray.length <= 0) {
                document.querySelector("h2").innerHTML = "";
            }
        }
        if (goalsTodos.length > 0 || goalsCompletedArray.length > 0) {
            taskVector.style.display = 'none';
        }
        else {
            taskVector.style.display = 'block';
        }


    }

    complete(checkForCompleted, itemBox, input, arrayName) {

        if (checkForCompleted.checked) {

            this.remove(itemBox, input.value, "goalsTodos");
            new item(input.value, "completed");
            goalsCompletedArray.push(input.value);

            window.localStorage.setItem("goalsCompletedArray", JSON.stringify(goalsCompletedArray));

            input.style.textDecoration = "line-through";
            itemBox.style.opacity = 0.5;
            // var checkboxes = document.getElementsByClassName("completed");
            // checkboxes.checked=true;


        } else {
            input.style.textDecoration = "none";
            itemBox.style.opacity = 1;
            this.remove(itemBox, input.value, "goalsCompletedArray");
            new item(input.value, "container");
            goalsTodos.push(input.value);

            window.localStorage.setItem("goalsTodos", JSON.stringify(goalsTodos));

        }
        if (goalsCompletedArray.length > 0) {
            document.querySelector("h2").innerHTML = "Completed";
        }
        else {
            document.querySelector("h2").innerHTML = "";
        }
        if (goalsTodos.length > 0 || goalsCompletedArray.length > 0) {
            taskVector.style.display = 'none';
        }
        else {
            taskVector.style.display = 'block';
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
//         // arrayName === "completed" ?completed.push(inputValue.value): goalsTodos.push(inputValue.value);
//         // arrayName.push(inputValue.value);
//         if(arrayName === "goalsCompletedArray"){
//             completed.push(inputValue.value);
//             window.localStorage.setItem("goalsCompletedArray", JSON.stringify(completed));
//         }else{
//             goalsTodos.push(inputValue.value);
//             window.localStorage.setItem("goalsTodos", JSON.stringify(goalsTodos));
//         }

// 		inputValue.value = "";
// 	}
// }

function check() {
    if (inputValue.value.trim() != "") {
        showSuccess(inputValue);
        new item(inputValue.value.trim(), "container");
        goalsTodos.push(inputValue.value.trim());
        goalsStarArray.push(0);

        window.localStorage.setItem("goalsTodos", JSON.stringify(goalsTodos));

        window.localStorage.setItem("goalsStarArray", JSON.stringify(goalsStarArray));
        inputValue.value = "";

    } else {
        showError(inputValue, "Enter Task");
    }
    if (goalsTodos.length > 0 || goalsCompletedArray.length > 0) {
        taskVector.style.display = 'none';
    }
    else {
        taskVector.style.display = 'block';
    }
}

function showError(input, msg) {
    const formControl = input.parentNode;
    formControl.className = 'input-group error';
    const small = formControl.querySelector('small');
    console.log(formControl.className);
    small.innerHTML = msg;
}
function showSuccess(input) {
    const formControl = input.parentNode;
    formControl.className = `imput-group`;
    console.log(formControl.className);
}

if (goalsTodos.length > 0 || goalsCompletedArray.length > 0) {
    taskVector.style.display = 'none';
}
else {
    taskVector.style.display = 'block';
}

for (var v = 0; v < goalsTodos.length; v++) {
    new item(goalsTodos[v], "container");

    // var box = goalsTodos[v];
    // if (box.hasAttribute("store")) {
    //     setupBox(box);
    // }
}

for (var v = 0; v < goalsCompletedArray.length; v++) {
    if (goalsCompletedArray.length > 0) {
        document.querySelector("h2").innerHTML = "Completed";
    }
    else {
        document.querySelector("h2").innerHTML = "";
    }
    new item(goalsCompletedArray[v], "completed");
}
console.log(container);
var abc = document.querySelectorAll(".item");
console.log(abc);
for (var v = 0; v < goalsStarArray.length; v++) {
    if (goalsStarArray[v] === 1) {
        console.log(abc[v].childNodes[3]);
        var xyz = abc[v].childNodes[3];

        xyz.innerHTML = '<i class="material-icons star_rate" style="color:yellow;">star_rate</i>';
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

