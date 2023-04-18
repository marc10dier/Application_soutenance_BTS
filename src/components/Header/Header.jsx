import React, {useRef, useEffect} from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {Container, Row} from "reactstrap";
import "./header.css";
import { motion } from "framer-motion";
import logo from "../../assets/images/abeng.png";
import userIcon from "../../assets/images/user-icon.png";
import { useSelector } from "react-redux";
import useAuth from "../../custom-hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import {toast} from "react-toastify";

const nav__links = [
    {
        path:'home',
        display:'Accueil'
    },
    {
        path:'cart',
        display:'Panier'
    },
    {
        path:'shop',
        display:'Collection'
    },
    {
        path:'about',
        display:'A propos'
    },
];

const Header = () => {

    const headerRef = useRef(null);
    const totalQuantity = useSelector(state=> state.cart.totalQuantity);
    const profileActionRef = useRef(null);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const stickyHeaderFunc = ()=>{
        window.addEventListener("scroll", ()=>{
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
                headerRef.current.classList.add("sticky__header");
            }else{
                headerRef.current.classList.remove("sticky__header");
            } 
        });
    };

   const logout = ()=> {
        signOut(auth).then(()=>{
            toast.success("Déconnecté");
            navigate("/home");
        }).catch(err=>{
            toast.error(err.message);
        });
    };


    useEffect(()=>{
            stickyHeaderFunc();
            return () => window.removeEventListener("scroll", stickyHeaderFunc);
    });

    const menuToggle = ()=> menuRef.current.classList.toggle('active__menu');

    const navigateToCart =()=>{
        navigate("/cart");
    };

    const toggleProfileActions = ()=> profileActionRef.current.classList.toggle("show__profileActions");

    return ( 
    <header className="header" ref={headerRef}>
    <Container>
    <Row>
        <div className="nav__wrapper">
            <div className="logo">
                <img src={logo} alt="logo"/>
                <div>
                    <h1>ABENG-</h1>
                </div>
            </div>

            <div className="navigation" ref={menuRef} onClick={menuToggle}>
            <motion.ul WhileTap={{ scale: 1.2 }} className="menu">
              {nav__links.map((item, index) => (
                    <li className="nav__item" key={index}>
                        <NavLink to={item.path} className={(navClass)=> navClass.isActive ? "nav__active" : ""} >{item.display}</NavLink>
                    </li>
                ))}
            </motion.ul>
            </div>

            <div className="nav__icons">
                <span className="fav__icon">
                <i class="ri-heart-line"></i>
                <span className="badge">1</span>
                </span>
              <span className="cart__icon" onClick={navigateToCart}>
              <i class="ri-shopping-bag-2-line"></i>
              <span className="badge">{totalQuantity}</span>
              </span>

             <div className="profile">
             <motion.img 
             WhileTap={{ scale: 1.2 }} 
             src={currentUser ? currentUser.photoURL : userIcon} 
             alt="profile" 
             onClick={toggleProfileActions}
             />
             <div className="profile__actions" ref={profileActionRef} onClick={toggleProfileActions}>
                 {currentUser ? (
                    <span onClick={logout}>Se déconnecter</span>
                    ) : ( 
                    <div className="d-flex align-items-center justify-content-center flex-column">
                     <Link to="/signup">s'incrire</Link>
                     <Link to="/login">se connecter</Link>
                    </div>
                    
                 )}
             </div>
             </div>
            

            <div className="mobile__menu">
                <span onClick={menuToggle}>
                <i class="ri-menu-line"></i>
                </span>
            </div>
            
            </div>
                
        </div>
    </Row>    
    </Container>
    </header>
 );
};

export default Header;