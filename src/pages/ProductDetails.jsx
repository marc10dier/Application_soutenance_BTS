import React, {useState, useRef, useEffect} from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import products from "../assets/data/products";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/commonSection";
import "../styles/product-details.css";
import { motion } from "framer-motion";
import ProductsList from "../components/UI/ProductsList";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
//import { db } from "../firebase.config";
//import {doc, getDoc} from "firebase/firestore"
//import useGetData from "../custom-hooks/useGetData";

const ProductDetails = () => {
    
    //const [product, setProduct] = useState({})

    const [tab, setTab] = useState("desc");
    const reviewUser = useRef("");
    const reviewMessage = useRef("");
    const dispatch = useDispatch();
    const [rating, setRating] = useState(null);
    const {id} = useParams();

    //const {data: products} = useGetData('products')

    const product = products.find(item=> item.id === id );

   // const docRef = doc(db,'products', id)
    //useEffect(()=>{
        //const getProduct = async()=>{
            //const docSnap = await getDoc(docRef)

            //if(docSnap.exists()){
                //setProduct(docSnap.data())
           // } else{
                //console.log("pas de produit!")
            //}
        //}
        //getProduct()
   // }, []);

    const {imgUrl, 
        productName, 
        price, 
        avgRating, 
        shortDesc, 
        reviews, 
        description, 
        category} = product;
    const relatedProducts = products.filter(item=> item.category === category);
    const submitHandler = (e) =>{
     e.preventDefault();
        const reviewUserName = reviewUser.current.value;
        const reviewUserMessage = reviewMessage.current.value;
        //console.log(reviewUserName, reviewUserMessage, rating);
        const reviewObj = {
            userName: reviewUserName,
            text: reviewUserMessage,
            rating,
        };
        console.log(reviewObj);
        toast.success("Avis soumis!");
    };
    const addToCart = () =>{
        dispatch(cartActions.addItem({
            id,
            image:imgUrl,
            productName,
            price,
        }));

        toast.success("Produit ajouté dans votre panier");
    };
    useEffect(()=> {
        window.scrollTo(0, 0);
    }, [product]);

    return (
        <Helmet title={productName}>
            <CommonSection title={productName} />


            <section className="pt-0">
                <Container>
                    <Row>
                        <Col lg="6" className="p-5">
                            <img src={imgUrl} alt="" />
                        </Col>
                        <Col lg="6">
                            <div className="product__details">
                                <h2>{productName}</h2>
                                <div className="product__rating d-flex align-items-center gap-5 mb-3">
                                    <div>
                                        <span>
                                            <i class="ri-star-s-fill"></i>
                                        </span>
                                        <span>
                                            <i class="ri-star-s-fill"></i>
                                        </span>
                                        <span>
                                            <i class="ri-star-s-fill"></i>
                                        </span >
                                        <span>
                                            <i class="ri-star-s-fill"></i>
                                        </span>
                                        <span>
                                        <i class="ri-star-half-s-fill"></i>
                                        </span>
                                    </div>
                                      <p>
                                        <span>{avgRating}</span>Notation étoilée
                                        </p>
                                </div>
                                <div className="d-flex align-items-center gap-5">
                                <span className="product__price">{price}FCFA</span>
                                <span>Categories: {category.toUpperCase()} </span>
                                </div>
                                <p className="mt-3">{shortDesc}</p>
                                <motion.button whileTap={{scale: 1.2}} className="buy__btn" onClick={addToCart}>Ajouter au panier</motion.button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section>
                <Container>
                    <Row>
                        <Col lg="12">
                            <div className="tab_wrapper d-flex align-items-center gap-5">
                                <h6 className={`${tab ==="desc" ? "active__tab" : ""}`} onClick={()=> setTab("desc")}>Description du produit</h6>
                                <h6 className={`${tab ==="rev" ? "active__tab" : ""}`} onClick={()=> setTab("rev")}>Commentaires ({reviews.length})</h6>
                            </div>
                            {
                                tab ==="desc" ? ( <div className="tab__content mt-5">
                                <p>{description}</p>
                                </div>
                                ) : (
                                    <div className="product__review mt-5">
                                        <div className="review__wrapper">
                                            
                                         <ul>
                                            {reviews?. map((item, index) => 
                                            (
                                                    <li kew={index} className="mb-4">
                                                        <h6>Marc Didier</h6>
                                                        <span>{item.rating} (notation)</span>
                                                    <p>{item.text} </p>
                                                    </li>
                                                ))}
                                         </ul>

                                         <div className="review_form">
                                            <h4>Déposez votre suggestion</h4>
                                            <form action="" onSubmit={submitHandler}> 
                                                <div className="form__group">
                                                    <input type="text" placeholder="Entrer votre nom" ref={reviewUser} />
                                                </div>

                                                <div className="form__group d-flex align-items-center gap-5 rating__group">
                                                    <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(1)}>1<i class="ri-star-s-fill"></i></motion.span>
                                                    <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(2)}>2<i class="ri-star-s-fill"></i></motion.span>
                                                    <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(3)}>3<i class="ri-star-s-fill"></i></motion.span>
                                                    <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(4)}>4<i class="ri-star-s-fill"></i></motion.span>
                                                    <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(5)}>5<i class="ri-star-s-fill"></i></motion.span>
                                                </div>

                                                <div className="form__group">
                                                    <textarea rows={4} type="text" placeholder="Ecrire un commentaire..." ref={reviewMessage} />
                                                </div>
                                                <motion.button whileTap={{ scale: 1.2 }} type="submit" className="buy__btn">Envoyer</motion.button>
                                            </form>

                                         </div>
                                    </div>
                                    </div>
                                )
                            }
                            
                        </Col>
                        <Col lg="12" className="mt-5">
                            <h2 className="related__title p-5">Vous pourriez aussi aimer ceci</h2>
                        </Col>
                        <ProductsList data={relatedProducts} />
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default ProductDetails;