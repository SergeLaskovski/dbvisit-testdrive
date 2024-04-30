import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from "/src/redux/hooks";
import { stepChanged } from '/src/redux/stepsSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ShowError from '/src/components/messages/ShowError';

import './StopButton.scss';


const StopButton = () => {

    const email: string = useAppSelector(state => state.steps.showData.result?.requestor);

    const dispatch = useAppDispatch();

    const [showPageError, setShowPageError] = useState<string>('');

    const handleStopInstance = () => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "requestor": email
            })
        }
        fetch(process.env.API_BASE + "/api/remove", requestOptions)
            .then(async response => {
                if (response.status !== 200) {
                    setShowPageError("Something whent wrong!");
                    console.log(response);
                    return;
                }
                let data = await response.json();
                if (data) {
                    dispatch(stepChanged({
                        "currentStep": "/completed",
                        "taskId": null,
                        "showData": {}
                    }));
                }
            }).catch((error) => {
                setShowPageError(error.message);
            });

    }

    return (
        <>
            {
                showPageError && <ShowError errMsg={showPageError} />
            }

            <button className="stop-btn" onClick={handleStopInstance}>
                <div className="txt">Stop</div>
                <div className="ico">
                    <FontAwesomeIcon icon={["fad", "power-off"]} size="xl" />
                </div>
            </button>

        </>
    );
}

export default StopButton;