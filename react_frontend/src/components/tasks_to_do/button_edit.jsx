import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';

function ButtonEdit() {
  const [efectoActivo, setEfectoActivo] = useState(false);

  const activarEfecto = () => {
    setEfectoActivo(true);
    setTimeout(() => {
      setEfectoActivo(false);
    }, 1000)
  };

  return (
    <button
      className={`btn_edit ${efectoActivo ? 'activo' : ''}`}
      onClick={activarEfecto}
      type={"submit"}
    >
      <span className='botonName'><FaEdit/></span>
    </button>
  );
}

export default ButtonEdit;