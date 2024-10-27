import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, InputGroup, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard() {
    const [topics, setTopics] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            console.log(topics);
            const response = await fetch('http://localhost:8000/learn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topic: topics }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message);
                setError('');
                // navigate('/dashboard');
            } else {
                const errorData = await response.json();
                const errorMessage = typeof errorData.detail === 'string' 
                    ? errorData.detail 
                    : JSON.stringify(errorData.detail);

                setError(errorMessage);
                setMessage('');
            }
        } catch (err) {
            setError('Network error');
            setMessage('');
        }
    };

    return (
        <>
            <Navbar>
                <Container>
                    <Navbar.Brand href="/"><b>NOVA_LEARN</b></Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: <a href="/profile">Nova User</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Form className="py-5" onSubmit={handleSubmit}>
                <InputGroup className="mb-3 px-5">
                    <InputGroup.Text id="inputGroup-sizing-default">I want to learn</InputGroup.Text>
                    <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        value={topics}
                        onChange={(e) => setTopics(e.target.value)}
                    />
                    <Button variant="outline-dark" type="submit">Submit</Button>
                </InputGroup>
                {message && <p className="text-success px-5">{message}</p>}
                {error && <p className="text-danger px-5">{error}</p>}
            </Form>
        </>
    );
}

export default Dashboard;
