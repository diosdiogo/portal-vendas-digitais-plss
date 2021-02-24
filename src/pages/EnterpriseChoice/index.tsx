import React, { Component, FormEvent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import TagManager from 'react-gtm-module';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import { Link } from 'react-router-dom';

import { Enterprise } from '../../store/ducks/enterprises/types';
import { Lead } from '../../store/ducks/leads/types';
import { Typology } from '../../store/ducks/typologies/types';
import { Image } from '../../store/ducks/imagesGallery/types';
import { Step } from '../../store/ducks/steps/types';
import { ApplicationState } from '../../store';
import * as EnterprisesActions from '../../store/ducks/enterprises/actions';
import * as LeadsActions from '../../store/ducks/leads/actions';
import * as TypologiesActions from '../../store/ducks/typologies/actions';
import * as ImagesActions from '../../store/ducks/imagesGallery/actions';
import * as StepActions from '../../store/ducks/steps/actions';

import api from '../../services/api';
import history from '../../utils/history';
import PageFooter from '../../components/PageFooter';
import PageHeader from '../../components/PageHeader';
import Help from '../../components/Help';
import SmallButton from '../../components/SmallButton';
import Feedback from '../../components/Feedback';
import CardEnterprise from '../../components/CardEnterprise';
import { FaBuilding, FaHome } from 'react-icons/fa';

import './styles.css';

interface StateProps {
    enterprises: Enterprise[]
    typologies: Typology[]
    leads: Lead
    images: Image
    steps: Step[]
    lastPage: string
}

interface DispatchProps {
    updateEnterpriseField(field: string, value: string | number | boolean | Array<string | number | boolean>): void
    updateTypologies(data: Typology[]): void
    updateLeadField(field: string, value: string | number | boolean): void
    updateImageField(field: string, value: string | number | boolean | Array<string | number | boolean>): void
    updateStep(page: string): void
}

type Props = StateProps & DispatchProps;

class EnterpriseChoice extends Component<Props> {    
    state = {
        isLoading: false,
        previewsPage: '/city'
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
                event: 'selecaoEmpreendimento',
                'selecaoEmpreendimento': value.enterprise.name,
            }
        });

        for (var key in value.enterprise) {
            if (value.enterprise.hasOwnProperty(key)) {           
                this.props.updateLeadField("enterprise_"+key, value.enterprise[key]);
            }
        }
        this.getImages(value.enterprise.id);
        this.getTypologies(value.enterprise.id);
        
    }

    async getImages(id: number) {
        await api.get('enterprises/' + id + '/getImages') 
            .then(response => {      
                this.props.updateImageField("cover",response.data.cover);
                this.props.updateImageField("gallery",response.data.gallery);
                // this.props.updateEnterpriseField("landscape_view", response.data.cover);
            });
    }

    async getTypologies(id: number) {
        await api.get('typologies/getAvailable?enterpriseId='+id)
            .then(response => {      
                this.props.updateTypologies(response.data.typologies);
            });
        history.push("gallery");
    }
    
    render() {        
        const { enterprises } = this.props;

        return (
            <div id="main-page">
                <div id="content-page" className="buttons-blockenterprise-page">
                    <PageHeader />
                    <div className="slogan">
                        <p>
                        <strong>Queremos ajudar você a escolher o empreendimento que mais combina com sua vida.</strong><br/>                    
                        </p>
                    </div>  

                    <div className="box-enterprise">
                        { enterprises.map(enterprise => (

                            <Card className="Card-enterprise">

                                <CardEnterprise 
                                    enterprise={ enterprise } />

                                <CardActions>
                                    <div key={enterprise.id} className="buttons-block"> 
                                        <Link 
                                            to=""       
                                            className="btn-bottom btn-enterprise"
                                            onClick={(e) => {this.handleOnClick(e, {enterprise})}}>                                        
                                               Quero conhecer
                                        </Link>
                                    </div>
                                </CardActions>
                            </Card>
                            
                        ))}
                    </div>
                    
                    <div className="buttons-sm-block buttons-sm-block-enterprise">
                        <SmallButton 
                            path="/city"
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
    enterprises: state.enterprises.data,
    typologies: state.typologies.data,
    leads: state.leads.data,
    images: state.images.data,
    steps: state.steps.pages,
    lastPage: state.steps.lastPage
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
        ...LeadsActions, ...EnterprisesActions, ...TypologiesActions, ...ImagesActions, ...StepActions
    }, dispatch
);

export default connect(mapStateToProps,mapDispatchToProps)(EnterpriseChoice);