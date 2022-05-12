import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import star from '../assets/star.png';
import { DEVICE_ROUTE } from '../utils/consts';
import { REACT_APP_API_URL } from '../http/index.js';

const DeviceItem = ({ device }) => {
  const navigate = useNavigate();
  return (
    <Col md={3} className="mt-3" onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
      <Card style={{ width: 150, cursor: 'pointer' }} border={'light'}>
        <Image width={150} height={150} src={REACT_APP_API_URL + device.img}></Image>
        <div className="mt-1 d-flex text-black-50 align-items-center justify-content-between">
          <div>Samsung......</div>
          <div className="d-flex align-items-center">
            <Image className="ms-1" width={16} height={16} src={star} />
            <div>{device.rating}</div>
          </div>
        </div>
        <div>{device.name}</div>
      </Card>
    </Col>
  );
};

export default DeviceItem;
