const taskInput = document.getElementById('taskinput')
const addTaskBtn = document.getElementById('addtaskbtn')
const taskList = document.getElementById('tasklist')

// addTaskBtn.addEventListener('click',function(){
//     const taskText = taskInput.value;
//     if(taskText !== ""){
//         const listitem = document.createElement("li")
//         listitem.textContent = taskText;
//         taskList.appendChild(listitem);

//         taskInput.value = "";
//     }
//     else{
//         alert("pls enter a task")
//     }

// })

addTaskBtn.addEventListener('click',function(){
    const taskText = taskInput.value;
    if(taskText !== ""){
        const listitem = document.createElement("li")

        const taskspan = document.createElement('span');
        taskspan.textContent = taskText;
        taskspan.className = 'task-text';

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete"
        deleteBtn.className = 'delete-btn'


        listitem.appendChild(taskspan);
        listitem.appendChild(deleteBtn);

        taskList.appendChild(listitem);

        taskInput.value = "";
        saveTasks()
    }
    else{
        alert("pls enter a task")
    }

})

taskList.addEventListener('click',function(event){
    if(event.target.classList.contains('delete-btn')){
        const listItemtodelete = event.target.parentElement;
        taskList.removeChild(listItemtodelete);
        saveTasks()
    }

    else if(event.target.classList.contains('task-text')){
        event.target.classList.toggle('completed')
        saveTasks()
    }
})

function saveTasks(){
    const tasks = [];
    const taskItems = taskList.querySelectorAll('li');
    taskItems.forEach(function(item) {
        const taskTextspan = item.querySelector('.task-text')
        if(taskTextspan){
            const text = taskTextspan.textContent;
            const iscompleted = taskTextspan.classList.contains('completed');
            tasks.push({text:text , completed:iscompleted});
        }
    });
    localStorage.setItem('myToDoTasks', JSON.stringify(tasks));
}



function loadTasks() {
    const savedTasks = localStorage.getItem('myToDoTasks');

    if (savedTasks) { 
        const tasks = JSON.parse(savedTasks); 

        tasks.forEach(function(taskObject) {

            const listItem = document.createElement('li');

            const taskSpan = document.createElement('span');
            taskSpan.textContent = taskObject.text; 
            taskSpan.className = 'task-text';
            if (taskObject.completed) { 
                taskSpan.classList.add('completed'); 
            }

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = "Delete";
            deleteBtn.className = 'delete-btn';

            listItem.appendChild(taskSpan);
            listItem.appendChild(deleteBtn);
            taskList.appendChild(listItem);
        });
        
    }
}

document.addEventListener('DOMContentLoaded', loadTasks);
