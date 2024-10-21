import React from 'react';
import styled from 'styled-components';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

const FooterContainer = styled.footer`
  padding: 20px;
  text-align: center;
  color: black;
  background-color: #fabd59;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
`;

const FooterTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterListItem = styled.li`
  margin-bottom: 10px;
  font-size: 12px;
`;

const FooterLink = styled.a`
  text-decoration: none;
  color: black;
  &:hover {
    color: #ffda79;
  }
`;


const SocialIcons = styled.div`
  margin: 15px 0;
`;

const IconLink = styled.a`
  color: black;
  margin: 0 10px;
  font-size: 24px;
  transition: color 0.3s;

  &:hover {
    color: #ffda79;
  }
`;

const FooterText = styled.p`
  font-size: 12px;
  margin-top: 10px;
`;

const Footer: React.FC = () => (
  <FooterContainer>
    <FooterTitle>Información de contacto</FooterTitle>
    <FooterList>
      <FooterListItem>
        <FooterLink href="mailto:info@educCom.com">Correo electrónico</FooterLink>
      </FooterListItem>
    </FooterList>
    
    <SocialIcons>
      <IconLink href="https://www.facebook.com/educCom" target="_blank" rel="noopener noreferrer">
        <FaFacebookF />
      </IconLink>
      <IconLink href="https://www.instagram.com/educCom" target="_blank" rel="noopener noreferrer">
        <FaInstagram />
      </IconLink>
    </SocialIcons>
    
    <FooterText>&copy; 2024 EducCom. Todos los derechos reservados.</FooterText>
  </FooterContainer>
);

export default Footer;
