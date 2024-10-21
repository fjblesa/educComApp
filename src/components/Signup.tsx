import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TextInicio = styled.text`
  text-align: center;
  cursor: pointer;
  color: #333;
`;

const Contenedor = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
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

const SignUp: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://tu-backend-api.com/api/signup', { email, password });
      alert('Registro exitoso: ' + JSON.stringify(response.data));
      navigate('/login'); // Redirige a la página de inicio de sesión después del registro
    } catch (error) {
      console.error('Error en la registro:', error);

      // Type guard for AxiosError
      if (axios.isAxiosError(error)) {
        alert('Error: ' + error.response?.data.message || 'Error desconocido'); // Optional chaining and default message
      } else {
        alert('Error desconocido');
      }
    }
  };

  return (
    <SignUpContainer>
      <Title>Registrarse</Title>
      <form onSubmit={handleSubmit}>
        <Input
          type="user"
          placeholder="Usuario"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Registrarse</Button>
      </form>
      <Contenedor>
        <TextInicio id = 'inicio' > ¿Ya tienes una cuenta? </TextInicio>
      </Contenedor>
      <SwitchLink onClick={onSwitch}>
        Inicia Sesión
      </SwitchLink>
    </SignUpContainer>
  );
};

export default SignUp;
