import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import BigStar from '../assets/BigStar.png';
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from '../http/deviceAPI';
import { REACT_APP_API_URL } from '../http/index.js';

function DevicePage() {
  const [device, setDevice] = useState({ info: [] });
  const { id } = useParams();

  useEffect(() => {
    fetchOneDevice(id).then((data) => {
      setDevice(data);
    });
  }, []);
  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image width={300} height={300} src={REACT_APP_API_URL + device.img} />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column">
            <h2>{device.name}</h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: `url(${BigStar}) no-repeat center center`,
                width: 240,
                height: 240,
                backgroundSize: 'cover',
                fontSize: 64,
              }}>
              {device.rating}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{ width: 300, height: 300, fontSize: 32, border: '5px solid lightgray' }}>
            <h3>От: {device.price} руб.</h3>
            <Button variant="outline-dark">Добавить в корзину</Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-4">
        <h2>Характеристики</h2>
        {device.info.map((d, index) => (
          <Row
            className="p-2"
            key={d.id}
            style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent' }}>
            {d.title} : {d.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
}

export default DevicePage;
