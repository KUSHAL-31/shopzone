import React, { useEffect } from 'react'
import SlideShow from '../../components/SlideShow/SlideShow'
import ProductCard from '../../components/ProductCard/ProductCard'
import './Home.css'
import MetaData from '../MetaData'
import { clearErrors, getProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from 'react-alert'

const Home = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, products } = useSelector(state => state.products);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch, error, alert])

    return (
        <>
            {loading ?
                <> <div className="loading">
                    <div></div></div>
                </> : <>
                    <MetaData title="ShopZone" />
                    <SlideShow />
                    <h2 className="home_heading" style={{ zIndex: "1" }}>Featured Products</h2>
                    <div className="featured_container" style={{ zIndex: "1" }}>
                        {
                            products && products.map(product => (
                                <ProductCard product={product} key={product._id} />
                            ))
                        }
                    </div>
                </>
            }
        </>
    )
}

export default Home

