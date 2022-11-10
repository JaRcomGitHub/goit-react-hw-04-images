import PropTypes from 'prop-types';
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ galleryPhotos, onClick }) =>  (
  <ul className="ImageGallery">
    {galleryPhotos.map(({ id, largeImageURL, webformatURL, tags }) => (
      <ImageGalleryItem
        key={id}
        largeImageURL={largeImageURL}
        webformatURL={webformatURL}
        tags={tags}
        onClick={onClick}
       />
    ))}
  </ul>
);

export default ImageGallery;

ImageGallery.propTypes = {
  galleryPhotos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  })).isRequired,
  onClick: PropTypes.func.isRequired,
};