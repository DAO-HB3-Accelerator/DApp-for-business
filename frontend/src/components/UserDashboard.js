import React, { useEffect, useState } from 'react';
import { useWalletConnection } from '../hooks/useWalletConnection';
import { fetchUserData, fetchUserTransactions } from '../services/api';

function UserDashboard() {
  const { isConnected, address } = useWalletConnection();
  const [userData, setUserData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      if (!isConnected || !address) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const [user, txs] = await Promise.all([
          fetchUserData(address),
          fetchUserTransactions(address)
        ]);
        
        setUserData(user);
        setTransactions(txs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [isConnected, address]);

  if (!isConnected) {
    return <p>Пожалуйста, подключите кошелек</p>;
  }

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  return (
    <div>
      <h2>Информация о пользователе</h2>
      {userData && (
        <div>
          <p>Адрес: {address}</p>
          <p>Баланс: {userData.balance}</p>
          {/* Другие данные пользователя */}
        </div>
      )}

      <h3>История транзакций</h3>
      <ul>
        {transactions.map((tx) => (
          <li key={tx.id}>
            {tx.type}: {tx.amount} ({new Date(tx.timestamp).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserDashboard; 