import React from 'react';
import { useLocation } from 'react-router-dom';
import Content from '../component/Content';
import Footer from '../component/Footer';
import Header from '../component/Header';
import Title from '../component/Title';

const Products = () => {
    const location = useLocation()
    return (
        <>
            <Header />
            <Title location={location.pathname}/>
            <Content />;
            <Footer/>
        </>
    )

};

export default Products;
