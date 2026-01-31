// Define allowed statuses for a todo item
const STATUS = Object.freeze({
    ON_SCHEDULE: "onSchedule",
    COMPLETED: "completed",
    LATE: "late"
});

// Define UI constants
const taskInput = document.getElementById("task");
const addTask = document.getElementById("add");
const taskList = document.getElementById("tasklist");

// Initialize array of todo items
let todos = getTodos();
renderTodos(todos);

// Initialize a new todo item
function createTodo(text, dueAt = null) {
    return{
        id: crypto.randomUUID(),
        text: text,
        status: STATUS.ON_SCHEDULE,       //Default
        createdAt: Date.now(),
        dueAt
    }
}

// Create todo item from user input and add it to array of todos
addTask.addEventListener("click", () => {
    const todoText = taskInput.value.trim();
    if (todoText !== "") {
        todos = addTodo(todos, createTodo(todoText));
        saveTodos(todos);
        taskInput.value = "";
        renderTodos(todos);
    }
})

// Retrieve todo items from localstorage
function getTodos() {
    // localStorage.clear();
    const todosJson = localStorage.getItem("todos");
    if (todosJson) {
        return JSON.parse(todosJson);
    } else {
        return [];
    }
}

// Add a new todo
function addTodo(todoArray, newTodo) {
    const newTodos = [...todoArray, newTodo];
    return newTodos;
}


// Save todos to localstorage
function saveTodos(todosArray) {
    const todosJson = JSON.stringify(todosArray);
    localStorage.setItem('todos', todosJson);
}

// Render the list
function renderTodos(todoArray){
    taskList.replaceChildren();
    for (let i = 0; i < todoArray.length; i++) {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
        <input type="checkbox">
        <span></span>
        <button class="delete" data-id="${todoArray[i].id}">Delete</button>
        `;
        taskItem.querySelector("span").textContent = todoArray[i].text;
        taskList.appendChild(taskItem);
    }
}

// Delete an item from the list
taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete")){
        const taskId = event.target.dataset.id;
        const newTodos = todos.filter(todo => todo.id !== taskId);
        todos = newTodos;
        saveTodos(todos);
        renderTodos(todos);
    }
})


//**  KILLSWITCH **//
//  localStorage.clear();