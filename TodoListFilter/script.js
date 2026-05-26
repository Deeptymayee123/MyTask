const date = document.querySelector("#date");
const todoTask = document.querySelector("#todoTask");
const add = document.querySelector("#add");
const allTask = document.querySelector(".allTask");
const deleteBtn = document.querySelector("#deleteBtn");
const filter = document.querySelectorAll(".filter");
// const filters = document.querySelector(".filters");

const month = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function showdate() {
  const currentDate = new Date();
  let weekDay = week[currentDate.getDay()];
  let currentMonth = month[currentDate.getMonth()];
  let currentdate = currentDate.getDate();

  date.textContent = `${weekDay}, ${currentMonth} ${currentdate}`;
}
showdate();

//add eventlistener to add button
add.addEventListener("click", (e) => {
  e.preventDefault();
  addTask();
});
//obj
let taskStorageObj = [];
// Add a new task (text input + button)
function addTask() {
  let id = Date.now();
  let val = todoTask.value.trim();

  // let li = document.createElement("li");
  // li.classList.add("item");

  // let div = document.createElement("div");
  // div.classList.add("questionContainer");

  // let input = document.createElement("input");
  // input.id = "task";
  // input.type = "checkbox";

  // let span = document.createElement("span");
  // span.classList.add("checkMark");
  // span.textContent = val;

  // div.appendChild(input);
  // div.appendChild(span);

  // let button = document.createElement("button");
  // button.id = "deleteBtn";
  // button.innerHTML = `<i class="fa-solid fa-x"></i>`;

  // button.addEventListener("click", () => {
  //   deleteTask(id);
  // });
  // li.appendChild(div);
  // li.appendChild(button);

  // allTask.appendChild(li);
  // // console.log(li);

  taskStorageObj.push({
    id: id,
    text: val,
    completed: false,
  });
  todoTask.value = "";
  saveTasks(taskStorageObj);
  renderList();
}

//fun for deleting individual task
function deleteTask(id) {
  taskStorageObj = taskStorageObj.filter((elmId) => elmId.id !== id);
  saveTasks(taskStorageObj);
  renderList();
}

// builds the entire task list DOM from scratch
function renderList(rendertask = taskStorageObj) {
  //clear the UI
  allTask.innerHTML = "";

  //load data in UI
  // taskStorageObj.forEach((task) => {
  rendertask.forEach((task) => {
    let li = document.createElement("li");
    li.classList.add("item");

    // console.log(task.completed);

    if (task.completed) {
      li.classList.add("completed");
    }

    let div = document.createElement("div");
    div.classList.add("questionContainer");

    let input = document.createElement("input");
    input.classList.add("task");
    input.type = "checkbox";
    input.checked = task.completed;
    input.onchange = () => {
      toggleTask(task.id);
    };

    let span = document.createElement("span");
    span.classList.add("checkMark");
    span.textContent = task.text;

    div.appendChild(input);
    div.appendChild(span);

    let button = document.createElement("button");
    button.id = "deleteBtn";
    button.innerHTML = `<i class="fa-solid fa-x"></i>`;

    button.addEventListener("click", () => {
      deleteTask(task.id);
    });
    li.appendChild(div);
    li.appendChild(button);

    allTask.appendChild(li);
    // console.log(li);
    // todoTask.textContent = "";
  });
  saveTasks(rendertask);
}

//flips the complete status of a task
function toggleTask(id) {
  taskStorageObj = taskStorageObj.map((item) => {
    if (item.id === id) {
      return { ...item, completed: !item.completed };
    }
    return item;
  });
  renderList();
}

// add eventlistener to filters
filter.forEach((fltr) => {
  fltr.addEventListener("click", (e) => {
    let val = filterTasks(taskStorageObj, e.target.textContent);
    console.log(val);

    renderList(val);
  });
});

// returns a filtered copy of the array
function filterTasks(tasks, filter) {
  let filteredData = [];
  if (filter === "All") {
    return tasks;
  } else if (filter === "Active") {
    filteredData = tasks.filter((item) => !item.completed);
  } else if (filter === "Completed") {
    filteredData = tasks.filter((item) => item.completed);
  }
  return filteredData;
}

window.addEventListener("DOMContentLoaded", loadTasks);
// writes current array to localStorage
function saveTasks(tasks) {
  localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

// reads tasks from localStorage
function loadTasks() {
  taskStorageObj = JSON.parse(localStorage.getItem("todoTasks")) || [];
  renderList(taskStorageObj);
}
