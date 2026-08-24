const inputBox = document.getElementById("task-input");
const inputButton = document.getElementById("task-btn");
const taskList = document.getElementById("task-list");
const pomodoroContainer = document.getElementById("pomodoro");
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start-btn");
const resetButton = document.getElementById("reset-btn");
let timeLeft = 1500;
let interval;





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



startButton.addEventListener("click", timerStart);

function timerStart(){

    if (interval){
        clearInterval(interval);
        interval = null
        startButton.textContent = "Start";



    }
    else{

        interval = setInterval(() => {
        timeLeft--;
        
        updateDisplay();
    
    
    }, 1000);
    startButton.textContent= ("Stop");
    }
        


    
}


resetButton.addEventListener("click", resetTimer);
function resetTimer(){
    clearInterval(interval);
    timeLeft = 1500;
    
    updateDisplay();


}
function updateDisplay(){

        const minutes = Math.floor(timeLeft/60);
        const seconds = timeLeft % 60;
        const formattedSeconds = seconds.toString().padStart(2, "0");
        const formattedMinutes = minutes.toString().padStart(2, "0");
        timerDisplay.textContent = formattedMinutes + ":" + formattedSeconds;


}


