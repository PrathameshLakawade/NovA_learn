import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Image, Form, InputGroup, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../static/styles/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        setError('');

        // Redirect to the dashboard on successful login
        navigate('/dashboard');
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'An error occurred');
        setMessage('');
      }
    } catch (err) {
      setError('Network error');
      setMessage('');
    }
  };

  return (
    <div className='div-container p-5'>
      <Card className='card-container'>
        <Row>
          <Col className='p-5'>
            <Card>
              <Image src='https://picsum.photos/500/700' alt='Login Vector' fluid rounded />
            </Card>
          </Col>
          <Col className='p-5'>
            <p className='text-end'>
              Not a member? 
              <a href='/' className='text-decoration-none'> Register Now</a>
            </p>
            <p className='text-center pt-5 h1'>
              <b>Hello Again!</b>
            </p>
            <p className='text-center pb-5 h5'>
              Welcome back you've been missed!
            </p>
            <Form onSubmit={handleSubmit}>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                <Form.Control
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon2">**</InputGroup.Text>
                <Form.Control
                  type='password'
                  placeholder="********"
                  aria-label="Password"
                  aria-describedby="basic-addon2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
              <p className='text-end'>Recover Password?</p>
              <Button variant="outline-dark" type="submit">
                Submit
              </Button>
            </Form>
            {message && <p className="text-success text-center pt-3">{message}</p>}
            {error && <p className="text-danger text-center pt-3">{error}</p>}
            <p className='text-center py-3'>or continue with</p>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default Login;
