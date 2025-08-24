document.getElementById("addTaskBtn").addEventListener("click", addTask);

function addTask() {
  let taskInput = document.getElementById("taskInput");
  let taskValue = taskInput.value.trim();

  if (taskValue === "") return;

  let li = document.createElement("li");

  // Task text container
  let taskText = document.createElement("div");
  taskText.classList.add("task-text");
  taskText.textContent = taskValue;

  // Timestamp (below the task text)
  let timeStamp = document.createElement("div");
  timeStamp.classList.add("task-time");
  timeStamp.textContent = "Added: " + getCurrentTime();

  // Actions container
  let actions = document.createElement("div");
  actions.classList.add("actions");

  // Complete button
  let completeBtn = document.createElement("button");
  completeBtn.textContent = "🎯Complete";
  completeBtn.classList.add("complete");
  completeBtn.onclick = () => {
    li.classList.add("completed");
    timeStamp.textContent = "Completed: " + getCurrentTime();
    document.getElementById("completedTasks").appendChild(li);
    completeBtn.remove(); // remove after completed
    updateProgress();
  };

  // Edit button
  let editBtn = document.createElement("button");
  editBtn.textContent = "✍️Edit";
  editBtn.classList.add("edit");
  editBtn.onclick = () => {
    let newTask = prompt("Edit your task:", taskValue);
    if (newTask !== null && newTask.trim() !== "") {
      taskText.textContent = newTask.trim();
      timeStamp.textContent = "Edited: " + getCurrentTime();
    }
  };

  // Delete button
  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🚮Delete";
  deleteBtn.classList.add("delete");
  deleteBtn.onclick = () => {
    li.remove();
    updateProgress();
  };

  actions.appendChild(completeBtn);
  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(taskText);
  li.appendChild(timeStamp);
  li.appendChild(actions);

  document.getElementById("pendingTasks").appendChild(li);
  taskInput.value = "";

  updateProgress();
}

// Progress Bar
function updateProgress() {
  let pending = document.querySelectorAll("#pendingTasks li").length;
  let completed = document.querySelectorAll("#completedTasks li").length;
  let total = pending + completed;

  let percentage = total === 0 ? 0 : (completed / total) * 100;
  document.getElementById("progressFill").style.width = percentage + "%";
}

// Helper function to get current time
function getCurrentTime() {
  let now = new Date();
  return now.toLocaleString(); // Shows date + time in local format
}
