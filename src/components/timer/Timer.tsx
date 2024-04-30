
import React, { useState, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from "/src/redux/hooks";
import { stepChanged } from '/src/redux/stepsSlice';

import StopButton from '/src/components/buttons/StopButton';
import ShowError from '/src/components/messages/ShowError';

import { secondsToHms } from '/src/helpers';

import './Timer.scss';

const Timer = () => {

    const stepState = useAppSelector(state => state.steps);

    const initialSeconds: number = stepState.showData.countdown || 0;
    const taskId: string | null = stepState.taskId;

    const [seconds, setSeconds] = useState<number>(Number(initialSeconds));
    const [showPageError, setShowPageError] = useState<string>();

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (seconds % 25 === 0 && seconds > 0) {

            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }
            fetch(`${process.env.API_BASE}/api/status?task_id=${taskId}`, requestOptions)
                .then(async response => {
                    if (response.status !== 200) {
                        setShowPageError("Something whent wrong!");
                        console.log(response);
                        return;
                    }
                    let responseData = await response.json();
                    if (responseData.countdown > 0) {
                        responseData.countdown === seconds ? setSeconds(responseData.countdown - 1) : setSeconds(responseData.countdown);
                    } else {
                        setSeconds(0);
                    }

                }).catch((error) => {
                    setShowPageError(error.message);
                });
        } else {
            if (seconds === 0) {
                dispatch(stepChanged({
                    "currentStep": taskId ? "/completed" : "/",
                    "taskId": null,
                    "showData": {}
                }));
            } else {
                setTimeout(() => { setSeconds(seconds - 1) }, 1000);
            }
        }
    }, [seconds]);


    return (
        <>
            {
                showPageError && <ShowError errMsg={showPageError} />
            }
            <section className="timer">
                <div className="timer-inner">
                    <h4 className="text-centered">This Test Drive will be available for:</h4>
                    <h3 className="text-centered">{secondsToHms(seconds)}</h3>
                    <div className="stop-btn-container">
                        <StopButton />
                    </div>
                </div>
            </section>
        </>
    )

}

export default Timer;