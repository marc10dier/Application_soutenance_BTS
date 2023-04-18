import React from "react";
import {Container, Row, Col} from "reactstrap";
import useGetData from "../custom-hooks/useGetData";
import { db } from "../firebase.config";
import { doc, deleteDoc } from "firebase/firestore";
import {toast} from "react-toastify";

const AllProducts = () => {
    const {data:productsData, loading} = useGetData("products");
    const deleteProduct = async(id)=>{
        await deleteDoc(doc(db,"product", id));
        toast.success("Produit supprimé");
    };


    return (
        <Container>
         <Row>
            <Col lg="12">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Titre</th>
                            <th>Catégorie</th>
                            <th>Prix</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                        loading ? (<h4 className="py5 text-center fw-bold">Loading...</h4> 
                        ) :  (
                            productsData.map(item=>(
                                <tr key={item.id}>
                            <td><img src={item.imgURL} alt="" /></td>
                            <td>{item.title}</td>
                            <td>{item.category}</td>
                            <td>{item.price} FCFA</td>
                            <td><button onClick={()=>{deleteProduct(item.id);}} className="btn btn-danger">Supprimer</button></td>
                        </tr>
                            ))
                        )
                       }
                    </tbody>
                </table>
            </Col>
         </Row>
        </Container>
    );
};

export default AllProducts;