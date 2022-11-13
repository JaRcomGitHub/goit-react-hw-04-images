import PropTypes from 'prop-types';

export default function ImageGalleryItem({ largeImageURL, webformatURL, tags, onClick }) {
    return (
        <li className="ImageGalleryItem">
            <img
                src={webformatURL}
                alt={tags}
                className="ImageGalleryItem-image"
                loading="lazy" 
                onClick={() => onClick(largeImageURL, tags)}
            />
        </li>
    )
};

ImageGalleryItem.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};