import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import PageHeader from '../../components/PageHeader';
import Help from '../../components/Help';

import { Lead } from '../../store/ducks/leads/types';
import { Typology } from '../../store/ducks/typologies/types';
import { Step } from '../../store/ducks/steps/types';
import { ApplicationState } from '../../store';
import * as LeadsActions from '../../store/ducks/leads/actions';
import * as TypologiesActions from '../../store/ducks/typologies/actions';
import * as StepActions from '../../store/ducks/steps/actions';
import SmallButton from '../../components/SmallButton';
import PageFooter from '../../components/PageFooter';
import Feedback from '../../components/Feedback';
import history from '../../utils/history';

import InnerImageZoom from 'react-inner-image-zoom';

import unavaliableImg from '../../assets/images/unavailable-horizontal.svg';

import './styles.css';
import '../../components/InnerImageZoom/styles.css';

interface StateProps {
    leads: Lead
    typologies: Typology[]
    steps: Step[]
    lastPage: string
}

interface DispatchProps {
    updateLead(data: Lead): void
    updateLeadField(field: string, value: string | number | boolean): void
    updateStep(page: string): void
}

type Props = StateProps & DispatchProps;

class TypologyImage extends Component<Props> { 
    state = {
        previewsPage: '/enterprise',
        cover: ''
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        if (!this.props.steps.find(({page}) => page === this.state.previewsPage)?.page)
            history.push(this.props.lastPage);
        this.setState({
            cover: this.props.typologies.find(({id}) => id === this.props.leads.typology_id)?.cover
        })
    }
    
    render() {        
        return (
            <div id="main-page">
                <div id="content-page" className="typology-img-page">
                    <PageHeader />
                    <div className="slogan">
                        <p>
                        <strong>Selecione a tipologia </strong><br/>                    
                        que mais combina com você</p>
                    </div>  

                    <div className="box-shadow">
                        <InnerImageZoom 
                            src={this.state.cover ? this.state.cover : unavaliableImg} 
                            zoomSrc={this.state.cover ? this.state.cover : unavaliableImg}
                            alt={this.props.leads.typology_name} 
                            fullscreenOnMobile={true} 
                            moveType="drag"
                        />
                    </div>
                    
                    <div className="buttons-sm-block">
                        <SmallButton 
                            path="/block"
                            cssclass="btn-sm-top"
                            title="Avançar"
                        />

                        <SmallButton 
                            path="/typology"
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
    leads: state.leads.data,
    typologies: state.typologies.data,
    steps: state.steps.pages,
    lastPage: state.steps.lastPage
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
        ...LeadsActions, ...TypologiesActions, ...StepActions
    }, dispatch
);

export default connect(mapStateToProps,mapDispatchToProps)(TypologyImage);