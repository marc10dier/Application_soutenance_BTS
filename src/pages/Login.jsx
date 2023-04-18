import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import "../styles/login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import { toast } from "react-toastify";
import CommonSection from "../components/UI/commonSection";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const signIn = async (e) =>{
        e.preventDefault();
        setLoading(true);
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user);
            setLoading(false);
            toast.success("Vous êtes connecter");
            navigate("/checkout");
            

        }catch (error) {
            setLoading(false);
            toast.error(error.massage);

        }
    };


    return (
        <Helmet title="Login">
            <CommonSection title="Login" />
            <section>
            <Container>
                <Row>
                   { 
                     loading ? ( 
                     <Col lg="12" className="text-center"><h5 className="fw-bold">Loading...</h5>
                     </Col> ) : (
                        
                    <Col lg="6" className="m-auto text-center">
                        <h3 className="fw-bold mb-4 p-5">Se connecter</h3>

                        <Form className="auth__form" onSubmit={signIn}>
                            <FormGroup className="form__group">
                              <input type="email" placeholder="Entrez votre adresse email " value={email} onChange={e=> setEmail(e.target.value)} />
                            </FormGroup>

                            <FormGroup className="form__group">
                              <input type="password" placeholder="Entrez votre mot de passe " value={password} onChange={e=> setPassword(e.target.value)}/>
                            </FormGroup>
                            <button type="submit" className="buy__btn auth__btn">Login</button>
                            <p>Vous n'avez pas de compte? <Link to="/signup">Créer un compte!</Link></p>
                        </Form>
                    </Col>
                    )
                   }
                </Row>
            </Container>
            </section>

        </Helmet>
    );
}; 

export default Login;