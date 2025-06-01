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
    
function sendMessage(){
    const input = document.getElementById('chatInput');
    const messages = document.getElementById('chatMessages')
            if (input.value.trim()){
                const messageDiv=document.createElement('div');
                messageDiv.className='message';
                messageDiv.innerHTML=`<strong>You:</strong> ${input.value}`;
                messages.appendChild(messageDiv);
                messages.scrollTop=messages.scrollHeight;
                input.value='';
            setTimeout(()=>{
                const responseDiv = document.createElement('div');
                responseDiv.className ='message';
                responseDiv.innerHTML = `<strong>System: </strong> Message received and broadcasted to team.`
                messages.appendChild(responseDiv);
                messages.scrollTop = messages.scrollHeight;
            },1000)


    }

}

document.getElementById('chatInput').addEventListener('keypress',(e) =>{
    if(e.key === 'Enter'){
        sendMessage();
    }
});
    


const chatInput = document.getElementById('chatInput');

chatInput.addEventListener('keydown',function(e){
    if(e.key === 'Enter' && !e.shiftKey){
        e.preventDefault();
        //solo enviar si hay contenido

        if(chatInput.value.trim()){
            sendMessage();
        }
    }
});
