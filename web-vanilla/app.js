// Define allowed statuses for a todo item
const STATUS = Object.freeze({
    PENDING: "pending",
    COMPLETED: "completed",
});

// Define UI constants
const taskInput = document.getElementById("task");
const addTask = document.getElementById("add");
const taskList = document.getElementById("tasklist");
const clearTasks = document.getElementById("clear");

// Initialize array of todo items
let todos = getTodos();
renderTodos(todos);

// Initialize a new todo item
function createTodo(text) {
    return{
        id: crypto.randomUUID(),
        text: text,
        status: STATUS.PENDING,       //Default
    }
}

function addTodo() {
    const todoText = taskInput.value.trim();
    if (todoText !== "" && todoText.length <= 500) {
        todos = [...todos, createTodo(todoText)];
        saveTodos(todos);
        taskInput.value = "";
        renderTodos(todos);
    }
}

// Add todo on button click
addTask.addEventListener("click", () => {
    addTodo()
})

// Add todo when user presses "Enter"
taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTodo();
    }
})

// Retrieve todo items from localstorage
function getTodos() {
    try {
        const todosJson = localStorage.getItem("todos");
        return todosJson ? JSON.parse(todosJson) : [];
    } catch (error) {
        console.error("Error loading todos:", error);
        return [];
    }
}

// Clear completed todos
clearTasks.addEventListener("click", () => {
    const newTodos = todos.filter(todo => todo.status !== STATUS.COMPLETED);
    todos = newTodos;
    saveTodos(todos);
    renderTodos(todos);
});



// Save todos to local storage
function saveTodos(todosArray) {
    try {
        const todosJson = JSON.stringify(todosArray);
        localStorage.setItem('todos', todosJson);
    } catch (error) {
        console.error("Error saving todos:", error);
    }
}

// Render the list
function renderTodos(todoArray){
    // clear the current contents of taskList so no duplication happens on render
    taskList.replaceChildren();

    // sort the todos
    const pendingTodos = todoArray.filter(todo => todo.status === STATUS.PENDING);
    const completedTodos = todoArray.filter(todo => todo.status === STATUS.COMPLETED);
    const sortedTodos = [...pendingTodos, ...completedTodos];

    // Render the todos
    for (const todo of sortedTodos) {
        const taskItem = document.createElement("li");
        taskItem.classList.add("card", "taskItem");
        taskItem.dataset.id = todo.id;
        taskItem.innerHTML = `
        <input type="checkbox">
        <span></span>
        `;
        taskItem.querySelector("span").textContent = todo.text;
        if (todo.status === STATUS.COMPLETED){
            taskItem.classList.add("completed");
            taskItem.querySelector('input[type="checkbox"]').checked = true;
        }
        taskList.appendChild(taskItem);
    }
    // Only show clear button if there are completed todos
    clearTasks.style.display = completedTodos.length > 0 ? "inline-block" : "none";
}


// Complete a todo item
taskList.addEventListener("click", (event) => {
    const taskItem = event.target.closest(".taskItem");
    if (!taskItem) return;
    const newTodos = todos.map(todo => {
        if (todo.id === taskItem.dataset.id) {
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