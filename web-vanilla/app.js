// Define allowed statuses for a todo item
const STATUS = Object.freeze({
    PENDING: "pending",
    COMPLETED: "completed",
});

// Define UI constants
const taskInput = document.getElementById("task");
const addTask = document.getElementById("add");
const taskList = document.getElementById("tasklist");

// Initialize array of todo items
let todos = getTodos();
renderTodos(todos);

// Initialize a new todo item
function createTodo(text) {
    const timestamp = Date.now();
    return{
        id: crypto.randomUUID(),
        text: text,
        status: STATUS.PENDING,       //Default
        createdAt: timestamp,
        dueAt: timestamp + 86400000
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
        taskItem.classList.add("card", "taskItem");
        taskItem.dataset.id = todoArray[i].id;
        taskItem.innerHTML = `
        <input type="checkbox">
        <span></span>
        `;
        taskItem.querySelector("span").textContent = todoArray[i].text;
        taskList.appendChild(taskItem);
    }
}

// // Delete an item from the list
// taskList.addEventListener("click", (event) => {
//     if (event.target.classList.contains("delete")){
//         const taskId = event.target.dataset.id;
//         const newTodos = todos.filter(todo => todo.id !== taskId);
//         todos = newTodos;
//         saveTodos(todos);
//         renderTodos(todos);
//     }
// })

// Complete a todo item
taskList.addEventListener("click", (event) => {
    const newTodos = todos.map(todo => {
        if (todo.id === event.target.dataset.id) {
            return {
                ...todo,
                status: todo.status === STATUS.PENDING ? STATUS.COMPLETED : STATUS.PENDING
            };
        } else {
            return todo;
        }
    });
    todos = newTodos;
    saveTodos(todos);
    renderTodos(todos);
});




//**  KILLSWITCH **//
//  localStorage.clear();