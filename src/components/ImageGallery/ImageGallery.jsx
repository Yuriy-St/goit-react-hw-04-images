import { useState } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryStyled, ImageGalleryItem } from './ImageGallery.styled';
import Modal from 'components/Modal';

export default function ImageGallery({ photos }) {
  const [isModalActive, setIsModalActive] = useState(false);
  const [src, setSrc] = useState('');
  const [alt, setAlt] = useState('');

  const toggleModal = () => {
    setIsModalActive(prevState => !prevState);
  };

  const showModal = ({ largeImageURL, tags }) => {
    toggleModal();
    setSrc(largeImageURL);
    setAlt(tags);
  };

  return (
    <>
      <ImageGalleryStyled>
        {photos.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem key={id}>
            <img
              src={webformatURL}
              alt={tags}
              onClick={() => showModal({ largeImageURL, tags })}
            />
          </ImageGalleryItem>
        ))}
      </ImageGalleryStyled>
      {isModalActive && (
        <Modal handleModal={toggleModal}>
          <img src={src} alt={alt} />
        </Modal>
      )}
    </>
  );
}

ImageGallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
    })
  ).isRequired,
};
