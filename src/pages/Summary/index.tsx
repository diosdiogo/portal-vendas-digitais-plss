import React, { Component, FormEvent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';

import PageHeader from '../../components/PageHeader';
import Help from '../../components/Help';
import SmallButton from '../../components/SmallButton';
import PageFooter from '../../components/PageFooter';
import Feedback from '../../components/Feedback';
import SetaRight from '../../assets/images/seta-right-gray.svg';

import externalLinkImg from '../../assets/images/external-link.svg';

import { Lead } from '../../store/ducks/leads/types';
import { Step } from '../../store/ducks/steps/types';
import * as LeadsActions from '../../store/ducks/leads/actions';
import * as StepActions from '../../store/ducks/steps/actions';
import { ApplicationState } from '../../store';
import history from '../../utils/history';

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

class Summary extends Component<Props> {
    state = {        
        checked: false,
        entry: 0,
        entryValue: 0
    };

    componentDidMount() {
        window.scrollTo(0, 0);
        if (this.props.steps.find(({page}) => page === '/bankfinancing' || page === '/prestesfinancing')?.page) {
            if (!this.props.steps.find(({page}) => page === window.location.pathname)?.page)
                this.props.updateStep(window.location.pathname);
        }
        else
            history.push(this.props.lastPage);
            
        this.setState({
            entry: this.props.leads.how_to_pay === 'bankfinancing' ? this.props.leads.signal : 
                    this.props.leads.pay_in_cash === 'sim' ? 100 : this.props.leads.entry_percentage,
            entryValue: this.props.leads.how_to_pay === 'prestesfinancing' ? 
                    Math.floor((this.props.leads.price * (this.props.leads.entry_percentage/100))) 
                    : 0
        });
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.type === 'checkbox') {
            this.setState({ checked:event.target.checked })
        } else {
            this.props.updateLeadField(event.target.name, event.target.value);
        }
    };

    buttonOnClick = (event: FormEvent) => {
        event.preventDefault();
        this.props.updateLeadField("summary_action", event.currentTarget.id);
        history.push("dataform");
    }

    render() {
        const { leads } = this.props;

        return (
            <div id="main-page">
                <div id="content-page" className="summary-page">
                    <PageHeader />
                    
                    <div className="slogan slogan-bankFinancing">
                        <p>
                            Aqui está todas as suas escolhas. Se estiver tudo certo, é só clicar em enviar ou imprimir.
                        </p>
                    </div>     
                     
                    <div className="grey-box-shadow">
                        <div className="summary-page-item">
                            <div className="value-box">
                                <div className="value-box-first">
                                    Empreendimento: 
                                </div>
                                <div>
                                    <img src={ SetaRight } alt="set" className="iconSvg"/>
                                </div>
                            </div>

                            <div className="value-box"><strong>{leads.enterprise_name}</strong></div>                            
                        </div>
                        
                        <div className="summary-page-item">
                            <div className="value-box">
                                <div className="value-box-first">
                                    Andar:
                                </div>
                                <div>
                                    <img src={ SetaRight } alt="set" className="iconSvg"/>
                                </div>
                            </div>
                            <div className="value-box"><strong>{leads.floor}.º</strong></div>                            
                        </div>
                        
                        <div className="summary-page-item">
                            <div className="value-box">
                                <div className="value-box-first">
                                    Torre:
                                </div>
                                <div>
                                    <img src={ SetaRight } alt="set" className="iconSvg"/>
                                </div>
                            </div>
                            <div className="value-box"><strong>{leads.block_name}</strong></div>                            
                        </div>
                        
                        <div className="summary-page-item">
                            <div className="value-box">
                                <div className="value-box-first">
                                    Tipologia:
                                </div>
                                <div>
                                    <img src={ SetaRight } alt="set" className="iconSvg"/>
                                </div>
                            </div>
                            <div className="value-box"><strong>{leads.typology_name}</strong></div>                            
                        </div>
                        
                        <div className="summary-page-item">
                            <div className="value-box">
                                <div className="value-box-first">
                                    Valor do produto:
                                </div>
                                <div>
                                    <img src={ SetaRight } alt="set" className="iconSvg"/>
                                </div>
                            </div>
                            <div className="value-box"><strong>R$ <NumberFormat 
                                                        value={leads.price} 
                                                        displayType={'text'} 
                                                        format={leads.price < 1000 ? "###" : 
                                                                leads.price < 10000 ? "#.###" : 
                                                                leads.price < 100000 ? "##.###" : "###.###"}/></strong>
                            </div>                            
                        </div>

                        <div className="summary-page-item" style={{display: leads.how_to_pay === 'bankfinancing' ? 'flex' : 'none' }}>
                            <div className="value-box">
                                <div className="value-box-first">
                                    Valor do financiamento:
                                </div>
                                <div>
                                    <img src={ SetaRight } alt="set" className="iconSvg"/>
                                </div>
                            </div>
                            <div className="value-box"><strong>R$ <NumberFormat 
                                                        value={leads.financing_price} 
                                                        displayType={'text'} 
                                                        format={leads.financing_price < 1000 ? "###" : 
                                                                leads.financing_price < 10000 ? "#.###" : 
                                                                leads.financing_price < 100000 ? "##.###" : "###.###"}/></strong>
                            </div>                            
                        </div>                     
                        
                        <div className="summary-page-item">
                            <div className="value-box">
                                <div className="value-box-first">
                                    {leads.how_to_pay === 'bankfinancing' ? "Valor de entrada" : "% de entrada"}:
                                </div>
                                <div>
                                    <img src={ SetaRight } alt="set" className="iconSvg"/>
                                </div>
                            </div>
                            <div className="value-box"><strong>{leads.how_to_pay === 'bankfinancing' ? "R$ " : ""}<NumberFormat 
                                                        value={this.state.entry} 
                                                        displayType={'text'} 
                                                        format={this.state.entry < 1000 ? "###" :
                                                                this.state.entry < 10000 ? "#.###" : "##.###" }/></strong>
                            </div>                            
                        </div>
                        
                        <div className="summary-page-item" style={{display: leads.how_to_pay === 'prestesfinancing' ? 'flex' : 'none' }}>
                            <div className="value-box">
                                <div className="value-box-first">
                                    Valor de entrada:
                                </div>
                                <div>
                                    <img src={ SetaRight } alt="set" className="iconSvg"/>
                                </div>
                            </div>
                            <div className="value-box"><strong>R$ <NumberFormat 
                                                        value={this.state.entryValue} 
                                                        displayType={'text'} 
                                                        format={this.state.entryValue < 1000 ? "###" :
                                                                this.state.entryValue < 10000 ? "#.###" : 
                                                                this.state.entryValue < 100000 ? "##.###" : "###.###" }/></strong>
                            </div>                            
                        </div>   
                        
                        <div className="summary-page-item">
                            <div className="value-box">
                                <div className="value-box-first">
                                    Parcelas:
                                </div>
                                <div>
                                    <img src={ SetaRight } alt="set" className="iconSvg"/>
                                </div>
                            </div>
                            <div className="value-box"><strong>{leads.installments_number}x de R$ <NumberFormat 
                                                        value={leads.installment_value} 
                                                        displayType={'text'} 
                                                        format={leads.installment_value < 1000 ? "###" : 
                                                                leads.installment_value < 10000 ? "#.###" : 
                                                                leads.installment_value < 100000 ? "##.###" : "###.###"}/></strong>
                            </div>                            
                        </div>

                        {/* <div className="summary-page-item">
                            <div className="value-box-message">
                                <p>
                                    Mensagem
                                </p>
                                <p>
                                    <strong>{leads.message}</strong>
                                </p>
                            </div>                          
                        </div> */}

                        <p>
                            *Atenção é necessário concordar com os termos uso, clicar no botão imprimir/enviar, 
                            preencher e enviar seus dados no formulário da próxima página para a validar 
                            sua participação no concurso.
                        </p>

                        <label className="summary-form-check"> 
                            <div className="terms">
                                Li e concordo com os 
                                <a target="_blank" href="https://www.prestes.com/privacidade/">
                                    termos de uso        
                                    <img src={externalLinkImg} alt="external-link"/>                             
                                </a>
                                e 
                                <a target="_blank" href="https://storage.googleapis.com/arquivos-vendas-digitais/Regulamento_lancamento.pdf">
                                    regulamento do concurso cultural
                                    <img src={externalLinkImg} alt="external-link"/>                                    
                                </a>
                            </div>
                            <input 
                                id="terms"
                                type="checkbox"  
                                name="terms"
                                defaultChecked={this.state.checked} 
                                onChange={this.handleChange} 
                            />
                            <span className="checkmark"></span>
                        </label>
                    
                        <div className="buttons-sm-block">
                            <button 
                                className="btn-sm-top" 
                                type="button"
                                disabled={!this.state.checked}
                                id="EnviarResumo"
                                onClick={this.buttonOnClick}
                            >
                                    Enviar
                            </button>
                            
                            <button 
                                className="btn-sm-bottom" 
                                type="button"
                                disabled={!this.state.checked}
                                id="Imprimir"
                                onClick={this.buttonOnClick}
                            >
                                    Imprimir
                            </button>
                        </div>
                    </div>
    
                    <div className="buttons-sm-block-back">
                        <SmallButton 
                            path={leads.how_to_pay}
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

export default connect(mapStateToProps,mapDispatchToProps)(Summary);