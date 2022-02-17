import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.svg'
import { AppContext } from '../Context';
const Header = () => {
    const { cart } = useContext(AppContext);
    return (
        <header className='d-flex align-items-center justify-content-around '>
            <div className='header__logo'>
                <img src={logo} alt="comfy soft" />
            </div>
            <div className='header__menu'>
                <ul className='d-flex ps-0 nav'>
                    <li className='nav-item mx-2'><a href="#" className='d-block  nav-link text-decoration-none text-dark'>Home</a></li>
                    <li className='nav-item mx-2'><a href="#" className='d-block  nav-link text-decoration-none text-dark'>About</a></li>
                    <li className='nav-item mx-2'>
                        <Link to='/products' className='d-block  nav-link text-decoration-none text-dark'>Product</Link>
                    </li>
                </ul>
            </div>
            <div className='header__cart d-flex'>
                <div className='cart me-3'>
                    <Link to='/cart' className='d-flex text-decoration-none fs-5 text-dark'>Cart
                        <span className='cart-container mx-1 position-relative'>
                            <span className='cart-value position-absolute text-white'>{cart?.length}</span>
                            <i className="fas fa-shopping-cart "></i>
                        </span>
                    </Link>
                </div>
                <div className='user ms-3'>
                    <a href="#" className='text-dark fs-5 text-decoration-none'> Login
                        <i className="fas fa-user-plus ms-2"></i></a>
                </div>
            </div>
        </header>
    )
};

export default Header;
