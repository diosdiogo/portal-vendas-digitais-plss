import React, { FormEvent, MouseEventHandler, useState } from 'react';
import { FiXCircle } from 'react-icons/fi';

import './styles.css';
import tksHeartImg from '../../assets/images/thanks-heart.svg';
import FeedbackImg from '../../assets/images/feedback-star-white.svg';
import feedbackStar from '../../assets/images/feedback-star.svg';
import feedbackStarActive from '../../assets/images/feedback-star-active.svg';
import api from '../../services/api';

interface FeedbackModalProps {
    handleClose: MouseEventHandler;
    show: boolean;
}

type Props = FeedbackModalProps;

const Feedbackmodal = ({handleClose, show}: Props) => {    
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    const [evaluation, setEvaluation] = useState(0);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const [sended, setSended] = useState(false);
    const evaluationValues = [   
        { id: 1, value: 1},
        { id: 2, value: 2},
        { id: 3, value: 3},
        { id: 4, value: 4},
        { id: 5, value: 5}
    ];

    const formSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (evaluation === 0) {
            setError(true);
            return;
        } else
            setError(false);

        await api.post('feedbacks', {
            evaluation: evaluation,
            message: message
        }).then((response) => {
            setSended(true);
        }).catch(() => {
            alert('Ops, algo de errado aconteceu. Tente novamente mais tarde.')
        });
    }

    return (
        <div id="feedback-page" className={showHideClassName}>
            <section id="feedback-page-content" className="modal-main">
                <header> 
                    <div className="header-text">
                        Feedback <img src={FeedbackImg} alt="Feedback"/>
                    </div>
                    <div className="btn-close">
                        <a onClick={handleClose}>
                            <FiXCircle size={22} />
                        </a>
                    </div>
                </header>
                <div className="form" style={{display: sended ? "none" : "block"}}>
                    <form>                        
                        <main>
                            <div className="feedback-evaluation-text">
                                <p>Como está sendo sua experiência?</p>
                            </div>
                            <div className="feedback-text">
                                De notas uma à cinco estrelas. 1 sendo péssima e 5 sendo excelente.
                            </div>

                            <div className="evaluation-value">
                                {evaluationValues.map((evaluationItem) => {
                                    return (
                                        <div key={evaluationItem.id} className="evaluation-btn">
                                            <button 
                                                value={evaluationItem.value}
                                                onClick={(e) => {setEvaluation(Number(e.currentTarget.value))}}
                                                type="button"
                                            >
                                                { evaluation >= evaluationItem.id ? <img src={feedbackStarActive}alt="" /> : <img src={feedbackStar} alt=""/> }
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                            { error && 
                                (
                                    <div className="error" style={{color: "red", font: "700 1.2rem Roboto"}}>
                                        Selecione uma opção de experiência
                                    </div>
                                )                        
                            }

                            <div className="feedback-message-text">
                                <p>
                                    Teve alguma dificuldade? Pode ficar tranquilo, 
                                    seu comentário será enviado de maneira anônima.
                                </p>
                            </div> 

                            <div className="feedback-message-value">
                                <textarea 
                                    onChange={(e) => {setMessage(e.target.value)}}
                                    name="message" 
                                    id="message"
                                    rows={10}
                                    placeholder="Digite aqui sua mensagem, por favor…"
                                />
                            </div>

                            <button 
                                type="submit"
                                className="send-button"
                                onClick={formSubmit}
                            >
                                Quero enviar
                            </button>
                        </main>
                    </form>
                </div>

                <div className="thanks" style={{display: !sended ? "none" : "block"}}>
                    <div className="thanks-text">
                        <p>OBRIGADO!</p>
                    </div>
                    
                    <img src={tksHeartImg} alt="Thanks"/>

                    <div className="thanks-text-sm">
                        <p>Sua opinião é muito importante para nós.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Feedbackmodal;