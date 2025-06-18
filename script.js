const form = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const reminderInput = document.getElementById("reminder-input");
const taskList = document.getElementById("task-list");

const tasks = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  const reminderTime = reminderInput.value;

  if (taskText === "") return;

  const task = {
    id: Date.now(),
    text: taskText,
    reminder: reminderTime
  };

  tasks.push(task);
  renderTasks();
  setReminder(task);
  form.reset();
});

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${task.text}
      <button onclick="deleteTask(${task.id})">❌</button>
    `;
    taskList.appendChild(li);
  });
}

function deleteTask(id) {
  const index = tasks.findIndex(t => t.id === id);
  if (index > -1) tasks.splice(index, 1);
  renderTasks();
}

function setReminder(task) {
  if (!task.reminder) return;

  const timeToWait = new Date(task.reminder) - new Date();
  if (timeToWait <= 0) return;

  setTimeout(() => {
    alert(`⏰ Reminder: ${task.text}`);
  }, timeToWait);
}

document.getElementById("darkModeToggle").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  // Save theme to localStorage
  const mode = document.body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("theme", mode);
});

// Load saved theme on page load
window.onload = function () {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    tasks.forEach(task => addTaskToUI(task.text, task.time));
  }
};
