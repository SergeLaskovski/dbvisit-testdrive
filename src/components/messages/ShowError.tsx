import React from 'react';

import StartButton from '/src/components/buttons/StartButton';

import './ShowError.scss';

interface Props {
    errMsg: any;
}

const ShowError = ({ errMsg }: Props) => {

    const handleStartClick = () => {
        window.location.reload();
    }

    return (
        <section className="body">
            <div className="error-message">
                <h4 className='red'>Something went wrong!</h4>
                <div className="start-new-btn-container mt-5">
                    <StartButton text="Please try again" callBack={handleStartClick} />
                </div>
            </div>
        </section>
    )

}



export default ShowError;