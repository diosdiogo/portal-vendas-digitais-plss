import React, { Component, FormEvent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import TagManager from 'react-gtm-module';
import NumberFormat from 'react-number-format';

import { Lead } from '../../store/ducks/leads/types';
import { Step } from '../../store/ducks/steps/types';
import { Enterprise } from '../../store/ducks/enterprises/types';
import * as LeadsActions from '../../store/ducks/leads/actions';
import * as StepActions from '../../store/ducks/steps/actions';
import * as EnterpriseActions from '../../store/ducks/enterprises/actions';
import { ApplicationState } from '../../store';

import PageHeader from '../../components/PageHeader';
import Help from '../../components/Help';
import SmallButton from '../../components/SmallButton';
import Select from '../../components/CustomSelect/Creatable';
import Slider from '../../components/CustomSlider/SliderStyles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import PageFooter from '../../components/PageFooter';
import history from '../../utils/history';
import TinyText from '../../components/TinyText';
import { installmentsValue } from '../../utils/mathFunctions';
import Feedback from '../../components/Feedback';
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

/* TODO Otimizar atualização de installment_value que é feito em vários lugares */
class BankFinancing extends Component<Props> {
    state = {
        installmentsActive: false,
        installments: 2,
        signal: this.props.leads.signal > 0 ? this.props.leads.signal : 0,
        signalChosen: false,
        checked:false,
        showConditions: true,
        errors: {
            signalError: false,
            installmentsError: false,
        },
        previewsPage: '/howtopay'
    }

    componentDidMount() {
        if (this.props.steps.find(({page}) => page === this.state.previewsPage)?.page){
            if (!this.props.steps.find(({page}) => page === window.location.pathname)?.page)
                this.props.updateStep(window.location.pathname);
        }
        else
            history.push(this.props.lastPage);
            
        this.setState({            
            showConditions: this.props.leads.pay_in_cash === '' ? false : 
                this.props.leads.pay_in_cash === 'sim' ? false : true,
        });

        this.props.updateLeadField("installment_value", installmentsValue(this.props.leads.entry_price, this.state.signal, this.props.leads.installments_number));
    };

    handleRadioChangeAVista = (event: React.ChangeEvent<HTMLInputElement>) => {
        TagManager.dataLayer({
            dataLayer: {
                event: 'tipoPagamento',
                'tipoPagamento': event.target.value === 'sim' ? 'a Vista' : 'a Prazo',
            }
        });

        this.props.updateLeadField("pay_in_cash", event.target.value);

        this.setState({
            showConditions: event.target.value === 'sim' ? false : true,
        })

        if (event.target.value === 'sim') {
            this.props.updateLeadField("installment_value", this.props.leads.entry_price);
            this.props.updateLeadField("installments_number", 1);
            this.props.updateLeadField("signal", 0);
        } else {
            this.props.updateLeadField("installment_value", installmentsValue(this.props.leads.entry_price, this.state.signal, this.state.installments));
            this.props.updateLeadField("installments_number", this.state.installments);
            this.props.updateLeadField("signal", this.state.signal);
        }
    };

    handleRadioChangeFgts = (event: React.ChangeEvent<HTMLInputElement>) => {
        TagManager.dataLayer({
            dataLayer: {
                event: 'fgts',
                'fgts': event.target.value,
            }
        });
        
        this.props.updateLeadField("fgts", event.target.value);
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
        this.props.updateLeadField("installment_value", installmentsValue(this.props.leads.entry_price, this.state.signal, Number(newValue)));
    };

    handleOnChangeSelect = (event: any) => {
        TagManager.dataLayer({
            dataLayer: {
                event: 'valorAto',
                'valorAto': String(event.value),
            }
        });

        this.setState({
            signal: event.value,
            signalChosen: true,
        })
        this.props.updateLeadField("signal", event.value);
        this.props.updateLeadField("installment_value", installmentsValue(this.props.leads.entry_price, event.value, this.props.leads.installments_number));
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.props.updateLeadField(event.target.name, event.target.value);
    };
    
    onSubmitForm(event: FormEvent) {
        event.preventDefault();
        let errors = false;
        this.setState({
            errors: {
                signalError: false,
                installmentsError: false,
            }
        });
        
        if (!this.state.showConditions)
            history.push("summary");
        else {
            this.setState({
                errors: {
                    signalError: this.props.leads.signal === 0 ?? true,
                    installmentsError: this.props.leads.installments_number <= 1 ?? true
                }
            });

            if (this.props.leads.signal === 0)
                document.getElementsByClassName('signalSelect')[0].scrollIntoView();
            else if (this.props.leads.installments_number <= 1)
                document.getElementsByClassName('installmentsSlider')[0].scrollIntoView();

            errors = this.props.leads.signal === 0 || this.props.leads.installments_number <= 1
        }

        if (!errors) 
            history.push("summary");
        return
    }

    render() {
        const { leads } = this.props;
        const signalValues = [
            {key: 1000, value: 1000, label: 'R$ 1.000'},
            {key: 2000, value: 2000, label: 'R$ 2.000'},
            {key: 3000, value: 3000, label: 'R$ 3.000'},
            {key: 5000, value: 5000, label: 'R$ 5.000'},
            {key: 10000, value: 10000, label: 'R$ 10.000'}
        ];

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
                            <p>Valor do Imóvel</p>
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

                    <Card
                    className= "firstCard"
                    >
                        
                            <div className="simulations-page-text-prestes"> 
                                    <p>Valor do financiamento</p>
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

                    <Card
                    className="CardBank-valor-entrada"
                    >
                        <div className="simulations-page-text-prestes"> 
                            <p>Valor da entrada</p>
                        </div>

                        <div className="currency-text-prestes"> 
                            <p><NumberFormat value={leads.entry_price} 
                                            displayType={'text'} 
                                            format={leads.entry_price < 1000 ? "###" : 
                                                    leads.entry_price < 10000 ? "#.###" : 
                                                    leads.entry_price < 100000 ? "##.###" : "###.###"} /></p>
                        </div>
                    </Card>

                    {/* <Card
                    className="CardBank-valor-desconto"
                    >
                         <div className="simulations-page-text-prestes"> 
                            <p>Valor de desconto</p>
                        </div>

                    </Card> */}
                    <form onSubmit={this.onSubmitForm.bind(this)}>
                        <div
                        className= "firstCard"
                        >
                                <div className="simulations-page-text-prestes">
                                    <p><strong>Pagar Entrada a vista</strong></p>
                                </div>
                                <FormControl component="fieldset">
                                    <RadioGroup row aria-label="position" name="pay_in_cash" defaultValue={leads.pay_in_cash} onChange={this.handleRadioChangeAVista}>
                                        <FormControlLabel 
                                            className="sim"
                                            value="sim" 
                                            control={<Radio required={true} color="primary" disableRipple={true} />}
                                            label="Sim" 
                                        />
                                        <FormControlLabel
                                            className="nao"
                                            value="nao"
                                            control={<Radio required={true} color="primary" disableRipple={true} />}
                                            label="Não"
                                            labelPlacement="end"
                                        />
                                    </RadioGroup>
                                </FormControl> 

                                <div className="bank-financing-conditions signalSelect" style={{display: this.state.showConditions ? 'block' : 'none' }}>
                                    <div className="select-block select-bankFinancing">
                                        <Select
                                            defaultValue={signalValues.find(value => value.key === leads.signal)}
                                            options={signalValues}
                                            placeholder="Escolha o valor do Ato" 
                                            onChange={this.handleOnChangeSelect.bind(this)} 
                                        />
                                    </div>
                                    {this.state.errors.signalError && <p className="error" style={{color: "red"}}><strong>Selecione o valor do ato</strong></p> }

                                </div> 
                            
                        </div>

                        <Card
                        className= "firstCard"
                        style={{display: this.state.showConditions ? 'block' : 'none' }}
                        >
                            <div className="simulations-page-text-prestes">
                                <p><strong>{leads.installments_number}</strong>x PARCELAS R$</p>
                            </div> 

                            <div className="currency-text-prestes"> 
                            <p>
                                <NumberFormat 
                                    value={leads.installment_value} 
                                    displayType={'text'} 
                                    format={
                                        leads.installment_value < 1000 ? "###" : 
                                        leads.installment_value < 10000 ? "#.###" : "##.###" 
                                    } 
                                />
                            </p>
                        </div>       

                            <div className="simulations-page-slider installmentsSlider">
                                <Slider 
                                    step={1}
                                    marks={[{value: 0}]}
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

                                <TinyText />
                            </div>
                        </Card>

                        <Card
                        className= "firstCard"
                        >
                            <div className="simulations-page-text-prestes">
                                <p><strong>Vou usar meu FGTS</strong></p>
                            </div>

                            <FormControl component="fieldset">
                                <RadioGroup row aria-label="position" name="fgts" defaultValue={leads.fgts} onChange={this.handleRadioChangeFgts}>
                                    <FormControlLabel 
                                        className="sim"
                                        value="sim" 
                                        control={<Radio required={true} color="primary" disableRipple={true} />}
                                        label="Sim" 
                                    />
                                    <FormControlLabel
                                        className="nao"
                                        value="nao"
                                        control={<Radio required={true} color="primary" disableRipple={true} />}
                                        label="Não"
                                        labelPlacement="end"
                                    />
                                </RadioGroup>
                            </FormControl>  

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

                        <div className="buttons-sm-block">
                                <button 
                                    id="Avancar"
                                    className="btn-sm-top" 
                                    type="submit"
                                    // disabled={ this.state.showConditions && (!this.state.entryActive && !this.state.installmentsActive) }
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

export default connect(mapStateToProps,mapDispatchToProps)(BankFinancing);