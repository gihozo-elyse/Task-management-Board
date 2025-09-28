
function genId() {
  return 't_' + Math.random().toString(36).slice(2, 9);
}


const sampleTasks = [
  { id: genId(), name: 'complete task managemrnt board assignment', due: '2025-09-28', status: 'pending' },
  { id: genId(), name: 'Finish IS project managment assignment', due: '2025-09-29', status: 'completed' },
  { id: genId(), name: 'to buy gift of my sister', due: '2025-10-07', status: 'pending' },
  { id: genId(), name: 'attending my sister,s graduation party', due: '2025-10-17', status: 'pending' },
  { id: genId(), name: 'to do more exercise about dom and function', due: '2025-10-05', status: 'pending' }
];


let tasks = sampleTasks.slice();

console.log('Tasks initialized:', tasks);
