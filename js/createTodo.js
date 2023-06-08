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
//   completed: false,
//   enddate: "2023-01-01",
// }).then((data) => {
//   console.log(data.id);
// });
