import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import '../styles/mobileMiniature.scss';

function MobileMiniature({ mobile }) {
  return (
    <div className="miniature">
      <LazyLoadImage src={mobile.imgUrl} alt={mobile.model} />
      <p>{mobile.brand}</p>
      <p>{mobile.model}</p>
      {mobile.price
        ? <p>{`${mobile.price}€`}</p>
        : null}
    </div>
  );
}

export default MobileMiniature;

MobileMiniature.propTypes = {
  mobile: PropTypes.shape({
    id: PropTypes.string,
    brand: PropTypes.string,
    model: PropTypes.string,
    price: PropTypes.string,
    imgUrl: PropTypes.string

  }).isRequired
};
