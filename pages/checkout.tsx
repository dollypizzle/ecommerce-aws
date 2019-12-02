import Checkout from "../src/components/Form/Checkout";
import { authInitialProps } from "../src/lib/auth";

const CheckoutPage = () => {
  return <Checkout />;
};

CheckoutPage.getInitialProps = authInitialProps(true, "/login");
export default CheckoutPage;
