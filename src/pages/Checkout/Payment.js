import Lottie from "react-lottie-player";
import { successfail } from "./svg";
import { Link } from "react-router-dom";

const Payment_Success_Message = {
  title: "Your Payment is Successful!",
  message:
    "Thank you for your payment. An automated payment receipt will be sent to your registered email.",
  to: "/",
  link: "Back to Home",
  segments: [250, 400],
};
const Payment_Failed_Message = {
  title: "Your Payment is Unsuccessful!",
  message:
    "Don't worry your money is safe! If your money was debited from your account, it will be refunded automatically in 5-7 workings days.",
  to: "/cart",
  link: "Back to Cart",
  segments: [650, 800],
};

export default function Payment({ success }) {
  const payment = success ? Payment_Success_Message : Payment_Failed_Message;

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <Lottie
          play
          loop={false}
          style={{
            width: 200,
            height: 200,
            margin: "0 auto",
          }}
          animationData={successfail}
          segments={payment.segments}
          speed={2}
        />
        <h1>{payment.title}</h1>
        <p>{payment.message}</p>
        <Link to={payment.to}>{payment.link}</Link>
      </div>
    </div>
  );
}
