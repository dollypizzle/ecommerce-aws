import Navbar from './components/Navigation/Navbar';
import Footer from './components/Navigation/Footer';

const Layout = (props: any) => {
  return (
    <>
      <Navbar />
      <main>{props.children}</main>
      <Footer />
    </>
  );
};
export default Layout;
