import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
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
import ProtectedRoute from './components/ProtectedRoute';


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

        <ScrollToTop />
        <Header />

        {stripeApiKey && (<Elements stripe={loadStripe(stripeApiKey)}>
          {<Route exact path="/process/payment" component={Payment}>
          </Route>}
        </Elements>)}

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

          <ProtectedRoute exact path="/account" component={Profile} />

          <ProtectedRoute exact path="/me/update" component={UpdateMyProfile} />

          <Route exact path="/cart" component={Cart}>
          </Route>

          <ProtectedRoute exact path="/shipping" component={Shipping} />

          <ProtectedRoute exact path="/success" component={OrderSuccess} />

          <ProtectedRoute exact path="/orders" component={MyOrders} />

          <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />

          <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/dashboard"
            component={DashBoard}
          />

          <ProtectedRoute
            exact
            path="/admin/products"
            isAdmin={true}
            component={ProductList}
          />
          <ProtectedRoute
            exact
            path="/admin/product"
            isAdmin={true}
            component={NewProduct}
          />

          <ProtectedRoute
            exact
            path="/admin/product/:id"
            isAdmin={true}
            component={UpdateProduct}
          />
          <ProtectedRoute
            exact
            path="/admin/orders"
            isAdmin={true}
            component={OrderList}
          />

          <ProtectedRoute
            exact
            path="/admin/order/:id"
            isAdmin={true}
            component={ProcessOrder}
          />
          <ProtectedRoute
            exact
            path="/admin/users"
            isAdmin={true}
            component={UsersList}
          />

          <ProtectedRoute
            exact
            path="/admin/user/:id"
            isAdmin={true}
            component={UpdateUser}
          />

          <ProtectedRoute
            exact
            path="/admin/reviews"
            isAdmin={true}
            component={ProductReviews}
          />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
