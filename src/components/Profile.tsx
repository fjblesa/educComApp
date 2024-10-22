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
  const [errors, setErrors] = useState({}); // Para almacenar errores de validación

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
    setErrors({ ...errors, [name]: '' }); // Limpiar el error al cambiar el valor
  };

  const validateFields = () => {
    const newErrors: any = {}; // Objeto para almacenar los errores

    // Validar campos obligatorios
    if (!user.userName) newErrors.userName = 'El nombre de usuario es obligatorio';
    if (!user.name) newErrors.name = 'El nombre es obligatorio';
    if (!user.surName) newErrors.surName = 'El primer apellido es obligatorio';
    if (!user.password) newErrors.password = 'La contraseña es obligatoria';

    setErrors(newErrors); // Establecer los errores en el estado

    return Object.keys(newErrors).length === 0; // Retornar verdadero si no hay errores
  };

  const handleSave = async () => {
    if (!validateFields()) return; // Validar antes de guardar

    try {
      const response = await axios.put('https://tu-backend-api.com/api/user/profile', user); // Cambia la URL por la de tu backend
      alert('Información guardada: ' + JSON.stringify(response.data));
      setIsEditing(false);
      localStorage.setItem('user', JSON.stringify(user)); // Guardar usuario en localStorage
    } catch (error) {
      console.error('Error al guardar los datos del usuario:', error);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Cambiar el estado de edición
    if (isEditing) {
      setUser(JSON.parse(localStorage.getItem('user') || '{}')); // Reiniciar los datos si se cancela
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
          disabled={!isEditing} // Deshabilitar si no se está editando
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
          disabled={!isEditing} // Deshabilitar si no se está editando
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
          disabled={!isEditing} // Deshabilitar si no se está editando
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
          disabled={!isEditing} // Deshabilitar si no se está editando
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
          disabled={!isEditing} // Deshabilitar si no se está editando
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
          disabled={!isEditing} // Deshabilitar si no se está editando
        >
          <option value="STUDENT">STUDENT</option>
          <option value="TEACHER">TEACHER</option>
        </select>
      </FormField>
      <Button onClick={handleEditToggle}>
        {isEditing ? 'Cancelar' : 'Modificar'}
      </Button>
      {isEditing && <Button onClick={handleSave}>Guardar cambios</Button>}
    </ProfileContainer>
  );
};

export default Profile;
