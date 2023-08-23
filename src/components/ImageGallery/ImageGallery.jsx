import { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryStyled, ImageGalleryItem } from './ImageGallery.styled';
import Modal from 'components/Modal';

export default class ImageGallery extends Component {
  state = {
    showModal: false,
    src: '',
    alt: '',
  };

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  showModal = ({ largeImageURL, tags }) => {
    this.toggleModal();
    this.setState({ src: largeImageURL, alt: tags });
  };

  render() {
    const { photos } = this.props;
    const { src, alt, showModal } = this.state;
    return (
      <>
        <ImageGalleryStyled>
          {photos.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem key={id}>
              <img
                src={webformatURL}
                alt={tags}
                onClick={() => this.showModal({ largeImageURL, tags })}
              />
            </ImageGalleryItem>
          ))}
        </ImageGalleryStyled>
        {showModal && (
          <Modal handleModal={this.toggleModal}>
            <img src={src} alt={alt} />
          </Modal>
        )}
      </>
    );
  }
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
