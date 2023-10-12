import React, { useEffect, useState } from 'react';
import TaskList from '../components/tasks_to_do/task_list';
import { tasksApi } from '../api';
import { Link } from "react-router-dom";
import { FaPlus } from 'react-icons/fa';

function ToDoList() {

    const [tasks, setTasks] = useState([]);

    const [efectoActivo, setEfectoActivo] = useState(false);
    
  
  useEffect(() => {
    tasksApi.getAllTasks()
      .then(data => {
        setTasks(data);
      })
      .catch(error => {
        console.error('Error al obtener tareas:', error);
      });
  }, []);


  const tasksCount = tasks.length;
  const pendingTasksCount = tasks.filter(task => !task.done).length;

  const activarEfecto = () => {
    setEfectoActivo(true);
    setTimeout(() => {
    setEfectoActivo(false);
    }, 1000);
  };

  return (
    <div className="row todo_card">
        <div className="col-10 col-md-8 col-lg-8">
            <div className="card text-center pb-2">
                <div className="section">
                    <h1>Lista de Tareas</h1>
                </div>
                <div className="section tasks_counter">
                    <h5>N° de Tareas: <span>{tasksCount}</span></h5>
                    <h5>Pendientes: <span>{pendingTasksCount}</span></h5>
                </div>
                <div>
                  <button
                    className={`btn_add ${efectoActivo ? 'activo' : ''}`}
                    onClick={activarEfecto}
                  >
                    <Link to="/edition"><span className='botonName'>Crear Tarea  <FaPlus/></span></Link>
                  </button>
                </div>
                <div className="section tasks_list">
                    <TaskList tasks={tasks} setTasks={setTasks} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default ToDoList