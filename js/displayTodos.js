import { editTodo } from "./editTodo.js";

const db = firebase.firestore();

export function renderTodos() {
  const todosList = document.getElementById("todosList");
  const completedTodosList = document.getElementById("completedTodos");

  todosList.innerHTML = "";
  completedTodosList.innerHTML = "";

  db.collection("todos")
    .orderBy("enddate", "asc")
    .get()
    .then((data) => {
      data.forEach((i) => {
        const todo = i.data();

        console.log(todo.enddate);
        const listItem = document.createElement("li");

        const todoContainer = document.createElement("div");

        todoContainer.classList.add("p-4", "mt-2", "mb-5", "bg-gray-50");
        const endDate = new Date(todo.enddate);
        const today = new Date();
        console.log(endDate > today);
        const timeDifference = endDate.getTime() - Date.now();
        const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        todoContainer.classList.add(
          "p-4",
          "mt-2",
          "mb-5",
          daysRemaining <= 3 && daysRemaining > 0 && todo.completed === false
            ? "bg-orange-50"
            : "bg-gray-50",
          daysRemaining <= 0 && todo.completed === false
            ? "bg-red-50"
            : "bg-gray-50"
        );

        const titleElement = document.createElement("h3");
        titleElement.textContent = todo.title;
        todoContainer.appendChild(titleElement);
        titleElement.classList.add("text-xl");

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = todo.description;
        todoContainer.appendChild(descriptionElement);

        const endDateElement = document.createElement("p");
        endDateElement.textContent =
          "End Date: " + new Date(todo.enddate).toLocaleString();
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
          editTodo(i.id, updatedTodo);
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

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
          const editPopup = document.createElement("div");
          editPopup.classList.add("edit-popup");

          const titleInput = document.createElement("input");
          titleInput.type = "text";
          titleInput.value = todo.title;

          const descriptionInput = document.createElement("input");
          descriptionInput.type = "text";
          descriptionInput.value = todo.description;

          const endDateInput = document.createElement("input");
          endDateInput.type = "datetime-local";
          endDateInput.value = todo.enddate;

          const currentYear = new Date().getFullYear();
          endDateInput.max = `${currentYear + 1}-12-31T23:59`;

          const updateButton = document.createElement("button");
          updateButton.textContent = "Update";
          updateButton.addEventListener("click", () => {
            const updatedTodo = {
              title: titleInput.value,
              description: descriptionInput.value,
              enddate: endDateInput.value,
              completed: todo.completed,
            };

            editTodo(i.id, updatedTodo);
            editPopup.remove();
          });

          const cancelButton = document.createElement("button");
          cancelButton.textContent = "Cancel";
          cancelButton.addEventListener("click", () => {
            editPopup.remove();
          });

          editPopup.appendChild(titleInput);
          editPopup.appendChild(descriptionInput);
          editPopup.appendChild(endDateInput);
          editPopup.appendChild(updateButton);
          editPopup.appendChild(cancelButton);

          document.body.appendChild(editPopup);
        });

        editButton.classList.add(
          "px-6",
          "ml-3",
          "bg-gray-600",
          "py-1",
          "my-2",
          "text-white",
          "rounded-xl"
        );

        todoContainer.appendChild(editButton);

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

        if (todo.completed) {
          completedTodosList.appendChild(listItem);
        } else {
          todosList.appendChild(listItem);
        }
      });
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
