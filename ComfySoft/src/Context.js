import React, { useEffect, useState } from 'react';
import { createContext } from "react";
import { toast } from 'react-toastify';
import { mockData } from './data';
export const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState(null)
  const [price, setPrice] = useState(null)
  const [company, setCompany] = useState(null)
  const [filter, setFilter] = useState({
    category: '',
    company: "",
    colors: '',
    isShipping: false,
    price: 0
  })
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  const [colors, setColors] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerpage = 6;
  const pagesVisited = pageNumber * productsPerpage;
  const pageCount = Math.ceil(products?.length / productsPerpage);

  const getAllProduct = async () => {
    try {
      setProducts(mockData);
    } catch (error) {
      console.log("🚀 ~ file: Context.js ~ line 31 ~ getAllProduct ~ error", error)
    }
  }
  const getCategory = async () => {
    const dataCategory = [... new Set(mockData.map(item => item.category))]
    const cate = dataCategory.unshift('all')
    console.log(cate);
    setCategory(dataCategory)
  }
  const getCompany = () => {
    const dataCompany = [... new Set(mockData.map(item => item.company))];
    const cate = dataCompany.unshift('all')
    console.log(cate);
    setCompany(dataCompany)
  }
  const getColor = async () => {
    const arrColor = mockData.map(item => item.colors);
    const dataColor = [... new Set(arrColor.flat(Infinity))];
    console.log(dataColor);
    setColors(dataColor);
  }
  const getPriceMaxLength = () => {
    const price = [... new Set(mockData.map(item => item.price))];
    const priceMaxLength = Math.max.apply(Math, price)
    setPrice(priceMaxLength);
  }
  const filterAllColor = () => {
    setProducts(mockData);
  }
  const filterProduct = () => {
    const setFilterProduct = [];
    mockData.forEach(item => {
      let count = 0;
      if (filter.category === item.category || !filter.category) {
        count++;
      }
      if (filter.company === item.company || !filter.company) {
        count++;
      }
      if (item.colors.includes(filter.colors) || !filter.colors) {
        count++;
      }
      if (filter.price >= item.price || !filter.price) {
        count++;
      }
      if (filter.isShipping === item.shipping || !filter.isShipping) {
        count++;
      }
      if (count === 5) {
        setFilterProduct.push(item)
      }
    })
    setProducts(setFilterProduct);

  }
  useEffect(() => {
    filterProduct();
    console.log(filter)
  }, [filter])
  const addToCart = (item) => {
    console.log(item);

    try {
      const ProductExist = cart.find(data => data.id === item.id);
      if (ProductExist) {
        const totalP = (ProductExist.quanity + 1) * ProductExist.price
        setCart(prev => prev.map(data => data.id == item.id ? { ...data, quanity: data.quanity + 1, total: totalP } : data))
      }
      else {
        setCart([...cart, { ...item, quanity: 1, total: item.price }])
        toast.success("them vao thanh cong")
      }
    } catch (error) {
      toast.error("Thêm giỏ hàng thất bại");
      console.log(error);
    }


  }
  const handleRemove = (item) => {
    if (item.quanity < 2) {
      setCart(prev => prev.filter(data => data.id !== item.id))
    } else {
      const ProductExist = cart.find(data => data.id === item.id);
      const totalP = (ProductExist.quanity - 1) * ProductExist.price
      setCart(prev => prev.map(data => data.id === item.id ? { ...data, quanity: data.quanity - 1, total: totalP } : data))
    }
  }
  const handleChangeShort = e => {
    const sort = e.target.value;
    if (sort === "Price (lowest)") {
      products.sort((a, b) => {
        if (a.price < b.price) return -1;
        if (a.price > b.price) return 1;
        return 0;
      });
      setProducts(prevState => [...prevState]);
    }
    if (sort === "Price (Highest)") {
      products.sort((a, b) => {
        if (a.price < b.price) return 1;
        if (a.price > b.price) return -1;
        return 0;
      });
      setProducts(prevState => [...prevState]);
    }
    if (sort === "Name (Z-A)") {
      products.sort((a, b) => {
        if (a.name < b.name) return 1;
        if (a.name > b.name) return -1;
        return 0;
      });
      setProducts(prevState => [...prevState]);
    }
    if (sort === "Name (A-Z)") {
      products.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      setProducts(prevState => [...prevState]);
    }
  }
  const handleDeleteProduct = (item) => {
    setCart(prev => prev.filter(data => data.id !== item.id))
  }
  const handleCheckout = () => {
    const price = [... new Set(cart.map(item => item.total))]
    console.log(price);
    setTotalPrice(price);
  }
  const searchProduct = (e) => {
    const input = e?.target.value
    const resultSearch = mockData?.filter(item => {
      return item.name.includes(input.trim())
    })
    console.log(resultSearch);
    setProducts(resultSearch)
  }
  const clearFilter = () => {
    setFilter({
      category: '',
      company: "",
      colors: '',
      isShipping: false,
      price: 0
    })
  }
  useEffect(() => {
    handleCheckout();
    console.log(cart);
  }, [cart])
  useEffect(() => {
    getAllProduct();
    getCategory();
    getCompany();
    getColor();
    getPriceMaxLength();
  }, [])
  return (
    <AppContext.Provider
      value=
      {{ filter, setFilter, price, products, category, company, cart, setCart, colors, totalPrice, pageNumber, setPageNumber, handleChangeShort, productsPerpage, pagesVisited, pageCount, addToCart, handleRemove, handleDeleteProduct, searchProduct, filterAllColor, clearFilter }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
