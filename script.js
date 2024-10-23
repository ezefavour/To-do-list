const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

// Load tasks from local storage and set initial theme
document.addEventListener("DOMContentLoaded", () => {
    loadTasksFromStorage();
    loadTheme();
});

// Add a task
addBtn.addEventListener("click", () => {
    const taskText = input.value.trim();

    if (taskText !== "") {
        addTask(taskText);
        saveTaskToStorage(taskText);
        input.value = ""; // Clear the input field
    }
});

// Add task to the UI
function addTask(taskText) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="delete-btn bg-red-500 text-white px-2 py-1 rounded ml-4">Delete</button>
    `;
    li.classList.add("flex", "justify-between", "bg-gray-200", "dark:bg-gray-700", "p-2", "rounded", "task", "task-added");
    
    // Add delete functionality
    li.querySelector(".delete-btn").addEventListener("click", () => {
        li.classList.add("task-deleted");
        setTimeout(() => {
            li.remove();
            removeTaskFromStorage(taskText);
        }, 500); // Delay to allow fade-out animation
    });

    todoList.appendChild(li);
}

// Save task to local storage
function saveTaskToStorage(taskText) {
    let tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage on page load
function loadTasksFromStorage() {
    let tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
    tasks.forEach(task => addTask(task));
}

// Remove task from local storage
function removeTaskFromStorage(taskText) {
    let tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Theme toggling logic with icon switching
themeToggleBtn.addEventListener("click", toggleTheme);

function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
    
    if (currentTheme === 'light') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        themeIcon.classList.replace('text-gray-400', 'text-yellow-500');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        themeIcon.classList.replace('text-yellow-500', 'text-gray-400');
    }

    localStorage.setItem('theme', currentTheme);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(savedTheme);

    if (savedTheme === 'dark') {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        themeIcon.classList.replace('text-yellow-500', 'text-gray-400');
    } else {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        themeIcon.classList.replace('text-gray-400', 'text-yellow-500');
    }
}