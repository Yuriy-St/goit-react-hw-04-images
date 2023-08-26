import { useState, useEffect } from 'react';
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

const PER_PAGE = 12;

export default function App() {
  const [apiQuery, setApiQuery] = useState({});
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState(() => STATUS.IDLE);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPhotos = async () => {
      const { query, page } = apiQuery;
      if (!query) {
        setStatus(STATUS.REJECTED);
        setError('Please enter a query!');
        return;
      }

      setStatus(STATUS.PENDING);

      try {
        const {
          data: { total, hits },
        } = await pixabay({
          q: query,
          page,
          per_page: PER_PAGE,
        });

        if (total === 0) {
          setPhotos([]);
          setStatus(STATUS.REJECTED);
          setError('Nothing was found');
          return;
        }

        const isLastPage = Math.ceil(total / PER_PAGE) <= page;
        const status = isLastPage ? STATUS.IDLE : STATUS.RESOLVED;
        setStatus(status);
        setPhotos(state => [...state, ...hits]);
      } catch (error) {
        setStatus(STATUS.REJECTED);
        setError(error.message);
      }
    };

    fetchPhotos();
  }, [apiQuery]);

  const handleSubmit = query => {
    if (query.trim() === '') {
      setStatus(STATUS.REJECTED);
      setError('Please enter a query!');
    } else {
      setPhotos([]);
      setApiQuery({ query, page: 1 });
      setStatus(STATUS.IDLE);
      setError('');
    }
  };

  const getNormalizedPhotos = photos => {
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

  const pageIncrease = () => {
    setApiQuery(state => ({ ...state, page: state.page + 1 }));
  };

  const hasPhotos = photos.length !== 0;

  return (
    <Container>
      <SearchBar onSubmit={handleSubmit} />

      {hasPhotos && <ImageGallery photos={getNormalizedPhotos(photos)} />}

      {status === STATUS.PENDING && <LoadMore isLoading />}

      {status === STATUS.RESOLVED && <LoadMore onClick={pageIncrease} />}

      {status === STATUS.REJECTED && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
}
