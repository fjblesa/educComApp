import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SignUp from './Signup';

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const TextRegistro = styled.text`
  text-align: center;
  cursor: pointer;
  padding: 10px 15px;
  color: #333;
`;

const Contenedor = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #c58df7;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #66a39c;
  }
`;

const SwitchLink = styled.p`
  text-align: center;
  cursor: pointer;
  color: #007bff;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const Login: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:8080/api/auth/login'; // URL del backend en localhost
      const response = await axios.post(url, { userName, password });
      alert('Se ha logado correctamente');
      navigate('/profile', { state: { user: response.data } }); // Redirige al perfil con los datos del usuario
    } catch (error) {
      console.error('Error en la autenticación:', error);

      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || 'Error desconocido'); // Optional chaining and default message
      } else {
        setError('Error desconocido');
      }
    }
  };

  return (
    <LoginContainer>
      {isLogin ? (
        <>
          <Title>Iniciar Sesión</Title>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Usuario"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Button type="submit">Iniciar Sesión</Button>
          </form>
          <Contenedor>
            <TextRegistro id='registro'>¿Quieres comunicarte eficientemente?</TextRegistro>
          </Contenedor>
          <SwitchLink onClick={() => setIsLogin(false)}>Regístrate</SwitchLink>
        </>
      ) : (
        <SignUp onSwitch={() => setIsLogin(true)} />
      )}
    </LoginContainer>
  );
};

export default Login;
