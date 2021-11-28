import React, { useEffect } from 'react'
import './ProductList.css'
import { Link } from 'react-router-dom'
import { DataGrid } from '@material-ui/data-grid'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { clearErrors, getAllProductsforAdmin, deleteProduct } from '../../../actions/productAction'
import MetaData from '../../../Pages/MetaData'
import SideBar from '../SideBar/SideBar'
import { Button } from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'
import { DELETE_PRODUCT_RESET } from '../../../constants/productConstant'


const ProductList = ({ history }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, products } = useSelector(state => state.products);
    const { error: deleteError, isDeleted } = useSelector(state => state.product);

    const handleDeleteProduct = (id) => {
        dispatch(deleteProduct(id));
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("Product deleted successfully");
            history.push("/admin/dashboard")
            dispatch({ type: DELETE_PRODUCT_RESET });
        }

        dispatch(getAllProductsforAdmin());
    }, [dispatch, error, alert, deleteError, isDeleted, history]);

    const columns = [
        {
            field: "id",
            headerName: "Product ID",
            minWidth: 300,
            flex: 0.7,
        },

        {
            field: "name",
            headerName: "Name",
            minWidth: 250,
            flex: 0.6,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 210,
            flex: 0.4,
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                            <Edit />
                        </Link>
                        <Button onClick={() => handleDeleteProduct(params.getValue(params.id, "id"))}>
                            <Delete />
                        </Button>
                    </>
                )
            }
        },
    ];

    const rows = [];

    products && products.forEach((item) => {
        rows.push({
            id: item._id,
            stock: item.stock,
            price: item.price,
            name: item.name,
        })
    });

    return (
        <>
            <MetaData title="ShopZone (Admin All Products)" />
            <div className="dashboard">
                <SideBar />
                <div className="product_list_container">
                    <h1 id="product_list_heading">All Products</h1>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="product_list_table"
                        autoHeight
                    />
                </div>
            </div>
        </>
    )
}

export default ProductList
