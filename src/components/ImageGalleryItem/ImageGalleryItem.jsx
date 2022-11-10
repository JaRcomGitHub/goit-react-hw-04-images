import PropTypes from 'prop-types';

const ImageGalleryItem = ({ largeImageURL, webformatURL, tags, onClick }) =>  (
    <li className="ImageGalleryItem">
        <img
            src={webformatURL}
            alt={tags}
            className="ImageGalleryItem-image"
            loading="lazy" 
            onClick={() => onClick(largeImageURL, tags)}
        />
    </li>
);

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};