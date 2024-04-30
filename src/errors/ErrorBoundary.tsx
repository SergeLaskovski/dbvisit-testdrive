import React, { ReactNode } from "react";
import ShowError from '/src/components/messages/ShowError';
import { jsonFriendlyErrorReplacer } from '/src/helpers';

import reCAPTCHA from '/src/reCAPTCHA';

type Props = { children: ReactNode };
type State = { hasError: boolean, errInfo: string };

class ErrorBoundary extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        // initialize the error state
        this.state = {
            hasError: false,
            errInfo: ''
        };

    }

    // if an error happened, set the state to true
    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        // send error to somewhere here
        this.setState({
            hasError: true,
            errInfo: error
        });

        //if (process.env.NODE_ENV === 'production') {

        //get Google reCaptcha token
        const recaptcha = new reCAPTCHA((process.env.GOOGLE_CAPTCHA_SITEKEY!), "send_error");
        recaptcha.getToken().then((token) => {

            if (process.env.NODE_ENV !== 'production') {
                error.message = "!!!TEST MESSAGE!!!" + error.message;
            }

            error.token = token;
            error.userData = JSON.parse(localStorage.getItem('userData') || '{ "name": "", "email": "" }');

            const requestOptions = {
                method: 'POST',
                body: JSON.stringify(error, jsonFriendlyErrorReplacer, 2),
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": process.env.LOCALHOST!
                }
            }

            fetch('https://wcg73r3n66p7ugyh2wmgv7jo740fygqf.lambda-url.ap-southeast-2.on.aws/', requestOptions)
                .then(async response => {

                    if (response.status !== 200) {
                        throw {
                            "message": `Cannot access Lambda`,
                            "response": `${response.status}`
                        };

                    }

                }).catch((error) => {
                    console.log(error);
                });
        });
        //}

    }

    render() {
        // if error happened, return a fallback component
        if (this.state.hasError) {

            return < ShowError errMsg={this.state.errInfo} />
        }

        return this.props.children;
    }

}

export default ErrorBoundary;