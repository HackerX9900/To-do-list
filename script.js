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
