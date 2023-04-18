import React from 'react';
import { motion } from 'framer-motion';
import "../../styles/product-card.css";
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { cartActions } from '../../redux/slices/cartSlice';
import { toast } from 'react-toastify';

const ProductCard = ({item}) => {
    const dispatch = useDispatch();
    const addToCart =()=>{
       dispatch(cartActions.addItem({
        id: item.id,
        productName: item.poductName,
        price: item.price,
        imgUrl: item.imgUrl,
       })
       );
       toast.success("Produit ajouté dans le panier");
    }
    return (
        <Col lg="3" md="4" className="mb-3">
    <div className="product__item">
        <div className="product__img">
            <motion.img whileHover={{ scale: 0.9 }} src={item.imgUrl} alt="" />
        </div>
        <div className="p-10 product__info">
        <h3 className="product__name"><Link to={`/shop/${item.id}`} >{item.productName} </Link></h3>
        <span>{item.category}</span>
        </div>
        <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
            <motion.span whileTap={{ scale: 1.3 }}><i class="ri-thumb-up-fill"></i></motion.span>
            <span className="price fs-italic">{item.price} FCFA</span> 
            <motion.span whileTap={{ scale: 1.3 }} onClick={addToCart}><i class="ri-shopping-cart-fill"></i></motion.span>
        </div>

    </div>
    </Col>
    );
};

export default ProductCard;