import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface Received {
  id: number;
  content: string;
  senderId: number;
  receiverId: number;
  senderName: string;
  receiverName:string;
  creationDate: string;
  read: boolean;
}

const ReceivedPage: React.FC = () => {
  const [received, setReceived] = useState<Received[]>([]);
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

    const fetchReceived = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/messages/received?userId=${user.id}`);
        const data = await response.json();
        setReceived(data);
      } catch (error) {
        console.error('Error fetching Received messages:', error);
      }
    };

    if (user.id) {
      fetchReceived();
    }
  }, [user.id]);

  return (
    <div className="received-page">
      <h2>Mensajes enviados</h2>
      <div className="received-list">
        {received.map(message => (
          <div key={message.id} className="received-item" style={styles.box}>
            <p><strong>Mensaje:</strong> {message.content}</p>
            <p><strong>Fecha:</strong> {new Date(message.creationDate).toLocaleString()}</p>
            <p><strong>Leído:</strong> {message.read ? "Sí" : "No"}</p>
            <p><strong>Enviado por:</strong> {message.senderName}</p>
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

export default ReceivedPage;