import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface CloudTask {
  id: number;
  name: string;
  isCompleted: boolean;
}

const Dashboard = () => {
  const [items, setItems] = useState<CloudTask[]>([]);
  const [error, setError] = useState('');
  const [newTaskName, setNewTaskName] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get('/tasks');

      console.log('API response:', res.data);

      if (Array.isArray(res.data)) {
        setItems(res.data);
        setError('');
      } else {
        console.error('API nie zwróciło tablicy:', res.data);
        setItems([]);
        setError('API zwróciło niepoprawny format danych.');
      }
    } catch (err) {
      console.error('Szczegóły błędu:', err);
      setItems([]);
      setError('Błąd połączenia z API. Sprawdź, czy backend działa.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTaskName.trim()) return;

    try {
      setError('');

      await api.post('/tasks', {
        name: newTaskName.trim(),
      });

      setNewTaskName('');
      await fetchTasks();
    } catch (err) {
      console.error('Błąd podczas dodawania zadania:', err);
      setError('Nie udało się dodać zadania. Spróbuj ponownie.');
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1>☁️ Cloud App Dashboard</h1>

      {error && (
        <div
          style={{
            background: '#fff3cd',
            color: '#856404',
            padding: '10px',
            borderRadius: '5px',
            margin: '20px auto',
            maxWidth: '400px',
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleAddTask} style={{ marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Wpisz nowe zadanie..."
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          style={{ padding: '10px', width: '250px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button
          type="submit"
          style={{
            marginLeft: '10px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Dodaj Zadanie
        </button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {loading && <p>Ładowanie zadań...</p>}

        {!loading && items.length === 0 && !error && <p>Brak zadań. Czas coś zaplanować!</p>}

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {Array.isArray(items) &&
            items.map((item) => (
              <li
                key={item.id}
                style={{
                  background: '#f8f9fa',
                  margin: '5px',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  borderLeft: item.isCompleted ? '5px solid #28a745' : '5px solid #6c757d',
                  width: '350px',
                  textAlign: 'left',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                <strong>{item.name}</strong> {item.isCompleted ? '✅' : '⏳'}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;