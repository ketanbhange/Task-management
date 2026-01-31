const API_URL = "http://localhost:5000/api/tasks";
const taskList = document.getElementById("taskList");
const form = document.getElementById("taskForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const task = {
    title: title.value,
    description: description.value,
    status: status.value
  };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task)
  });

  form.reset();
  loadTasks();
});

async function loadTasks() {
  taskList.innerHTML = "";
  const res = await fetch(API_URL);
  const tasks = await res.json();

  tasks.forEach((task) => {
    const div = document.createElement("div");
    div.className = "task";
    div.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description || ""}</p>
      <p>Status: ${task.status}</p>
      <button onclick="deleteTask('${task._id}')">Delete</button>
    `;
    taskList.appendChild(div);
  });
}

async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadTasks();
}

loadTasks();
