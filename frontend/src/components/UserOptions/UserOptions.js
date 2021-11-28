import React, { useState } from 'react';
import './UserOptions.css';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import { Dashboard, Person, ExitToApp, ListAlt } from "@material-ui/icons"
import { Backdrop } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux'
import { logout } from '../../actions/userActions'

const UserOptions = ({ user }) => {

    const alert = useAlert()
    const history = useHistory();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const options = [
        { icon: <ListAlt />, name: "Orders", func: orders },
        { icon: <Person />, name: "Profile", func: account },
        { icon: <ExitToApp />, name: "Logout", func: logoutUser },
    ]

    if (user.role === "admin") {
        options.unshift({ icon: <Dashboard />, name: "Dashboard", func: dashboard });
    }

    function dashboard() {
        history.push("/admin/dashboard");
    }

    function orders() {
        history.push("/orders");
    }

    function account() {
        history.push("/account");
    }

    function logoutUser() {
        dispatch(logout());
        history.push("/")
        alert.success("Logout successfully")
    }

    return (
        <>
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial
                style={{ zIndex: "21" }}
                className="speedDial"
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction="down"
                icon={<img
                    className="speedDialIcon"
                    src={user.avatar.url ? user.avatar.url : "publicDefaultProfile.jpg"}
                    alt="Profile"
                ></img>}
            >
                {options.map((item) => (
                    <SpeedDialAction
                        key={item.name}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func} />
                ))}

            </SpeedDial>
        </>
    )
}

export default UserOptions
