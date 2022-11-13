import { useEffect } from "react"; 
import PropTypes from 'prop-types';

export default function Modal({ urlImage, tags, onClose }) {

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        //console.log('mount');

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            //console.log('unmount');
        }
    }, []);

    const handleKeyDown = event => {
        if (event.code === 'Escape') {
            //console.log('close modal');
            onClose();
        }
    }

    const handleOverlayClick = event => {
        if (event.currentTarget === event.target) {
            onClose();
        }
    }

    return (
        <div className="Overlay" onClick={handleOverlayClick}>
            <div className="Modal">
                <img src={urlImage} alt={tags} />
            </div>
        </div>
    )
};

Modal.propTypes = {
    urlImage: PropTypes.string.isRequired,
    tags: PropTypes.string,
    onClose: PropTypes.func.isRequired,
};