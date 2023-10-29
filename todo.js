let myFruits = JSON.parse(localStorage.getItem("myFruits")) || [];

function addTodo() {
  const myInput = document.getElementById("myInput");
  var divBorder = document.querySelector(".div-border");

  if (myInput.value === "") {
    alertMessage.innerHTML = `Please enter a Todo to be added`;
    alertMessage.style.backgroundColor = "rgb(247, 204, 204)";
    alertMessage.style.color = "rgb(255, 0, 0)";
    alertMessage.style.visibility = "visible";
  } else {
    myFruits.push(myInput.value);
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

function delTodo(userIndex) {
  var userResponse = confirm(
    `Are you sure you want to delete this Todo? This action cannot be undone`
  );
  if (userResponse == true) {
    myFruits.splice(userIndex, 1);
    alertMessage.innerHTML = `Todo Deleted Successfully!`;
    alertMessage.style.backgroundColor = "rgb(247, 204, 204)";
    alertMessage.style.color = "rgb(255, 0, 0)";
    alertMessage.style.visibility = "visible";

    // Save the updated myFruits array to localStorage immediately after deletion
    localStorage.setItem("myFruits", JSON.stringify(myFruits));
  } else {
    alertMessage.innerHTML = `You just canceled, your Todo is not deleted`;
    alertMessage.style.backgroundColor = "rgba(200, 247, 197, 0.5)";
    alertMessage.style.color = "green";
    alertMessage.style.visibility = "visible";
  }
  setTimeout(function () {
    alertMessage.style.visibility = "hidden";
  }, 3000);
  newTask();
}

function editTodo(userIndex) {
  const myInput = document.getElementById("myInput");
  for (let index = 0; index < myFruits.length; index++) {
    if (myInput.value === "") {
      alertMessage.innerHTML = `To update the task "${myFruits[userIndex]}", please enter a new Todo.`;
      alertMessage.style.backgroundColor = "rgb(255, 223, 186)";
      alertMessage.style.color = "rgb(255, 0, 0)";

      alertMessage.style.visibility = "visible";
    } else {
      myFruits.splice(userIndex, 1, myInput.value);
      alertMessage.innerHTML = `Your Todo has been updated successfully`;
      alertMessage.style.backgroundColor = "rgba(200, 247, 197, 0.5)";
      alertMessage.style.color = "green";
      alertMessage.style.visibility = "visible";

      localStorage.setItem("myFruits", JSON.stringify(myFruits));
    }
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

function newTask() {
  var divBorder = document.querySelector(".div-border");
  if (myFruits.length > 0) {
    deleteAllButton.style.display = "flex";
  } else {
    deleteAllButton.style.display = "none";
    divBorder.classList.remove("add-box-shadow");
  }
  myOutput.innerHTML = "";
  const myInput = document.getElementById("myInput");
  myInput.value = "";

  // Get the current date
  const currentDate = new Date().toLocaleDateString();

  for (let index = 0; index < myFruits.length; index++) {
    myOutput.innerHTML += `
         <div class="col">
            <h1>${index + 1}. ${myFruits[index]}</h1>
            <p>Added on: ${currentDate}</p>
            <div class="actionBtn">
                <button class="warning" onclick="editTodo(${index})">Edit Todo</button>
                <button class="danger" onclick="delTodo(${index})">Delete Todo</button>
            </div>
         </div>`;
  }
}


let deleteAllButton = document.getElementsByClassName("delete-task-btn")[0];

function fetchFromLocalStorage() {
  var divBorder = document.querySelector(".div-border");
  if (!myFruits) {
    myFruits = [];
    divBorder.classList.remove("add-box-shadow");
  }
  if (myFruits.length > 0) {
    divBorder.classList.add("add-box-shadow");
    newTask();
  }
}
