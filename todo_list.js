const taskList = document.getElementById('task_list');
const addButton = document.getElementById('add_task');

addButton.addEventListener('click', (e) => {
    var description = document.getElementById('task_description_input').value;
    var time = document.getElementById('duetime_input').value;
    addTask(description, time);
    // console.log(taskList);
});

function addTask(description, dueTime) {
    var spanElement = document.createElement('span.due');
    var listItem = document.createElement('li');

    spanElement.textContent = dueTime
    var content = document.createTextNode(description + spanElement);
    console.log(content);
    listItem.appendChild(content);
    taskList.appendChild(listItem);
}