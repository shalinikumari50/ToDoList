// var data =[];
        // function addTask(){
            
        //     data.push(document.getElementById("data").value);
        //     console.log(data);
        //     localStorage.storedList = data;

        //     // var names = [];
          
        //     // localStorage.setItem("names", JSON.stringify(names));
        //     // var storedNames = JSON.parse(localStorage.getItem("names"));
            
          
        // }


var taskList = Array();






























        //array to store task
var taskList = Array();
$(document).ready(

function () {
    readTasks(); //load stored tasks to page
});

(function () {

    var todo = document.querySelector('#todolist'),
        form = document.querySelector('form'),
        field = document.querySelector('#newitem');
    field2 = document.querySelector('#newitemTxt');
    date = document.querySelector('#datepicker');

    form.addEventListener('submit', function (ev) {
        var text = field.value;
        var text2 = field2.value;
        var textDate = date.value;
        if (text !== '' && text2 !== '' && textDate !== '') {

            var task = '<li>' + '<span class="title">' + text + '</span>' + '<br />' + text2 + '<br />' + '<span class="date">' + textDate + '</span>' + '</li>';
            todo.innerHTML += task;

            //push task to array
            taskList.push(task);
            //store array to a db called tasks
            window.localStorage.setItem("tasks", taskList.join(" "));

        }
        ev.preventDefault();
    }, false);

    todo.addEventListener('click', function (ev) {
        var t = ev.target;
        if (t.tagName === 'LI') {
            t.parentNode.removeChild(t);
        };
        ev.preventDefault();
    }, false);

})();


// read tasks
function readTasks() {
    if (window.localStorage.getItem("tasks") == null) {
        alert("db is emlty");
    } else {
        var todo = document.querySelector('#todolist');
        var savedTasks = window.localStorage.getItem("tasks");
        //push task to array so we dont over write old tasks the next time
        taskList.push(savedTasks);
        todo.innerHTML = savedTasks;
    }
}

        
  
          