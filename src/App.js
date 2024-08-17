import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [food, setFood] = useState('');
  const [calorieData, setCalorieData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:8000/api/calorie-count/', { food });
      setCalorieData(response.data);
    } catch (err) {
      setError('Unable to fetch calorie data. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Calorie Counter</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          placeholder="Enter a food item"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Get Calorie Count'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {calorieData && calorieData.items && calorieData.items.length > 0 && (
        <div className="result">
          <h2>Results for: {food}</h2>
          <p>Calories: {calorieData.items[0].calories}</p>
          <p>Serving Size: {calorieData.items[0].serving_size_g}g</p>
          <p>Protein: {calorieData.items[0].protein_g}g</p>
          <p>Fat: {calorieData.items[0].fat_total_g}g</p>
          <p>Carbohydrates: {calorieData.items[0].carbohydrates_total_g}g</p>
        </div>
      )}
    </div>
  );
}

export default App;