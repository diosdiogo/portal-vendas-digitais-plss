import React, { useState } from 'react';

import helpImg from '../../assets/images/prestes-help.svg';
import Modal from '../Modal';

import './styles.css';

const Help = () => {
    const [show, setShow] = useState(false);

    function showModal () {
        setShow(true);
    };
  
    function hideModal () {
        setShow(false);
    };
    return (
        <div id="help-container">
            <button id="contact_us" type="button" className="btn-help" onClick={showModal}>
               Ajuda <img src={helpImg} alt="Ajuda"/>
            </button>
            <Modal show={show} handleClose={hideModal}></Modal>
        </div>
    );
}

export default Help;