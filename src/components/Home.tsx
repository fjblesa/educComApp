import { useNavigate } from 'react-router-dom'; 
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';

const HomeContainer = styled.div`
  padding: 60px 40px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 40px;
  margin-bottom: 10px;
`;

const Text = styled.p`
  font-size: 25px;
  color: black;
`;

const CTAButton = styled.button`
  background-color: #c58df7;
  color: black;
  padding: 12px 20px;
  border-radius: 25px;
  font-size: 25px;
  cursor: pointer;
`;

const Home = () => {
  const navigate = useNavigate(); // Hook para la navegación
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar si el usuario está logueado

  // Efecto para verificar el estado del usuario en localStorage al montar el componente
  useEffect(() => {
    const savedUser  = localStorage.getItem('user');
    setIsLoggedIn(savedUser  !== null); // Actualiza el estado según el usuario guardado
  }, []);

  // Función para manejar el inicio/cierre de sesión
  const handleSessionToggle = () => {
    if (isLoggedIn) {
      localStorage.removeItem('user'); // Cerrar sesión
      setIsLoggedIn(false); // Actualiza el estado
      alert('Sesión cerrada');

      // Simula el clic en el botón de cerrar sesión del Header
      const logoutButton = document.getElementById('logoutButton');
      if (logoutButton) {
        logoutButton.click(); 
        window.location.reload(true);
      }
    } else {
      navigate('/login'); // Redirigir a la página de inicio de sesión
    }
  };

  return (
    <HomeContainer>
      <Title>EDUCCOM</Title>
      <Text>Bienvenido a la manera más eficiente de contactar con tus Alumnos o Profesores</Text>
      <CTAButton onClick={handleSessionToggle}>
        {isLoggedIn ? 'Cerrar Sesión' : 'Iniciar Sesión'}
      </CTAButton>
    </HomeContainer>
  );
};

export default Home;
