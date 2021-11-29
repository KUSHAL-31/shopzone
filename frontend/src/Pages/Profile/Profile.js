import React, { useEffect } from 'react'
import MetaData from '../MetaData'
import { Link, useHistory } from 'react-router-dom'
import './Profile.css'
import { useDispatch, useSelector } from 'react-redux'

const Profile = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const { loading, authUser, user } = useSelector(state => state.user)

    useEffect(() => {
        if (authUser === false) {
            history.push("/login");
        }
    }, [dispatch, history, authUser, loading])

    return (
        <>
            {loading ? <>
                <div className="loading">
                    <div></div></div>
            </> : <>
                <MetaData title={`ShopZone | Your Profile`} />
                <div className="profile_container">
                    <div>
                        <h1>My Profile</h1>
                        <img src={user.avatar.url ? user.avatar.url : "publicDefaultProfile.jpg"} alt="Users avatar" />
                        <Link to="/me/update">Edit Profile</Link>
                    </div>
                    <div>
                        <div>
                            <h4>Full Name</h4>
                            <p>{user.username}</p>
                        </div>
                        <div>
                            <h4>Your Email</h4>
                            <p>{user.email}</p>
                        </div>
                        <div>
                            <h4>Joined on</h4>
                            <p>{String(user.createdAt ? user.createdAt : "NA").substr(0, 10)}</p>
                        </div>
                        <div>
                            <Link to="/orders">My Orders</Link>
                            <Link to="/changePassword">Change Password</Link>
                        </div>
                    </div>
                </div>
            </>}
        </>
    )
}

export default Profile
