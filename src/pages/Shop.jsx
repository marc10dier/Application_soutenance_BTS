import React, {useState} from "react";
import CommonSection from "../components/UI/commonSection";
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from "reactstrap";
import "../styles/shop.css";
import products from "../assets/data/products";
import ProductsList from "../components/UI/ProductsList";



const Shop = () => {

      const [productsData, setProductsData] = useState(products);
      
      const handleFilter = e=> {
        const filterValue = e.target.value
        if (filterValue==="chaise"){
            const filteredProducts = products.filter(item=> item.category==="chaise");
            setProductsData(filteredProducts);
        }

        if (filterValue==="peinture"){
            const filteredProducts = products.filter(item=> item.category==="peinture");
            setProductsData(filteredProducts);
        }

        if (filterValue==="poterie"){
            const filteredProducts = products.filter(item=> item.category==="poterie");
            setProductsData(filteredProducts);
        }

        if (filterValue==="vannerie"){
            const filteredProducts = products.filter(item=> item.category==="vannerie");
            setProductsData(filteredProducts);
        }

        if (filterValue==="babouche"){
            const filteredProducts = products.filter(item=> item.category==="babouche");
            setProductsData(filteredProducts);
        }

        if (filterValue==="bijoux"){
            const filteredProducts = products.filter(item=> item.category==="bijoux");
            setProductsData(filteredProducts);
        }
      };
      
      const handleSearch = e=> {
        const searchTerm = e.target.value
        const searchedProducts = products.filter(item=> item.productName.toLowerCase().includes(searchTerm.toLowerCase()));
        setProductsData(searchedProducts);
      };

    return (
       <Helmet title="shop">
         <CommonSection title="Nos produits disponible" />


         <section>
            <Container>
                <Row>
                    <Col lg="3" md="6">
                        <div className="filter__widget p-5">
                            <select onChange={handleFilter}>
                                <option>Filtrer par catégories</option>
                                <option value="chaise">Chaise</option>
                                <option value="peinture">Peinture</option>
                                <option value="poterie">Poterie</option>
                                <option value="vannerie">Vannerie</option>
                                <option value="babouche">Babouche</option>
                                <option value="bijoux">Bijoux</option>
                            </select>
                        </div>
                    </Col>

                    <Col lg="3" md="6">
                        <div className="filter__widget p-5">
                            <select>
                                <option>Trier par</option>
                                <option value="ascending">Trés coûteux</option>
                                <option value="descending">Peu coûteux</option>
                            </select>
                        </div>
                    </Col>
          
                    <Col lg="6" md="6">
                        <div className="search__box">
                           <input type="text" placeholder="Cherchez votre produit ici..." onChange={handleSearch} />
                           <span><i class="ri-search-line"></i></span>
                        </div>
                    </Col>
                </Row>
            </Container>
         </section>

         <section className="p-7">
            <Container>
                <Row>
                    {
                        productsData.length === 0 ? ( <h1 className="text-center fs-4 p-5 bg">Desolé, produit introuvable!</h1> ) : (<ProductsList data={productsData} />)
                    }
                </Row>
            </Container>
         </section>
       </Helmet>
    );
};

export default Shop;