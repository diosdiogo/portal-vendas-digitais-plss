import React, { MouseEventHandler } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { FiXCircle } from 'react-icons/fi';

import { ApplicationState } from '../../store';
import { Parameter } from '../../store/ducks/parameters/types';
import * as ParameterActions from '../../store/ducks/parameters/actions';

import './styles.css';

interface ModalProps {
    handleClose: MouseEventHandler;
    show: boolean;
}

interface StateProps {
    parameters: Parameter[]
}

interface DispatchProps {
    updateParameters(data: Parameter[]): void
}

type Props = StateProps & DispatchProps & ModalProps;

const Modal: React.FC<Props> = (props) => {    
    const showHideClassName = props.show ? "modal display-block" : "modal display-none";
    return (
        <div id="help-page" className={showHideClassName}>
            <section id="help-page-content" className="modal-main">
                <div className="box-help">
                    <div className="btn-close">
                        <a onClick={props.handleClose}>
                            <FiXCircle size={32} color={'#050000'}/>
                        </a>
                    </div>
                    <div className="help-title">
                        <p>PRECISA DE AJUDA?</p>
                    </div>        

                    <div className="help-text">
                        <p>Fale com um dos nossos corretores agora mesmo!</p>
                    </div> 

                    <div className="btn-contact">
                        <a id="Corretor" target="_blank" rel="noopener noreferrer" href={`https://wa.me/55${ props.parameters.find(({name}) => name === 'WhatsApp')?.value }`}>
                            Quero falar com o corretor
                        </a>
                    </div>              
                </div>
            </section>
        </div>
    );
}

const mapStateToProps = (state: ApplicationState) => ({
    parameters: state.parameters.data
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
        ...ParameterActions
    }, dispatch
);

export default connect(mapStateToProps,mapDispatchToProps)(Modal);