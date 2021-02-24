import React from 'react';
import { Link } from 'react-router-dom';
import Feedback from '../../components/Feedback';
import Help from '../../components/Help';

import logoImg from '../../assets/images/prestes-icon.png';

import './styles.css';

const PageHeader = () => {
    return (
        <header className="page-header">
            <div className="img-container">
                <Link to="/">                        
                    <img src={logoImg} alt="logo-prestes"/>
                </Link>
            </div>
            <div>
                <Feedback />
                <Help />
            </div>
            
        </header>
    );
}

export default PageHeader;