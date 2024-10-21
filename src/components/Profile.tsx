import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { faker } from '@faker-js/faker';

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
  const location = useLocation();
  const [user, setUser] = useState({
    name: '',
    surName: '',
    surName2: '',
    userName: '',
    password: '',
    role: 'STUDENT',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (location.state && location.state.user) {
      setUser(location.state.user);
    } else {
      fetchMockUserData();
    }
  }, [location.state]);

  const fetchMockUserData = () => {
    const randomUser = {
      name: faker.animal.bear(),
      surName: faker.animal.bear(),
      surName2: faker.animal.cat(),
      userName: faker.animal.bird(),
      password: faker.food.dish(),
      role: 'STUDENT',
    };
    setUser(randomUser);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put('https://tu-backend-api.com/api/user/profile', user);
      alert('Información guardada: ' + JSON.stringify(response.data));
      setIsEditing(false);
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
