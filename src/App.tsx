import React, { lazy, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { useAppSelector } from "./redux/hooks";

import Header from '/src/components/body/Header';
import Footer from '/src/components/body/Footer';

import Main from '/src/pages/Main';

const Loading = lazy(() => import("/src/pages/Loading"));
const ShowData = lazy(() => import("/src/pages/ShowData"));
const Completed = lazy(() => import("/src/pages/Completed"));

import reCAPTCHA from '/src/reCAPTCHA';

import '/src/scss/app.scss';

//create a font awesome library for use across the whole app
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpinner } from "@fortawesome/pro-duotone-svg-icons/faSpinner";
import { faAngleRight } from "@fortawesome/pro-duotone-svg-icons/faAngleRight";
import { faPowerOff } from "@fortawesome/pro-duotone-svg-icons/faPowerOff";
import { faCopy } from "@fortawesome/pro-duotone-svg-icons/faCopy";
library.add(faSpinner, faAngleRight, faPowerOff, faCopy);

const App = () => {

    //load Gooogle reCAPTCHA script
    useEffect(() => {
        const recaptcha = new reCAPTCHA((process.env.GOOGLE_CAPTCHA_SITEKEY!));
        recaptcha.loadReCaptcha();
    }, [])

    //navigate to path set in the global state.steps
    const currentStep = useAppSelector(state => state.steps.currentStep);

    let navigate = useNavigate();
    useEffect(() => {
        return navigate(currentStep || '/');
    }, [currentStep])

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/loading" element={<Loading />} />
                <Route path="/standbymp" element={<ShowData />} />
                <Route path="/completed" element={<Completed />} />
                <Route path="*" element={<Main />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App;