import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import TagManager from 'react-gtm-module';

import { Block } from '../../store/ducks/blocks/types';
import { Lead } from '../../store/ducks/leads/types';
import { Image } from '../../store/ducks/imagesGallery/types';
import { Step } from '../../store/ducks/steps/types';
import { Enterprise } from '../../store/ducks/enterprises/types';
import { ApplicationState } from '../../store';
import * as BlockActions from '../../store/ducks/blocks/actions';
import * as LeadsActions from '../../store/ducks/leads/actions';
import * as ImagesActions from '../../store/ducks/imagesGallery/actions';
import * as StepActions from '../../store/ducks/steps/actions';
import * as EnterpriseActions from '../../store/ducks/enterprises/actions';

import PageHeader from '../../components/PageHeader';
import Help from '../../components/Help';
import Select from '../../components/CustomSelect/Creatable';
import SmallButton from '../../components/SmallButton';
import api from '../../services/api';
import PageFooter from '../../components/PageFooter';
import history from '../../utils/history';
import Feedback from '../../components/Feedback';

import unavaliableImg from '../../assets/images/unavailable-vertical.svg';

import './styles.css';

interface StateProps {
    blocks: Block[]
    leads: Lead
    images: Image
    steps: Step[]
    lastPage: string
    enterprises: Enterprise[]
}

interface DispatchProps {
    updateBlocks(data: Block[]): void
    updateLead(data: Lead): void
    updateLeadField(field: string, value: string | number | boolean): void
    updateStep(page: string): void
}

type Props = StateProps & DispatchProps;

class BlockChoice extends Component<Props> {    
    state = {        
        selectActive: true,
        active: false,
        floorOptions: [{
            floor: 0
        }],        
        loadingBlocks: true,
        loadingFloors: false,
        previewsPage: '/gallery'
    }

    async componentDidMount() {
        window.scrollTo(0, 0);
        if (this.props.steps.find(({page}) => page === this.state.previewsPage)?.page){
            if (!this.props.steps.find(({page}) => page === window.location.pathname)?.page)
                this.props.updateStep(window.location.pathname);
        }
        else
            history.push(this.props.lastPage);
            
        await api.get(`blocks/getByTypologies?enterpriseId=${this.props.leads.enterprise_id}&typologyId=${this.props.leads.typology_id}`)
            .then(response => {
                this.props.updateBlocks(response.data.blocks);
                this.setState({loadingBlocks: false})
            })
    };

    async getUnit(value: Number) {        
        let v_price = 0, v_entry_price = 0, v_financing_price = 0, count = 0;
        let wheres = this.props.enterprises.find(({id}) => id === this.props.leads.enterprise_id)?.enterprise_type_id === 1 
        ? `wheres[typology_id]=${this.props.leads.typology_id}&wheres[block_id]=${this.props.leads.block_id}&wheres[floor]=${value}&wheres[status][]=1&wheres[status][]=2` 
        : `wheres[typology_id]=${this.props.leads.typology_id}&wheres[block_id]=${value}&wheres[status][]=1&wheres[status][]=2`;

        await api.get(`units/get?select[]=financing_price&select[]=price&select[]=entry_price&${wheres}`)
            .then(response => {                
                Object.keys(response.data.units).forEach(function(keyName, keyIndex) {
                    count = count + 1;
                    let unit = response.data.units[keyName];
                    Object.entries(unit).forEach(([key, value]) => {
                        if (key === 'price')
                            v_price = v_price + Number(value)
                        else if (key === 'entry_price')
                            v_entry_price = v_entry_price + Number(value)
                        else
                            v_financing_price = v_financing_price + Number(value)
                    })
                })                      
                this.props.updateLeadField("price", Math.floor(v_price / count));       
                this.props.updateLeadField("financing_price", Math.floor(v_financing_price / count));       
                this.props.updateLeadField("entry_price", Math.floor(v_entry_price / count));  
            });
    }

    handleOnChangeBlock(value:any) {
        TagManager.dataLayer({
            dataLayer: {
                event: 'selecaoTorre',
                'selecaoTorre': value.label,
            }
        });

        this.props.updateLeadField("block_id", value.value);
        this.props.updateLeadField("block_name", value.label);
        this.setState({
            selectActive: false
        });

        if (this.props.enterprises.find(({id}) => id === this.props.leads.enterprise_id)?.enterprise_type_id === 2) {            
            this.setState({
                active: true
            });
            this.getUnit(value.value);
        } else {
            this.getFloors(value.value);
        }
    };

    async getFloors(value: number) {  
        this.setState({loadingFloors: true})      
        await api.get(`units/get?select[]=floor&wheres[distinct]=1&wheres[block_id]=${value}&wheres[typology_id]=${this.props.leads.typology_id}&wheres[status][]=1&wheres[status][]=2&wheres[orderBy]=floor`)
            .then(response => {
                this.setState({
                    floorOptions: response.data.units,
                    loadingFloors: false,
                })
            });
    }

    handleOnChangeFloor(value:any) {
        TagManager.dataLayer({
            dataLayer: {
                event: 'selecaoAndar',
                'selecaoAndar': value.label,
            }
        });
        
        this.props.updateLeadField("floor", value.value);
        this.setState({
            active: true
        });
        this.getUnit(value.value);
    };
    
    render() {        
        const { blocks } = this.props;
        const { images } = this.props;

        return (
            <div id="main-page">
                <div id="content-page">
                    <PageHeader />
                    <div className="slogan">
                        <p>
                        Escolha <strong>sua torre</strong> e depois<br/>                    
                        o <strong>seu andar</strong></p>
                    </div>                      

                    <Select 
                        isLoading={this.state.loadingBlocks}
                        options={ blocks.map(block => (                            
                            {key: block.id, value: block.id, label: block.name, floors_number: block.floors_number}
                        )) }
                        placeholder="Escolha sua torre" 
                        onChange={(e: any) => { this.handleOnChangeBlock(e) }} 
                    />
                    
                    {this.props.enterprises.find(({id}) => id === this.props.leads.enterprise_id)?.enterprise_type_id === 1 ? 
                        <Select
                        isLoading={this.state.loadingFloors}
                        options={ this.state.floorOptions.map(floor => (
                            {key: floor.floor, value: floor.floor, label: floor.floor + 'º Andar'}
                        )) }
                        placeholder="Escolha seu andar" 
                        isDisabled={this.state.selectActive}
                        onChange={(e: any) => { this.handleOnChangeFloor(e) }} 
                        />
                        : ""
                    }
                    
                    <div className="buttons-sm-block">
                        <SmallButton 
                            path="/howtopay"
                            cssclass="btn-sm-top"
                            title="Avançar"
                            enabled={this.state.active}
                        />

                        <SmallButton 
                            path="/gallery"
                            cssclass="btn-sm-bottom"
                            title="Voltar"
                        />
                    </div>

                    <div className="landscape-view">
                        <img src={this.props.images.cover ? this.props.images.cover : unavaliableImg} alt="landscape-view"/>
                    </div>
                </div>
                <PageFooter />
            </div>
        )
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    blocks: state.blocks.data,
    leads: state.leads.data,
    images: state.images.data,
    steps: state.steps.pages,
    lastPage: state.steps.lastPage,
    enterprises: state.enterprises.data
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
        ...LeadsActions, ...BlockActions, ...ImagesActions, ...StepActions, ...EnterpriseActions
    }, dispatch
);

export default connect(mapStateToProps,mapDispatchToProps)(BlockChoice);