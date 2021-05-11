import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

const Home = () => 'Home';

Home.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ itemId: PropTypes.string }).isRequired,
  }).isRequired,
};

export default withRouter(Home);
