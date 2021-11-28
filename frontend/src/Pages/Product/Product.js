import React, { useEffect, useState } from 'react'
import './Product.css'
import { useDispatch, useSelector } from "react-redux";
import { getProduct, clearErrors } from '../../actions/productAction';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useHistory } from 'react-router';
import Pagination from "react-js-pagination"
import Slider from "@material-ui/core/Slider"
import Typography from "@material-ui/core/Typography"
import { useAlert } from "react-alert"
import MetaData from "react-helmet"

const categories = [
    "All",
    "Laptop",
    "Footwear",
    "Mobile",
    "Clothes",
    "Camera",
    "Electronics",
]

const Product = ({ match }) => {

    const alert = useAlert();
    const history = useHistory();
    const [keyword, setkeyword] = useState("");
    const [currPage, setCurrPage] = useState(1);
    const [price, setPrice] = useState([0, 50000]);
    const [category, setCategory] = useState("");

    const { loading, error, products, productsCount, productPerPage, filteredProductCount } = useSelector(state => state.products);
    const dispatch = useDispatch();

    const searchWord = match.params.keyword;
    const setCurrPageNo = (e) => {
        setCurrPage(e);
    }

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    }
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(searchWord, currPage, price, category));
    }, [dispatch, searchWord, currPage, price, category, alert, error])

    let count = filteredProductCount;

    const HandleSearch = (e) => {
        e.preventDefault();
        setCategory("All")
        setCurrPage(1);
        if (keyword.trim()) {
            history.push(`/products/${keyword}`);
        } else {
            history.push("/products")
        }
    }

    return (
        <>
            {
                loading ? <>
                    <div className="loading">
                        <div></div></div>
                </> : <>
                    <MetaData title="ShopZone | Products"></MetaData>
                    <div className="product_topbox" style={{ zIndex: "1" }}>
                        <h2 className="productsHeading">Products</h2>
                        <form className="product_searchbar" onSubmit={HandleSearch}>
                            <input type="text" placeholder="Search products" onChange={(e) => setkeyword(e.target.value)} />
                            <button type="submit">Search</button>
                        </form>
                    </div>
                    <div className="productSection" style={{ zIndex: "1" }}>
                        <div className="filterbox">
                            <h2>Price </h2>
                            <Slider
                                value={price}
                                onChange={priceHandler}
                                min={0}
                                max={50000}
                                valueLabelDisplay="auto"
                                aria-labelledby="range slider"
                                className="slider_filterbox"
                            />
                            <Typography className="categoryHeading">Categories</Typography>
                            <ul className="categorybox">
                                {categories.map((category) => (
                                    <li className="category_link"
                                        key={category}
                                        onClick={() => {
                                            setCategory(category)
                                            if (keyword !== "") {
                                                setkeyword("")
                                                history.push("/products")
                                            }
                                            setPrice([0, 50000])
                                            setCurrPage(1);
                                        }}>
                                        {category}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="productContainer">
                            <div className="productsContainer">
                                {
                                    products && products.map((product) => (
                                        <ProductCard product={product} key={product._id} />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    {
                        productPerPage < count && <div className="pagination_box" style={{ zIndex: "1" }}>
                            <Pagination
                                activePage={currPage}
                                itemsCountPerPage={productPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="First"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>
                    }
                </>

            }
        </>
    )
}

export default Product
