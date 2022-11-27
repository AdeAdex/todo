let myFruits = []
function addTodo() {
    myFruits.push(myInput.value);
    newTask()
}

function delTodo(userIndex) {
    myFruits.splice(userIndex, 1);
    newTask()
};


function editTodo(userIndex) {
    myFruits.splice(userIndex, 1, myInput.value)
    newTask();
}

function delAll() {
    myFruits = [];
    myOutput.innerHTML =  myFruits;
}

function newTask() {
    myOutput.innerHTML = ""
    myInput.value = "";
    for (let index = 0; index < myFruits.length; index++) {
         myOutput.innerHTML += `
         <div class = "col">
            <h1>${myFruits[index]} </h1>
            <div class= "actionBtn">
                <button class="warning" onclick="editTodo(${index})">Edit Todo</button>
                <button class="danger" onclick="delTodo(${index})">Delete Todo</button>
            </div>
         </div>`;
        
    }
}