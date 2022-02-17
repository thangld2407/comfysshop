import React, { useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../component/Header';
import { AppContext } from '../Context';
import { FiPlus } from 'react-icons/fi';
import { IoMdRemove } from 'react-icons/io'
import { MdOutlineDeleteOutline } from 'react-icons/md';
import Title from '../component/Title';
import Footer from '../component/Footer';
const Cart = () => {
    const { cart, setCart, addToCart, handleRemove, handleDeleteProduct, totalPrice } = useContext(AppContext);
    const location = useLocation()
    console.log(location);
    const navigate = useNavigate();
    console.log("price", totalPrice);
    const total = (prev, nev) => {
        return prev + nev;
    }
    const clearCart = () => {
        setCart([]);
    }
    const noProducts = () => {
        return (
            <div className='text-center mt-5'>
                <h2>Your cart is empty</h2>
                <Link to='/products' className='btn btn-return'>fill it</Link>
            </div>
        )
    }
    const ProductItem = cart.map((item, index) => {
        return (
            <tr key={index} style={{ height: '100px' }}>
                <th className='text-start'>
                    <div className='d-flex align-items-center'>
                        <img src={item.image} width='100px' height='75px' className='rounded-1' alt={item.name} />
                        <div className='mx-2'>
                            <h5>{item.name}</h5>
                            <p className='fw-normal d-flex align-items-center'>Color:
                                {item.colors.map((colors, i) => {
                                    return (
                                        <div key={i} className="colors-cart mx-1" style={{ background: `${colors}` }}>

                                        </div>
                                    )
                                })}
                            </p>

                        </div>
                    </div>
                </th>
                <th >
                    <h5 style={{ color: "#ab7a5f" }} className='text-normal fs-6'>${item.price}</h5>
                </th>
                <th >
                    <div className='d-flex align-items-center justify-content-center'>
                        <button onClick={() => addToCart(item)} className='border-0 bg-light'><FiPlus /></button>
                        <h5 className='mb-0'>{item.quanity}</h5>
                        <button onClick={() => handleRemove(item)} className='border-0 bg-light'><IoMdRemove /></button>
                    </div>

                </th>
                <th >
                    <h5 className='text-normal fs-6'>${item.total}</h5>
                </th>
                <th>
                    <button className='d-flex align-items-center p-1 border-0 bg-danger rounded-1' onClick={() => handleDeleteProduct(item)}><MdOutlineDeleteOutline className='fs-5 text-white' /></button>
                </th>
            </tr>
        )
    })

    return (
        <div className='cart '>
            <Header />
            <Title location={location.pathname} />
            <div className='container mt-3'>
                {cart.length === 0 ? noProducts() : <>
                    <table className='w-100 text-center'>
                        <thead className='border-bottom-0 '>
                            <tr>
                                <td className='text-start'>
                                    <h5>Item</h5>
                                </td>
                                <td>
                                    <h5>Price</h5>
                                </td>
                                <td>
                                    <h5>Quantity</h5>
                                </td>
                                <td>
                                    <h5>Subtotal</h5>
                                </td>
                                <td></td>

                            </tr>
                        </thead>
                        <tbody className='border-bottom-1'>
                            {ProductItem}
                        </tbody>
                    </table>
                    <div className='d-flex justify-content-between align-items-center my-3'>
                        <button onClick={() => navigate(-1)} className='btn btn-continue text-white'>continue shopping</button>
                        <button onClick={clearCart} className='btn btn-clear text-white'>clear shopping cart</button>
                    </div>
                    <div className='ms-auto text-center' style={{ width: "max-content" }}>
                        <div className='rounded-2 total-price d-flex  align-items-center'>
                            <p className='fw-bold fs-6 mb-0'>Order Total:</p>
                            <span className='mx-4 fs-6'>${totalPrice.reduce(total)}</span>
                        </div>
                        <button className='btn btn-chekout mt-3 text-white rounded-2 fs-6'>Checkout</button>
                    </div>

                </>}
            </div>
            <Footer/>

        </div>
    )
};

export default Cart;
