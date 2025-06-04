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

    column.addEventListener('dragleave', (e) => {
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

// Template functionality 
function loadTemplate(){
const template = document.getElementById('projectTeTemplate').value;
if (!template)return;
const templates  = {
'web-dev':[
    {title:'setup development Environment',priority:'high'},
    {title:'Create wireframes',priority:'medium'},
    {title:'develop frontend components',priority:'high'},
    {title:'setup backend Api', priority:'heigh'},
    {title:'database design',priority:'medium'},
    {title:'testing & QA',priority:'medium'},
    ],
    'marketing':[
        {title:'market research',priority: 'high'},
        {title:'define target audience',priority:'high'},
        {title:'create content strategy',priority:'medium'},
        {title:'design campaign materials',priority:'medium'},
        {title:'launch campaign',priority:'high'},
        {title:'analyze results',priority:'low'}
    ],
    'mobile-app':[
        {title:'app concept & features',priority:'high'},
        {title:'UI/UX Design',priority: 'hign'},
        {title:'develop core features',priority: 'high'},
        {title:'integrate apis',priority: 'medium'},
        {title:'testing on devices', priority: 'medium'},
        {title:'app store submission',priority: 'low'}
    ]
};
const todoColumn = document.querySelector('[data-status="todo"]');

//clear existing tasks except header
const existingTasks = todoColumn.querySelectorAll('.taks-card');
existingTasks.forEach(task => task.remove());

//Add template tasks
template[template].forEach(task => {
    createTask(task.title, task.priority, '' , 'john');
});
showNotification(`${template.replace('-', ' ')} template loaded`);
}















setTimeout(()=> {
    showNotification('slack integration: New mesage from #development');
    },5000);


        // Template functionality
//         function loadTemplate() {
//             const template = document.getElementById('projectTemplate').value;
//             if (!template) return;

//             const templates = {
//                 'web-dev': [
//                     { title: 'Setup Development Environment', priority: 'high' },
//                     { title: 'Create Wireframes', priority: 'medium' },
//                     { title: 'Develop Frontend Components', priority: 'high' },
//                     { title: 'Setup Backend API', priority: 'high' },
//                     { title: 'Database Design', priority: 'medium' },
//                     { title: 'Testing & QA', priority: 'medium' }
//                 ],
//                 'marketing': [
//                     { title: 'Market Research', priority: 'high' },
//                     { title: 'Define Target Audience', priority: 'high' },
//                     { title: 'Create Content Strategy', priority: 'medium' },
//                     { title: 'Design Campaign Materials', priority: 'medium' },
//                     { title: 'Launch Campaign', priority: 'high' },
//                     { title: 'Analyze Results', priority: 'low' }
//                 ],
//                 'mobile-app': [
//                     { title: 'App Concept & Features', priority: 'high' },
//                     { title: 'UI/UX Design', priority: 'high' },
//                     { title: 'Develop Core Features', priority: 'high' },
//                     { title: 'Integrate APIs', priority: 'medium' },
//                     { title: 'Testing on Devices', priority: 'medium' },
//                     { title: 'App Store Submission', priority: 'low' }
//                 ]
//             };

//             const todoColumn = document.querySelector('[data-status="todo"]');
//             // Clear existing tasks except header
//             const existingTasks = todoColumn.querySelectorAll('.task-card');
//             existingTasks.forEach(task => task.remove());

//             // Add template tasks
//             templates[template].forEach(task => {
//                 createTask(task.title, task.priority, '', 'john');
//             });

//             showNotification(`${template.replace('-', ' ')} template loaded!`);
//         }

//         // Report generation
//         function generateReport() {
//             const totalTasks = document.querySelectorAll('.task-card').length;
//             const doneTasks = document.querySelectorAll('[data-status="done"] .task-card').length;
//             const progressTasks = document.querySelectorAll('[data-status="progress"] .task-card').length;
//             const reviewTasks = document.querySelectorAll('[data-status="review"] .task-card').length;
            
//             const report = `
// PROJECT PRODUCTIVITY REPORT
// ===========================
// Date: ${new Date().toLocaleDateString()}
// Total Tasks: ${totalTasks}
// Completed: ${doneTasks} (${Math.round(doneTasks/totalTasks*100)}%)
// In Progress: ${progressTasks}
// In Review: ${reviewTasks}
// Completion Rate: ${Math.round(doneTasks/totalTasks*100)}%
// Team Efficiency: High
//             `;
            
//             // Create and download report
//             const blob = new Blob([report], { type: 'text/plain' });
//             const url = URL.createObjectURL(blob);
//             const a = document.createElement('a');
//             a.href = url;
//             a.download = 'productivity-report.txt';
//             a.click();
//             URL.revokeObjectURL(url);
            
//             showNotification('Report generated and downloaded!');
//         }

//         // Export functionality
//         function exportData() {
//             const tasks = [];
//             document.querySelectorAll('.task-card').forEach(card => {
//                 const title = card.querySelector('.task-title').textContent;
//                 const priority = card.querySelector('.priority').textContent;
//                 const status = card.parentElement.dataset.status;
//                 tasks.push({ title, priority, status });
//             });
            
//             const exportData = {
//                 project: 'TaskFlow Demo Project',
//                 exportDate: new Date().toISOString(),
//                 tasks: tasks,
//                 stats: {
//                     totalTasks: tasks.length,
//                     completedTasks: tasks.filter(t => t.status === 'done').length
//                 }
//             };
            
//             const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
//             const url = URL.createObjectURL(blob);
//             const a = document.createElement('a');
//             a.href = url;
//             a.download = 'taskflow-export.json';
//             a.click();
//             URL.revokeObjectURL(url);
            
//             showNotification('Data exported successfully!');
//         }

//         // Update statistics
//         function updateStats() {
//             const totalTasks = document.querySelectorAll('.task-card').length;
//             const completedTasks = document.querySelectorAll('[data-status="done"] .task-card').length;
            
//             document.getElementById('totalTasks').textContent = totalTasks;
//             document.getElementById('completedTasks').textContent = completedTasks;
//         }

//         // Notification system
//         function showNotification(message) {
//             const notification = document.getElementById('notification');
//             notification.textContent = message;
//             notification.classList.add('show');
            
//             setTimeout(() => {
//                 notification.classList.remove('show');
//             }, 3000);
//         }

//         // Close modal when clicking outside
//         window.addEventListener('click', (e) => {
//             const modal = document.getElementById('taskModal');
//             if (e.target === modal) {
//                 closeTaskModal();
//             }
//         });

//         // Simulate real-time updates
//         setInterval(() => {
//             const onlineUsers = Math.floor(Math.random() * 5) + 1;
//             document.getElementById('onlineUsers').textContent = `(${onlineUsers} online)`;
//         }, 10000);

//         // Initialize
//         updateStats();
        
//         // Simulate Slack integration notification
//         setTimeout(() => {
//             showNotification('Slack integration: New message from #development');
//         }, 5000);