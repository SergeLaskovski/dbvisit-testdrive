import React, { useState, useEffect } from 'react';

import { useAppDispatch } from "/src/redux/hooks";
import { stepChanged } from '/src/redux/stepsSlice';

import TextInput from './TextInput';
import StartButton from '/src/components/buttons/StartButton';
import { useThrowAsyncError } from '/src/errors/ErrorHooks';

import { isValidEmail } from '/src/helpers';

import reCAPTCHA from '/src/reCAPTCHA';

import './MainForm.scss'

interface UserData {
    name: string;
    email: string
}

const MainForm = () => {

    const dispatch = useAppDispatch();

    const userData: UserData = JSON.parse(localStorage.getItem('userData') || '{ "name": "", "email": "" }');

    const [name, setName] = useState<string>(userData.name || '');
    const [email, setEmail] = useState<string>(userData.email || '');
    const [spin, setSpin] = useState<boolean>(false);
    const [nameErr, setNameErr] = useState<string>('');
    const [emailErr, setEmailErr] = useState<string>('');

    const throwAsyncError = useThrowAsyncError();

    useEffect(() => {
        setNameErr('');
    }, [name]);

    useEffect(() => {
        setEmailErr('');
    }, [email]);


    const handleStartClick = async () => {

        if (!name || !email) {
            if (!name) setNameErr('This field is required');
            else setNameErr('');
            if (!email) setEmailErr('This field is required');
            else setEmailErr('');
            return;
        } else {
            setNameErr('');
            setEmailErr('');
        }

        if (email && !isValidEmail(email)) {
            setEmailErr('Invalid e-mail');
            return;
        } else {
            setEmailErr('');
        }

        setSpin(true);

        //get Google reCaptcha token
        let token: string = "";
        try {
            //wait for google reCAPTCHA token
            const recaptcha = new reCAPTCHA((process.env.GOOGLE_CAPTCHA_SITEKEY!), "test_drive_form_submit");
            token = await recaptcha.getToken();
        } catch (error: any) {
            throwAsyncError(error)
        }

        //start task for this user (email) or get task status if it was started for this email
        if (token) {

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "requestor": email,
                    "token": token,
                    "name": name
                })
            }

            fetch(process.env.API_BASE + "/api/create", requestOptions)
                .then(async response => {

                    if (response.status !== 200) {
                        throw {
                            "message": `Cannot access API ${process.env.API_BASE + "/api/create"}`,
                            "response": `Status: ${response.status}`
                        };

                    }

                    let data = await response.json();

                    if (!data.task_id) {
                        throw {
                            "message": `Cannot get data from API ${process.env.API_BASE + "/api/create"}. No task_id returned`,
                            "response": data
                        };
                    }

                    if (data.task_id === "Robby") {
                        throw {
                            "message": 'Captcha thinks it was a Robot. API ${process.env.API_BASE + "/api/create"}',
                            "response": data
                        };
                    }

                    //store user name and email in localstorage for next use
                    localStorage.setItem('userData', JSON.stringify({ "name": name, "email": email }));

                    //Google analytics 
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({ 'event': 'test_drive_form_complete' });

                    setSpin(false);
                    dispatch(stepChanged({
                        "currentStep": "/loading",
                        "taskId": data.task_id,
                        "showData": {}
                    }));

                }).catch((error) => {
                    throwAsyncError(error);
                });
        }
    }


    return (
        <>
            <div className="main-form card">
                <TextInput inputLabel="Name" setVal={setName} err={nameErr} handleStartClick={handleStartClick} defaultValue={name} isRequired />
                <TextInput inputLabel="E-mail" inputType="email" setVal={setEmail} err={emailErr} handleStartClick={handleStartClick} defaultValue={email} isRequired />
                <StartButton text="Launch Test Drive" callBack={handleStartClick} spin={spin} disabled={!(email && name && !nameErr && !emailErr)} />
                <div className="small-white-text">
                    Dbvisit Software Limited needs the contact information you provide to us to contact you about our products and services. You may unsubscribe from these communications at anytime. For information on how to unsubscribe, as well as our privacy practices and commitment to protecting your privacy, check out our <a href="https://dbvisit.com/privacy-policy2023" target='_blank'>Privacy Policy</a>.
                </div>
            </div>
        </>
    );

}

export default MainForm;