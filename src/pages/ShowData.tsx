import React from 'react';
import Timer from '/src/components/timer/Timer';
import DbCard from '/src/components/dbcard/DbCard';
import ErrorBoundary from '/src/errors/ErrorBoundary';

const ShowData = () => {


    return (

        <ErrorBoundary>
            <Timer />
            <section className="body">
                <DbCard />
            </section>
        </ErrorBoundary>
    )
}

export default ShowData;