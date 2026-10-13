let taskform = document.getElementById("taskform");
let taskInput = document.getElementById("taskinput");
let categoryinput = document.getElementById("categoryinput");
let priorityinput = document.getElementById("priorityinput");
let tasklist = document.getElementById("tasklist");
let emptymessage = document.getElementById("emptymessage");
let categoryfilter = document.getElementById("categoryfilter");
let statusfilter = document.getElementById("statusfilter");
let searchinput = document.getElementById("searchinput");
let totalcount = document.getElementById("totalcount");
let activetask = document.getElementById("activetask");
let completedcount = document.getElementById("Completedcount");

function updateTaskCount(){
  totalcount.textContent = tasks.length;

  activetask.textContent = tasks.filter(function(task){
    return task.completed === false
  }).length

  completedcount.textContent = tasks.filter(function(task){
    return task.completed === true
  }).length
}


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let taskid =
  tasks.length > 0
    ? Math.max(
        ...tasks.map(function (task) {
          return task.id;
        }),
      ) + 1
    : 1;

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  tasklist.innerHTML = "";

  const searchText = searchinput ? searchinput.value.trim().toLowerCase() : "";

  const selectedCategory = categoryfilter.value;
  const selectedStatus = statusfilter.value.toLowerCase();

  const filteredTasks = tasks.filter(function (task) {
    const matchesSearch = task.title.toLowerCase().includes(searchText);

    const matchesCategory =
      selectedCategory === "all" || task.category === selectedCategory;

    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "active" && !task.completed) ||
      (selectedStatus === "completed" && task.completed);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  filteredTasks.forEach(function (task) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    const span = document.createElement("span");
    span.textContent = task.title;

    if (task.completed) {
      span.style.textDecoration = "line-through";
      span.style.color = "gray";
    }

  
    checkbox.addEventListener("change", function () {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });


    const editbtn = document.createElement("button");
    editbtn.textContent = "Edit";

    editbtn.addEventListener("click", function () {
      const updatedTitle = prompt("Enter updated task name:", task.title);

      if (updatedTitle !== null && updatedTitle.trim() !== "") {
        task.title = updatedTitle.trim();
        saveTasks();
        renderTasks();
      }
    });


    const deletebtn = document.createElement("button");
    deletebtn.textContent = "Delete";

    deletebtn.addEventListener("click", function () {
      tasks = tasks.filter(function (item) {
        return item.id !== task.id;
      });

      saveTasks();
      renderTasks();
    });

    li.append(checkbox, span, editbtn, deletebtn);
    tasklist.append(li);
  });


  if (filteredTasks.length === 0) {
    emptymessage.style.display = "block";
    emptymessage.textContent =
      tasks.length === 0
        ? "No tasks yet. Add your first task!"
        : "No matching tasks found.";
  } else {
    emptymessage.style.display = "none";
  }
  updateTaskCount();
}


taskform.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = taskInput.value.trim();
  const category = categoryinput.value;
  const priority = priorityinput.value;

  if (title === "") {
    alert("Please enter a task!");
    return;
  }

  const task = {
    id: taskid++,
    title: title,
    category: category,
    priority: priority,
    completed: false,
    createdat: Date.now(),
  };

  tasks.push(task);

  saveTasks();
  taskform.reset();
  renderTasks();
});


categoryfilter.addEventListener("change", function () {
  renderTasks();
});


statusfilter.addEventListener("change", function () {
  renderTasks();
});

// Search tasks
if (searchinput) {
  searchinput.addEventListener("input", function () {
    renderTasks();
  });
}


renderTasks();

let clearcompleted = document.getElementById("clearcompletedbtn");

clearcompleted.addEventListener("click", function () {
    tasks = tasks.filter(function (task) {
        return task.completed === false;
    });

    saveTasks();
    renderTasks();
});

