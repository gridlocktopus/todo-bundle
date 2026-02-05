import { useState } from "react";
import { useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useRef } from "react";

function App() {
  const [count, setCount] = useState(0);

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

  function createTodo(todoText, todoDueAt) {
    return {
      id: crypto.randomUUID(),
      text: todoText,
      createdAt: Date.now(),
      dueAt: todoDueAt || null,
    };
  }

  const handleTextInputChange = (e) => {
    setTodoText(e.target.value);
  };

  const handleAddButton = () => {
    if (todoText.trim() === "") {
      return;
    }

    const newTodo = createTodo(todoText);
    setTodos((prevTodos) => [...prevTodos, newTodo]);

    setTodoText("");
  };

  console.log(todos);

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
          {todos.map((todo) => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
