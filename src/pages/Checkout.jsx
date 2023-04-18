import React from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/commonSection";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";    
import "../styles/checkout.css";
import { useSelector } from "react-redux";

const Checkout = () => {
    const totalQty = useSelector(state=>state.cart.totalQuantity);
    const totalAmount = useSelector(state=>state.cart.totalAmount);
    return (
        <Helmet title="checkout">
            <CommonSection title="Paiement" />
            <section>
                <Container>
                    <Row>
                        <Col lg="8">
                            <h6 className="mb-4 fw-bold">Détails de la facture</h6>
                            <Form className="billing__form p-3">
                                <FormGroup className="form__group">
                                   <input type="text" placeholder="Entrez votre nom" />
                                </FormGroup>

                                <FormGroup className="form__group">
                                   <input type="email" placeholder="Entrez votre adresse email" />
                                </FormGroup>

                                <FormGroup className="form__group">
                                   <input type="number" placeholder="Entrez votre numéro de télèphone" />
                                </FormGroup>

                                <FormGroup className="form__group">
                                   <input type="text" placeholder="Entrez le nom de votre quartier" />
                                </FormGroup>

                                <FormGroup className="form__group">
                                   <input type="text" placeholder="Entrez le nom de votre ville" />
                                </FormGroup>
                            </Form>

                        </Col>

                        <Col lg="4">
                            <div className="checkout__cart">
                                <h6>Total Quantité: <span> {totalQty} Articles</span></h6>
                                <h6>Total: <span> {totalAmount} FCFA</span></h6>
                                <h4>Coût Total <span> {totalAmount} FCFA</span></h4>
                                <button className="buy__btn auth__btn w-100">Commander</button>
                            </div>
                            
                        </Col>
                    </Row>
                </Container>
            </section>

        </Helmet>

    );
};

export default Checkout;