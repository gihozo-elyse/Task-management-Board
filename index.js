
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
const themeToggle = document.getElementById("themeToggle");


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



function deleteTask(id) {
  if (!confirm('Delete this task?')) return;
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  render();
}

function toggleComplete(id) {
  const t = tasks.find(x => x.id === id);
  if (!t) return;
  t.status = t.status === 'completed' ? 'pending' : 'completed';
  saveTasks();
  render();
}

function editTask(id) {
  const t = tasks.find(x => x.id === id);
  if (!t) return;
  const newName = prompt('Edit task name', t.name);
  if (newName === null) return;
  const newDue = prompt('Edit due date (YYYY-MM-DD) or leave empty', t.due || '');
  t.name = newName.trim() || t.name;
  t.due = (newDue === null) ? t.due : (newDue.trim() || '');
  saveTasks();
  render();
}
filterEl.addEventListener('change', render);
sortEl.addEventListener('change', render);

function render() {
  let list = tasks.slice();

  const filter = filterEl.value;
  if (filter === 'pending') list = list.filter(t => t.status === 'pending');
  if (filter === 'completed') list = list.filter(t => t.status === 'completed');

  const sortBy = sortEl.value;
  if (sortBy === 'due-asc') {
    list.sort((a,b) => (a.due || '9999-12-31').localeCompare(b.due || '9999-12-31'));
  } else if (sortBy === 'due-desc') {
    list.sort((a,b) => (b.due || '0000-01-01').localeCompare(a.due || '0000-01-01'));
  }

  taskList.innerHTML = '';

  if (list.length === 0) {
    emptyMsg.style.display = 'block';
    return;
  } else {
    emptyMsg.style.display = 'none';
  }

  const tpl = document.getElementById('taskTpl');
  list.forEach(task => {
    const node = tpl.content.cloneNode(true);
    const li = node.querySelector('li');

    node.querySelector('.taskName').textContent = task.name;
    node.querySelector('.taskMeta').textContent = task.due ? `Due: ${task.due} • ${task.status}` : `No due date • ${task.status}`;
    const cb = node.querySelector('.completeToggle');
    cb.checked = task.status === 'completed';

    if (task.status === 'completed') {
      li.classList.add('line-through', 'opacity-70', 'bg-green-200');
    }

    cb.addEventListener('change', () => toggleComplete(task.id));
    node.querySelector('.editBtn').addEventListener('click', () => editTask(task.id));
    node.querySelector('.deleteBtn').addEventListener('click', () => deleteTask(task.id));

    taskList.appendChild(node);
  });
}


render();


