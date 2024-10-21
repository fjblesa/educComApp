import React, { useEffect, useState } from 'react';
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
  const [user, setUser ] = useState({
    id: '',
    name: '',
    surName: '',
    surName2: '',
    userName: '',
    password: '',
    role: 'STUDENT',
  });
  const location = useLocation();

  useEffect(() => {
    const savedUser  = localStorage.getItem('user');
    if (savedUser ) {
      setUser (JSON.parse(savedUser ));
    }

    const fetchSended = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/messages/sent?userId=${user.id}`);
        const data = await response.json();
        setSended(data);
      } catch (error) {
        console.error('Error fetching sended messages:', error);
      }
    };

    if (user.id) {
      fetchSended();
    }
  }, [user.id]);

  return (
    <div className="sended-page">
      <h2>Mensajes enviados</h2>
      <div className="sended-list">
        {sended.map(message => (
          <div key={message.id} className="sended-item" style={styles.box}>
            <p><strong>Mensaje:</strong> {message.content}</p>
            <p><strong>Fecha:</strong> {new Date(message.creationDate).toLocaleString()}</p>
            <p><strong>Leído:</strong> {message.read ? "Sí" : "No"}</p>
            <p><strong>Enviado para:</strong> {message.receiverId}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Estilos para las "cajitas"
const styles = {
  box: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px 0',
    backgroundColor: '#f9f9f9',
  }
};

export default SendedPage;