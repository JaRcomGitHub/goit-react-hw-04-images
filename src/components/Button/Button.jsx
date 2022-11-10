import PropTypes from 'prop-types';

const Button = ({ onClick }) =>  (
    <button type="button" className="Button" onClick={ () => onClick() }>
        Load more
    </button>
);

export default Button;

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
};