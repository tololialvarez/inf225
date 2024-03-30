import React from 'react';
import './Inicio.css'; 

function Inicio() {const user=JSON.parse(localStorage.getItem('user'));
console.log(user);
  return (
    <div className="inicio-banco">
      <div className="inicio-banco-buttons">
        <button className="btn-iniciar-sesion" variant="primary" size="lg">❀La Clave❀</button>
      </div>
      <div className="inicio-banco-info">
        <div className="info-item">
          <h2>Simulador de crédito</h2>
          <p>¡¡¡Simula tu crédito en el momento que tu quieras!!!</p>
        </div>
        <div className="info-item">
          <h2>Préstamos Flexibles</h2>
          <p>Obtén préstamos flexibles con tasas competitivas.</p>
        </div>
        <div className="info-item">
          <h2>Atención al Cliente</h2>
          <p>Estamos aquí para ayudarte en todo momento.</p>
        </div>
      </div>
    </div>
  );
}

export default Inicio;