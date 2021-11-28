import React, { useState, useEffect } from 'react'
import './UpdateUser.css'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { clearErrors, getUserDetails, updateUser } from '../../../actions/userActions'
import MetaData from '../../../Pages/MetaData'
import Sidebar from '../SideBar/SideBar'
import { UPDATE_USER_RESET } from '../../../constants/userConstant'
import { MailOutline, Person, VerifiedUser } from '@material-ui/icons'
import { Button } from '@material-ui/core'

const UpdateUser = ({ history, match }) => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading: updateLoading, error: updateError, isUpdated } = useSelector(state => state.profile);
    const { loading, error, user } = useSelector(state => state.userDetails);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState(0);
    const [role, setRole] = useState("");

    const userId = match.params.id;

    useEffect(() => {

        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId));
        } else {
            setUsername(user.username);
            setEmail(user.email);
            setRole(user.role);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Product Updated Successfully");
            history.push("/admin/users");
            dispatch({ type: UPDATE_USER_RESET });
        }
    }, [dispatch, alert, error, history, isUpdated, updateError, user, userId]);

    const updateUserHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("username", username);
        myForm.set("email", email);
        myForm.set("role", role);
        dispatch(updateUser(userId, myForm));
    };

    return (
        <>
            <MetaData title="ShopZone | Update User" />
            <div className="dashboard">
                <Sidebar />
                <div className="new_product_container">
                    {
                        loading ? <div className="loading">
                            <div></div>
                        </div> :
                            <form
                                className="createProductForm updateUserForm"
                                onSubmit={updateUserHandler}
                            >
                                <h1>Update User</h1>

                                <div>
                                    <Person />
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <MailOutline />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>


                                <div>
                                    <VerifiedUser />
                                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                                        <option value="">Choose Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                </div>

                                <Button
                                    id="createProductBtn"
                                    type="submit"
                                    disabled={updateLoading ? true : false || role === "" ? true : false}
                                >
                                    Update
                                </Button>
                            </form>
                    }
                </div>
            </div>
        </>
    )
}

export default UpdateUser
