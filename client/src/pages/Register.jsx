import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Image, Form, InputGroup, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaGoogle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState('');
    const [countdown, setCountdown] = useState(null); // Initially set countdown to null

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setValidated(true);

        // Basic validation logic for demo purposes
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const phoneRegex = /^\+[1-9]\d{1,14}$/;
        if (!phoneRegex.test(formData.mobile)) {
            setError("Invalid phone number");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError("Invalid email address");
            return;
        }

        // On successful validation, start countdown for redirection
        setError("");
        setCountdown(5); // Start the countdown
    };

    useEffect(() => {
        // Countdown timer
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0) {
            // Redirect to main page after countdown reaches 0
            window.location.href = 'http://localhost:3000';
        }
    }, [countdown]);

    const renderTooltip = (msg) => (
        <Tooltip id="tooltip-right" className="tooltip-right">{msg}</Tooltip>
    );

    return (
        <div className='div-container p-5'>
            <Card className='card-container'>
                <Row className="d-flex align-items-stretch" style={{ height: '800px' }}>
                    <Col className='p-5' style={{ maxWidth: '50%', overflow: 'hidden' }}>
                        <Card className="h-100">
                            <Image src='/Register.png' alt='Register Visual' fluid style={{ height: '100%', objectFit: 'contain' }} />
                        </Card>
                    </Col>
                    <Col className='p-5 d-flex flex-column justify-content-center' style={{ maxWidth: '50%', overflow: 'hidden' }}>
                        <p className='text-end'>
                            Already a member?
                            <a href='http://localhost:3000' className='text-decoration-none'> Login Now</a>
                        </p>
                        <p className='text-center pt-5 h1'>
                            <b>Welcome!</b>
                        </p>
                        <p className='text-center pb-3 h5'>
                            Create an account to get started!
                        </p>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <InputGroup hasValidation>
                                    <InputGroup.Text><FaUser /></InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        placeholder="First Name"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        isInvalid={!!error}
                                    />
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={renderTooltip("First name is required")}
                                    >
                                        <Form.Control.Feedback type="invalid" tooltip />
                                    </OverlayTrigger>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <InputGroup hasValidation>
                                    <InputGroup.Text><FaUser /></InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        placeholder="Last Name"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        isInvalid={!!error}
                                    />
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={renderTooltip("Last name is required")}
                                    >
                                        <Form.Control.Feedback type="invalid" tooltip />
                                    </OverlayTrigger>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <InputGroup hasValidation>
                                    <InputGroup.Text><FaPhone /></InputGroup.Text>
                                    <Form.Control
                                        type="tel"
                                        placeholder="Mobile Number (e.g., +123456789)"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        required
                                        isInvalid={!!error}
                                    />
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={renderTooltip("Enter a valid phone number with country code")}
                                    >
                                        <Form.Control.Feedback type="invalid" tooltip />
                                    </OverlayTrigger>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <InputGroup hasValidation>
                                    <InputGroup.Text><FaEnvelope /></InputGroup.Text>
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        isInvalid={!!error}
                                    />
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={renderTooltip("Enter a valid email address")}
                                    >
                                        <Form.Control.Feedback type="invalid" tooltip />
                                    </OverlayTrigger>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <InputGroup hasValidation>
                                    <InputGroup.Text><FaLock /></InputGroup.Text>
                                    <Form.Control
                                        type="password"
                                        placeholder="Create Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        isInvalid={!!error}
                                    />
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={renderTooltip("Password is required")}
                                    >
                                        <Form.Control.Feedback type="invalid" tooltip />
                                    </OverlayTrigger>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <InputGroup hasValidation>
                                    <InputGroup.Text><FaLock /></InputGroup.Text>
                                    <Form.Control
                                        type="password"
                                        placeholder="Re-enter Password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        isInvalid={!!error}
                                    />
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={renderTooltip("Confirm your password")}
                                    >
                                        <Form.Control.Feedback type="invalid" tooltip />
                                    </OverlayTrigger>
                                </InputGroup>
                            </Form.Group>
                            <div className="text-center">
                                <Button variant="outline-dark" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </Form>
                        {error && <p className="text-danger text-center pt-3">{error}</p>}
                        {/* Display countdown message if countdown is active */}
                        {!error && countdown !== null && countdown > 0 && (
                            <p className="text-success text-center pt-3">
                                Redirecting to login in {countdown} seconds...
                            </p>
                        )}
                        <div className="text-center pt-2">
                            <p>Or register with</p>
                            <Button variant="outline-danger" className="d-flex align-items-center justify-content-center mx-auto">
                                <FaGoogle className="me-2" /> Register with Google
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default Register;
