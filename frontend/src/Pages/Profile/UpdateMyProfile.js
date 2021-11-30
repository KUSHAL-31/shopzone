import React, { useEffect, useState } from 'react'
import './UpdateMyProfile.css'
import { MailOutlineOutlined, Face } from "@material-ui/icons"
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, loadUser, updateProfile } from '../../actions/userActions'
import { useAlert } from 'react-alert';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstant'
import MetaData from '../MetaData'


const UpdateMyProfile = ({ history }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { user } = useSelector(state => state.user);
    const { error, loading, isUpdated } = useSelector(state => state.profile);


    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const updateProfileSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("username", username)
        myForm.set("email", email)
        dispatch(updateProfile(myForm));
    }

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setEmail(user.email);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Profile updated successfully");
            dispatch(loadUser());
            history.push("/account")
            dispatch({ type: UPDATE_PROFILE_RESET });
        }
    }, [dispatch, alert, error, history, isUpdated, user])

    return (
        <>
            {
                loading ? <> <div className="loading">
                    <div></div></div>
                </> :
                    <>
                        <MetaData title="ShopZone | Update Profile" />
                        <div className="updateProfile_container">
                            <div className="updateProfile_box">
                                <h2 className="updateProfileHeading">Update Profile</h2>
                                <form className="updateProfile_form"
                                    onSubmit={updateProfileSubmit}
                                    encType="multipart/form-data">
                                    <div className="updateProfile_username">
                                        <Face />
                                        <input type="text"
                                            placeholder="Username"
                                            required
                                            value={username}
                                            name="username"
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <div className="updateProfile_email">
                                        <MailOutlineOutlined />
                                        <input type="email" name="email"
                                            placeholder="Email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <input type="submit" value="Update" className="updateProfile_button" />
                                </form>
                            </div>
                        </div>
                    </>
            }
        </>
    )
}

export default UpdateMyProfile
