import React, { Component, FormEvent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import history from '../../utils/history';
import { Link } from 'react-router-dom';

import { Lead } from '../../store/ducks/leads/types';
import { Step } from '../../store/ducks/steps/types';
import * as LeadsActions from '../../store/ducks/leads/actions';
import * as StepActions from '../../store/ducks/steps/actions';
import { ApplicationState } from '../../store';

import PageHeader from '../../components/PageHeader';
import Help from '../../components/Help';
import SmallButton from '../../components/SmallButton';
import PageFooter from '../../components/PageFooter';
import Feedback from '../../components/Feedback';

import Card from '@material-ui/core/Card';
import './styles.css';

interface StateProps {
    leads: Lead
    steps: Step[]
    lastPage: string
}

interface DispatchProps {
    updateLead(data: Lead): void
    updateLeadField(field: string, value: string | number | boolean): void
    updateStep(page: string): void
}

type Props = StateProps & DispatchProps;

class Howtopay extends Component<Props> {
    state = {        
        previewsPage: '/block'
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        if (this.props.steps.find(({page}) => page === this.state.previewsPage)?.page) {
            if (!this.props.steps.find(({page}) => page === window.location.pathname)?.page)
                this.props.updateStep(window.location.pathname);
        }
        else
            history.push(this.props.lastPage);
    }

    handleOnClick(event: FormEvent, key: string) {
        event.preventDefault();

        this.props.updateLeadField("how_to_pay", key);
        history.push(key);
    }

    render() {
        return (
            <div id="main-page">
                <div id="content-page" className="how-to-pay-page">
                    <PageHeader />
                    <div className="slogan">
                        <p>
                            Agora é so qual a melhor forma De você comprar seu imóvel.
                        </p>
                    </div>  

                    <div className="buttons-block">
                        <Card className="Card">

                            <Link 
                                id="FinanciarBanco"
                                to="bankfinancing" 
                                className="btn-top"
                                onClick={(e) => {this.handleOnClick(e, "bankfinancing")}}>
                                    Financiar com o banco
                            </Link><br/>
                            <div className="textBank">
                                <span>
                                    Financiamento Bancário com pagamento em até 35 anos
                                </span>
                            </div>

                        </Card >
                        
                    </div>
    
                    
                    <div className="buttons-block prestes">
                        <Card className="Card">
                            <Link 
                                id="PagarPrestes"
                                to="prestesfinancing" 
                                className="btn-bottom-prestes"
                                onClick={(e) => {this.handleOnClick(e, "prestesfinancing")}}>
                                    Parcelar com a Prestes
                            </Link><br/>
                            <div className="textBank">
                                <span>
                                    Parcelamento diretamente com a Prestes pagamento em até 60x
                                </span>
                            </div>
                        </Card > 
                    </div>
                    
    
                    <div className="page-text-tiny">
                        <p>
                            *O prazo total de financiamento ou do parcelamento direto com a 
                            Prestes dependerão do perfil do cliente e do empreendimento escolhido
                        </p>
                    </div>
    
                    <div className="buttons-sm-block">
                        <SmallButton 
                            path="/block"
                            cssclass="btn-sm-bottom"
                            title="Voltar"
                        />
                    </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(Howtopay);