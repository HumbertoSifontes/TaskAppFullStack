 export const tasksApi = {
  getAllTasks: () =>
    fetch(`http://localhost:8000/tareas/api/v1/tareas/`).then((response) => response.json()),

  getTask: (id) =>
    fetch(`http://localhost:8000/tareas/api/v1/tareas/${id}/`)
        .then((response) => response.json()),

  createTask: (task) =>
    fetch(`http://localhost:8000/tareas/api/v1/tareas/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    }).then((response) => response.json()),

  updateTask: (id, task) =>
    fetch(`http://localhost:8000/tareas/api/v1/tareas/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    }).then((response) => response.json()),

  deleteTask: (id) =>
    fetch(`http://localhost:8000/tareas/api/v1/tareas/${id}/`, { method: 'DELETE'})
      .then((response) => response.status === 204),

  completeTask: (id, done) =>
    fetch(`http://localhost:8000/tareas/api/v1/tareas/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ done: done }),
    }).then((response) => response.status === 200),
};
