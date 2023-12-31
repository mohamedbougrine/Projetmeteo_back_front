import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Updated import statement
import './App.css';
import CitySelector from './pages/CitySelector';
import { Container } from 'react-bootstrap';
import useFetch from './pages/useFetch';
import { apiKey, baseUrl } from './config';
import WeatherList from './pages/WeatherList';
import Login from './pages/Login';
import Signup from './pages/SIGNUP';

function App() {
  const { data, error, inProgress, setUrl } = useFetch();

  const getContent = () => {
    if (error) return <h2>Error when fetching: {error}</h2>;
    if (!data && inProgress) return <h2>Loading...</h2>;
    if (!data) return null;
    return <WeatherList weathers={data.list} />;
  };

  return (
    <Container className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <>
              <CitySelector onSelectButtonClick={(city) => setUrl(`${baseUrl}/data/2.5/forecast/daily?q=${city}&cnt=5&appId=${apiKey}&units=metric`)} />
              {getContent()}
            </>
          }
        />
      </Routes>
    </Container>
  );
}

export default App;
