import React from 'react';
import MainForm from '/src/components/form/MainForm';
import ErrorBoundary from '/src/errors/ErrorBoundary';

import './Main.scss'

const Main = () => {

    return (
        <ErrorBoundary>
            <section className="body">
                <h2 className="turquoise text-centered w-100">launch standby-mp test drive</h2>
                <section className="main-form-container">
                    <div className="main-form-text">
                        <p>The Test Drive is a great way to experience our Dbvisit StandbyMP for Oracle, SQL Server and PostgreSQL without the hassle of having to download and install everything yourself.</p>
                        <p>The Test Drive consists of a Control Center host, and multiple database server hosts (each with either Oracle, SQL Server or PostgreSQL), as well as the Dbvisit StandbyMP product already pre-installed and ready to go.</p>
                        <p className="turquoise left-line">Please provide your email so we can send you a copy of the login details.</p>
                        <p>Once launched, it will take about 2 minutes for us to set everything up, after which time your Test Drive will be available for 2 hours.  <strong className="turquoise">Enjoy your test drive!</strong></p>
                    </div>
                    <MainForm />
                </section>
            </section>
        </ErrorBoundary>
    )
}

export default Main;