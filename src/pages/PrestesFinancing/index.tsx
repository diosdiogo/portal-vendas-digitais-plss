import React, { Component, FormEvent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import TagManager from 'react-gtm-module';
import NumberFormat from 'react-number-format';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import PageHeader from '../../components/PageHeader';
import Help from '../../components/Help';
import SmallButton from '../../components/SmallButton';
import Slider from '../../components/CustomSlider/SliderStyles';
import PageFooter from '../../components/PageFooter';
import history from '../../utils/history';
import TinyText from '../../components/TinyText';
import { entryValue, installmentsValue } from '../../utils/mathFunctions';
import Feedback from '../../components/Feedback';

import { Lead } from '../../store/ducks/leads/types';
import { Step } from '../../store/ducks/steps/types';
import { Enterprise } from '../../store/ducks/enterprises/types';
import * as LeadsActions from '../../store/ducks/leads/actions';
import * as StepActions from '../../store/ducks/steps/actions';
import * as EnterpriseActions from '../../store/ducks/enterprises/actions';
import { ApplicationState } from '../../store';
import Card from '@material-ui/core/Card';

import './styles.css';

interface StateProps {
    leads: Lead
    steps: Step[]
    lastPage: string
    enterprises: Enterprise[]
}

interface DispatchProps {
    
    updateLead(data: Lead): void
    updateLeadField(field: string, value: string | number | boolean): void
    updateStep(page: string): void
}

type Props = StateProps & DispatchProps;

class PrestesFinancing extends Component<Props> {
    state = {        
        entryActive: false,
        installmentsActive: false,
        entryValue:0,
        entry: 0,
        installments: 2,
        showConditions: false,
        errors: {
            entryError: false,
            installmentsError: false,
        },
        previewsPage: '/howtopay'
    }
    
    componentDidMount() {
        window.scrollTo(0, 0);
        if (this.props.steps.find(({page}) => page === this.state.previewsPage)?.page){
            if (!this.props.steps.find(({page}) => page === window.location.pathname)?.page)
                this.props.updateStep(window.location.pathname);
        }
        else
            history.push(this.props.lastPage);
            
        if (this.props.leads.entry_percentage) {
            this.setState({
                entry: this.props.leads.entry_percentage,
                entryValue: entryValue(this.props.leads.price, Number(this.props.leads.entry_percentage)),
            });
        }

        this.setState({
            showConditions: this.props.leads.pay_in_cash === '' ? false : 
                this.props.leads.pay_in_cash === 'sim' ? false : true,
        })
        
        this.props.updateLeadField("installment_value", installmentsValue(this.props.leads.price, (this.props.leads.price * (this.props.leads.entry_percentage/100)), this.props.leads.installments_number));
    };

    handleSliderChangeEntry = (event: any, newValue: number | number[]) => {
        TagManager.dataLayer({
            dataLayer: {
                event: 'percentEntrada',
                'percentEntrada': String(newValue),
            }
        });
        
        this.props.updateLeadField("entry_percentage", Number(newValue));
        this.setState({
            entry: newValue,
            entryValue: entryValue(this.props.leads.price, Number(newValue)),
            entryActive: true
        })
        this.props.updateLeadField("installment_value", installmentsValue(this.props.leads.price, (this.props.leads.price * (Number(newValue)/100)), this.props.leads.installments_number));
    };

    handleSliderChangeInstallments = (event: any, newValue: number | number[]) => {
        TagManager.dataLayer({
            dataLayer: {
                event: 'numeroParcelas',
                'numeroParcelas': String(newValue),
            }
        });
        
        this.props.updateLeadField("installments_number", Number(newValue));
        this.setState({
            installments: newValue,
            installmentsActive: true
        })
        this.props.updateLeadField("installment_value", installmentsValue(this.props.leads.price, (this.props.leads.price * (this.state.entry/100)), Number(newValue)));
    };

    handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            showConditions: event.target.value === 'sim' ? false : true,
        })

        TagManager.dataLayer({
            dataLayer: {
                event: 'tipoPagamento',
                'tipoPagamento': event.target.value === 'sim' ? 'a Vista' : 'a Prazo',
            }
        });

        this.props.updateLeadField("pay_in_cash", event.target.value);

        if (event.target.value === 'sim') {
            this.props.updateLeadField("installment_value", this.props.leads.price);
            this.props.updateLeadField("installments_number", 1);
            this.props.updateLeadField("entry_percentage", 0);
        } else {
            this.props.updateLeadField("installment_value", installmentsValue(this.props.leads.price, (this.props.leads.price * (this.state.entry/100)), this.state.installments));
            this.props.updateLeadField("installments_number", this.state.installments);
            this.props.updateLeadField("entry_percentage", this.state.entry);
        }
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.props.updateLeadField(event.target.name, event.target.value);
    };

    onSubmitForm(event: FormEvent) {
        event.preventDefault();
        let errors = false;
        this.setState({
            errors: {
                entryError: false,
                installmentsError: false,
            }
        });
        
        if (!this.state.showConditions)
            history.push("summary");
        else {
            this.setState({
                errors: {
                    entryError: this.props.leads.entry_percentage <= 1 ?? true,
                    installmentsError: this.props.leads.installments_number <= 1 ?? true
                }
            });

            if (this.props.leads.entry_percentage <= 1)
                document.getElementsByClassName('entrySlider')[0].scrollIntoView();
            else if (this.props.leads.installments_number <= 1)
                document.getElementsByClassName('installmentsSlider')[0].scrollIntoView();

            errors = this.props.leads.entry_percentage <= 1 || this.props.leads.installments_number <= 1
        }

        if (!errors) 
            history.push("summary");
        return
    }
    
    render () {
        const { leads } = this.props;
        return (
            <div id="main-page">
                <div id="content-page" className="simulations-page">
                    <PageHeader />
                    <div className="slogan slogan-bankFinancing">
                        <p>
                            Agora é so qual a melhor forma De você comprar seu imóvel.
                        </p>
                    </div>

                    <Card
                    className= "firstCard"
                    >
                        <div className="simulations-page-text-prestes"> 
                            <p>Valor do imóvel</p>
                        </div>

                        <div className="currency-text-prestes"> 
                            <p><NumberFormat 
                                value={leads.price} 
                                displayType={'text'} 
                                format={leads.price < 1000 ? "###" : 
                                        leads.price < 10000 ? "#.###" : 
                                        leads.price < 100000 ? "##.###" : "###.###"} /></p>
                        </div>  

                    </Card>
                    {/* <Card
                    className= "firstCard"
                    >
                        <div className="simulations-page-text-prestes"> 
                            <p>Valor do financiamento</p>
                        </div>
                        
                    </Card> */}

                    <form onSubmit={this.onSubmitForm.bind(this)}>
                        <Card
                        className= "firstCard"
                        >
                            <div className="simulations-page-text-prestes">
                                <p>Vou pagar a vista</p>
                            </div>

                            <FormControl component="fieldset">
                                <RadioGroup row aria-label="position" name="position" defaultValue={leads.pay_in_cash} onChange={this.handleRadioChange}>
                                    <FormControlLabel 
                                        className="sim"
                                        value="sim" 
                                        control={<Radio required={true}  color="primary" disableRipple={true} />}
                                        label="Sim" 
                                    />

                                    <FormControlLabel
                                        className="nao"
                                        value="nao"
                                        control={<Radio required={true}  color="primary" disableRipple={true} />}
                                        label="Não"
                                        labelPlacement="end"
                                    />
                                </RadioGroup>
                            </FormControl>

                        </Card>

                         <Card
                        className= "firstCard"
                        style={{display: this.state.showConditions ? 'block' : 'none' }}
                        >
                            <div className="simulations-page-text-sm-prestes" >
                                <p>Escolha quantos % de entrada, em 
                                quantas vezes a parcela, 
                                arrastando até o número desejado.</p>
                            </div>

                            <div className="simulations-page-text-prestes">
                                ENTRADA DE<br />
                                R$ 
                                    <NumberFormat 
                                        value={this.state.entryValue} 
                                        displayType={'text'} 
                                        format={
                                            this.state.entryValue < 1000 ? "###" : 
                                            this.state.entryValue < 10000 ? "#.###" : 
                                            this.state.entryValue < 100000 ? "##.###" : "###.###" 
                                        } 
                                    />
                                
                            </div>
                            <div className="simulations-page-slider entrySlider">
                                <Slider 
                                    step={null}
                                    marks={[
                                        { value: 20, label: '20%' },
                                        { value: 30, label: '30%' },
                                        { value: 40, label: '40%' },
                                        { value: 50, label: '50%' },
                                        { value: 60, label: '60%' },
                                    ]}
                                    value={leads.entry_percentage}
                                    defaultValue={20}
                                    min={10}
                                    max={70}
                                    valueLabelDisplay="off"  
                                    onChange={this.handleSliderChangeEntry}
                                />
                            </div>
                            {this.state.errors.entryError && <p className="error" style={{color: "red"}}><strong>Selecione o % de entrada</strong></p> }

                            <div className="simulations-page-text-prestes">
                                <p><strong>{leads.installments_number}</strong>x PARCELAS <br /> R$  
                                <NumberFormat 
                                    value={leads.installment_value} 
                                    displayType={'text'} 
                                    format={
                                        leads.installment_value < 1000 ? "###" : 
                                        leads.installment_value < 10000 ? "#.###" : 
                                        leads.installment_value < 100000 ? "##.###" : "###.###" 
                                    } 
                                />
                                </p>
                            </div>
                            
                            <div className="simulations-page-slider installmentsSlider">
                                <Slider 
                                    step={1}                                        
                                    marks={[{value: 0, label: 'Deslize e escolha o número de parcelas'}]}
                                    value={leads.installments_number}
                                    defaultValue={1}
                                    min={2}
                                    max={
                                        this.props.enterprises.find(({id}) => id === this.props.leads.enterprise_id)?.max_installments 
                                        ? this.props.enterprises.find(({id}) => id === this.props.leads.enterprise_id)?.max_installments
                                        : 40
                                    }
                                    valueLabelDisplay="auto"  
                                    onChange={this.handleSliderChangeInstallments}
                                />
                            </div>
                            {this.state.errors.installmentsError && <p className="error" style={{color: "red"}}><strong>Selecione o número de parcelas</strong></p> }
        
                        </Card>

                        <div className="simulations-page-textarea">
                            <textarea  
                                name="message" 
                                defaultValue={leads.message} 
                                placeholder="Monte uma frase Prestes+Experiência Digital e fique mais próximo do seu Iphone 12"
                                required={false}
                                className="textarea-simulations-page"
                                onChange={this.handleChange}
                            /> 
                           
                        </div> 
                        <TinyText />
                                
                        <div className="buttons-sm-block">
                            <button 
                                id="Avancar"
                                className="btn-sm-top" 
                                type="submit"
                                >
                                    Avançar
                            </button>
                            <SmallButton 
                                path="/howtopay"
                                cssclass="btn-sm-bottom"
                                title="Voltar"
                            />
                        </div>
                    </form>
                    
                   
                    
                </div>
                <PageFooter />
            </div>
        )
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    leads: state.leads.data,
    steps: state.steps.pages,
    lastPage: state.steps.lastPage,
    enterprises: state.enterprises.data
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
        ...LeadsActions, ...StepActions, ...EnterpriseActions
    }, dispatch
);

export default connect(mapStateToProps,mapDispatchToProps)(PrestesFinancing);