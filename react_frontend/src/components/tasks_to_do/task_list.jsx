import React, { useEffect } from 'react';
import { tasksApi } from '../../api';
import TaskItems from './task_items';

function TaskList({ tasks, setTasks }) {

  useEffect(() => {
    async function loadTasks() {
      try {
        const response = await tasksApi.getAllTasks();
        const data = await response;
        setTasks(data);
      } catch (error) {
        console.error('Error al obtener tareas:', error);
      }
    }
    loadTasks();
  }, [setTasks]);
	  
	return (
		<ul>
			{tasks.map((task) => (
				<TaskItems key={task.id} task={task}/>
			))}
		</ul>
	)
}
export default TaskList;