console.log('Hello')

const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    let text = input.value;
    add(text, false); 
});

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

    //  ファイルを閉じる
    ts.Close();
    //  オブジェクトを解放
    fso = null;
}

function saveData() {
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	var ts = fso.OpenTextFile("todos.txt", 2);

    const lists = document.querySelectorAll("li");
    var alltext = "";
    for ( var i = 0; i < lists.length; i++ ){
        var text = lists[i].innerText;
        //ts.WriteLine(text);
        var completed = lists[i].classList.contains("text-decoration-line-through") ? 'false' : 'true';
        //ts.WriteLine(completed);
        alltext += (text + '\n' + completed+ '\n');
    }
    ts.Write(alltext);

    //  ファイルを閉じる
    ts.Close();
    //  オブジェクトを解放
    fso = null;
}

function add(todo, completed) {    
    if(todo)
    {
        const li =document.createElement("li");
        li.innerText=todo;
        li.classList.add("list-group-item");

        if(todo && completed) {
          li.classList.add("text-decoration-line-through");
        }

        li.addEventListener("contextmenu", function (event){
          event.preventDefault();
          li.remove();
          saveData();
        });

        li.addEventListener("click", function () {
          li.classList.toggle("text-decoration-line-through");
          saveData();
        });
        ul.appendChild(li);
        input.value="";
        saveData();
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