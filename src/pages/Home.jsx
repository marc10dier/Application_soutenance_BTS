import React, {useState, useEffect} from "react";
import Helmet from "../components/Helmet/Helmet";
import {Container, Row, Col} from "reactstrap";
/*import heroImg from '../assets/images/hero-img.png';*/
import "../styles/home.css"
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Services from "../services/services";
import ProductsList from "../components/UI/ProductsList";
import products from "../assets/data/products";
/*import useGetData from "../custom-hooks/useGetData";*/

const Home = () => {

  //const {data: products, loading} = useGetData('products');


    const [trendingProducts, setTrendingProducts] = useState([]);
    const [bestSalesProducts, setBestSalesProducts] = useState([]);
    const [poteriesProducts, setPoteriesProducts] = useState([]);
    const [vanneriesProducts, setVanneriesProducts] = useState([]);
    const [babouchesProducts, setBabouchesProducts] = useState([]);
    const [bijouxProducts, setBijouxProducts] = useState([]);
    const top = () => {
      window.scrollTo(0, 0);
    };
    

    useEffect(()=>{
        const filteredTrendingProducts = products.filter(item=> item.category === "chaise");
        const filteredBestSalesProducts = products.filter(item=> item.category === "peinture");
        const filteredPoteriesProducts = products.filter(item=> item.category === "poterie");
        const filteredVanneriesProducts = products.filter(item=> item.category === "vannerie");
        const filteredBabouchesProducts = products.filter(item=> item.category === "babouche");
        const filteredBijouxProducts = products.filter(item=> item.category === "bijoux");
        setTrendingProducts(filteredTrendingProducts);
        setBestSalesProducts(filteredBestSalesProducts);
        setPoteriesProducts(filteredPoteriesProducts);
        setVanneriesProducts(filteredVanneriesProducts);
        setBabouchesProducts(filteredBabouchesProducts);
        setBijouxProducts(filteredBijouxProducts);
    }, []);
    return( 
    <Helmet title ={"Home"}>
            <section className="hero__section">
                <Container>
                    <Row>
                        <Col lg="6" md="6">
                        <div onClick={top} className="topbtn"><i class="ri-arrow-up-circle-fill"></i></div>
                            <div className="hero__content">
                            <h2>Ensemble, valorisons le Made in Cameroon!</h2>
                            <p className="text-transform-uppercase;">De manière spécifique, il s'agit de démultiplier les canaux de promotion et de commercialisation
                              des produits des artisans locaux, promouvoir le « Made in Cameroon » par la commercialisation des 
                              produits de qualité, fabriqués par des artisans locaux, valoriser l'artisanat local et accroître sa
                              notoriété auprès d'une clientèlle ciblée.</p>
                            <motion.button whileTap={{ scale: 1.2 }} className="buy__btn"><Link to="/shop">Voir</Link></motion.button>
                            </div>
                        </Col>   
                    </Row>
                </Container>
            </section>
            <Services />
           
            
                  <div className="icons">
              <ul>
                <li className="facebook"><i class="ri-facebook-circle-fill"></i></li>
                <li className="twitter"><i class="ri-twitter-line"></i></li>
                <li className="ig"><i class="ri-instagram-line"></i></li>
                <li className="what"><i class="ri-whatsapp-line"></i></li>
              </ul>

            </div>
               

            <section className="trending__products">
                   <Container>
                    <Row>
                        <Col lg="12" className="text-center p-5 ">
                          <h2 className="section__title">Produits en tendances</h2>
                        </Col>
                          <ProductsList className="" data={trendingProducts} />
                    </Row>
                   </Container>
            </section>

                 <section>
                 <Container>
                    <Row>
                        <Col lg="12" className="text-center p-5">
                          <h2 className="section__title">Meilleures Ventes</h2>
                        </Col>
                          <ProductsList className="" data={bestSalesProducts} />
                    </Row>
                   </Container>
                 </section>

                 <section>
                 <Container>
                    <Row>
                        <Col lg="12" className="text-center p-5">
                          <h2 className="section__title">Nouvel Arrivage</h2>
                        </Col>
                          <ProductsList data={poteriesProducts} />
                          <ProductsList data={vanneriesProducts} />
                    </Row>
                   </Container>
                 </section>

                 <section>
                 <Container>
                    <Row>
                        <Col lg="12" className="text-center p-5">
                          <h2 className="section__title">Top Elegance</h2>
                        </Col>
                          <ProductsList data={babouchesProducts}/>
                          <ProductsList data={bijouxProducts} />
                    </Row>
                   </Container>
                 </section>
                 
        </Helmet>
    );
};

export default Home;