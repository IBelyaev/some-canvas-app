import React from 'react';

import Portal from '../portal';

import './InfoModalWindow.css';

type Props = {
    isModalOpen: boolean;
    onClose: () => void;
};

const InfoModalWindow = ({isModalOpen, onClose}: Props) => {
    if (!isModalOpen) {
        return null;
    }

    const handleStopEvent = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
    };

    return (
        <Portal id="root">
            <div onClick={onClose} className="info-modal-window">
                <div onClick={handleStopEvent} className="info-modal-window__content">
                    <div className="info-modal-window__close-btn" onClick={onClose}>X</div>
                        Application for drawing some geometric shapes.
                        <br />
                        You can select three points and after this the fourth with parallelogram and circle will appear.
                        You can move parallelogram points and change its and circle size.
                        <div className="info-modal-window__footer">
                            Made by Igor ;-)
                        </div>
                </div>
            </div>
        </Portal>
    )
};

export default InfoModalWindow;
