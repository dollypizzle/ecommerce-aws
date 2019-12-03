import New from '../src/components/Products/AddProduct';
import { authInitialProps } from '../src/lib/auth';

const NewProducts = () => {
  return <New />;
};

NewProducts.getInitialProps = authInitialProps(true, '/login');

export default NewProducts;
