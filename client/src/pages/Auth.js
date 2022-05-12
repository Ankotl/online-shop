import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Container, Form, Card, Button, Row } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { login, registration } from '../http/userAPI.js';
import { Context } from '../index.js';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigation = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(user);
      user.setIsAuth(true);
      navigation(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}>
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-2"
            placeholder="Введите email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}></Form.Control>
          <Form.Control
            className="mt-2"
            placeholder="Введите пароль..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"></Form.Control>

          <Row className="d-flex mt-4 justify-content-between">
            {isLogin ? (
              <div style={{ width: 300 }}>
                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Регистрируйся!</NavLink>
              </div>
            ) : (
              <div style={{ width: 300 }}>
                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
              </div>
            )}
            <Button style={{ width: 200 }} variant="outline-success" onClick={click}>
              {isLogin ? 'Войти' : 'Регистрация'}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
