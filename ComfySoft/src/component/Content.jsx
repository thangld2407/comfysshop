import React, { memo, useContext, useEffect, useState } from 'react';
import { AppContext } from '../Context';
import ReactPaginate from 'react-paginate';
import { FaBars, FaMicrosoft } from 'react-icons/fa';
import { BsCheck } from 'react-icons/bs'
const Content = memo(() => {
    const [showColumn, setShowColumn] = useState(false);
    const { filter,price, setFilter, products, colors, category, company, setPageNumber, productsPerpage, pagesVisited,
        pageCount, addToCart, handleChangeShort, searchProduct, filterAllColor, clearFilter } = useContext(AppContext);
    const [activeCate, setActviceCate] = useState(false);
    const [cateItem, setCateItem] = useState(null);
    const [colorItem, setColorItem] = useState(null);
    const [activeColor, setActviceColor] = useState(false);
    const displayProducts = products
        ?.slice(pagesVisited, pagesVisited + productsPerpage)
        ?.map((item, index) => {
            return (
                <>
                    {
                        showColumn ?
                            <div key={index} className="col-4">
                                < div className='product-item'>
                                    <img src={item.image} height='175px' className='rounded-2' width='100%' alt="" />
                                    <div className='d-flex justify-content-between align-item-center mt-3'>
                                        <span className='text-capitalize fs-6 fw-bold'>{item.name}</span>
                                        <span style={{ color: '#ab7a5f' }}>${item.price}</span>
                                    </div>
                                    <button className='btn btn-addCart-row w-100 px-1 py-1 mb-2' onClick={() => addToCart(item)}>Add to cart</button>
                                </div>
                            </div > :
                            <div className='row gy-3'>
                                <div className='col-4'>
                                    <img src={item.image} height='175px' width='100%' className='rounded-2' alt="" />
                                </div>
                                <div key={item.id} className="col-8">
                                    <div className='product-item'>
                                        <div className='d-flex flex-column align-item-center mt-3'>
                                            <span className='text-capitalize fs-5 fw-bold mb-2'>{item.name}</span>
                                            <span className='mb-2' style={{ color: '#ab7a5f' }}>${item.price}</span>
                                            <p className='three-line-paragraph mb-3'>{item.description}</p>
                                            <div className='d-flex'>
                                                <button className='btn btn-detail '>Details</button>
                                                <button className='btn btn-addCart-column mx-3 ' onClick={() => addToCart(item)}>Add to cart</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                </>
            );
        });
    useEffect(() => {
        console.log(products.length);
    }, [products])
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    const takeCategory = (item) => {
        setCateItem(item);
        if (item === 'all') {
            console.log(1);
            setFilter({ ...filter, category: '' })
            setActviceCate(true);
        } else {
            setFilter({ ...filter, category: item })
            setActviceCate(true)
        }
    }
    const takeCompany = (e) => {
        if (e.target.value === 'all') {
            setFilter({ ...filter, company: '' })
        } else {
            setFilter({ ...filter, company: e.target.value })
        }
    }
    const takeColor = (item) => {
        setColorItem(item)
        setFilter({ ...filter, colors: item })
        setActviceColor(true);
    }
    const takeAllColor = (e) => {

        const a = e.target;
        const id = a.id;
        setColorItem(id);
        setFilter({ ...filter, colors: '' })
        setActviceColor(true)
    }
    const handleDisplayRow = () => {
        setShowColumn(true);
    }
    const handleDisplayColumn = () => {
        setShowColumn(false)
    }
    useEffect(() => {

    }, [])
    return <div className='container content my-3'>
        <div className='row'>
            <div className="col-3">
                <input type="text" placeholder='search...' onChange={searchProduct} className='rounded search-input mb-3' />
                <h5 className='mb-3' >Category</h5>
                <ul className='mb-3 px-0 right-active' >
                    {category && category.map((item, index) => {
                        console.log(item);
                        return (
                            <li key={index} className="">
                                <button onClick={() => takeCategory(item)}
                                    style={{ background: 'white' }} className={activeCate && cateItem === item ?
                                        'active text-decoration-none text-end  px-0' : 'null text-decoration-none text-end border-0 px-0 '} >
                                    {item}</button>
                            </li>
                        )
                    })}
                </ul>
                <h5 className='mb-3' >Company</h5>
                <select className='mb-3' className="text-capitalize" name="company" id="company" onChange={takeCompany}>
                    {company && company.map((item, index) => {
                        return (
                            <option value={item} key={index}>{item}</option>

                        )
                    })}
                </select>
                <h5 className='mb-3' >Colors</h5>
                <ul className='nav d-flex mb-3 align-items-center'>
                    <li className='nav-item'><a className={activeColor && colorItem === 'all' ? 'nav-link p-0 me-1 text-dark activeAll' : 'nav-link p-0 me-1 text-dark '} onClick={takeAllColor}><span id='all' className=''>All</span></a></li>
                    {colors.map((item, index) => {
                        return (
                            <li key={index} className='nav-item'><button style={{ backgroundColor: `${item}` }} onClick={() => takeColor(item)} className='circle-color nav-link px-0 mx-1'> <BsCheck className={activeColor && colorItem === item ? "d-block text-white" : "d-none"} /></button></li>
                        )
                    })}
                </ul>
                <div className='form-control border-0 shipping px-0'>
                    <input type="checkbox" name='shipping' id='shipping' onChange={(e) => setFilter({ ...filter, isShipping: e.target.checked })} />
                    <label className='mx-1' htmlFor="">Free shipping</label>
                </div>
                <div className='form-control price border-0 px-0'>
                    <input type="range" min='0' max='309999' onChange={(e) => setFilter({ ...filter, price: e.target.value })} /> <br />
                    <label htmlFor="">${filter.price}</label>
                </div>
                <button onClick={() => clearFilter()} className='btn btn-filter'>Clear fillter</button>
            </div>
            <div className="col-9">
                <div className='row gx-4 gy-5'>
                    <div className='d-flex align-items-center'>
                        <div>
                            <button onClick={handleDisplayRow} className={showColumn ? 'btn border-1 border-dark mx-1 bg-dark text-white' : "btn border-1 border-dark mx-1"}><FaMicrosoft /></button>
                            <button onClick={handleDisplayColumn} className={showColumn ? 'btn border-1 border-dark mx-1' : "btn border-1 border-dark mx-1 bg-dark text-white"}><FaBars /></button>
                        </div>
                        <p className='text-capitalize mb-0 mx-3'>{products?.length} Products found</p>
                        <hr />
                        <label htmlFor="">Sort By</label>
                        <select className='ms-1' name="" id="" onChange={handleChangeShort}>
                            <option value="Price (lowest)">Price (lowest)</option>
                            <option value="Price (Highest)">Price (Highest)</option>
                            <option value="Name (A-Z)">Name (A-Z)</option>
                            <option value="Name (Z-A)">Name (Z-A)</option>
                        </select>
                    </div>
                    {displayProducts}

                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                    />
                </div>
            </div>

        </div>
    </div>;
});

export default Content;
