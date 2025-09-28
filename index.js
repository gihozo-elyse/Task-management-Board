
function genId() {
  return 't_' + Math.random().toString(36).slice(2, 9);
}
function saveTasks() {
  try {
    localStorage.setItem('tasks_v1', JSON.stringify(tasks));
  } catch (e) {
    console.warn('LocalStorage not available');
  }
}


function loadTasks() {
  try {
    const s = localStorage.getItem('tasks_v1');
    return s ? JSON.parse(s) : null;
  } catch (e) {
    return null;
  }
}


let tasks = loadTasks() || sampleTasks.slice();
console.log('Tasks initialized:', tasks);



const sampleTasks = [
  { id: genId(), name: 'complete task managemrnt board assignment', due: '2025-09-28', status: 'pending' },
  { id: genId(), name: 'Finish IS project managment assignment', due: '2025-09-29', status: 'completed' },
  { id: genId(), name: 'to buy gift of my sister', due: '2025-10-07', status: 'pending' },
  { id: genId(), name: 'attending my sister,s graduation party', due: '2025-10-17', status: 'pending' },
  { id: genId(), name: 'to do more exercise about dom and function', due: '2025-10-05', status: 'pending' }
];
const taskList = document.getElementById('taskList');
const taskForm = document.getElementById('taskForm');
const taskNameInput = document.getElementById('taskName');
const taskDueInput = document.getElementById('taskDue');
const filterEl = document.getElementById('filter');
const sortEl = document.getElementById('sortBy');
const emptyMsg = document.getElementById('emptyMsg');

function addTask(task) {
  tasks.push(task);
  saveTasks();
  render();
  console.log('Task added:', task);
}

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = taskNameInput.value.trim();
  const due = taskDueInput.value || '';
  if (!name) {
    alert('Task name cannot be empty');
    return;
  }
  addTask({ id: genId(), name, due, status: 'pending' });
  taskForm.reset();
});

document.getElementById('clearBtn').addEventListener('click', () => taskForm.reset());




