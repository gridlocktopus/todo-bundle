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



// localStorage.clear();



// const taskInput = document.getElementById("task");
// const addButton = document.getElementById("add");
// const taskList = document.getElementById("tasklist");

// let todos = getTodos();

// // Retrieve and print stored tasks
// if (todos.length) {
//     for (i in todos) {
//         const taskItem = document.createElement("li");
//         taskItem.innerHTML = `
//         <span>${todos[i]}</span>
//         <button class="delete">Delete</button>
//         `;
//         taskList.appendChild(taskItem);
//     }
// }


// // Add task
// addButton.addEventListener("click", () => {
//     const taskText = taskInput.value.trim();
//     if (taskText != "") {
//         createTask(taskText);
//         taskInput.value = "";
//     }
// });

// // Create a new task
// function createTask(text) {
//     todos.push(text);
//     saveTodos(todos);
//     const taskItem = document.createElement("li");
//     taskItem.innerHTML = `
//     <span>${text}</span>
//     <button class="delete">Delete</button>
//     `;
//     taskList.appendChild(taskItem);

//     // Delete the task
//     const deleteButton = taskItem.querySelector(".delete");
//     deleteButton.addEventListener("click", () => {
//         todos.pop(taskItem);
//         deleteTodos(todos);
//         taskItem.remove();
//     });
  
    
// }

// function saveTodos(todosArray) {
//     const todosJson = JSON.stringify(todosArray);
//     localStorage.setItem('todos', todosJson);
// }

// function deleteTodos(todosArray) {
//     const todosJson = JSON.stringify(todosArray);
//     localStorage.removeItem('todos', todosJson);
// }

// function getTodos() {
//     // localStorage.clear();
//     const todosJson = localStorage.getItem("todos");
//     if (todosJson) {
//         return JSON.parse(todosJson);
//     } else {
//         return [];
//     }
// }