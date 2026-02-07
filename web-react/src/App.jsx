import { useState } from "react";
import { useEffect } from "react";
import "./App.css";

function App() {
  // initialize the todos array
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem("savedTodos");
    // return either stored todos or an empty array
    return stored ? JSON.parse(stored) : [];
  });
  // initialize the user input text
  const [todoText, setTodoText] = useState("");

  // Save todos to local storage
  useEffect(() => {
    localStorage.setItem("savedTodos", JSON.stringify(todos));
  }, [todos]);

  // create a new todo
  function createTodo(todoText, todoDueAt) {
    return {
      id: crypto.randomUUID(),
      text: todoText,
      completed: false,
      createdAt: Date.now(),
      dueAt: todoDueAt || null,
    };
  }

  // handler for user text input
  const handleTextInputChange = (e) => {
    setTodoText(e.target.value);
  };

  // handler for the "Add" button
  const handleAddButton = () => {
    if (todoText.trim() === "") {
      return;
    }
    const newTodo = createTodo(todoText);
    setTodos((prevTodos) => [...prevTodos, newTodo]);

    setTodoText("");
  };

  // handler for the "Delete" button
  const handleDeleteButton = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // handler for toggling todo status
  const handleToggle = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        } else {
          return todo;
        }
      }),
    );
  };

  const pendingTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);
  const visibleTodos = [...pendingTodos, ...completedTodos];

  return (
    <>
      <div>
        <input
          type="text"
          value={todoText}
          onChange={handleTextInputChange}
        ></input>
        <button onClick={handleAddButton}>Add task</button>
        <ul>
          {visibleTodos.map((todo) => (
            <li key={todo.id} onClick={() => handleToggle(todo.id)}>
              <span className={todo.completed ? "completed" : "pending"}>
                {todo.text}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteButton(todo.id);
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
