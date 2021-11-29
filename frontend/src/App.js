import './App.css';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ProductDetail from './components/ProductDetail/ProductDetail'
import Home from './Pages/Home/Home';
import Product from './Pages/Product/Product';
import LoginSignUp from './Pages/Login/LoginSignup';
import store from './store'
import { useEffect, useState } from 'react';
import { loadUser } from './actions/userActions';
import { useSelector } from 'react-redux';
import UserOptions from './components/UserOptions/UserOptions';
import Profile from "./Pages/Profile/Profile"
import UpdateMyProfile from './Pages/Profile/UpdateMyProfile';
import Cart from './Pages/Cart/Cart';
import Shipping from './Pages/Shipping/Shipping';
import ConfirmOrder from './Pages/ConfirmOrder/ConfirmOrder'
import axios from 'axios';
import Payment from './Pages/Payment/Payment';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import OrderSuccess from './Pages/OrderSuccess/OrderSuccess';
import MyOrders from './Pages/MyOrders/MyOrders'
import OrderDetails from './Pages/OrderDetails/OrderDetails';
import DashBoard from './components/Admin/DashBoard/DashBoard';
import ProductList from './components/Admin/ProductList/ProductList';
import NewProduct from './components/Admin/NewProduct/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct/UpdateProduct'
import OrderList from './components/Admin/OrderList/OrderList'
import ProcessOrder from './components/Admin/ProcessOrder/ProcessOrder'
import UsersList from './components/Admin/UsersList/UsersList'
import UpdateUser from './components/Admin/UpdateUser/UpdateUser'
import ProductReviews from './components/Admin/ProductReviews/ProductReviews'
import About from './Pages/About/About';


function App() {

  const { authUser, user } = useSelector(state => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeApiKey");
    setStripeApiKey(data.stripeApiKey)
  }

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, [])

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (

    <>
      <Router>

        {stripeApiKey && (<Elements stripe={loadStripe(stripeApiKey)}>
          {authUser && <Route exact path="/process/payment" component={Payment}>
          </Route>}
        </Elements>)}

        <ScrollToTop />
        <Header />
        {authUser && <UserOptions user={user} />}
        <Switch>
          <Route exact path="/" component={Home}>
          </Route>
          <Route exact path="/about" component={About}>
          </Route>
          <Route exact path="/login" component={LoginSignUp}>
          </Route>
          <Route exact path="/product/:id" component={ProductDetail}>
          </Route>
          <Route exact path="/products" component={Product}>
          </Route>
          <Route exact path="/products/:keyword" component={Product}>
          </Route>
          {authUser && <Route exact path="/account" component={Profile}>
          </Route>}
          {authUser && <Route exact path="/me/update" component={UpdateMyProfile}>
          </Route>}
          <Route exact path="/cart" component={Cart}>
          </Route>
          {authUser && <Route exact path="/shipping" component={Shipping}>
          </Route>}
          {authUser && <Route exact path="/success" component={OrderSuccess}>
          </Route>}
          {authUser && <Route exact path="/orders" component={MyOrders}>
          </Route>}
          {authUser && <Route exact path="/order/confirm" component={ConfirmOrder}>
          </Route>}
          {authUser && <Route exact path="/order/:id" component={OrderDetails}>
          </Route>}
          {user && user.role === "admin" ? <Route exact path="/admin/dashboard" component={DashBoard}>
          </Route> : <Redirect to="/login" />}
          {user && user.role === "admin" ? <Route exact path="/admin/products" component={ProductList}>
          </Route> : <Redirect to="/login" />}
          {user && user.role === "admin" ? <Route exact path="/admin/product" component={NewProduct}>
          </Route> : <Redirect to="/login" />}
          {user && user.role === "admin" ? <Route exact path="/admin/product/:id" component={UpdateProduct}>
          </Route> : <Redirect to="/login" />}
          {user && user.role === "admin" ? <Route exact path="/admin/orders" component={OrderList}>
          </Route> : <Redirect to="/login" />}
          {user && user.role === "admin" ? <Route exact path="/admin/order/:id" component={ProcessOrder}>
          </Route> : <Redirect to="/login" />}
          {user && user.role === "admin" ? <Route exact path="/admin/users" component={UsersList}>
          </Route> : <Redirect to="/login" />}
          {user && user.role === "admin" ? <Route exact path="/admin/user/:id" component={UpdateUser}>
          </Route> : <Redirect to="/login" />}
          {user && user.role === "admin" ? <Route exact path="/admin/reviews" component={ProductReviews}>
          </Route> : <Redirect to="/login" />}
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
