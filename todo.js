
let myFruits = JSON.parse(localStorage.getItem('myFruits')) || [];


function addTodo() {
  const myInput = document.getElementById('myInput');

  if (myInput.value === '') {
    alertMessage.innerHTML = `Please enter a Todo to be added`;
    alertMessage.style.backgroundColor = 'rgb(247, 204, 204)';
    alertMessage.style.color = 'rgb(255, 0, 0)';
    alertMessage.style.visibility = 'visible';
  } else {
    myFruits.push(myInput.value);
    alertMessage.innerHTML = `New Todo added successfully`;
    alertMessage.style.backgroundColor = 'rgba(200, 247, 197, 0.5)';
    alertMessage.style.color = 'green';
    alertMessage.style.visibility = 'visible';

    localStorage.setItem('myFruits', JSON.stringify(myFruits));
  }
  setTimeout(function () {
    alertMessage.style.visibility = 'hidden';
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
      alertMessage.style.backgroundColor = 'rgb(247, 204, 204)';
      alertMessage.style.color = 'rgb(255, 0, 0)';
      alertMessage.style.visibility = 'visible';
  
      // Save the updated myFruits array to localStorage immediately after deletion
      localStorage.setItem('myFruits', JSON.stringify(myFruits));
    } else {
      alertMessage.innerHTML = `You just canceled, your Todo is not deleted`;
      alertMessage.style.backgroundColor = 'rgba(200, 247, 197, 0.5)';
      alertMessage.style.color = 'green';
      alertMessage.style.visibility = 'visible';
    }
    setTimeout(function () {
      alertMessage.style.visibility = 'hidden';
    }, 3000);
    newTask();
  }
  
  function editTodo(userIndex) {
    const myInput = document.getElementById('myInput');
  
    if (myInput.value === '') {
      alertMessage.innerHTML = `Please enter a Todo to be updated`;
      alertMessage.style.backgroundColor = 'rgb(247, 204, 204)';
      alertMessage.style.color = 'rgb(255, 0, 0)';
      alertMessage.style.visibility = 'visible';
    } else {
      myFruits.splice(userIndex, 1, myInput.value);
      alertMessage.innerHTML = `Your Todo has been updated successfully`;
      alertMessage.style.backgroundColor = 'rgba(200, 247, 197, 0.5)';
      alertMessage.style.color = 'green';
      alertMessage.style.visibility = 'visible';
  
      localStorage.setItem('myFruits', JSON.stringify(myFruits));
    }
    setTimeout(function () {
      alertMessage.style.visibility = 'hidden';
    }, 3000);
    newTask();
  }
  

function delAll() {
  myFruits = [];
  localStorage.removeItem('myFruits');
  myOutput.innerHTML = myFruits;
}

function newTask() {
  if (myFruits.length > 0) {
    deleteAllButton.style.display = "flex"
  } else {
    deleteAllButton.style.display = "none"
  }
  myOutput.innerHTML = '';
  const myInput = document.getElementById('myInput');
  myInput.value = '';
  for (let index = 0; index < myFruits.length; index++) {
    myOutput.innerHTML += `
         <div class="col">
            <h1>${myFruits[index]}</h1>
            <div class="actionBtn">
                <button class="warning" onclick="editTodo(${index})">Edit Todo</button>
                <button class="danger" onclick="delTodo(${index})">Delete Todo</button>
            </div>
         </div>`;
  }
}


let deleteAllButton = document.getElementsByClassName('delete-task-btn')[0];

function fetchFromLocalStorage() {
  if (!myFruits) {
    myFruits = [];
  }
  if (myFruits.length > 0) {
    newTask();
  }
}
