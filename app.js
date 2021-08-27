// Selecting elements
const todoForm = document.querySelector("#Todo-form");
const todoInput = document.querySelector("#Todo-input");
const todosUl = document.querySelector("#Todos");

// Getting todos from local storage
const todos = JSON.parse(localStorage.getItem("todos"));

// Adding the todos from local storage
if (todos) {
  todos.forEach((todo) => addTodo(todo));
}

// On submit add todo along with the event listeners to each todo
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo(todo) {
  let todoText = todoInput.value;

  // If todo passed as arg
  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const todoEl = document.createElement("li");
    // if todo from local storage is completed
    if (todo && todo.completed) {
      todoEl.classList.add("completed");
    }

    todoEl.innerText = todoText;

    // Adding eventlistener to each todo list item
    todoEl.addEventListener("click", () => {
      saveTodos();
      todoEl.classList.toggle("completed");
    });

    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      todoEl.remove();

      saveTodos();
    });

    todosUl.appendChild(todoEl);

    todoInput.value = "";

    saveTodos();
  }
}

// Save to local storage each time added, deleted or completed
function saveTodos() {
  let todosEl = document.querySelectorAll("li");

  const todos = [];

  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}
