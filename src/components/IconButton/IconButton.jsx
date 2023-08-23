import PropTypes from 'prop-types';
import { IconButtonStyled } from './IconButton.styled';

export default function IconButton({ children, onClick, ...alyProps }) {
  return (
    <IconButtonStyled onClick={onClick} {...alyProps}>
      {children}
    </IconButtonStyled>
  );
}

IconButton.defaultProps = {
  type: 'button',
  onClick: () => null,
  children: null,
};

IconButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  'aria-label': PropTypes.string.isRequired,
};
