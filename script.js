function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let form = document.getElementById("task-form");

if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        let taskInput = document.getElementById("task-input").value;
        let dueDate = document.getElementById("due-date").value;

        let newTask = {
            name: taskInput,
            date: dueDate
        };

        tasks.push(newTask);

        localStorage.setItem("tasks", JSON.stringify(tasks));

        document.getElementById("task-input").value = "";
        document.getElementById("due-date").value = "";

        showTasks();
    });

    showTasks();
}

function showTasks() {
    let taskList = document.getElementById("tasks");

    if (taskList) {
        taskList.innerHTML = "";

        for (let i = 0; i < tasks.length; i++) {
            let li = document.createElement("li");
            li.innerHTML = tasks[i].name + " - Due: " + tasks[i].date;
            taskList.appendChild(li);
        }
    }
}

let calendarList = document.getElementById("calendar-list");

if (calendarList) {
    showCalendar();
}

function showCalendar() {
    calendarList.innerHTML = "";

    if (tasks.length === 0) {
        calendarList.innerHTML = "<p>No assignments added yet.</p>";
        return;
    }

    for (let i = 0; i < tasks.length; i++) {
        let box = document.createElement("div");
        box.className = "assignment-box";

        box.innerHTML = 
            "<h3>" + tasks[i].date + "</h3>" +
            "<p>" + tasks[i].name + "</p>" +
            "<button onclick='deleteTask(" + i + ")'>Delete</button>";

        calendarList.appendChild(box);
    }
}
    function deleteTask(index) {
    tasks.splice(index, 1);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    showCalendar();
}
