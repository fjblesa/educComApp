import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  text-align: center;
  color: black;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  flex-direction: column;
  width: 60%;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
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
  const savedUser = localStorage.getItem('user');
  const [isLoggedIn, setIsLoggedIn] = useState(savedUser !== null);

  const toggleLogin = () => {
    setIsLoggedIn(prevState => !prevState);
  
    // Simular hacer click en los botones de inicio/cierre de sesión
    const loginButton = document.querySelector('#loginButton') as HTMLElement;
    const logoutButton = document.querySelector('#logoutButton') as HTMLElement;

    if (isLoggedIn) {
      logoutButton?.click(); // Hacer click en el botón de cerrar sesión
    } else {
      loginButton?.click(); // Hacer click en el botón de iniciar sesión
    }
  };

  return (
    <HeaderContainer>
      <img src="/logo.svg" alt="Logo" />
      <HeaderTitle2>Comunicación fluida y sin perderte nada</HeaderTitle2>
      <Sidebar>
        <Nav>
          <NavLink to="/">Home</NavLink>
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
      
      {/* Botones ocultos de login y logout */}
      <button id="loginButton" style={{ display: 'none' }}>Iniciar sesión</button>
      <button id="logoutButton" style={{ display: 'none' }}>Cerrar sesión</button>

      {/* El botón de iniciar/cerrar sesión no se muestra en absoluto */}
    </HeaderContainer>
  );
};

export default Header;
