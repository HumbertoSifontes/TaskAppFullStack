import React, { useState } from 'react';
import ButtonForm from './button_form'

function Form() {

  const [formData, setFormData] = useState({
    nombre: '',
    mail: '',
    clave: '',
    confirmarClave: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const userData = {
        username: formData.nombre,
        password: formData.clave,
        email: formData.mail
      };

    // Realizar una solicitud POST para enviar los datos al servidor
    fetch('http://localhost:8000/tareas/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error en la solicitud');
      })
      .then((data) => {
        console.log('Usuario registrado:', data);
        localStorage.setItem('jwtToken', data.token);
        window.location.href = '/todolist';
      })
      .catch((error) => {
        setErrorMessage('Error al registrar el usuario. Verifica tus datos e inténtalo nuevamente.');
        console.error('Error al registrar el usuario:', error);
      })
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container-fluid formulario card text-center pb-2">
      <div className="row m-0">
        <div className="col-md-12 p-0 pt-4 pb-4">
          <form className="p-4.m-auto" onSubmit={handleSubmit}>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <div className="row">
              <div className="col-md-12">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Crea un Usuario"
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    name="mail"
                    value={formData.mail}
                    onChange={handleChange}
                    required
                    placeholder="Ingresa un Correo electronico"
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    name="clave"
                    value={formData.clave}
                    onChange={handleChange}
                    required
                    placeholder="Ingrese una clave"
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    name="confirmarClave"
                    value={formData.confirmarClave}
                    onChange={handleChange}
                    required
                    placeholder="Confirme la clave"
                  />
                </div>
              </div>
            </div>
            <ButtonForm />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
