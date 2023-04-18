import React, {useState} from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import {toast} from "react-toastify";
import {db, storage} from "../firebase.config";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
    const [enterTitle, setEnterTitle] = useState(" ");
    const [enterShortDesc, setEnterShortDesc] = useState(" ");
    const [enterDescription, setEnterDescription] = useState(" ");
    const [enterCategory, setEnterCategory] = useState(" ");
    const [enterPrice, setEnterPrice] = useState(" ");
    const [enterProductImg, setEnterProductImg] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const addproduct = async(e)=>{
        e.preventDefault();
        setLoading(true);

       // const product = {
        //    title: enterTitle,
       //     shortDesc: enterShortDesc,
       //     description: enterDescription,
        //    category: enterCategory,
        //    price: enterPrice,
        //    imgURL: enterProductImg,
       // };

// ======================== Ajout des produits dans Firebase ==================================

       try {

        const docRef = await collection (db,"products");
        const storageRef = ref(storage, `productImages/${Date.now() + enterProductImg.name}`);
        const uploadTask = uploadBytesResumable(storageRef, enterProductImg);
        uploadTask.on(()=>{
           toast.error("image non téléchargée!")
        }, 
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>{
            await addDoc(docRef, {
                productName: enterTitle,
                shortDesc: enterShortDesc,
                description: enterDescription,
                category: enterCategory,
                price: enterPrice,
                imgURL: downloadURL,
            });
          });
        }
        );

        setLoading(false);
        toast.success("Nouveau produit ajouté");
        navigate("/dashboard/all-products");
       }catch (err) {
        setLoading(false);
        toast.error("Impossible d'ajouter ce produit");
       }
        //console.log("product");
    };

    return (
        <section>
          <Container>
            <Row>
                <Col lg="12">
                   {
                    loading ? (<h4 className="py-5">Loading...</h4> 
                     ) : (
                    <>
                     <h4 className="mb-5">Ajouter un nouveau produit</h4>
                    <Form onSubmit={addproduct}>
                        <FormGroup className="form__group">
                            <span>Nom du produit</span>
                            <input type="text" placeholder="Vase artisanal" value={enterTitle} onChange={e =>setEnterTitle(e.target.value)} required />
                        </FormGroup>
                        <FormGroup className="form__group">
                            <span>Description</span>
                            <input type="text" placeholder="lorem........." value={enterShortDesc} onChange={e => setEnterShortDesc(e.target.value)} required/>
                        </FormGroup>
                        <FormGroup className="form__group">
                            <span>Détails</span>
                            <input type="text" placeholder="Produits......" value={enterDescription} onChange={e =>setEnterDescription(e.target.value)} required/>
                        </FormGroup>

                        <div className="d-flex align-items-center justify-content-between gap-5">
                        <FormGroup className="form__group w-50">
                            <span>Prix</span>
                            <input type="number" placeholder="10000 FCFA" value={enterPrice} onChange={e =>setEnterPrice(e.target.value)} required/>
                        </FormGroup>

                        <FormGroup className="form__group w-50">
                            <span>Catégories</span>
                            <select className="W-100 P-2" value={enterCategory} onChange={e =>setEnterCategory(e.target.value)}>
                                <option>Selectionner la catégorie</option>
                                <option value="chaise">Chaise</option>
                                <option value="vannerie">Vanerie</option>
                                <option value="poteire">Poterie</option>
                                <option value="chaise">Chaise</option>
                            </select>
                        </FormGroup>
                        </div>
                        <div>
                        <FormGroup className="form__group">
                            <span>Image du produit</span>
                            <input type="file" onChange={e => setEnterProductImg(e.target.files[0])} required/>
                        </FormGroup>
                        </div>
                        <button className="buy__btn" type="submit">
                           Ajouter 
                        </button>
                    </Form>
                    </>
                     )
                   }
                </Col>
            </Row>
          </Container>
        </section>
    );
};

export default AddProducts;