import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Image, Form, InputGroup, Button } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../static/styles/Login.css';

function Login() {
    const [email, setEmail] = useState('');
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
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message);
                setError('');
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
                    <Col className='p-5 d-flex flex-column justify-content-center'>
                        <p className='text-end'>
                            Not a member?
                            <a href='/register' className='text-decoration-none'> Register Now</a>
                        </p>
                        <p className='text-center pt-5 h1'>
                            <b>Hello Again!</b>
                        </p>
                        <p className='text-center pb-5 h5'>
                            Welcome back you've been missed!
                        </p>
                        <Form onSubmit={handleSubmit}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1"><FaEnvelope /></InputGroup.Text>
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    aria-label="Email"
                                    aria-describedby="basic-addon1"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon2"><FaLock /></InputGroup.Text>
                                <Form.Control
                                    type='password'
                                    placeholder="Password"
                                    aria-label="Password"
                                    aria-describedby="basic-addon2"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </InputGroup>
                            <div className="text-center">
                                <Button variant="outline-dark" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </Form>
                        {message && <p className="text-success text-center pt-3">{message}</p>}
                        {error && <p className="text-danger text-center pt-3">{error}</p>}

                        {/* Centered Google Login Button */}
                        <div className="text-center pt-3">
                            <p>Or login with</p>
                            <Button variant="outline-danger" className="d-flex align-items-center justify-content-center mx-auto">
                                <FaGoogle className="me-2" /> Login with Google
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default Login;
