import React from 'react';

import './Header.scss';
import DbvisitLogo from '/src/assets/img/Dbvisit-logo.svg';


const Header = () => {

    return (

        <header>
            <div className='header-inner'>
                <a href="https://dbvisit.com"><img src={DbvisitLogo} className="dbvisit-logo"></img></a>
                <h2 className="ink">TEST DRIVE</h2>
            </div>
        </header >
    )
}

export default Header;