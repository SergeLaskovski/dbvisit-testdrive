import React, { useState, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from "/src/redux/hooks";
import { stepChanged } from '/src/redux/stepsSlice';

import { useThrowAsyncError } from '/src/errors/ErrorHooks';

import './ShowLoader.scss';

interface StatusState {
    countdown: number
    message: string,
    percent: number,
    state: "SUCCESS" | "PROCESSING" | "PENDING" | "FAILURE"
}

const ShowLoader = () => {

    const taskId = useAppSelector(state => state.steps.taskId);
    if (!taskId) return;

    const dispatch = useAppDispatch();

    const [status, setStatus] = useState<StatusState>({
        "countdown": -1,
        "message": "Setting up the environment...",
        "percent": 0,
        "state": "SUCCESS"
    });
    const [cubeHTML, setCubeHTML] = useState<string>('<div class="cube pulsate"></div>');


    const throwAsyncError = useThrowAsyncError();

    useEffect(() => {

        let cubes: string = '';

        for (let i: number = 0; i < Math.round(status.percent / 2) - 1; i++) {
            cubes += '<div class="cube"></div>'
        }
        if (status.percent < 100) cubes += '<div class="cube pulsate"></div>';
        else cubes += '<div class="cube"></div>';

        setCubeHTML(cubes);

        if (status.percent < 100) {

            setTimeout(() => {

                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }

                fetch(`${process.env.API_BASE}/api/status?task_id=${taskId}`, requestOptions)
                    .then(async response => {

                        if (response.status !== 200) {
                            throw {
                                "message": `Cannot access API ${process.env.API_BASE}/api/status?task_id=${taskId}`,
                                "response": `Status: ${response.status}`
                            };
                        }

                        let responseData = await response.json();

                        if (responseData.state === 'PROCESSING' || responseData.state === 'PENDING' || responseData.state === 'SUCCESS') {
                            setStatus(responseData);
                        } else {
                            throw {
                                "message": `API ${process.env.API_BASE}/api/status?task_id=${taskId} returned incorrect state`,
                                "response": responseData
                            };
                        }

                    }).catch((error) => {
                        throwAsyncError(error);
                    });
            }, status.percent === 0 ? 1500 : 5000);

        } else {
            //if status percent is 100 we go to the next step and provide data to show
            setTimeout(() => {
                dispatch(stepChanged({
                    "currentStep": "/standbymp",
                    "taskId": taskId,
                    "showData": status
                }));
            }, 1500);

        }

    }, [status]);

    return (
        <>
            <h2>{status.percent}%</h2>
            <div className="cubes" dangerouslySetInnerHTML={{ __html: cubeHTML }} ></div>
            <div>{status.message}</div>
        </>
    )
}

export default ShowLoader;