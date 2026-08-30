const inputBox = document.getElementById("task-input");
const inputButton = document.getElementById("task-btn");
const taskList = document.getElementById("task-list");
const pomodoroContainer = document.getElementById("pomodoro");
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start-btn");
const resetButton = document.getElementById("reset-btn");
const cityInput = document.getElementById("city-input");
const weatherButton = document.getElementById("weather-btn");
const cityName = document.getElementById("city-name");

const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("Humidity");
const wind = document.getElementById("Wind");

const weatherError = document.getElementById("weather-error");

const petalsContainer = document.getElementById("petals");

const music = document.getElementById("music");
const musicButton = document.getElementById("music-btn");
const musicSelect = document.getElementById("music-select");


const volumeCtrl = document.getElementById("volume-ctrl");

music.volume = 0.5;
volumeCtrl.addEventListener("input", function(){

    music.volume= volumeCtrl.value;


});



function Petal(){

    

    const petal = document.createElement("div");

    petal.classList.add("petal");

    
    petal.style.left = (Math.random() * 55 + 45) + "vw";

    petal.style.animationDuration =

        Math.random() * 5 + 7 + "s";

    petal.style.width =

        Math.random() * 8 + 8 + "px";

    petal.style.height =
        Math.random() *  5 + 6 + "px";

        
    petal.style.opacity =
        Math.random() * 0.4 + 0.4;


    petalsContainer.appendChild(petal);

    petal.style.setProperty(
    "--drift",
    (Math.random() * 300 + 150) + "px"
    );

    setTimeout(() => {
        petal.remove();
    }, 13000);

}

setInterval(Petal, 400);



let timeLeft = 1500;

let interval;


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


inputButton.addEventListener("click",addTask);


inputBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {

        addTask();
    }
});



music.src = musicSelect.value;




function addTask(){



    if(inputBox.value.trim() !== ""){
    const taskText = inputBox.value.trim();


    const task = document.createElement("li");

    const taskTextElement = document.createElement("span");
    taskTextElement.textContent = taskText;


    task.appendChild(taskTextElement);
    taskList.appendChild(task);


    task.addEventListener("click", completeTask)

    inputBox.value = "";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "x";

 



    deleteButton.classList.add("deleteButton");

    
    task.appendChild(deleteButton);

    deleteButton.addEventListener("click", deleteTask);


    tasks.push({
        text:taskText,
        completed: false    

    });
    }


    

    localStorage.setItem("tasks", JSON.stringify(tasks))

} 


function loadTasks(){
    tasks.forEach(function(taskData){
        const task = document.createElement("li")

        const taskTextElement = document.createElement("span")
        taskTextElement.textContent=taskData.text;
        task.appendChild(taskTextElement);

        taskList.appendChild(task);


        task.addEventListener("click", completeTask)
        const deleteButton=document.createElement("button");
        deleteButton.classList.add("deleteButton");
        deleteButton.textContent = "x";
        
        task.appendChild(deleteButton);
        deleteButton.addEventListener("click", deleteTask);

        if(taskData.completed){
            taskTextElement.classList.add("completed");


        }
    })


}
loadTasks();








function deleteTask(event){

    const li = event.target.parentElement;

    taskList.removeChild(li);

    const taskText = li.querySelector("span").textContent;

    tasks = tasks.filter(function(task){
        return task.text !== taskText

    })
    localStorage.setItem("tasks", JSON.stringify(tasks));



}



function completeTask(e){

    if (e.target.classList.contains("deleteButton")){
        return;


    }

    const taskText = e.currentTarget.querySelector("span")
    taskText.classList.toggle("completed")
    const task = tasks.find(function(task){
        return task.text === taskText.textContent;





    });
    task.completed = taskText.classList.contains("completed");
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    


   
}




startButton.addEventListener("click", timerStart);

function timerStart(){


    if (interval){
        clearInterval(interval);
        interval = null;
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



    interval = null;

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





weatherButton.addEventListener("click", fetchWeather);

async function fetchWeather(defaultCity) {

    const city = defaultCity || cityInput.value.trim();

    if(city ===""){
        return;
    }

    try {
        weatherError.textContent = "Loading....";
        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`

        )
        const locationData = await locationResponse.json();

        if (!locationData.results){


            weatherError.textContent = "City not found."
            return
        }

        const location = locationData.results[0];
        const latitude = location.latitude;
        const longitude = location.longitude;

        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
 
        )

        const weather = await weatherResponse.json();
        cityName.textContent = location.name;
        temperature.textContent = 


        Math.round(weather.current.temperature_2m) + "°C";
        humidity.textContent=

        weather.current.relative_humidity_2m;
        wind.textContent=

        Math.round(weather.current.wind_speed_10m);

        condition.textContent


        condition.textContent =
            getWeatherCondition(weather.current.weather_code);

        weatherError.textContent = "";

    } catch (error) {

        weatherError.textContent = "Something went wrong. Try again.";


        console.error(error);

        
    }
}





function getWeatherCondition(code) {

    if (code === 0) {

        return "Clear sky"

    }



    if (code === 1 || code=== 2 || code=== 3) {
        return "Cloudy"

    }


    if (code >= 51 && code<= 67) {

        return "Rain"
    }
    if (code >= 71 && code<= 77) {

        return "Snow";
    }


    if (code >= 80 && code <= 82) {
        return "Rain showers";

    }


    if (code>= 95) {
        return "Thunderstorm";

    }



    return "Unknown";


}


cityInput.addEventListener("keydown", function(event) {


    if (event.key === "Enter") {
        fetchWeather();
    }

});



musicButton.addEventListener("click", function(){

    if(music.paused){


        music.play();
        musicButton.textContent = "Pause";

    }

    else{
        music.pause();
        musicButton.textContent = "Play";



    }


});

musicSelect.addEventListener("change", function(){

    music.src = musicSelect.value;
    music.play();
    musicButton.textContent = "Pause";




});













fetchWeather("Tokyo");




    

    










