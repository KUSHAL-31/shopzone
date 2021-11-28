import React, { useEffect } from 'react'
import './UsersList.css'
import { Link } from 'react-router-dom'
import { DataGrid } from '@material-ui/data-grid'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { getAllUsers, clearErrors, deleteUser } from '../../../actions/userActions'
import MetaData from '../../../Pages/MetaData'
import SideBar from '../SideBar/SideBar'
import { Button } from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'
import { DELETE_USER_RESET } from '../../../constants/userConstant'


const UsersList = ({ history }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, users } = useSelector(state => state.allUsers);
    const { error: deleteError, isDeleted, message } = useSelector(state => state.profile);

    const handleDeleteUser = (id) => {
        dispatch(deleteUser(id));
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
            alert.success(message);
            history.push("/admin/users")
            dispatch({ type: DELETE_USER_RESET });
        }

        dispatch(getAllUsers());
    }, [dispatch, error, alert, deleteError, isDeleted, history, message]);

    const columns = [
        {
            field: "id",
            headerName: "User ID",
            minWidth: 250,
            flex: 0.7,
        },

        {
            field: "email",
            headerName: "Email",
            minWidth: 210,
            flex: 0.55,
        },
        {
            field: "username",
            headerName: "Username",
            minWidth: 160,
            flex: 0.45,
        },

        {
            field: "role",
            headerName: "Role",
            type: "number",
            minWidth: 100,
            flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "role") === "admin"
                    ? "stockGreenColor"
                    : "stockRedColor";
            },
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
                        <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                            <Edit />
                        </Link>
                        <Button onClick={() => handleDeleteUser(params.getValue(params.id, "id"))}>
                            <Delete />
                        </Button>
                    </>
                )
            }
        },
    ];

    const rows = [];

    users && users.forEach((item) => {
        rows.push({
            id: item._id,
            role: item.role,
            email: item.email,
            username: item.username,
        })
    });

    return (
        <>
            <MetaData title="ShopZone | All Users" />
            <div className="dashboard">
                <SideBar />
                <div className="product_list_container">
                    <h1 id="product_list_heading">All ShopZone Users</h1>
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

export default UsersList
