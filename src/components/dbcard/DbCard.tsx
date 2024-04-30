import React from 'react';
import { useAppSelector } from "/src/redux/hooks";

import OracleLogo from '/src/assets/img/oracle-logo-icon.png';
import SQLServerLogo from '/src/assets/img/microsoft-logo-icon.png';
import PostgresqlLogo from '/src/assets/img/postgresql-logo-icon.png';

import CopyClip from '/src/components/buttons/CopyClip';

import './DbCard.scss'

const DbCard = () => {

    const dbData = useAppSelector(state => state.steps.showData.result);
    if (!dbData) return;

    //get separated usernames and passwords as they come from the backend as a pair "username / password"
    const up = {
        "ccU": getUserName(dbData.ccAdmin),
        "ccP": getPassword(dbData.ccAdmin),
        "oracleU": getUserName(dbData.oracleDbAdmin),
        "oracleP": getPassword(dbData.oracleDbAdmin),
        "sqlServerInstU": getUserName(dbData.sqlDbAdmin),
        "sqlServerInstP": getPassword(dbData.sqlDbAdmin),
        "sqlServerU": getUserName(dbData.sqlLogon),
        "sqlServerP": getPassword(dbData.sqlLogon),
        "postgresqlU": getUserName(dbData.psqlLogon),
        "postgresqlP": getPassword(dbData.psqlLogon)
    };

    return (
        <section className="dbcards">
            <section className="card mb-3">
                <h2>Start Here</h2>

                <div className="cols-2">
                    <h4>Control Center Hostname</h4>
                    <div className="ml-4">
                        <a href={`https://${dbData.ccHostName}:4433`} target="_blank" rel="noopener noreferrer">
                            {`https://${dbData.ccHostName}:4433`}
                        </a>
                    </div>
                </div>

                <div className="cols-2">
                    <h4>Username</h4>
                    <div className="ml-4">
                        {up.ccU}
                        <CopyClip text={up.ccU} />
                    </div>
                </div>

                <div className="cols-2">
                    <h4>Password</h4>
                    <div className="ml-4">
                        {up.ccP}
                        <CopyClip text={up.ccP} />
                    </div>
                </div>
            </section>


            <section className="card mb-3">

                <h2>Configuration Licenses</h2>


                <div className="cols-2">
                    <h4><img width="20" src={OracleLogo} />Oracle</h4>
                    <div className="ml-4">
                        {dbData.oracleLicence}
                        <CopyClip text={dbData.oracleLicence} />
                    </div>
                </div>

                <div className="cols-2">
                    <h4><img width="20" src={SQLServerLogo} />SQLServer</h4>
                    <div className="ml-4">
                        {dbData.sqlLicence}
                        <CopyClip text={dbData.sqlLicence} />
                    </div>
                </div>


                <div className="cols-2">
                    <h4><img width="20" src={PostgresqlLogo} />PostgreSQL</h4>
                    <div className="ml-4">
                        {dbData.psqlLicence}
                        <CopyClip text={dbData.psqlLicence} />
                    </div>
                </div>

            </section>

            <section className="card">

                <div className="db-header">
                    <img width="40" src={OracleLogo} />
                    <h2>Oracle Hosts</h2>
                </div>

                <div className="cols-2">
                    <h4>Primary</h4>
                    <div className="ml-4">
                        {dbData.oracleHostNames[0]}
                        <CopyClip text={dbData.oracleHostNames[0]} />
                    </div>
                </div>

                <div className="cols-2">
                    <h4>Standby</h4>
                    <div className="ml-4">
                        {dbData.oracleHostNames[1]}
                        <CopyClip text={dbData.oracleHostNames[1]} />
                    </div>
                </div>


                <div className="cols-2 mt-5">
                    <h4>SSH Username</h4>
                    <div className="ml-4">
                        {up.oracleU}
                        <CopyClip text={up.oracleU} />
                    </div>
                </div>

                <div className="cols-2">
                    <h4>SSH Password</h4>
                    <div className="ml-4">
                        {up.oracleP}
                        <CopyClip text={up.oracleP} />
                    </div>
                </div>


                <div className="db-header">
                    <img width="40" src={SQLServerLogo} />
                    <h2>SQL Server Hosts</h2>
                </div>

                <div className="cols-2">
                    <h4>Primary</h4>
                    <div className="ml-4">
                        {dbData.sqlHostNames[0]}
                        <CopyClip text={dbData.sqlHostNames[0]} />
                    </div>
                </div>

                <div className="cols-2">
                    <h4>Standby</h4>
                    <div className="ml-4">
                        {dbData.sqlHostNames[1]}
                        <CopyClip text={dbData.sqlHostNames[1]} />
                    </div>
                </div>

                <div className="cols-2 mt-5">
                    <h4>Instances Username</h4>
                    <div className="ml-4">
                        {up.sqlServerInstU}
                        <CopyClip text={up.sqlServerInstU} />
                    </div>
                </div>

                <div className="cols-2">
                    <h4>Instances Password</h4>
                    <div className="ml-4">
                        {up.sqlServerInstP}
                        <CopyClip text={up.sqlServerInstP} />
                    </div>
                </div>

                <div className="cols-2 mt-5">
                    <h4>SSH Username</h4>
                    <div className="ml-4">
                        {up.sqlServerU}
                        <CopyClip text={up.sqlServerU} />
                    </div>
                </div>

                <div className="cols-2">
                    <h4>SSH Password</h4>
                    <div className="ml-4">
                        {up.sqlServerP}
                        <CopyClip text={up.sqlServerP} />
                    </div>
                </div>

                <div className="db-header">
                    <img width="40" src={PostgresqlLogo} />
                    <h2>PostgreSQL Hosts</h2>
                </div>


                <div className="cols-2">
                    <h4>Primary</h4>
                    <div className="ml-4">
                        {dbData.psqlHostNames[0]}
                        <CopyClip text={dbData.psqlHostNames[0]} />
                    </div>
                </div>

                <div className="cols-2">
                    <h4>Standby</h4>
                    <div className="ml-4">
                        {dbData.psqlHostNames[1]}
                        <CopyClip text={dbData.psqlHostNames[1]} />
                    </div>
                </div>

                <div className="cols-2 mt-5">
                    <h4>Data streaming mode Username</h4>
                    <div className="ml-4">
                        {up.postgresqlU}
                        <CopyClip text={up.postgresqlU} />
                    </div>
                </div>

                <div className="cols-2">
                    <h4>Data streaming mode Password</h4>
                    <div className="ml-4">
                        {up.postgresqlP}
                        <CopyClip text={up.postgresqlP} />
                    </div>
                </div>

                <div className="cols-2 mt-5">
                    <h4>SSH Username</h4>
                    <div className="ml-4">
                        {up.postgresqlU}
                        <CopyClip text={up.postgresqlU} />
                    </div>
                </div>

                <div className="cols-2">
                    <h4>SSH Password</h4>
                    <div className="ml-4">
                        {up.postgresqlP}
                        <CopyClip text={up.postgresqlP} />
                    </div>
                </div>


            </section >
        </section>
    )

}

function getUserName(userAndPassword: string): string {
    const usAndParray: string[] = userAndPassword.split(' / ');
    if (usAndParray[0]) return usAndParray[0].trim();
    else return '';
}

function getPassword(userAndPassword: string): string {
    const usAndParray: string[] = userAndPassword.split(' / ');
    if (usAndParray[1]) return usAndParray[1].trim();
    else return '';
}


export default DbCard;