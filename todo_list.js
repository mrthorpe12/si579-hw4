const taskList = document.getElementById('task_list');
const addButton = document.getElementById('add_task');
const taskDescriptionInput = document.getElementById('task_description_input');
const listItems = document.getElementsByTagName('li');

addButton.addEventListener('click', handler, false);
taskDescriptionInput.addEventListener('keydown', (e) => {
    if (e.key == "Enter") {
        handler();
    }
}, false);

/**
 * Helper function that handles addButton events.  Contains for loop that allows user to remove items from list.
 */
function handler() {
    var dateInput = document.getElementById('duedate_input');
    var timeInput = document.getElementById('duetime_input');
    
    var taskDescription = document.getElementById('task_description_input').value;
    var taskTime = dateAndTimeToTimestamp(dateInput, timeInput);
    // console.log(typeof taskTime);
    addTask(taskDescription, taskTime);
    taskDescriptionInput.value = '';

    for (var index = 0; index < listItems.length; index++) {
        let item = listItems[index];
        console.log(`Item: ${item.innerHTML} Item index: ${index}`);
        var removeButton = item.querySelector('button');

        removeButton.addEventListener('click', (e) => {
            console.log('Hurray!  You found the button!');
            item.parentElement.removeChild(item);
        });
    }
}

/**
 * Function that accepts user-specified date and time and returns single value (in milliseconds).
 * @param  {HTMLElement} dateInputElement
 * Date input element
 * @param  {HTMLElement} timeInputElement
 * Time input element
 */
function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    var dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    var dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time  

    if (dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset = (new Date()).getTimezoneOffset() * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    }
}

/**
 * Function that accepts description of given task and due time for said task.  Relevant information is appended to HTML list element.
 * @param  {string} description
 * Description of given task
 * @param  {number} dueTime
 * Date and time in millisecond format.  Parameter is optional.
 */
function addTask(description, dueTime) {
    var listItem = document.createElement('li');
    var span = document.createElement('span');
    var btn = document.createElement('button');

    btn.innerHTML = "Done";
    btn.className = "btn btn-sm btn-outline-danger done";
    span.className = "due";

    if (dueTime) {
        dueTime = new Date(dueTime);
        span.textContent = ` due ${dueTime.toLocaleDateString('en-US')} ${dueTime.toLocaleTimeString('en-US')} `;
    }


    listItem.append(description);
    if (dueTime) {
        listItem.append(span);
    }
    listItem.append(btn);


    taskList.appendChild(listItem);

}