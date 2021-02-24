import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import TagManager from 'react-gtm-module';

import PageHeader from '../../components/PageHeader';
import Slogan from '../../components/Slogan';
import Help from '../../components/Help';
import Select from '../../components/CustomSelect/Creatable';
import SmallButton from '../../components/SmallButton';
import PageFooter from '../../components/PageFooter';
import Feedback from '../../components/Feedback';
import api from '../../services/api';


import { Enterprise } from '../../store/ducks/enterprises/types';
import * as EnterprisesActions from '../../store/ducks/enterprises/actions';
import { Step } from '../../store/ducks/steps/types';
import * as StepActions from '../../store/ducks/steps/actions';
import { Parameter } from '../../store/ducks/parameters/types';
import * as ParameterActions from '../../store/ducks/parameters/actions';
import { ApplicationState } from '../../store';

import './styles.css';

interface StateProps {
    enterprises: Enterprise[]
    parameters: Parameter[]
    steps: Step[]
    lastPage: string
}

interface DispatchProps {
    updateRequest(): void
    updateEnterprise(data: Enterprise[]): void
    updateStep(page: string): void
}

type Props = StateProps & DispatchProps;

class City extends Component<Props> {    
    state = {
        enterprises: [ ],
        cities: [ ],
        city: '',
        neighborhoods: [ ],
        neighborhood: '',
        selectActive: true,
        backActive: false,
        loadingCities: true,
        loadingNeighborhoods: false,
    }

    async componentDidMount() {
        window.scrollTo(0, 0);
        if (!this.props.steps.find(({page}) => page === window.location.pathname)?.page)
            this.props.updateStep('/city');
        await api.get('enterprises/getCity')
            .then(response => {
                this.setState({
                    cities: response.data.city,
                    loadingCities: false
                })
            })
    };

    handleOnChangeCity(value:any) {

        TagManager.dataLayer({
            dataLayer: {
                event: 'selecaoCidade',
                'selecaoCidade': value.value,
            }
        });

        this.setState({
            city: value.value,
            selectActive: false
        });
        this.getNeighborhood(value.value);
    };

    handleOnChangeNeighborhood(value:any) {  
        /* ReactGA.event({
            category: 'Seleção de bairro',
            action: 'Bairro selecionado',
            label: value.label
        }); */

        TagManager.dataLayer({
            dataLayer: {
                event: 'selecaoBairro',
                'selecaoBairro': value.value,
            }
         });

        this.setState({
            neighborhood: value.value,
            backActive: true
        });
        this.getEnterprise(value.value);
    }

    async getNeighborhood(value:any) {
        this.setState({loadingNeighborhoods: true})
        await api.get(`enterprises/get?wheres[city]=${value}&wheres[active]=1&select[]=neighborhood&wheres[distinct]=1`)
            .then(response => {
                this.fillNeighborhoodOptions(response.data.enterprises);
                this.setState({loadingNeighborhoods: false})
            }); 
    }

    async getEnterprise(value:any) {
        await api.get('enterprises/get?wheres[city]=' + this.state.city + '&wheres[neighborhood]=' + value + '&wheres[active]=1&select[]=id&select[]=name&select[]=landscape_view&select[]=max_installments&select[]=enterprise_type_id&relations[]=gallery&relations[]=cover&relations[]=logotype')
            .then(response => {
                this.setState({
                    enterprises: response.data.enterprises                    
                });           
                this.props.updateEnterprise(response.data.enterprises);
            }); 
    }

    fillNeighborhoodOptions(data: any) {
        var newArray = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].neighborhood !== "" && data[i].neighborhood !== null) {
                newArray.push({
                    key: i,
                    value: data[i].neighborhood,
                    label: data[i].neighborhood
                });
            }
        }
        
        this.setState({neighborhoods: newArray});
    }
    
    render() {   
         
        return (
            <div id="main-page">
                <div id="content-page">
                    <PageHeader />
                    <Slogan />                
                    
                    <Select
                        isLoading={this.state.loadingCities}
                        options={this.state.cities}
                        placeholder="Escolha sua cidade" 
                        onChange={(e: any) => { this.handleOnChangeCity(e) }} 
                    />
    
                    <Select
                        isLoading={this.state.loadingNeighborhoods}
                        options={this.state.neighborhoods}
                        placeholder="Qual bairro você prefere" 
                        isDisabled={this.state.selectActive}
                        onChange={(e: any) => { this.handleOnChangeNeighborhood(e) }} 
                    />

                    <div className="buttons-sm-block btn-city" style={{ display: this.state.backActive ? 'block':'none' }}>
                        <SmallButton 
                            path="/enterprise"
                            cssclass="btn-sm-top"
                            title="Avançar"
                            enabled={this.state.backActive}
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
    parameters: state.parameters.data,
    steps: state.steps.pages,
    lastPage: state.steps.lastPage
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    ...EnterprisesActions, ...ParameterActions, ...StepActions
}, dispatch
);

export default connect(mapStateToProps,mapDispatchToProps)(City);