// React
import { lazy, Suspense } from "react";

// Private Route
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Unauthorized from "./utils/Unauthorized";

// Pages
const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Authentication/Login"));
const SignUp = lazy(() => import("./pages/Authentication/SignUp"));
const Cart = lazy(() => import("./pages/Cart"));
const Profile = lazy(() => import("./pages/Profile"));
const Product = lazy(() => import("./pages/Product"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Order = lazy(() => import("./pages/Order"));
const Activate = lazy(() => import("./pages/Authentication/Activate"));
const ResendActivateEmail = lazy(() =>
  import("./pages/Authentication/ResendActivateEmail")
);
const Address = lazy(() => import("./pages/UserAddress/Address"));
const Payment_Success = lazy(() => import("./pages/Checkout/Payment_Success"));
const Payment_Failed = lazy(() => import("./pages/Checkout/Payment_Failed"));
const ResetPassword = lazy(() => import("./pages/ResetPassword/ResetPassword"));
const SendResetPassword = lazy(() =>
  import("./pages/ResetPassword/SendResetPassword")
);
const SupportAdmin = lazy(() =>
  import("./pages/SupportEngine/components/SupportAdmin")
);

// // Fun
// import PlayGround from "./Playground/PlayGround";

import Loading from "./components/Loading";

// Api
import { useUser } from "./api/auth";

function App() {
  const { isSuccess: success, isFetched } = useUser();

  if (!isFetched) return <Loading color="red" />;

  return (
    <Router>
      <Suspense fallback={<Loading color="darkblue" />}>
        <Routes>
          <Route path="/" element={<PrivateRoute success={success} />}>
            <Route path="/" element={<Home title="Home" />} />
            <Route path="/cart" element={<Cart title="Cart" />} />
            <Route path="/profile" element={<Profile title="Profile" />} />
            <Route
              path="/profile/address"
              element={<Address title="Address" />}
            />
            <Route
              path="/products/:id"
              element={<Product title="Product | " />}
            />
            <Route path="/checkout" element={<Checkout title="Checkout" />} />
            <Route path="/order/:id" element={<Order title="Order" />} />
            <Route path="/supporter" element={<SupportAdmin />} />
          </Route>
          <Route path="/" element={<Unauthorized success={success} />}>
            <Route path="/login" element={<Login title="Login" />} />
            <Route path="/signup" element={<SignUp title="Signup" />} />
            <Route
              path="/activate/:uid/:token"
              element={<Activate title="Activate" />}
            />
            <Route
              path="/resend/activate"
              element={<ResendActivateEmail title="Activate" />}
            />
            <Route
              path="/password/reset/confirm"
              element={<SendResetPassword title="Reset Password" />}
            />
            <Route
              path="/password/reset/confirm/:uid/:token"
              element={<ResetPassword title="Reset Password" />}
            />
          </Route>
          <Route
            path="/payment/success/:session_id"
            element={<Payment_Success />}
          />
          <Route path="/payment/canceled" element={<Payment_Failed />} />
          <Route path="*" element={<NotFound title="404|Not Found" />} />
          {/* <Route path="/playground" element={<PlayGround title="Playground" />} /> */}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
