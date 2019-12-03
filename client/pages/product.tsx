import Show from '../src/components/Products/Show';

const Display = ({ id }) => {
  return <Show id={id} />;
};

Display.getInitialProps = async ({ query }) => {
  return { id: query.id };
};

export default Display;
