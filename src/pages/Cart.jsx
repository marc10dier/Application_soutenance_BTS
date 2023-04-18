import React from "react";
import '../styles/cart.css';
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/commonSection";
import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";
import { cartActions } from "../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";


const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalAmount = useSelector((state=> state.cart.totalAmount));
    return (
        <Helmet title="Panier">
            <CommonSection title="Mon Panier" />
         <section>
            <Container>
                <Row>
                    <Col lg="9">
                        {
                            cartItems.length === 0 ? ( <h2 className="fs-4 text-center">Oups...!, Votre panier est vide!</h2>
                            ) : (
                                <table className="table bordered">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Article</th>
                                        <th>Prix</th>
                                        <th>Quantité</th>
                                        <th>Supprimer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                   {
                                    cartItems.map((item, index)=>(
                                        <Tr item={item} key={index} />
                                   
                                    ))
                                   }
                                </tbody>
    
                            </table>

                            )
                        }
                       
 

                    </Col>

                    <Col lg="3">
                        <div>
                            <h6 className="d-flex align-items-center justify-content-between">TOTAL<span className="fs-4 fw-bold">{totalAmount} FCFA</span></h6>
                            
                        </div>
                        <p className="fs-6 mt-2">Beneficier d'un code promo, en achétant plus de 05 articles!</p>
                        <div>
                            <motion.button whileTap={{ scale: 1.2 }} className="buy__btn w-100"><Link to="/login">Paiement</Link> </motion.button>
                            <motion.button whileTap={{ scale: 1.2 }} className="buy__btn w-100 mt-3"><Link to="/shop">Continuer les achats</Link> </motion.button>
                            
                        </div>
                        

                    </Col>
                </Row>
            </Container>
         </section>
        </Helmet>
    );
};

const Tr = ({item}) =>{
    const dispatch = useDispatch();
    const deleteProduct =()=>{
        dispatch(cartActions.deleteItem(item.id));
    }
    return(
        <tr>
        <td><img src={item.imgUrl} alt="" /></td>
        <td>{item.productName}</td>
        <td>{item.price} FCFA</td>
        <td>{item.quantity}</td>
        <td><motion.i whileTap={{ scale: 1.2 }} onClick={deleteProduct} class="ri-delete-bin-line"></motion.i></td>
    </tr>

    );
};

export default Cart;