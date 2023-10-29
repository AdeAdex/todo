let myFruits = JSON.parse(localStorage.getItem("myFruits")) || [];
var myOutput = document.getElementById("myOutput");
const myInput = document.getElementById("myInput");

function addTodo() {
  var divBorder = document.querySelector(".div-border");
  if (myInput.value === "") {
    alertMessage.innerHTML = `Please enter a Todo to be added`;
    alertMessage.style.backgroundColor = "rgb(247, 204, 204)";
    alertMessage.style.color = "rgb(255, 0, 0)";
    alertMessage.style.visibility = "visible";
  } else {
    const newTask = {
      task: myInput.value,
      timestamp: new Date().toLocaleString(),
    };

    myFruits.push(newTask);
    alertMessage.innerHTML = `New Todo added successfully`;
    alertMessage.style.backgroundColor = "rgba(200, 247, 197, 0.5)";
    alertMessage.style.color = "green";
    alertMessage.style.visibility = "visible";

    localStorage.setItem("myFruits", JSON.stringify(myFruits));
    divBorder.classList.add("add-box-shadow");
  }
  setTimeout(function () {
    alertMessage.style.visibility = "hidden";
  }, 3000);
  newTask();
}

function editTodo(userIndex) {
  const task = myFruits[userIndex];

  if (myInput.value === "") {
    alertMessage.innerHTML = `To update the task "${task.task}" added on ${task.timestamp}, please enter a new Todo.`;
    alertMessage.style.backgroundColor = "rgb(255, 223, 186)";
    alertMessage.style.color = "rgb(255, 0, 0)";

    alertMessage.style.visibility = "visible";
  } else {
    const updatedTask = {
      task: myInput.value,
      timestamp: task.timestamp,
    };
    myFruits.splice(userIndex, 1, updatedTask);

    alertMessage.innerHTML = `Your Todo has been updated successfully`;
    alertMessage.style.backgroundColor = "rgba(200, 247, 197, 0.5)";
    alertMessage.style.color = "green";
    alertMessage.style.visibility = "visible";

    localStorage.setItem("myFruits", JSON.stringify(myFruits));
  }
  setTimeout(function () {
    alertMessage.style.visibility = "hidden";
  }, 3000);
  newTask();
}



function delTodo(userIndex) {
  const task = myFruits[userIndex];

  var userResponse = confirm(
    `Are you sure you want to delete this Todo "${task.task}" added on ${task.timestamp}? This action cannot be undone`
  );

  if (userResponse == true) {
    myFruits.splice(userIndex, 1);
    alertMessage.innerHTML = `Todo Deleted Successfully!`;
    alertMessage.style.backgroundColor = "rgb(247, 204, 204)";
    alertMessage.style.color = "rgb(255, 0, 0)";
    alertMessage.style.visibility = "visible";

    localStorage.setItem("myFruits", JSON.stringify(myFruits));
  } else {
    alertMessage.innerHTML = `You just canceled, your Todo "${task.task}" is not deleted`;
    alertMessage.style.backgroundColor = "rgba(200, 247, 197, 0.5)";
    alertMessage.style.color = "green";
    alertMessage.style.visibility = "visible";
  }
  setTimeout(function () {
    alertMessage.style.visibility = "hidden";
  }, 3000);
  newTask();
}

function delAll() {
  var userResponse = confirm(
    `Are you sure you want to delete all the Todo's? This action cannot be undone`
  );
  if (userResponse == true) {
    myFruits = [];
    localStorage.removeItem("myFruits");
    myOutput.innerHTML = myFruits;
    alertMessage.innerHTML = `All todos have been deleted.`;

    var divBorder = document.querySelector(".div-border");
    divBorder.classList.remove("add-box-shadow");

    setTimeout(function () {
      alertMessage.style.visibility = "hidden";
    }, 3000);
    newTask();
  }
}

let deleteAllButton = document.getElementsByClassName("delete-task-btn")[0];


function newTask() {
  var divBorder = document.querySelector(".div-border");
  // const currentDate = new Date().toLocaleString();

  if (myFruits.length > 0) {
    deleteAllButton.style.display = "flex";
    myOutput.innerHTML = "";
    myInput.value = "";

    for (let index = 0; index < myFruits.length; index++) {
      console.log(myFruits);
      myOutput.innerHTML += `
         <div class="col">
         <h1>${index + 1}. ${myFruits[index].task}</h1>
         <p>Added on: ${myFruits[index].timestamp}</p>
            <div class="actionBtn">
                <button class="warning" onclick="editTodo(${index})">Edit Todo</button>
                <button class="danger" onclick="delTodo(${index})">Delete Todo</button>
            </div>
         </div>`;
    }
  } else {
    deleteAllButton.style.display = "none";
    divBorder.classList.remove("add-box-shadow");
    myOutput.innerHTML =
      `<p class="no-items">❗ No tasks available. Please add new tasks to get started.</p>`;
  }
}



function fetchFromLocalStorage() {
  var divBorder = document.querySelector(".div-border");
  // const storedTasks = JSON.parse(localStorage.getItem("myFruits")) || [];

  if (myFruits.length > 0) {
    // myFruits = storedTasks; // Update the myFruits array
    divBorder.classList.add("add-box-shadow");
    newTask(myFruits);
  } else {
    myFruits = []; // Initialize myFruits as an empty array
    divBorder.classList.remove("add-box-shadow");
    myOutput.innerHTML = `<p class="no-items">❗ No tasks available. Please add new tasks to get started.</p>`;
  }
}

