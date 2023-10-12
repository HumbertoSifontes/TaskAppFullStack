import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import simbolo from '../images/simbolo.jpg'

const Navbar = () => {

  const [efectoActivo, setEfectoActivo] = useState(false);

  const [loginFormVisible, setLoginFormVisible] = useState(false);

  const activarEfecto = () => {
    setEfectoActivo(true);
    setTimeout(() => {
      setEfectoActivo(false);
      setLoginFormVisible(true);
    }, 1000)
  };

  return (
  <div>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src={simbolo}
              alt=""
              width="50"
              height="40"
              className="d-inline-block align-text-top"
            />
            <span className='logoName'>Argentina Programa 4.0</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${loginFormVisible ? 'show' : ''}`} id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
                <a href='#' class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Ingresa
                </a>
                <ul class={`dropdown-menu ${loginFormVisible ? 'show' : ''}`}>
                  <li><input type="email" class="dropdown-item" placeholder="Usuario"/></li>
                  <li>
                    <hr class="dropdown-divider"/>
                  </li>
                  <li><input type="password" class="dropdown-item" placeholder="Contraseña"/></li>
                  <li>
                    <div className='btnLogin'>
                      <button
                        className={`btn_edit ${efectoActivo ? 'activo' : ''}`}
                        onClick={activarEfecto}
                        type={"submit"}
                      >
                        <span className='botonName'>Login</span>
                      </button>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/registration">Registrate</Link>
              </li>
            </ul>
          </div>
        </div>
    </nav>
  </div>
  )
}

export default Navbar