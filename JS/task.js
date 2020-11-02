 
        function addTask(){
            var data =[];
            data.add(document.getElementById("data").value) ;
            console.log(data);
            localStorage.storedList = data;
            
            var inputValue = localStorage.storedList;
            console.log(inputValue);
            var newItem = document.createElement("li");
            var textnode = document.createTextNode(inputValue)
            newItem.appendChild(textnode);
            document.getElementById("list").appendChild(newItem);
        }
        
  
          