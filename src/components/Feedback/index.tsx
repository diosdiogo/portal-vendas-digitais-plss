import React, { useState } from 'react';

import FeedbackImg from '../../assets/images/prestes-feedback.svg';
import Feedbackmodal from '../FeedbackModal';

import './styles.css';

interface FeedbackProps {
    startShowing?: boolean;
}

const Feedback = ({startShowing = false}: FeedbackProps) => {
    const [show, setShow] = useState(startShowing);

    function showModal () {
        setShow(true);
    };
  
    function hideModal () {
        setShow(false);
    };
    return (
        <div id="feedback-container">
            <button id="feedback" type="button" className="btn-feedback" onClick={showModal}>
                Feedback <img src={FeedbackImg} alt="Feedback"/>
            </button>
            <Feedbackmodal show={show} handleClose={hideModal}></Feedbackmodal>
        </div>
    );
}

export default Feedback;