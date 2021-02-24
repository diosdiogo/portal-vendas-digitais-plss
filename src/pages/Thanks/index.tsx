import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { Lead } from '../../store/ducks/leads/types';
import { Step } from '../../store/ducks/steps/types';
import * as LeadsActions from '../../store/ducks/leads/actions';
import * as StepActions from '../../store/ducks/steps/actions';
import { ApplicationState } from '../../store';

import PageHeader from '../../components/PageHeader';
import PageFooter from '../../components/PageFooter';
import Button from '../../components/Button';
import history from '../../utils/history';
import Feedback from '../../components/Feedback';
import thanksHeartImg from '../../assets/images/thanks-heart.svg';
import thanksBrokenHeartImg from '../../assets/images/thanks-broken-heart.svg';

import './styles.css';

interface StateProps {
    leads: Lead
    steps: Step[]
    lastPage: string
}

interface DispatchProps {
    updateLead(data: Lead): void
    updateLeadField(field: string, value: string | number | boolean): void
    resetLead(): void
    updateStep(page: string): void
}

type Props = StateProps & DispatchProps;

class Thanks extends Component<Props> {
    state = {
        send_lead: this.props.leads.send_lead,
        previewsPage: '/dataform'
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        if (this.props.steps.find(({page}) => page === this.state.previewsPage)?.page){
            if (!this.props.steps.find(({page}) => page === window.location.pathname)?.page)
                this.props.updateStep(window.location.pathname);
        }
        else
            history.push(this.props.lastPage);
         
        if (this.state.send_lead) {
            this.props.resetLead();
            localStorage.removeItem('state');
        }
    };

    render() {
        return (
            <div id="page-thanks">
                <div id="thanks-page-content">
                    <PageHeader />
                    <Feedback startShowing={true} />
                    <div className="slogan">
                        <p>{ this.state.send_lead ? "OBRIGADO!" : "AI QUE PENA" }</p>
                    </div>   

                    <img src={this.state.send_lead ? thanksHeartImg : thanksBrokenHeartImg} alt="Ajuda"/>
    
                    <div className="thanks-page-text">
                        <p>{ this.state.send_lead ? 
                            'Em breve você será contatado' :
                            'Caso mude de ideia CLIQUE NO BOTÃO ABAIXO '
                        }
                        </p>
                        <p>{ this.state.send_lead ? 
                            'pelos nossos corretores.' :
                            'para fazer sua simulação novamente.'
                        }
                        </p>
                    </div> 
        
                    {!this.state.send_lead && 
                    (<Button
                        path={this.props.leads.how_to_pay}
                        linkClass="btn-top"
                        title="Voltar"
                        id="Iniciar"
                    />)}
                </div>
                <PageFooter />
            </div>
        )
    }
}


const mapStateToProps = (state: ApplicationState) => ({
    leads: state.leads.data,
    steps: state.steps.pages,
    lastPage: state.steps.lastPage
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
        ...LeadsActions, ...StepActions
    }, dispatch
);

export default connect(mapStateToProps,mapDispatchToProps)(Thanks);