import React, { useState } from 'react'
import './Shipping.css'
import MetaData from '../MetaData'
import { useSelector, useDispatch } from 'react-redux'
import { saveShippingInfo } from '../../actions/cartAction'
import { PinDrop, Home, LocationCity, Public, Phone, TransferWithinAStation } from '@material-ui/icons'
import { Country, State } from 'country-state-city';
import { useAlert } from 'react-alert'
import CheckoutSteps from '../../components/checkoutSteps/CheckoutSteps'



const Shipping = ({ history }) => {

    const { shippingInfo } = useSelector(state => state.cart);

    const dispatch = useDispatch();
    const alert = useAlert();

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    const shippingSubmit = (e) => {
        e.preventDefault();
        if (phoneNo.length !== 10) {
            alert.error("Phone number should contain 10 digits");
            return;
        }
        dispatch(saveShippingInfo({ address, city, state, country, pinCode, phoneNo }));
        history.push("/order/confirm")
    }

    return (
        <>
            <MetaData title="ShopZone | Shipping" />
            <CheckoutSteps activeStep={0} />
            <div className="shipping_container">
                <div className="shipping_box">
                    <h2 className="shipping_heading">Shipping Details</h2>
                    <form className="shipping_form"
                        encType="multipart/form-data"
                        onSubmit={shippingSubmit}>
                        <div>
                            <Home />
                            <input
                                type="text"
                                placeholder="Address"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <div>
                            <LocationCity />
                            <input
                                type="text"
                                placeholder="City"
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        <div>
                            <PinDrop />
                            <input
                                type="number"
                                placeholder="Pin Code"
                                required
                                value={pinCode}
                                onChange={(e) => setPinCode(e.target.value)}
                            />
                        </div>

                        <div>
                            <Phone />
                            <input
                                type="number"
                                placeholder="Phone Number"
                                required
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                size="10"
                            />
                        </div>

                        <div>
                            <Public />
                            <select
                                className="shipping_select"
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="">Country</option>
                                {Country &&
                                    Country.getAllCountries().map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        {country && (
                            <div>
                                <TransferWithinAStation />

                                <select
                                    className="shipping_select"
                                    required
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    <option value="">State</option>
                                    {State &&
                                        State.getStatesOfCountry(country).map((item) => (
                                            <option key={item.isoCode} value={item.isoCode}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        )}

                        <input
                            type="submit"
                            value="Continue"
                            className="shipping_btn"
                            disabled={state ? false : true}
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default Shipping
