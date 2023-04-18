import React, {useState} from "react";
import Helmet from "../components/Helmet/Helmet";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import "../styles/signup.css";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { auth } from "../firebase.config";
import { storage } from "../firebase.config";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import CommonSection from "../components/UI/commonSection";



const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const signup = async(e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            //console.log(userCredential);
            const user = await userCredential.user;

            const storageRef = ref(storage, `images/${ Date.now() + username}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on((error)=>{
                toast.error(error.message)
            }, 
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>
                {
                //update profile
                await updateProfile(user,{
                    displayName: username,
                    photoURL: downloadURL,
                });
                // stockage des informations dans firestore
                await setDoc(doc(db, 'utilisateurs', user.uid), {
                    uid: user.uid,
                    displayName: username,
                    email,
                    photoURL: downloadURL,
                })
            })
        })
            
            setLoading(false);
            toast.success("Félicitations, vous venez de créer votre compte!");
            navigate("/login")

        } catch (error) {
            //console.log(error)
            setLoading(false);
            toast.error("Identifiants incorrect");
            

        }
    };

    return (
        <Helmet title="S'incrire">
            <CommonSection title="Créer compte" />
            <Container>
                <Row>
                    {
                        loading ? ( <Col lg="12" className="text-center"><h5 className="fw-bold">Loading....</h5></Col> ) : (
                    
                    <Col lg="6" className="m-auto text-center">
                        <h3 className="fw-bold mb-4 p-5">Inscrivez-vous</h3>

                        <Form className="auth__form" onSubmit={signup}>
                        <FormGroup className="form__group">
                              <input type="text" placeholder="Entrez votre nom d'utilisateur " value={username} onChange={e=> setUsername(e.target.value)} />
                            </FormGroup>

                            <FormGroup className="form__group">
                              <input type="email" placeholder="Entrez votre adresse email " value={email} onChange={e=> setEmail(e.target.value)} />
                            </FormGroup>

                            <FormGroup className="form__group">
                              <input type="password" placeholder="Entrez votre mot de passe " value={password} onChange={e=> setPassword(e.target.value)}/>
                            </FormGroup>

                            <FormGroup className="form__group">
                              <input type="file" onChange={e=> setFile(e.target.files[0])}/>
                            </FormGroup>
                            <button type="submit" className="buy__btn auth__btn">Créer un compte</button>
                            <p>Vous avez déjà un compte?<Link to="/login">Connectez-vous!</Link></p>
                        </Form>
                    </Col> 
                        )
                    }
                </Row>
            </Container>

        </Helmet>
    );
} 

export default Signup;