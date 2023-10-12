import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ButtonHome({ setLoginFormVisible }) {
  const [efectoActivo, setEfectoActivo] = useState(false);

  const activarEfecto = () => {
    setEfectoActivo(true);
    setTimeout(() => {
      setEfectoActivo(false);
      setLoginFormVisible(true);
    }, 2000);
  };

  return (
    <Link
      className={`btn_home ${efectoActivo ? 'activo' : ''} d-grid col-6 mx-auto`}
      onClick={activarEfecto}
      type={"submit"}
      to="/todolist"
    >
      <span className="botonName">Empezar</span>
    </Link>
  );
}

export default ButtonHome;
