console.log('Hello')

const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos"));
if (todos) {
  todos.forEach((todo) => {
    add(todo);
  });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    add(); 
});

function add(todo) {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }

    if(todoText)
    {
        const li =document.createElement("li");
        li.innerText=todoText;
        li.classList.add("list-group-item");
        ul.appendChild(li);
        input.value="";
        saveData();
    }
}

function saveData() {
  const lists = document.querySelectorAll("li");
  const todos = [];

  lists.forEach((li) => {
    todos.push({
      text: li.innerText,
      completed: li.classList.contains("text-decoration-line-through"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}