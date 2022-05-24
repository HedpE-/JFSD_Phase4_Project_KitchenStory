import React from 'react'
import { Row, Col } from 'react-bootstrap';

export default function Congrats() {
  return (
    <Row>
        <Col sm="3" />
        <Col>
            <div className="jumbotron justify-content-start">
            <h1 class="display-4">Congratulations for your purchase</h1>
            <p class="fs-4 fw-light mb-3">
                The delivery will occur in the incoming days so stay sharp and enjoy your fresh groceries!
            </p>
            <a href="/" class="f-n-hover btn btn-primary px-4 mt-5 text-600">Go Home</a>
            </div>
        </Col>
        <Col sm="3" />
    </Row>
  );
}