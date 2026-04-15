let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Create Task Element
function createTaskElement(task) {
  const div = document.createElement("div");
  div.className = "task";
  div.draggable = true;
  div.dataset.id = task.id;
  div.textContent = task.text;

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "X";
  delBtn.className = "delete-btn";

  delBtn.onclick = () => {
    tasks = tasks.filter(t => t.id !== task.id);
    saveTasks();
    renderTasks();
  };

  div.appendChild(delBtn);

  // Drag Events
  div.addEventListener("dragstart", () => {
    div.classList.add("dragging");
  });

  div.addEventListener("dragend", () => {
    div.classList.remove("dragging");
  });

  return div;
}

// Render Tasks
function renderTasks() {
  document.querySelectorAll(".task-list").forEach(list => list.innerHTML = "");

  tasks.forEach(task => {
    const column = document.getElementById(task.status);
    column.appendChild(createTaskElement(task));
  });
}

// Add Task
function addTask(status) {
  const text = prompt("Enter task:");
  if (!text) return;

  const newTask = {
    id: Date.now(),
    text,
    status
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
}

// Drag & Drop Logic
document.querySelectorAll(".task-list").forEach(column => {

  column.addEventListener("dragover", e => {
    e.preventDefault();
    const dragging = document.querySelector(".dragging");
    column.appendChild(dragging);
  });

  column.addEventListener("drop", e => {
    const id = document.querySelector(".dragging").dataset.id;

    const task = tasks.find(t => t.id == id);
    task.status = column.id;

    saveTasks();
  });
});

// Initial Render
renderTasks();