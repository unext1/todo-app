import { renderTodos } from "./displayTodos.js";

const db = firebase.firestore();

export function editTodo(todoId, updatedTodo) {
  db.collection("todos")
    .doc(todoId)
    .update(updatedTodo)
    .then(() => {
      console.log("Todo updated successfully");
      renderTodos();
    })
    .catch((error) => {
      console.log(error);
    });
}

export function removeTodo(todoId) {
  db.collection("todos")
    .doc(todoId)
    .delete()
    .then(() => {
      console.log("removed");
      renderTodos();
    })
    .catch((error) => {
      console.log(error);
    });
}
