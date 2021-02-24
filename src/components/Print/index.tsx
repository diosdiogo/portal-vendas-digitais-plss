import React from 'react';
import NumberFormat from 'react-number-format';

import { Lead } from '../../store/ducks/leads/types';
import PageHeader from '../PageHeader';
import TinyText from '../TinyText';

import './styles.css';

interface PdfProps {
    leads: Lead
    children?: React.ReactChildren
}

export class Print extends React.Component<PdfProps> {
    state = {
        entry: this.props.leads.how_to_pay === 'bankfinancing' ? this.props.leads.signal : 
                this.props.leads.pay_in_cash === 'sim' ? 100 : this.props.leads.entry_percentage,
        entryValue: this.props.leads.how_to_pay === 'prestesfinancing' ? 
                Math.floor((this.props.leads.price * (this.props.leads.entry_percentage/100))) 
                : 0
    }

    render() {
        const { leads } = this.props;

        return (
            <div id="pdf-form-page-content">
                <PageHeader />
                <div className="slogan">
                    <p><strong>Parabéns</strong>, você fez a melhor escolha! </p>
                </div> 
                
                <div className="box-shadow">
                        <div className="pdf-page-item">
                            <div className="value-box">Empreendimento:</div>
                            <div className="value-box"><strong>{leads.enterprise_name}</strong></div>                            
                        </div>
                        
                        <div className="pdf-page-item">
                            <div className="value-box">Andar:</div>
                            <div className="value-box"><strong>{leads.floor}.º</strong></div>                            
                        </div>
                        
                        <div className="pdf-page-item">
                            <div className="value-box">Torre:</div>
                            <div className="value-box"><strong>{leads.block_name}</strong></div>                            
                        </div>
                        
                        <div className="pdf-page-item">
                            <div className="value-box">Tipologia:</div>
                            <div className="value-box"><strong>{leads.typology_name}</strong></div>                            
                        </div>
                        
                        <div className="pdf-page-item">
                            <div className="value-box">Valor do produto:</div>
                            <div className="value-box"><strong>R$ <NumberFormat 
                                                        value={leads.price} 
                                                        displayType={'text'} 
                                                        format={leads.price < 1000 ? "###" : 
                                                                leads.price < 10000 ? "#.###" : 
                                                                leads.price < 100000 ? "##.###" : "###.###"}/></strong>
                            </div>                            
                        </div>

                        <div className="pdf-page-item" style={{display: leads.how_to_pay === 'bankfinancing' ? 'flex' : 'none' }}>
                            <div className="value-box">Valor do financiamento:</div>
                            <div className="value-box"><strong>R$ <NumberFormat 
                                                        value={leads.financing_price} 
                                                        displayType={'text'} 
                                                        format={leads.financing_price < 1000 ? "###" : 
                                                                leads.financing_price < 10000 ? "#.###" : 
                                                                leads.financing_price < 100000 ? "##.###" : "###.###"}/></strong>
                            </div>                            
                        </div>
                        
                        <div className="pdf-page-item">
                            <div className="value-box">{leads.how_to_pay === 'bankfinancing' ? "Valor de entrada" : "% de entrada"}:</div>
                            <div className="value-box"><strong>{leads.how_to_pay === 'bankfinancing' ? "R$ " : ""}<NumberFormat 
                                                        value={this.state.entry} 
                                                        displayType={'text'} 
                                                        format={this.state.entry < 1000 ? "###" :
                                                                this.state.entry < 10000 ? "#.###" : "##.###" }/></strong>
                            </div>                            
                        </div>
                        
                        <div className="pdf-page-item" style={{display: leads.how_to_pay === 'prestesfinancing' ? 'flex' : 'none' }}>
                            <div className="value-box">Valor de entrada</div>
                            <div className="value-box"><strong>R$ <NumberFormat 
                                                        value={this.state.entryValue} 
                                                        displayType={'text'} 
                                                        format={this.state.entryValue < 1000 ? "###" :
                                                                this.state.entryValue < 10000 ? "#.###" : 
                                                                this.state.entryValue < 100000 ? "##.###" : "###.###" }/></strong>
                            </div>                            
                        </div>   
                        
                        <div className="pdf-page-item">
                            <div className="value-box">Parcelas:</div>
                            <div className="value-box"><strong>{leads.installments_number}x de R$ <NumberFormat 
                                                        value={leads.installment_value} 
                                                        displayType={'text'} 
                                                        format={leads.installment_value < 1000 ? "###" : 
                                                                leads.installment_value < 10000 ? "#.###" : 
                                                                leads.installment_value < 100000 ? "##.###" : "###.###"}/></strong>
                            </div>                            
                        </div>       

                        <div className="pdf-page-item">
                            <div className="value-box-message">
                                <p>
                                    Mensagem
                                </p>
                                <p>
                                    <strong>{leads.message}</strong>
                                </p>
                            </div>                          
                        </div>                 
        
                        <TinyText />
                    </div>
            </div>
        )
    }
}