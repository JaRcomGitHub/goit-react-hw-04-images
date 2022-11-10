import React from "react";

class Modal extends React.Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = event => {
        if (event.code === 'Escape') {
            //console.log('close modal');
            this.props.onClose();
        }
    }

    handleOverlayClick = event => {
        if (event.currentTarget === event.target) {
            this.props.onClose();
        }
    }

    render() {
        const { urlImage, tags } = this.props;
        return (
            <div className="Overlay" onClick={this.handleOverlayClick}>
                <div className="Modal">
                    <img src={urlImage} alt={tags} />
                </div>
            </div>
        )
    }
}

export default Modal;
