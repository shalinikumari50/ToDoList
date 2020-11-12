// code from youtube tutorial


const container = document.querySelector('.container');
var inputValue = document.querySelector('.input');
const add = document.querySelector('.add');
const completed = document.querySelector('.completed');


if(window.localStorage.getItem("todos") == undefined){
     var todos = [];

     window.localStorage.setItem("todos", JSON.stringify(todos));
}
if(window.localStorage.getItem("completedArray") == undefined){
     var completedArray = [];
     
     window.localStorage.setItem("completedArray", JSON.stringify(completedArray));
}

var todosEX = window.localStorage.getItem("todos");
var todos = JSON.parse(todosEX);

var completedEX = window.localStorage.getItem("completedArray");
var completedArray = JSON.parse(completedEX);
class item{
	constructor(name, divContainer){
		this.createItem(name, divContainer);
	}
    createItem(name, divContainer){
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
        var arrayName ;
        if(divContainer === "completed"){
            checkForCompleted.setAttribute("checked","true");
              arrayName = "completedArray";
        }else{
            arrayName = "todos";
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
    	edit.addEventListener('click', () => this.edit(input, name, arrayName));

    	var remove = document.createElement('button');
    	remove.classList.add('remove');
        remove.innerHTML = '<i class="material-icons delete">delete</i>';
        
        remove.addEventListener('click', () => this.remove(itemBox, name, arrayName));
        
        // if(divContainer === "container"){
        //     container.appendChild(itemBox);
        // }else if(divContainer === "completed"){
        //     completed.appendChild(itemBox);
        // }
        document.querySelector("."+`${divContainer}`).appendChild(itemBox);
        itemBox.appendChild(checkForCompleted);
        itemBox.appendChild(input);
        
        itemBox.appendChild(edit);
        itemBox.appendChild(star);
        itemBox.appendChild(remove);

    }

    edit(input, name, arrayName){
        if(input.disabled == true){
           input.disabled = !input.disabled;
        }
    	else{
            input.disabled = !input.disabled;
           
            if(arrayName === "todos"){
                let indexof = todos.indexOf(name);
            todos[indexof] = input.value;
                window.localStorage.setItem(`${arrayName}`, JSON.stringify(todos));
            }else{
                let indexof = completedArray.indexOf(name);
            completedArray[indexof] = input.value;
                window.localStorage.setItem(`${arrayName}`, JSON.stringify(completedArray));
            }
           
        }
    }

    star(star, name, arrayName){
        if(star.innerHTML === '<i class="material-icons star_rate">star_rate</i>'){
       star.innerHTML = '<i class="material-icons star_rate" style="color:yellow;">star_rate</i>';}
       else{
           star.innerHTML = '<i class="material-icons star_rate">star_rate</i>';
       }
      
        
    }

    remove(itemBox, name, arrayName){
        
        itemBox.parentNode.removeChild(itemBox);
      
        if(arrayName === "todos"){
            let index = todos.indexOf(name);
            console.log(index);
            console.log(name);
            todos.splice(index, 1);
            window.localStorage.setItem("todos", JSON.stringify(todos));
        }else{
            let index = completedArray.indexOf(name);
            completedArray.splice(index, 1);
            window.localStorage.setItem("completedArray", JSON.stringify(completedArray));
        }
        
    }

    complete(checkForCompleted, itemBox, input, arrayName){
        
        if(checkForCompleted.checked){
           
            this.remove(itemBox, input.value, "todos");
            new item(input.value, "completed");
            completedArray.push(input.value);
            window.localStorage.setItem("completedArray", JSON.stringify(completedArray));
            input.style.textDecoration = "line-through";
            itemBox.style.opacity = 0.5;
            // var checkboxes = document.getElementsByClassName("completed");
            // checkboxes.checked=true;
           
            
        }else{
            input.style.textDecoration = "none";
            itemBox.style.opacity = 1;
            this.remove(itemBox, input.value, "completedArray");
            new item(input.value, "container");
            todos.push(input.value);
            window.localStorage.setItem("todos", JSON.stringify(todos));
        }
    }
}

add.addEventListener('click', check);
window.addEventListener('keydown', (e) => {
	if(e.which == 13){
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

function check(){
	if(inputValue.value != ""){
		new item(inputValue.value, "container");
        todos.push(inputValue.value);
        window.localStorage.setItem("todos", JSON.stringify(todos));
		inputValue.value = "";
	}
}


for (var v = 0 ; v < todos.length ; v++){
    new item(todos[v], "container");
}

for (var v = 0 ; v < completedArray.length ; v++){
    new item(completedArray[v], "completed");
}


