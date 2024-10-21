import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  text-align: center;
  color: black;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  flex-direction: column; 
`;

const Nav = styled.nav`
  background-color: #c58df7;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

const Sidebar = styled.div`
  height: 100vh;
  width: 150px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #33a0ec;
  padding-top: 20px;
`;

const NavLink = styled(Link)`
  display: block;
  color: white;
  padding: 1px;
  text-decoration: none;
  &:hover {
    background-color: #fabd59;
  }
`;

const HeaderTitle2 = styled.h2`
  font-style: italic; 
  font-size: 32px;
  margin-bottom: 10px;
  font-family: fantasy;
`;

const Header: React.FC = () => {
  // Estado para controlar si el usuario está logueado
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Función para simular el login/logout
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <HeaderContainer>
      <img src="/logo.svg" alt="Logo" />
      <HeaderTitle2>Comunicación fluida y sin perderte nada</HeaderTitle2>
      <Sidebar>
        <Nav>
          {/* El enlace Home siempre se muestra */}
          <NavLink to="/">Home</NavLink>
          {/* Solo mostrar los demás enlaces si está logueado */}
          {isLoggedIn && (
            <>
              <NavLink to="/send">Enviar</NavLink>
              <NavLink to="/sended">Enviados</NavLink>
              <NavLink to="/received">Recibidos</NavLink>
              <NavLink to="/profile">Profile</NavLink>
            </>
          )}
        </Nav>
      </Sidebar>
      {/* Botón para simular inicio/cierre de sesión */}
      <button onClick={toggleLogin}>
        {isLoggedIn ? 'Cerrar sesión' : 'Iniciar sesión'}
      </button>
    </HeaderContainer>
  );
};

export default Header;