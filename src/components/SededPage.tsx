import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

interface Send {
  id: number;
  content: string;
  senderId: number;
  receiverId: number;
  creationDate: string;
  read: boolean;
}

const SendedPage: React.FC = () => {
  const [sended, setSended] = useState<Send[]>([]);
  const location = useLocation();
  const userId = location.state?.user?.id; // Obtiene el userId del usuario autenticado

  useEffect(() => {
    const fetchSended = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/messages/sent?userId=${userId}`);
        const data = await response.json();
        setSended(data);
      } catch (error) {
        console.error('Error fetching sended messages:', error);
      }
    };

    if (userId) {
      fetchSended();
    }
  }, [userId]);

  return (
    <div className="sended-page">
      <h2>Mensajes enviados</h2>
      <ul className="sended-list">
        {sended.map(message => (
          <li key={message.id} className="sended-item">
            <h3>{message.content}</h3>
            <p>Fecha: {new Date(message.creationDate).toLocaleString()}</p>
            <p>Leído: {message.read ? "Sí" : "No"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SendedPage;
