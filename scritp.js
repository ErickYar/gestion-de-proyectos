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
    //chat functionality
function sendMessage(){
    const input = document.getElementById('chatInput');
    const messages = document.getElementById('chatMessages');

            if (input.value.trim()){
                const messageDiv=document.createElement('div');
                messageDiv.className='message';
                messageDiv.innerHTML=`<strong>You:</strong> ${input.value}`;
                messages.appendChild(messageDiv);
                messages.scrollTop=messages.scrollHeight;

                input.value='';

            setTimeout(() => {
                    const responseDiv = document.createElement('div');
                    responseDiv.className = 'message';
                    responseDiv.innerHTML = `<strong>System:</strong> Message received and broadcasted to team.`;
                    messages.appendChild(responseDiv);
                    messages.scrollTop = messages.scrollHeight;
                }, 1000);
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

// task modal functionality
function openTaskModal(){
    document.getElementById('taskModal').style.display='block';
}
       
function closeTaskModal(){
    document.getElementById('taskModal').style.display='none';
    document.getElementById('taskForm').reset();
}

document.getElementById('taskForm').addEventListener('submit',(e)=>{
    e.preventDefault();
    const title = document.getElementById('taskTitle').value;
    const priority = document.getElementById('taskPriority').value;
    const dueDate = document.getElementById('taskDueDate').value;
    const assignee = document.getElementById('taskAssignee').value;

    createTask(title, priority,dueDate,assignee);
    closeTaskModal();
    showNotification('Task created successfully');

});


function createTask(title, priority,dueDate,assignee ) {
    const todoColumn = document.querySelector('[data-status="todo"]');
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.draggable = true;
    taskCard.dataset.id = taskCounter++;

    const dueText = dueDate ? new Date(dueDate).toLocaleDateString(): 'no due date';

    taskCard.innerHTML = `
    <div class="task-title">${title}</div>
    <div class="task-meta">
    <span clase="priority priority-${priority}">${priority.charAt(0).toUpperCase() + priority.slice(1)}</span>
    <span>Due: ${dueText}</span>
    </div>
    
    `;

todoColumn.appendChild(taskCard);
addDragListeners(taskCard);
updateStats();
}
 

//Drag and drop functionality

function addDragListeners(element){
    element.addEventListener('dragstart', (e) => {
        draggedElement = element;
        e.style.opacity = '0.5';
    });
    element.addEventListener('dragend', (e) => {
        e.style.opacity='1';
        draggedElement = null;
    });
}
 // Add drag listeners to existing tasks
        document.querySelectorAll('.task-card').forEach(addDragListeners);
       

 // Add drop listeners to columns

 document.querySelectorAll('.column').forEach(column => {
    column.addEventListener('dragover',(e)=>{
        e.preventDefault();
        column.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';

    });

    column.addEventListener('dragleave',(e) => {
        column.style.backgroundColor ='';

    });

    column.addEventListener('drop',(e)=>{
        e.preventDefault();
        column.style.backgroundColor = '';

        if(draggedElement && column !== draggedElement.parentElement){
            column.appendChild(draggedElement);
            showNotification(`Tack moved to ${column.dataset.status}`);
            updateStats();
        }
    })



 })
