console.log('Hello')

const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

// const todos = JSON.parse(localStorage.getItem("todos"));
// if (todos) {
//   todos.forEach((todo) => {
//     add(todo);
//   });
// }

// form.addEventListener("submit", function(event) {
//     event.preventDefault();
//     add(); 
// });

init();

function init() {
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	var ts = fso.OpenTextFile("todos.txt", 1);
	var text = "";
    // ファイルの末尾までループ
    while (!ts.AtEndOfStream) {
        // ファイル読込
		text += ts.Read(1024);
    }
    // クローズ判定
    if (true) {
        // クローズ
        ts.Close();
    }
	var lines = text.split('\n');
	for ( var i = 0; i < lines.length; i++ )
	{
		// 空行は無視する
        if ( lines[i] == '' ) {
            continue;
        }

		if(i % 2 == 0)
		{			
			completestring = lines[i + 1];
			if(completestring.indexOf('true'))
			{
				add(lines[i], true);
			}else{
				add(lines[i], false);
			}	
		}
	}
}

function test() {
	
}

function add(todo, completed) {
    let todoText = input.value;

    if (todo) {
        todoText = todo;
    }

    if(todoText)
    {
        const li =document.createElement("li");
        li.innerText=todoText;
        li.classList.add("list-group-item");

        if(todo && completed) {
          li.classList.add("text-decoration-line-through");
        }

        li.addEventListener("contextmenu", function (event){
          event.preventDefault();
          li.remove();
          //saveData();
        });

        li.addEventListener("click", function () {
          li.classList.toggle("text-decoration-line-through");
          //saveData();
        });
        ul.appendChild(li);
        input.value="";
        //saveData();
    }
}

// function saveData() {
//   const lists = document.querySelectorAll("li");
//   const todos = [];

//   lists.forEach((li) => {
//     todos.push({
//       text: li.innerText,
//       completed: li.classList.contains("text-decoration-line-through"),
//     });
//   });

//   localStorage.setItem("todos", JSON.stringify(todos));
// }