import React from 'react';

import './Footer.scss';


const Footer = () => {
    return (

        <footer>
            <div className="footer-inner">
                <div className="small-text ink copy">© {new Date().getFullYear()} Dbvisit Software Limited. All rights reserved. </div>
                <div className="small-text text-right grey">
                    This site is protected by reCAPTCHA and the Google.<br /><a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.
                </div>
            </div>
        </footer>
    )
}

export default Footer;