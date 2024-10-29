import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ProfileContainer = styled.div.attrs({
  className: 'profile-container',
})`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h2.attrs({
  className: 'title',
})`
  margin-bottom: 20px;
`;

const Input = styled.input.attrs({
  className: 'input',
})`
  padding: 8px;
  margin-bottom: 20px;
  width: 100%;
`;

const Button = styled.button.attrs({
  className: 'button',
})`
  margin-top: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;  /* spacing between buttons */
  margin-top: 10px;  /* optional: if you want some space above the buttons */
`;

const Text = styled.label.attrs({
  className: 'text',
})`
  margin-bottom: 5px;
  font-weight: bold;
`;

const FormField = styled.div`
  margin-bottom: 1px;
  width: 90%;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

const Profile: React.FC = () => {
  const [user, setUser] = useState({
    id: '',
    name: '',
    surName: '',
    surName2: '',
    userName: '',
    password: '',
    role: 'STUDENT',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

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
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateFields = () => {
    const newErrors: any = {};
    if (!user.userName) newErrors.userName = 'El nombre de usuario es obligatorio';
    if (!user.name) newErrors.name = 'El nombre es obligatorio';
    if (!user.surName) newErrors.surName = 'El primer apellido es obligatorio';
    if (!user.password) newErrors.password = 'La contraseña es obligatoria';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateFields()) return;
    try {
      const response = await axios.put('http://localhost:8080/api/user/', user);
      alert('Información guardada correctamente.');
      setIsEditing(false);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Error al guardar los datos del usuario:', error);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setUser(JSON.parse(localStorage.getItem('user') || '{}'));
    }
  };

  return (
    <ProfileContainer>
      <Title>Perfil de usuario</Title>
      <FormField>
        <Text>Usuario</Text>
        <Input
          type="text"
          name="userName"
          placeholder="Nombre usuario *"
          value={user.userName}
          onChange={handleChange}
          disabled={!isEditing}
        />
        {errors.userName && <ErrorMessage>{errors.userName}</ErrorMessage>}
      </FormField>
      <FormField>
        <Text>Nombre</Text>
        <Input
          type="text"
          name="name"
          placeholder="Nombre *"
          value={user.name}
          onChange={handleChange}
          disabled={!isEditing}
        />
        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
      </FormField>
      <FormField>
        <Text>Primer Apellido</Text>
        <Input
          type="text"
          name="surName"
          placeholder="Primer Apellido *"
          value={user.surName}
          onChange={handleChange}
          disabled={!isEditing}
        />
        {errors.surName && <ErrorMessage>{errors.surName}</ErrorMessage>}
      </FormField>
      <FormField>
        <Text>Segundo Apellido</Text>
        <Input
          type="text"
          name="surName2"
          placeholder="Segundo Apellido"
          value={user.surName2}
          onChange={handleChange}
          disabled={!isEditing}
        />
        {errors.surName2 && <ErrorMessage>{errors.surName2}</ErrorMessage>}
      </FormField>
      <FormField>
        <Text>Nueva Password</Text>
        <Input
          type="password"
          name="password"
          placeholder="Nueva Password *"
          value={user.password}
          onChange={handleChange}
          disabled={!isEditing}
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
      </FormField>
      <FormField>
        <Text>Tipo de usuario</Text>
        <select
          className="select"
          name="role"
          value={user.role}
          onChange={handleChange}
          disabled={!isEditing}
        >
          <option value="STUDENT">ESTUDIANTE</option>
          <option value="TEACHER">PROFESOR</option>
        </select>
      </FormField>
      <ButtonContainer>
        <Button onClick={handleEditToggle}>
          {isEditing ? 'Cancelar' : 'Modificar'}
        </Button>
        {isEditing && <Button onClick={handleSave}>Guardar cambios</Button>}
      </ButtonContainer>
    </ProfileContainer>
  );
};

export default Profile;
