const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export async function fetchUserData(address) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${address}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

export async function fetchUserTransactions(address) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/transactions/${address}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
} 