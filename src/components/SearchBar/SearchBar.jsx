import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { SearchBarStyled, SearchForm, SearchInput } from './SearchBar.styled';

import { ReactComponent as SearchIcon } from 'svg/search.svg';
import IconButton from 'components/IconButton/IconButton';

export default function SearchBar({ onSubmit }) {
  const initialValues = {
    query: '',
  };

  return (
    <SearchBarStyled>
      <Formik
        initialValues={initialValues}
        onSubmit={({ query }, { resetForm }) => {
          onSubmit(query);
          // resetForm();
        }}
      >
        <SearchForm>
          <IconButton type="submit" aria-label="Submit query">
            <SearchIcon widht="16" height="16" />
          </IconButton>
          <SearchInput
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Formik>
    </SearchBarStyled>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
