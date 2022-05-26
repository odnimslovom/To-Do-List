const taskInput = document.getElementById('input-task');
const addTaskBtn = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');

addTaskBtn.addEventListener('click', () => {
    addTask();
});
document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Enter') {
        addTask();
    }
});
renderSavedTasks();

function renderSavedTasks() {
    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.forEach( savedTask => {
        renderTasks(savedTask.text, savedTask.checked);
    });
}

function renderTasks(taskText, isChecked) {
    const taskElement = getTaskElement(taskText, isChecked);
    taskList.append(taskElement);
}

function getTaskElement(taskText, isChecked) {
    const taskTemplate = document.getElementById('task-template').content;
    const taskElement = taskTemplate.querySelector('.task-list__item').cloneNode(true);
    const taskContent = taskElement.querySelector('.task');
    const taskDelBtn = taskElement.querySelector('.delete-btn');
    const taskCheckBox = taskElement.querySelector('.checkbox');

    taskContent.textContent = taskText;
    taskCheckBox.checked = isChecked;
    if (isChecked) {
        taskContent.classList.add('doned');
    }

    taskDelBtn.addEventListener('click', (evt) => {
        delTask(evt);
    });

    taskCheckBox.addEventListener('change', (evt)=> {
        if (evt.target.checked) {
            taskContent.classList.add('doned');
        } else {
            taskContent.classList.remove('doned');
        }
        updateLocalStorage();
    });

    return taskElement;
}

function createTaskObj(taskText, isChecked) {
    return {
        text : taskText,
        checked : isChecked
    };
}

function updateLocalStorage() {
    let taskKeeper = [];
    let tasks = document.querySelectorAll('.task');
    tasks.forEach(task => {
        taskKeeper.push(createTaskObj(task.textContent, task.classList.contains('doned')));
    });
    localStorage.setItem("tasks", JSON.stringify(taskKeeper));
}

function addTask() {
    const taskText = taskInput.value;
    if (taskText.trim() !== '') {
        renderTasks(taskText);
        taskInput.value = '';
        updateLocalStorage();
    }
}

function delTask(evt) {
    const task = evt.target.closest('.task-list__item');
    task.remove();
    updateLocalStorage();
}












