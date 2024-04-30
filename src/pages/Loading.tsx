import React from 'react';
import ShowVideo from '/src/components/video/ShowVideo';
import ShowLoader from '/src/components/loader/ShowLoader';
import ErrorBoundary from '/src/errors/ErrorBoundary';

import './Loading.scss'


const Loading = () => {

    return (
        <ErrorBoundary>
            <section className="body">
                <section className="loader">
                    <ShowVideo />
                    <ShowLoader />

                </section>
            </section>
        </ErrorBoundary>
    )
}

export default Loading;