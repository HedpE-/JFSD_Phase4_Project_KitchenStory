import React, { useState, useEffect } from 'react'
import { Accordion, Row, Col } from 'react-bootstrap';

export default function History() {
    const [purchases, setPurchases] = useState({});
    
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            var parsedUser = JSON.parse(loggedInUser);
        
            fetchPurchases(parsedUser.username);
        }
    }, []);
    
    function fetchPurchases(username) {
        fetch("http://localhost:3030/purchases?username=" + username)
            .then((response) => response.json())
            .then((json) => {
                setPurchases(json);
                console.log(purchases);
            })
            .catch(console.log);
    }
    
    function renderCartItemsList(cartItemsList) {
        try {
            return cartItemsList.items.map((cartItem) =>
                <div class="d-style bg-light py-2 shadow-sm mb-2">
                    <Row className="align-items-center">
                        <Col md="6" className="col-12">
                            <h6 class="my-0">{cartItem.quantity} x {cartItem.item.name}</h6>
                            <h6 class="fw-light mt-1">{cartItem.item.category}</h6>
                        </Col>
                        <Col md="3">
                            <small class="text-muted">{cartItem.item.price} €</small>
                        </Col>
                        <Col md="3">
                            <h6>{(Math.round(cartItem.total * 100) / 100).toFixed(2)} €</h6>
                        </Col>
                    </Row>
                </div>
            );
        }
        catch (error) {
            console.log("Exception: " + error);
        }
    };
    
    const renderItemsList = () => {
        try {
            return purchases.map((entry, index) =>
                <Accordion.Item eventKey={index}>
                    <Accordion.Header>
                        <Row className="align-items-center w-100">
                            <Col>
                                <h2 class="text-170 text-600 text-primary-d1 letter-spacing">#{entry.id}</h2>
                            </Col>
                            <Col>
                                <h4 class="text-170 text-600 text-primary-d1 letter-spacing">{entry.createddate ? entry.createddate.replace("T", " ").substr(0, entry.createddate.indexOf('.')) : ""}</h4>
                            </Col>
                            <Col className="text-center">
                                <h4 class="text-170 text-600 text-primary-d1 letter-spacing">{(Math.round(entry.cart.totalPrice * 100) / 100).toFixed(2)} €</h4>
                            </Col>
                        </Row>
                    </Accordion.Header>
                    <Accordion.Body>
                        {renderCartItemsList(entry.cart)}
                    </Accordion.Body>
                </Accordion.Item>
            );
        }
        catch (error) {
            console.log("Exception: " + error);
        }
    };
    
    return (
        <Row>
            <Col sm="3" />
            <Col>
                <div className="jumbotron">
                    <h1 class="display-5">Purchase History</h1>
                    <p class="fs-4 fw-light mb-3">Here you can find all your past purchases.<br />Thank you for the preference!</p>
                    <br />
                    {
                        purchases &&
                        <Accordion>
                            {renderItemsList()}
                        </Accordion>
                    }
                </div>
            </Col>
            <Col sm="3" />
        </Row>
    );
}