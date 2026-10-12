let taskform = document.getElementById("taskform");
let taskInput = document.getElementById("taskinput");
let categoryinput = document.getElementById("categoryinput");
let categorypriority = document.getElementById("priorityinput");
let tasklist = document.getElementById("tasklist");
let emptymessage = document.getElementById("emptymessage")


let tasks = []
let taskid = 1

taskform.addEventListener("click",function(event){

    event.preventDefault();

    const title = taskInput.value.trim();
    const category = categoryinput  .value;
    const priority = priorityinput.value;


    if(title===""){
        // alert("Please enter a task !")
        return;

    }
    const task = {
        id : taskid++,
        title : title,
        category : category,
        priority : priority,
        completed : false,
        createdat : Date.now()
    };

    const deletebtn = document.createElement("button");
    deletebtn.textContent= "delete";

    deletebtn.addEventListener("click",function(){
        tasks = tasks.filter(function(item){
            return item.id !== task.id;
        });
        li.remove;
        console.log(tasks)
    });

    const editbtn = document.createElement("button");
    editbtn.textContent = "Edit";

    editbtn.addEventListener("click",function(){
        const updateitle = prompt("Enter updated Task name :");

        if(updateitle !== null && updateitle.trim()  !== "" ){
            const newTitle = updateitle.trim();

            task.title.newTitle;
            span.textContent = newTitle;
        }
    })

    tasks.push(task);

    const li = document.createElement("li")
    
    const checkbox =    document.createElement("input")
    checkbox.type = "checkbox";

    const span = document.createElement("span");
    span.textContent = "title";
    
    checkbox.addEventListener("change",function(){
        if(checkbox.checked){
            span.style.textDecoration = "line-through";
            span.style.color = "gray";

        }
        else{
            span.style.textDecoration = "none";
            span.style.color = "none"
        }
    })

    li.append(checkbox)
    li.append(span);

    li.append(deletebtn);
    li.append(editbtn)

    tasklist.append(li);

    taskInput.value = "";

    emptymessage.style.display = "none";
    console.log(task)

})


