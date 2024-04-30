import React from 'react';
import StartButton from '/src/components/buttons/StartButton';

const Completed = () => {

    const handleStartClick = () => {
        window.location.reload();
    }

    return (
        <section className="body">
            <section className="card">
                <h1 className="text-centered">This Test Drive has now shut down.</h1>
                <h2 className="text-centered ink mt-2">Thank you for trying Standby Multiplatform!</h2>
                <div className="start-new-btn-container mt-5">
                    <StartButton text="Launch Test Drive" callBack={handleStartClick} />
                </div>
            </section>
        </section>
    )
}

export default Completed;