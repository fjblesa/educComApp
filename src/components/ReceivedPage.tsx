import React, { useEffect, useState } from 'react';

interface Receive {
  id: number;
  title: string;
  description: string;
  youtubeLink: string;
}

const ReceivedPage: React.FC = () => {
  const [received, setReceived] = useState<Receive[]>([]);

  useEffect(() => {
    const fetchReceived = async () => {
      try {
        const response = await fetch('/app/messages/received');
        const data = await response.json();
        setReceived(data);
      } catch (error) {
        console.error('Error fetching received messages:', error);
      }
    };

    fetchReceived();
  }, []);

  return (
    <div className="received-page">
      <h2>Mensajes recibidos</h2>
      <ul className="received-list">
        {received.map(received => (
          <li key={received.id} className="received-item">
            <h3>{received.title}</h3>
            <p>{received.description}</p>
            <iframe
              width="1000"
              height="563"
              src={received.youtubeLink}
              title={received.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReceivedPage;
