import { renderTodos } from "./displayTodos.js";

const db = firebase.firestore();
const addButton = document.querySelector("#addTaskButton");
addButton.addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.querySelector("input#title").value;
  const desc = document.querySelector("textarea#desc").value;
  const date = document.querySelector("input#endDate").value;

  const todo = {
    title: title,
    description: desc,
    eddate: date
  }
  createTodo(todo)
  renderTodos();
})



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
