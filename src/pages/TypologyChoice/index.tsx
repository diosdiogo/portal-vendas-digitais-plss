import React, { Component, FormEvent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import TagManager from 'react-gtm-module';

import PageHeader from '../../components/PageHeader';
import Help from '../../components/Help';
import SmallButton from '../../components/SmallButton';
import history from '../../utils/history';
import PageFooter from '../../components/PageFooter';
import Feedback from '../../components/Feedback';

import { Typology } from '../../store/ducks/typologies/types';
import { Lead } from '../../store/ducks/leads/types';
import { Step } from '../../store/ducks/steps/types';
import { ApplicationState } from '../../store';
import * as TypologyActions from '../../store/ducks/typologies/actions';
import * as LeadsActions from '../../store/ducks/leads/actions';
import * as StepActions from '../../store/ducks/steps/actions';

import './styles.css';

interface StateProps {
    typologies: Typology[]
    leads: Lead
    steps: Step[]
    lastPage: string
}

interface DispatchProps {
    updateTypologies(data: Typology[]): void
    updateLead(data: Lead): void
    updateLeadField(field: string, value: string | number | boolean): void
    updateStep(page: string): void
}

type Props = StateProps & DispatchProps;

class TypologyChoice extends Component<Props> {  
    state = {
        isLoading: false,
        previewsPage: '/enterprise'
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

    handleOnClick(e: FormEvent, value:any) {
        e.preventDefault();

        if (!this.state.isLoading)
            this.setState({isLoading: true});
        else
            return;

        TagManager.dataLayer({
            dataLayer: {
                event: 'selecaoTipologia',
                'selecaoTipologia': value.typology.name,
            }
        });

        this.props.updateLeadField("typology_id", value.typology.id);
        this.props.updateLeadField("typology_name", value.typology.name);
        history.push("typologyimage");
    }
    
    render() {        
        const { typologies } = this.props;
        
        return (
            <div id="main-page">
                <div id="content-page" className="typology-page">
                    <PageHeader />
                    <div className="slogan">
                        <p>
                        <strong>Selecione a tipologia </strong><br/>                    
                        que mais combina com você</p>
                    </div>  

                    <div className="box-shadow">
                        { typologies.map(typology => (
                            <div key={typology.id} className="buttons-block"> 
                                <Link 
                                    to="" 
                                    className="btn-bottom"
                                    onClick={(e) => {this.handleOnClick(e, {typology})}}>
                                        {typology.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                    
                    <div className="buttons-sm-block">
                        <SmallButton 
                            path="/gallery"
                            cssclass="btn-sm-bottom"
                            title="Recuar"
                        />
                    </div>
                </div>
                <PageFooter />
            </div>
        )
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    typologies: state.typologies.data,
    leads: state.leads.data,
    steps: state.steps.pages,
    lastPage: state.steps.lastPage
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
        ...LeadsActions, ...TypologyActions, ...StepActions
    }, dispatch
);

export default connect(mapStateToProps,mapDispatchToProps)(TypologyChoice);