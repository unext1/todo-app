import { renderTodos } from "./displayTodos.js";

const db = firebase.firestore();
const addButton = document.querySelector("#addTaskButton");
const title = document.querySelector("input#title");
const desc = document.querySelector("textarea#desc");
const date = document.querySelector("input#endDate");
randomTodo()
addButton.addEventListener("click", (e) => {
  e.preventDefault();
  const todo = {
    title: title.value,
    description: desc.value,
    eddate: date.value,
    completed: false
  }
  createTodo(todo)
  renderTodos();
})

function randomTodo() {
  fetch("https://dummyjson.com/todos/random")
    .then(res => res.json())
    .then(data => {
      console.log(data)
      title.setAttribute("placeholder", data.todo)
    })
}

function createTodo(todo) {
  return db
    .collection("todos")
    .add(todo)
    .then((data) => {
      console.log("Todo added" + data);
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

// createTodo({
//   title: "New Todo3",
//   description: "This is a new todo4",
//   enddate: "2023-01-01",
//   completed: false,
// }).then((data) => {
//   console.log(data.id);
// });
