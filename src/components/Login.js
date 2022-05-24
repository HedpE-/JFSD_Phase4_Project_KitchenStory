import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { ToastContainer, Toast, Container, Form, FormControl, Button, Row, Col } from 'react-bootstrap';

export default function Login() {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState( {
        style: "",
        title: "",
        message: ""
    });
    
    const navigate = useNavigate();
    
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser)
            navigate("/");
    }, []);
    
    function showToastMessage(toastmessage) {
        setToastMessage(toastmessage);
        setShowToast(true);
    }
    
    const handleLogin = (e) => {
        //Prevent page reload
        e.preventDefault();

        const loginData = { username: e.target.username.value, password: e.target.password.value };
        
        fetch("http://localhost:3030/users?username=" + loginData.username)
            .then((response) => response.json())
            .then((json) => {
                let userData = json.find(user => user.username === loginData.username);
            
                if (userData) {
                    if (userData.password !== loginData.password) {
                        // Invalid password
                        console.log("Error: Invalid password");
                        showToastMessage({ style: "danger", message: "Invalid credentials" });
                    } else {
                        console.log("Success: Login success");
                        let loggedInUser = {
                            id: userData.id,
                            username: userData.username,
                            email: userData.email,
                            role: userData.role
                        };
                        //setUser(loggedInUser);
                        localStorage.setItem("user", JSON.stringify(loggedInUser));
                        navigate("/");
                        window.location.reload(false);
                        showToastMessage({ style: "success", message: "Login success" });
                    }
                } else {
                    console.log("Error: Invalid username");
                    showToastMessage({ style: "danger", message: "Invalid credentials" });
                }
            }).catch(console.log);
    };
    
    return (
        <>
            <Row>
                <Col sm="3" />
                <Col>
                    <div className="jumbotron">
                        <h1 class="display-5">Sign in</h1>
                        <p class="fs-4 fw-light mb-3">Please enter your user data to access your account</p>
                        <br />
                        <Form className="justify-content-center" onSubmit={handleLogin}>
                            <Container className="w-25">
                                <Row class="mb-3">
                                    <label for="username">Username</label>
                                    <FormControl type="text" id="username" name="username" placeholder="Username" required />
                                </Row>
                                <Row class="mb-4">
                                    <label for="password">Password</label>
                                    <FormControl type="password" id="password" name="password" placeholder="Password" required />
                                </Row>
                                <Button type="submit" variant="primary" className="w-75 mt-4">Sign in</Button>
                            </Container> 
                        </Form>
                        <p class="text-center mt-1">Don&apos;t have an account? <a href="/register">Register</a></p>
                    </div>
                </Col>
                <Col sm="3">
                    <ToastContainer className="mt-5 pt-3 me-2" position="top-end">
                        <Toast onClose={() => setShowToast(false)} show={showToast} delay={5000} bg={toastMessage.style} autohide>
                            {
                                toastMessage.title &&
                                <Toast.Header>
                                    <strong className="me-auto">{toastMessage.title}</strong>
                                </Toast.Header>
                            }
                            <Toast.Body>{toastMessage.message}</Toast.Body>
                        </Toast>
                    </ToastContainer>
                </Col>
            </Row>
        </>
    )
}
