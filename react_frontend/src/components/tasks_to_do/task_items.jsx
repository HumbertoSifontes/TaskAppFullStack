import React from "react";
import { useNavigate } from "react-router-dom";

const TaskItems = ({ task }) => {
  const navigate = useNavigate();

  const handleTaskClick = async () => {
    navigate(`/edition/${task.id}`);
  };

  return (
    <div className="items" onClick={handleTaskClick}>
      <div className="tituloDiv">
        <h5 className={`lista ${task.done ? 'text-decoration-dashed' : ''}`}>
          {task.titulo}
        </h5>
      </div>
      <div className="descDiv">
        <p className={`${task.done ? 'text-decoration-dashed' : ''} lista`}>
          {task.descripcion}
        </p>
      </div>
      
      <hr />
    </div>
  );
};

export default TaskItems;
