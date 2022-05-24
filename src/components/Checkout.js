import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Stack, Form, FormControl, Button, Row, Col, Badge } from 'react-bootstrap';

export default function Checkout() {
    const [user, setUser] = useState("");
    const [cart, setCart] = useState({});
    
    const navigate = useNavigate();
    
    useEffect(() => {
        const currentCart = localStorage.getItem("cart");
        if(currentCart)
            setCart(JSON.parse(currentCart));
        
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser)
            setUser(JSON.parse(loggedInUser));
        else
            navigate("/");
    }, []);
    
    const clearCart = () => {
        setCart({
            totalPrice: 0,
            itemsCount: 0,
            items: []
        })
        localStorage.setItem("cart", "");
    }
    
    const clickHandler = (e) => {
        console.log("clickHandler");
        e.stopPropagation();

        if (e.ctrlKey) {
            processPayment(e);
        }
    }
    
    const processPayment = (e) => {
        e.preventDefault();
        let purchase = {
            username: user.username,
            createddate: new Date(),
            cart: cart
        };
        fetch("http://localhost:3030/purchases/", {
            method: "POST",
            headers : { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(purchase)
        })
            .then((response) =>  response.json())
            .then((json) => {
                clearCart();
                navigate("/congrats");
                window.location.reload(false);
            })
            .catch(console.log);
    }
    
    const renderCartItems = () => {
        try {
            return cart.items.map((cartItem) =>
                <div class="d-style bg-light py-2 shadow-sm">
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
    
    return (
        <Row>
            <Col sm="3" />
            <Col>
                <div className="jumbotron">
                    <h1 class="display-5">Checkout</h1>
                    <p class="fs-4 fw-light mb-3">
                        Just one step to go!<br />Please enter your Billing details on the
                        form below to confirm your purchase.
                    </p>
                    <br />
                    <Form onSubmit={processPayment} className="needs-validation">
                        <Row>
                            <Col className="order-md-2 mb-4">
                                <h4 class="mb-3">Shopping Cart</h4>
                                <Stack gap="1" className="bg-light rounded">
                                    {renderCartItems()}
                                </Stack>
                                <h4 class="d-flex justify-content-between align-items-center mt-2">
                                    <span class="text-muted">Total</span>
                                    <Badge pill bg="primary" id="total">{(Math.round(cart.totalPrice * 100) / 100).toFixed(2)} €</Badge>
                                </h4>
                            </Col>
                            <Col md="8" className="order-md-1">
                                <h4 class="mb-3">Billing address</h4>
                                <Row>
                                    <Col md="6" className="mb-3">
                                        <label htmlFor="fname">First name</label>
                                        <FormControl type="text" id="fname" name="fname" required />
                                    </Col>
                                    <Col md="6" className="mb-3">
                                        <label htmlFor="lname">Last name</label>
                                        <FormControl type="text" id="lname" name="lname" required />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="6" className="mb-3">
                                        <label htmlFor="email">Email</label>
                                        <FormControl type="email" id="email" name="email" defaultValue={user.email} required disabled readOnly />
                                    </Col>
                                    <Col md="6" className="mb-3">
                                        <label htmlFor="uname">Username</label>
                                        <FormControl type="text" id="uname" name="uname" defaultValue={user.username} required disabled readOnly />
                                    </Col>
                                </Row>
                                <div class="mb-3">
                                    <label htmlFor="address">Address</label>
                                    <FormControl type="text" id="address" name="address" placeholder="1234 Main St" required />
                                    <div class="invalid-feedback">Please enter your shipping address.</div>
                                </div>
                                <div class="mb-3">
                                    <label htmlFor="address2">Address 2 <span class="text-muted">(Optional)</span></label>
                                    <FormControl type="text" id="address2" name="address2" placeholder="House number" />
                                </div>
                                <Row>
                                    <Col md="5" className="mb-3">
                                        <label htmlFor="country">Country</label>
                                        <FormControl type="text" className="d-block w-100" id="country" name="country" placeholder="Portugal" required />
                                    </Col>
                                    <Col md="4" className="mb-3">
                                        <label htmlFor="city">City</label>
                                        <FormControl type="text" className="d-block w-100" id="city" name="city" placeholder="Lisbon" required />
                                    </Col>
                                    <Col md="3" className="mb-3">
                                        <label htmlFor="postcode">Postal or Zip code</label>
                                        <FormControl type="text" id="postcode" name="postcode" placeholder="" required />
                                    </Col>
                                </Row>
                                <hr class="mb-4"/>
                                <h4 class="mb-3">Payment</h4>
                                <Form.Check id="credit" name="payment_method" type="radio" label="Credit card" className="my-3 col-sm-3" defaultChecked required />
                                <div class="card-details">
                                    <h3 class="title">Credit Card Details</h3>
                                    <Row>
                                        <Col sm="8">
                                            <label htmlFor="cc-name">Name on card</label>
                                            <FormControl id="cc-name" name="cc-name" type="text" placeholder="Card Holder" required />
                                        </Col>
                                        <Col sm="4">
                                            <label htmlFor="cc-expiration">Expiration Date</label>
                                            <FormControl type="month" id="cc-expiration" name="cc-expiration" placeholder="MM" required />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="8">
                                            <label htmlFor="cc_number">Card Number</label>
                                            <FormControl id="cc_number" name="cc_number" type="text" placeholder="Card Number" minLength="15" maxLength="15"
                                                min="000000000000000" max="999999999999999" step="1" pattern="[0-9]{15}" required />
                                        </Col>
                                        <Col sm="4">
                                            <label htmlFor="cc-cvv">CVV</label>
                                            <FormControl id="cc-cvv" name="cc-cvv" type="text" placeholder="CVC" minLength="3" maxLength="3"
                                                min="000" max="999" step="1" pattern="[0-9]{3}" required />
                                        </Col>
                                    </Row>
                                </div>
                                <hr class="mb-4" />
                                <Row>
                                    <Col>
                                        <Button variant="primary" type="submit" onClick={clickHandler}>Confirm payment</Button>
                                    </Col>
                                    <Col />
                                    <Col>
                                        <a href="/cart" class="f-n-hover btn btn-danger btn-md w-75">Cancel</a>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Col>
            <Col sm="3" />
        </Row>
    );
}