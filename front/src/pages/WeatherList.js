import React from 'react';
import { Row, Col } from 'react-bootstrap';
import WeatherCard from './WeatherCard';

const WeatherList = ({ weathers }) => (
  <Row>
    {weathers.map(({ dt, temp, weather }, index) =>
      <Col key={index}>
        <WeatherCard
          min={temp.min}
          max={temp.max}
          dt={dt * 1000}
          main={weather[0].main}
          icon={weather[0].icon}
        />
      </Col>
    )}
  </Row>
);

export default WeatherList;
