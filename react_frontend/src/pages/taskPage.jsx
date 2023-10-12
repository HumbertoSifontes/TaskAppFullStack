import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { tasksApi } from '../api';
import ButtonAdd from '../components/tasks_to_do/button_add';
import { FaTrash } from 'react-icons/fa';

function TaskPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();
  const params = useParams();
  const [efectoActivo, setEfectoActivo] = useState(false);
  const [task, setTask] = useState(null);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await tasksApi.updateTask(params.id, data);
    } else {
      await tasksApi.createTask(data);
    }

    navigate('/todolist');
  });

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const res = await tasksApi.getTask(params.id);
        if (res.titulo && res.descripcion) {
          setValue('titulo', res.titulo);
          setValue('descripcion', res.descripcion);
          setTask(res); // Actualiza la tarea con la respuesta del servidor
        } else {
          console.error(`La tarea con ID ${params.id} no tiene título o descripción válidos.`);
        }
      }
    }
    loadTask();
  }, [params.id]);

  const handleCompleteClick = async () => {
    if (task) {
      const isDone = !task.done;
      tasksApi.completeTask(task.id, isDone);
      setTask({ ...task, done: isDone });
    }
  };

  const activarEfecto = () => {
    setEfectoActivo(true);
    setTimeout(() => {
      setEfectoActivo(false);
    }, 1000);
  };

  return (
    <div className="container-fluid formulario card text-center pb-2">
      <div className="row m-0">
        <div className="col-md-12 p-0 pt-4 pb-4">
          <form onSubmit={onSubmit} className="p-4.m-auto">
            <div className="row">
              <div className="col-md-12">
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Agrega un titulo"
                    {...register('titulo', { required: true })}
                    autoFocus
                  />
                  {errors.titulo && <span className="noti">Este campo es obligatorio</span>}
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb-3">
                  <textarea
                    placeholder="Agrega una descripcion"
                    {...register('descripcion', { required: true })}
                  />
                  {errors.descripcion && <span className="noti">Este campo es obligatorio</span>}
                </div>
              </div>
            </div>

            <ButtonAdd />

            {params.id && (
              <button
                className={`btn_delete ${efectoActivo ? 'activo' : ''}`}
                onClick={async () => {
                  activarEfecto();
                  await tasksApi.deleteTask(params.id);
                  navigate('/todolist');
                }}
                type="submit"
              >
                <span className="botonName">
                  <FaTrash />
                </span>
              </button>
            )}
            {params.id && task && (
              <span
                className={`container-done ${task.done ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCompleteClick();
                  navigate('/todolist');
                }}
              >
                Completar
              </span>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
