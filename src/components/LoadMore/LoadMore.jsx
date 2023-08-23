import PropTypes from 'prop-types';

import Loader from 'components/LoadMore/Loader';
import { LoadMoreContainer } from './LoadMore.styled';
import ButtonLoadMore from 'components/LoadMore/ButtonLoadMore';

export default function LoadMore({ isLoading, onClick }) {
  return (
    <LoadMoreContainer>
      {isLoading ? <Loader /> : <ButtonLoadMore onClick={onClick} />}
    </LoadMoreContainer>
  );
}

LoadMore.propTypes = {
  isLoading: PropTypes.bool,
  onclick: PropTypes.func,
};
