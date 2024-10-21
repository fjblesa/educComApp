import { useNavigate } from 'react-router-dom'; 
import styled from 'styled-components';

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

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 30px 0;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
  font-size: 18px;
  color: white;
`;


const Home = () => {
  const navigate = useNavigate(); // Hook para la navegación

  return (
    <HomeContainer>
      <Title>EDUCCOM</Title>
      <Text>Bienvenido a la manera mas eficiente de contactar con tus Alumnos o Profesores</Text>
      <CTAButton onClick={() => navigate('/login')}>Iniciar Sesión</CTAButton> {}
    </HomeContainer>
  );
};

export default Home;