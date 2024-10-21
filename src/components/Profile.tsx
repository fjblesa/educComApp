import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ProfileContainer = styled.div.attrs({
  className: 'profile-container',
})``;

const Title = styled.h2.attrs({
  className: 'title',
})``;

const Input = styled.input.attrs({
  className: 'input',
})``;

const Button = styled.button.attrs({
  className: 'button',
})``;

const Text = styled.text.attrs({
  className: 'text',
})``;

const Profile: React.FC = () => {
  const [user, setUser] = useState({
    id:'',
    name: '',
    surName: '',
    surName2: '',
    userName: '',
    password: '',
    role: 'STUDENT',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/user/?userId=');
      setUser(response.data); // Guarda la respuesta en el estado del usuario
      localStorage.setItem('user', JSON.stringify(response.data)); // Guarda los datos en localStorage
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put('https://tu-backend-api.com/api/user/profile', user); // Cambia la URL por la de tu backend
      alert('Información guardada: ' + JSON.stringify(response.data));
      setIsEditing(false);
      localStorage.setItem('user', JSON.stringify(user)); // Guardar usuario en localStorage
    } catch (error) {
      console.error('Error al guardar los datos del usuario:', error);
    }
  };

  return (
    <ProfileContainer>
      <Title>Perfil de usuario</Title>
      <Text>Usuario</Text>
      <Input
        type="text"
        name="userName"
        placeholder="Nombre usuario"
        value={user.userName}
        onChange={handleChange}
      />
      <Text>Nombre</Text>
      <Input
        type="text"
        name="name"
        placeholder="Nombre"
        value={user.name}
        onChange={handleChange}
      />
      <Text>Primer Apellido</Text>
      <Input
        type="text"
        name="surName"
        placeholder="Primer Apellido"
        value={user.surName}
        onChange={handleChange}
      />
      <Text>Segundo Apellido</Text>
      <Input
        type="text"
        name="surName2"
        placeholder="Segundo Apellido"
        value={user.surName2}
        onChange={handleChange}
      />
      <Text>Nueva Password</Text>
      <Input
        type="text"
        name="password"
        placeholder="Nueva Password"
        value={user.password}
        onChange={handleChange}
      />
      <Text>Tipo de usuario</Text>
      <select
        className="select"
        name="role"
        value={user.role}
        onChange={handleChange}
      >
        <option value="STUDENT">STUDENT</option>
        <option value="TEACHER">TEACHER</option>
      </select>
      <Button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancelar' : 'Modificar'}
      </Button>
      {isEditing && <Button onClick={handleSave}>Guardar cambios</Button>}
    </ProfileContainer>
  );
};

export default Profile;
