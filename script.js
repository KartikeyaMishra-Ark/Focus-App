const inputBox = document.getElementById("task-input");
const inputButton = document.getElementById("task-btn");
const taskList = document.getElementById("task-list");

inputButton.addEventListener("click",addTask);




function addTask(){



    if(inputBox.value.trim() !== ""){
    const taskText = inputBox.value.trim();


    const task = document.createElement("li");

    const taskTextElement = document.createElement("span");
    taskTextElement.textContent = taskText;


    task.appendChild(taskTextElement);
    taskList.appendChild(task);

    taskTextElement.addEventListener("click", completeTask)
    inputBox.addEventListener("keydown")

    inputBox.value = "";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "x";

 

    deleteButton.classList.add("deleteButton");

    
    task.appendChild(deleteButton);
    deleteButton.addEventListener("click", deleteTask);

    }

} 



function deleteTask(event){

    const li = event.target.parentElement;

    taskList.removeChild(li);

}


function completeTask(e){

    

    
        e.target.classList.toggle("completed")


   
}



