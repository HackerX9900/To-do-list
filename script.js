const form = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const reminderInput = document.getElementById("reminder-input");
const taskList = document.getElementById("task-list");

let tasks = [];

// Helper function to save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

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
  saveTasks();
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
  saveTasks();
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

// --- Dark Mode Logic ---
const themeToggle = document.getElementById("checkbox");

themeToggle.addEventListener("change", function () {
  document.body.classList.toggle("dark-mode");

  // Save theme to localStorage
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// Load saved theme on page load
window.onload = function () {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.checked = true;
  }

  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    renderTasks();
  }

  // Initialize flatpickr for a modern date/time picker
  flatpickr(reminderInput, {
    enableTime: true,
    dateFormat: "Y-m-d H:i", // Machine-readable format for JS
    altInput: true, // Creates a new, more human-readable input
    altFormat: "F j, Y at h:i K", // e.g., "June 10, 2024 at 05:30 PM"
  });
};
