import React, { useState } from 'react';

function ButtonForm() {
  const [efectoActivo, setEfectoActivo] = useState(false);

  const activarEfecto = () => {
    setEfectoActivo(true);
    setTimeout(() => {
      setEfectoActivo(false);
    }, 2000)
  };

  return (
    <button
      className={`btn_form ${efectoActivo ? 'activo' : ''} d-grid col-6 mx-auto`}
      onClick={activarEfecto}
      type={"submit"}
    >
      <span className='botonName'>Enviar</span>
    </button>
  );
}

export default ButtonForm;

