import PropTypes from 'prop-types';
import '../styles/mobileminiature.scss';

function MobileMiniature({ mobile }) {
  return (
    <div className="miniature">
      <img src={mobile.imgUrl} alt={mobile.model} />
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
