import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  role: 'teacher' | 'student';
}

const SendMessagePage: React.FC = () => {
  const [content, setContent] = useState('');
  const [receiverId, setReceiverId] = useState<number | null>(null);
  const [senderId, setSenderId] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Fetch the current user and set senderId
    const fetchCurrentUser = async () => {
      const response = await fetch('/api/currentUser');
      const data = await response.json();
      setCurrentUser(data);
      setSenderId(data.id);
    };

    // Fetch the users list
    const fetchUsers = async () => {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    };

    fetchCurrentUser();
    fetchUsers();
  }, []);

  const handleSend = async () => {
    if (receiverId === null || content === '') {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const message = {
      content,
      receiverId,
      senderId,
    };

    try {
      const response = await fetch('/api/messages/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      if (response.ok) {
        alert('Mensaje enviado exitosamente');
        setContent('');
        setReceiverId(null);
      } else {
        alert('Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar el mensaje');
    }
  };

  return (
    <div>
      <div className='send-message-page'>
        <h2>Enviar Mensaje</h2>  
      </div> 
      <div className='send-message-page'>
        <textarea
          placeholder="Escribe tu mensaje aquí..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className='send-message-page'>
        <label htmlFor="receiver">Selecciona el destinatario:</label>
        <select
          id="receiver"
          value={receiverId ?? ''}
          onChange={(e) => setReceiverId(Number(e.target.value))}
        >
        <option value="">--Selecciona un usuario--</option>
          {users
            .filter((user) => user.id !== currentUser?.id)
            .map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.role})
              </option>
             ))}
        </select>
        <button onClick={handleSend}>Enviar</button>
      </div>
     
    </div>
  );
};

export default SendMessagePage;
