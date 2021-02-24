import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { ApplicationState } from '../../store';
import { Parameter } from '../../store/ducks/parameters/types';
import * as ParameterActions from '../../store/ducks/parameters/actions';
import { Step } from '../../store/ducks/steps/types';
import * as StepActions from '../../store/ducks/steps/actions';

import Button from '../../components/Button';
import PageHeader from '../../components/PageHeader';
import PageFooter from '../../components/PageFooter';
import Slogan from '../../components/Slogan';
import Modal from '../../components/Modal';

import './styles.css';

interface StateProps {
    parameters: Parameter[]
    steps: Step[]
}

interface DispatchProps {
    updateParameters(data: Parameter[]): void
    updateStep(page: string): void
}

type Props = StateProps & DispatchProps;

class Landing extends Component<Props> {
    state = { show: false };

    componentDidMount() {
        if (!this.props.steps.find(({page}) => page === window.location.pathname)?.page)
            this.props.updateStep(window.location.pathname);
    }

    showModal = () => {
        this.setState({ show: true });
    };
  
    hideModal = () => {
        this.setState({ show: false });
    };

    render() {
        return (
            <Fragment>
                <div id="main-page">
                    <div id="content-page" className="landing-page">
                        <PageHeader />
                        <Slogan />

                        <div className="landing-page-campain">
                            <p>
                                Siga os próximos passos e fique 
                                ainda mais perto do seu IPhone 12.
                                Simule, responda e concorra!
                            </p>
                        </div>
        
                        <Button 
                            path="/city"
                            linkClass="btn-top"
                            title="Fazer Auto Simulação"
                            id="Iniciar"
                        />x

                        <Modal show={this.state.show} handleClose={this.hideModal}></Modal>

                        <button id="CorretorIniciar" type="button" className="btn-bottom" onClick={this.showModal}>
                            Falar com Corretor
                        </button>
                    </div>
                    <PageFooter /> 
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    parameters: state.parameters.data,
    steps: state.steps.pages,
    lastPage: state.steps.lastPage
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
        ...ParameterActions, ...StepActions
    }, dispatch
);

export default connect(mapStateToProps,mapDispatchToProps)(Landing);