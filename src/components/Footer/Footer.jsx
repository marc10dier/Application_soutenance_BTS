import React from "react";
import './footer.css';
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";



const Footer = () => {
    const year = new Date().getFullYear();
   return <footer className="footer">
    <Container>
        <Row>
            <Col lg="4" className="mb-4" md="6">
            <div className="logo">
                <div>
                    <h2 className="text-white">ABENG-</h2>
                </div>
            </div>
            <p className="footer__text mt-4">
                    La plateforme de Ecommerce Abeng, à pour mission
                    majeur de promouvoir les produits artisanaux 
                    pour une éventuelle augmentation du PIB.
                </p>
            </Col>
            <Col lg="3" md="3" className="mb-4"> 
            <div className="footer__quick-links">
                <h4 className="quick__links-title">Catégories</h4>
                <ListGroup>
                    <ListGroupItem className="ps-0 border-0">
                        <Link to="#">Produits en tendances</Link>
                    </ListGroupItem>
                    <ListGroupItem className="ps-0 border-0">
                        <Link to="#">Meilleures Ventes</Link>
                    </ListGroupItem>
                    <ListGroupItem className="ps-0 border-0">
                        <Link to="#">Nouvel arrivage</Link>
                    </ListGroupItem>
                    <ListGroupItem className="ps-0 border-0">
                        <Link to="#">Top Elégance</Link>
                    </ListGroupItem>
                </ListGroup>
            </div>
            </Col>
            <Col lg="2" md="3" className="mb-4"> 
            <div className="footer__quick-links">
                <h4 className="quick__links-title">Liens Utils</h4>
                <ListGroup>
                    <ListGroupItem className="ps-0 border-0">
                        <Link to="/shop">Collection</Link>
                    </ListGroupItem>
                    <ListGroupItem className="ps-0 border-0">
                        <Link to="/cart">Mon panier</Link>
                    </ListGroupItem>
                    <ListGroupItem className="ps-0 border-0">
                        <Link to="/login">Login</Link>
                    </ListGroupItem>
                    <ListGroupItem className="ps-0 border-0">
                        <Link to="#">Politique de confidentialité</Link>
                    </ListGroupItem>
                </ListGroup>
            </div>
            </Col>
            <Col lg="3" md="4">
            <div className="footer__quick-links">
                <h4 className="quick__links-title">Contact</h4>
                <ListGroup className="footer__contact">
                    <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                        <span><i class="ri-map-pin-line"></i></span>
                        <p>Marché de Tsinga, Yaoundé-Cameroun</p>
                    </ListGroupItem>
                    <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                    <span><i class="ri-phone-line"></i></span>
                        <p>+237 697 200 343</p>
                    </ListGroupItem>
                    <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                    <span><i class="ri-whatsapp-fill"></i></span>
                        <p>+237 694 575 149</p>
                    </ListGroupItem>
                    <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                    <span><i class="ri-mail-line"></i></span>
                        <p>abeng@gmail.com</p>
                    </ListGroupItem>
                </ListGroup>
            </div> 
            </Col>
            <Col lg="12">
                <p className="footer__copyright">Copyright {year} developer par, ATANGANA Marc Didier.
                tous les droits sont réservés.</p>
            </Col>
        </Row>
    </Container>

   </footer>
};

export default Footer;