//global variables
let timerRunning = false;
let timerSeconds = 0;
let timerInterval;
let taskCounter =6;
let draggedElement =null;

function toggleTimer(){
    const btn = document.getElementById('timerToggle')

    if(timerRunning){
        clearInterval(timerInterval);
        btn.textContent='Start Timer';
        timerRunning=false;
        showNotification('Timer stopped')
    }else{
        timerInterval=setInterval(updateTimer,1000);
        btn.textContent='Stop Timer';
        timerRunning=true;
        showNotification('Timer started')
    }
}

function updateTimer(){
    timerSeconds++;
    const hours = Math.floor(timerSeconds / 3600);
    const minutes = Math.floor((timerSeconds % 3600) / 60);
    const seconds = timerSeconds % 60;

    document.getElementById('timerDisplay').textContent = 
        `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
    }

    document.getElementById('timerToggle').addEventListener('click',toggleTimer);
    

    