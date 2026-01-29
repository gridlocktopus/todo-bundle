const taskInput = document.getElementById("task");
const addButton = document.getElementById("add");
const taskList = document.getElementById("tasklist");

// Add task
addButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText != "") {
        createTask(taskText);
        taskInput.value = "";
    }
});

// Create a new task
function createTask(text) {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
    <span>${text}</span>
    <button class="delete">Delete</button>
    `;
    taskList.appendChild(taskItem);

    // Delete the task
    const deleteButton = taskItem.querySelector(".delete");
    deleteButton.addEventListener("click", () => {
        taskItem.remove();
    });
}