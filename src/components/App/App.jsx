import { Component } from 'react';
import { Container } from './App.styled';
import SearchBar from 'components/SearchBar/SearchBar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import LoadMore from 'components/LoadMore/LoadMore';
import pixabay from 'API/pixabay';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage.styled';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const DEFAULT_STATE = {
  query: '',
  status: STATUS.IDLE,
  page: 0,
  error: '',
};

const PER_PAGE = 12;
export default class App extends Component {
  state = {
    ...DEFAULT_STATE,
    photos: [],
  };

  componentDidUpdate(_, prevState) {
    const isNewQuery =
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query;

    if (isNewQuery) this.fetchPhotos();
  }

  handleSubmit = query => {
    let status = STATUS.IDLE;
    let error = '';

    if (query.trim() === '') {
      status = STATUS.REJECTED;
      error = 'Please enter a query!';
    }

    this.setState(() => ({
      ...DEFAULT_STATE,
      photos: [],
      query,
      status,
      error,
    }));

    this.pageIncrease();
  };

  getNormalizedPhotos = photos => {
    const normPhotos = photos.map(
      ({ id, tags, webformatURL, largeImageURL }) => ({
        id,
        tags,
        webformatURL,
        largeImageURL,
      })
    );

    return normPhotos;
  };

  async fetchPhotos() {
    const { query, page } = this.state;
    if (!query) {
      this.setState({
        status: STATUS.REJECTED,
        error: 'Please enter a query!',
      });
      return;
    }

    this.setState({
      status: STATUS.PENDING,
    });

    try {
      const {
        data: { total, hits },
      } = await pixabay({
        q: query,
        page,
        per_page: PER_PAGE,
      });

      if (total === 0) {
        this.setState({
          photos: [],
          status: STATUS.REJECTED,
          error: 'Nothing was found',
        });
        return;
      }

      const isLastPage = Math.ceil(total / PER_PAGE) <= page;
      const status = isLastPage ? STATUS.IDLE : STATUS.RESOLVED;
      this.setState(prevState => ({
        photos: [...prevState.photos, ...hits],
        status,
      }));
    } catch (error) {
      this.setState({
        status: STATUS.REJECTED,
        error: error.message,
      });
    }
  }

  pageIncrease = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { status, photos, error } = this.state;
    const hasPhotos = photos.length !== 0;

    return (
      <Container>
        <SearchBar onSubmit={this.handleSubmit} />

        {hasPhotos && (
          <ImageGallery photos={this.getNormalizedPhotos(photos)} />
        )}

        {status === STATUS.PENDING && <LoadMore isLoading />}

        {status === STATUS.RESOLVED && <LoadMore onClick={this.pageIncrease} />}

        {status === STATUS.REJECTED && <ErrorMessage>{error}</ErrorMessage>}
      </Container>
    );
  }
}
