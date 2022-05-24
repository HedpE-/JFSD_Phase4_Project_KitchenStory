import React, { useState } from 'react'
import { Button, Alert, Form, FormControl, Row, Col } from 'react-bootstrap';

export default function AdminConsole() {
    const [alertMessage, setAlertMessage] = useState({});
    
    const renderAlertMessage = () => (
        <div>
            <Alert variant={alertMessage.style} className="py-0">{alertMessage.message}</Alert>
        </div>
    );
    
    const submitPasswordChange = (event) => {
        event.preventDefault();
        if(event.target.password.value === event.target.rpassword.value) {
            let loggedInUser = JSON.parse(localStorage.getItem("user"));
            loggedInUser["password"] = event.target.password.value;

            fetch("http://localhost:3030/users/" + loggedInUser.id, {
                method: "PUT",
                headers : { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loggedInUser)
            })
                .catch(console.log);
            setAlertMessage({ style: "success", message: "Password changed" });
        }
        else
            setAlertMessage({ style: "danger", message: "The passwords must match" });
    }
    
    return (
        <>
            <Row className="mx-auto text-center">
                <Form onSubmit={submitPasswordChange}>
                    <p>
                        <label><strong>Change your admin password</strong></label>
                    </p>
                    <Row className="mb-3">
                        <Col>
                            <FormControl type="password" name="password" placeholder="New Password" required />
                        </Col>
                        <Col>
                            <FormControl type="password" name="rpassword" placeholder="Repeat new Password" required />
                        </Col>
                    </Row>
                    <p>{alertMessage.message && renderAlertMessage()}</p>
                    <Button variant='primary' type='submit'>Change password</Button>
                </Form>
            </Row>
            <hr/>
            <Col className="text-center">
                <p><Form.Label><strong>Shop Administration</strong></Form.Label></p>						
                <a href="itemsMasterlist" class="f-n-hover btn btn-primary btn-md mx-2">Products</a>
                <a href="usersMasterlist" class="f-n-hover btn btn-primary btn-md mx-2">Users</a>
            </Col>
        </>
    );
}