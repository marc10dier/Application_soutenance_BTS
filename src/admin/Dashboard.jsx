import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../styles/dashboard.css";
import useGetData from "../custom-hooks/useGetData";

const Dashboard = () => {
    const {data: products} = useGetData('products');
    const {data: users} = useGetData('users');
    return (
        <>
       <section>
        <Container>
            <Row>
                <Col lg="3">
                    <div className="revenue__box">
                      <h5>Vente totale</h5>
                      <span>500000 FCFA</span>
                    </div>
                </Col>
                <Col lg="3">
                <div className="order__box">
                      <h5>Autres</h5>
                      <span>10</span>
                    </div>
                </Col>
                <Col lg="3">
                <div className="products__box">
                      <h5>Produits total</h5>
                      <span>{products.length} </span>
                    </div>
                </Col>
                <Col lg="3">
                <div className="users__box">
                      <h5>Nombre d'utilisateur</h5>
                      <span>{users.length} </span>
                    </div>
                </Col>
            </Row>
        </Container>
       </section>
       </>
    );
};

export default Dashboard;