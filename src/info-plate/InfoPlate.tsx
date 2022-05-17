import React, { useState } from 'react';

import InfoModalWindow from '../info-modal-window';

import './InfoPlate.css';

type Props = {
    pointsAmount: number;
    onPageReset: () => void;
};

const InfoPlate = React.memo(({pointsAmount, onPageReset}: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSetIsModalOpen = () => {
        setIsModalOpen(prev => !prev);
    };

    return (
        <div className='info-pale'>
            <div className='info-pale__title'>
                Points count: {pointsAmount}
            </div>
            <div className='info-pale__buttons'>
                <button className='info-pale__button' onClick={onPageReset}>
                    Reset
                </button>
                <button className='info-pale__button' onClick={handleSetIsModalOpen}>
                    About program
                </button>
            </div>
            <InfoModalWindow onClose={handleSetIsModalOpen} isModalOpen={isModalOpen}/>
        </div>
    )
});

export default InfoPlate;
