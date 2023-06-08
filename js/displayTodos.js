const db = firebase.firestore();

export function renderTodos() {
  const todosList = document.getElementById("todosList");

  todosList.innerHTML = "";

  db.collection("todos")
    .get()
    .then((data) => {
      data.forEach((i) => {
        const todo = i.data();

        const listItem = document.createElement("li");

        const todoContainer = document.createElement("div");

        todoContainer.classList.add("p-4", "mt-2", "mb-5", "bg-gray-50");

        const titleElement = document.createElement("h3");
        titleElement.textContent = todo.title;
        todoContainer.appendChild(titleElement);
        titleElement.classList.add("text-xl");

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = todo.description;
        todoContainer.appendChild(descriptionElement);

        const endDateElement = document.createElement("p");
        endDateElement.textContent = "End Date: " + todo.enddate;
        todoContainer.appendChild(endDateElement);

        const completedElement = document.createElement("p");
        completedElement.textContent = "Completed: " + todo.completed;
        todoContainer.appendChild(completedElement);

        const completeButton = document.createElement("button");
        completeButton.innerHTML = todo.completed ? "Uncomplete" : "Complete";
        completeButton.addEventListener("click", () => {
          const updatedTodo = {
            ...todo,
            completed: !todo.completed,
          };
          updateTodo(i.id, updatedTodo);
        });

        completeButton.classList.add(
          "px-6",
          "bg-gray-600",
          "py-1",
          "my-2",
          "text-white",
          "rounded-xl"
        );

        todoContainer.appendChild(completeButton);

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => {
          removeTodo(i.id);
        });
        todoContainer.appendChild(removeButton);

        removeButton.classList.add(
          "px-6",
          "ml-3",
          "bg-gray-600",
          "py-1",
          "my-2",
          "text-white",
          "rounded-xl"
        );

        listItem.appendChild(todoContainer);

        todosList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateTodo(todoId, updatedTodo) {
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

function removeTodo(todoId) {
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

renderTodos();
