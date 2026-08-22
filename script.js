const inputBox = document.getElementById("task-input");
const inputButton = document.getElementById("task-btn");
const taskList = document.getElementById("task-list");

inputButton.addEventListener("click",addTask);

function addTask(){
    if(inputBox.value.trim() !== ""){
    const taskText = inputBox.value.trim();
    const task = document.createElement("li");
    task.textContent = taskText;
    taskList.appendChild(task);
    task.addEventListener("click", completeTask)
  
    inputBox.value = "";
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "x"
    task.appendChild(deleteButton);
    deleteButton.addEventListener("click", deleteTask);

    }
}

function deleteTask(event){
    const li = event.target.parentElement;

    taskList.removeChild(li);

}
function completeTask(e){
   
    console.log(e.target);
    
    
    


}



