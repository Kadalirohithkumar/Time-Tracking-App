let timer;
let startTime;
let taskDescription;
const taskInput = document.getElementById('task');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const clearBtn = document.getElementById('clearBtn');
const taskList = document.getElementById('taskList');

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
clearBtn.addEventListener('click', clearHistory);

function startTimer() {
    if (!timer) {
        startTime = Date.now();
        taskDescription = taskInput.value || 'Task';
        timer = setInterval(updateTimer, 1000); // Update timer every 1000ms (1 second)
        const taskItem = document.createElement('li');
        taskItem.textContent = `${taskDescription}: ${timer}`;
        taskList.appendChild(taskItem);
    }
}

function stopTimer() {
    if (timer) {
        clearInterval(timer);
        const endTime = Date.now();
        const elapsedTime = new Date(endTime - startTime);
        const formattedTime = formatTime(elapsedTime);
        displayTotalTimeSpent(taskDescription, elapsedTime);
        timer = null;
    }
}

function updateTimer() {
    const currentTime = Date.now();
    const elapsedTime = new Date(currentTime - startTime);
    const formattedTime = formatTime(elapsedTime);
    taskList.lastChild.textContent = `${taskDescription}: ${formattedTime}`;
}

function formatTime(time) {
    const hours = String(time.getUTCHours()).padStart(2, '0');
    const minutes = String(time.getUTCMinutes()).padStart(2, '0');
    const seconds = String(time.getUTCSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function displayTotalTimeSpent(taskName, time) {
    const totalTimeText = `Total time spend on ${taskName}: ${formatTime(time)}`;
    const totalItem = document.createElement('li');
    totalItem.textContent = totalTimeText;
    taskList.appendChild(totalItem);
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    taskInput.value = '';
}

function clearHistory() {
    taskList.innerHTML = ''; // Clear the task list
}
