import React, { Component, FormEvent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import ReactToPrint from 'react-to-print';

import PageHeader from '../../components/PageHeader';
import Help from '../../components/Help';
import Input from '../../components/Input';
import File from '../../components/InputFile';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import PageFooter from '../../components/PageFooter';
import { Print } from '../../components/Print';
import Feedback from '../../components/Feedback';

import { Lead } from '../../store/ducks/leads/types';
import { Parameter } from '../../store/ducks/parameters/types';
import { Step } from '../../store/ducks/steps/types';
import * as LeadsActions from '../../store/ducks/leads/actions';
import * as ParameterActions from '../../store/ducks/parameters/actions';
import * as StepActions from '../../store/ducks/steps/actions';
import { ApplicationState } from '../../store';
import history from '../../utils/history';
import api from '../../services/api';
import NumberFormat, { NumberFormatValues } from 'react-number-format';
import Card from '@material-ui/core/Card';

import './styles.css';

interface StateProps {
    leads: Lead
    parameters: Parameter[]
    steps: Step[]
    lastPage: string
}

interface DispatchProps {
    updateLead(data: Lead): void
    updateLeadField(field: string, value: string | number | boolean): void
    updateStep(page: string): void
}

type Props = StateProps & DispatchProps;

class DataForm extends Component<Props> {
    state = {        
        name: true,
        email: true,
        income: true,
        phone: true,
        showConditions: false,
        previewsPage: '/summary',
        sending: false,
        canceling: false
    };

    componentRef: Print | null = null;

    componentDidMount() {
        window.scrollTo(0, 0);
        if (this.props.steps.find(({page}) => page === this.state.previewsPage)?.page){
            if (!this.props.steps.find(({page}) => page === window.location.pathname)?.page)
                this.props.updateStep(window.location.pathname);
        }
        else
            history.push(this.props.lastPage);
            
        this.setState({     
            name: this.props.leads.name !== '' ? false : true,
            email: this.props.leads.email !== '' ? false : true,
            income: this.props.leads.income !== '' ? false : true,
            phone: this.props.leads.phone !== '' ? false : true,
        });
        
        this.setState({            
            showConditions: false
        });
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.props.updateLeadField(event.target.name, event.target.value);
    };

    handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        if(event.target.id == 'file'){
           const img = btoa(event.target.value);
        }
        this.props.updateLeadField(event.target.id, event.target.value);
        this.setState({
            [event.target.id] : event.target.value !== '' ? false : true
        })
    };

    handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
        this.setState({
            showConditions: event.target.value === 'sim' ? true : false,
        })
    }

    onIncomeChange = (value: NumberFormatValues) => {
        this.props.updateLeadField('income', value.value);
        this.setState({
            income : value.value !== '' ? false : true
        })
    }

    async createLead(event?: FormEvent) {
        this.setState({
            sending: event?.currentTarget.id !== 'Cancelar',
            canceling: event?.currentTarget.id === 'Cancelar'
        });
        this.props.updateLeadField('send_lead', event ? (event?.currentTarget.id === 'Cancelar' ? false : true) : true);
        await api.post('leads', this.props.leads)
        .then((response) => {
            this.setState({sending: false, canceling: false});
            history.push("thanks");
        }).catch((err) => {
            console.log(err.response);
            this.setState({sending: false, canceling: false});
            alert('Ops, algo de errado aconteceu. Por favor tente novamente mais tarde!');
        });

        // await api.post(`leads/sendLead`, rdStationDataForm(this.props.leads))
        //     .then((response) => {
        //         // console.log(response);
        //         this.setState({sending: false, canceling: false});
        //         history.push("thanks");
        //     }).catch((e) => {
        //         this.setState({sending: false, canceling: false});
        //         alert('Ops, algo de errado aconteceu. Por favor tente novamente mais tarde!');
        //     });
    }

    handleCreateLead = (event: FormEvent) => {
        event.preventDefault();
        this.createLead();
    }

    /* PDF Download */
    setComponentRef = (ref: Print) => {
        this.componentRef = ref;
    }

    render() {
        const { leads } = this.props;

        return (
            <div id="main-page">
                <div id="content-page" className="data-form-page">
                    <PageHeader />
                   
                    <div className="slogan slogan-dataForm">
                        <p>
                            Agora é só preencher com seus dados para que nossa equipe entre em contato
                        </p>
                    </div>                      
    
                    <form onSubmit={this.handleCreateLead}>
                        <div className="grey-box-shadow">
                            <Input 
                                name="name"
                                label="Escreva seu nome" 
                                defaultValue={leads.name} 
                                placeholder="Nome e sobrenome"
                                onBlur={this.handleBlur}
                                required={true}
                            />
                            <Input 
                                name="email"
                                label="Coloque seu melhor e-mail"  
                                defaultValue={leads.email} 
                                placeholder="exemplo@email.com"
                                onBlur={this.handleBlur}
                                required={true}
                            />
                            <div className="input-block">
                                <label>Seu telefone</label>
                                <NumberFormat 
                                    id="phone"
                                    name="phone"
                                    defaultValue={leads.phone} 
                                    placeholder="(00) 000000-0000" 
                                    format="(##) #####-####" 
                                    mask="_"
                                    onBlur={this.handleBlur}
                                    required={true}
                                />
                            </div> 
                            <div className="input-block">
                                <label>Sua renda</label>
                                <NumberFormat 
                                    id="income"
                                    name="income"
                                    defaultValue={leads.income} 
                                    placeholder="R$ 0.000,00" 
                                    thousandSeparator={'.'} 
                                    decimalSeparator={','} 
                                    prefix={'R$'} 
                                    required={true}
                                    onValueChange={this.onIncomeChange}
                                />
                            </div>
                               
                            <div className="input-block">
                                <label>Seu CPF sem os pontos</label>
                                <NumberFormat 
                                    id="cpf"
                                    name="cpf"
                                    label="Sua CPF sem os pontos"
                                    defaultValue={leads.cpf} 
                                    placeholder="000.000.000-00" 
                                    format="###.###.###-##" 
                                    mask="_"
                                    onBlur={this.handleBlur}
                                    required={false}
                                />
                            </div>  
                            <Card
                            className= "firstCard"
                            >
                                <div className="simulations-page-text-prestes">
                                    <p>
                                        Algum corretor te indicou?
                                    </p>
                                </div> 
                                <FormControl component="fieldset">
                                    <RadioGroup row aria-label="position" name="seller-radio" defaultValue="nao" onChange={this.handleRadioChange}>
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
                                <div className="seller" style={{display: this.state.showConditions ? 'block' : 'none' }}>
                                    <Input 
                                        name="seller" 
                                        label="Escreva o nome do corretor"
                                        defaultValue={leads.seller} 
                                        placeholder="Nome e Sobrenome"
                                        onBlur={this.handleBlur}
                                        required={false}
                                    />
                                    <div className="input-block">
                                        <label>Telefone do corretor</label>
                                        <NumberFormat 
                                            id="seller_phone"
                                            name="seller-phone"
                                            defaultValue={leads.seller_phone} 
                                            placeholder="Telefone com DDD" 
                                            format="(00) 000000-0000" 
                                            mask="_"
                                            onBlur={this.handleBlur}
                                            required={false}
                                        />
                                    </div>
                                </div>
                            </Card>

                            

                            <div className="buttons-sm-block">
                                {leads.summary_action === 'EnviarResumo' ? 
                                    <button 
                                        disabled={this.state.sending}
                                        id="EnviarGeral"
                                        className="btn-sm-top" 
                                        type="submit">
                                            { this.state.sending ? "Enviando..." : "Enviar"}
                                    </button> :                                    
                                    <div>
                                        <ReactToPrint 
                                            content={() => {
                                                if (!this.state.email && !this.state.income && !this.state.name && !this.state.phone)
                                                    return this.componentRef
                                                return null
                                            }}
                                            trigger={() => 
                                                {return <button 
                                                    disabled={this.state.sending}
                                                    id="EnviarGeral"
                                                    type="submit" 
                                                    className="btn-sm-top">
                                                    { this.state.sending ? "Enviando..." : "Imprimir e Finalizar"}
                                                </button>}
                                            }
                                            onAfterPrint={() => history.push("thanks")}
                                            documentTitle="Vendas Digitais - Resumo"
                                        >
                                        </ReactToPrint>
                                        <div style={{display: 'none'}} >
                                            <Print leads={leads} ref={this.setComponentRef} />
                                        </div>
                                    </div>
                                }

                                <button 
                                    disabled={this.state.canceling}
                                    id="Cancelar"
                                    type="reset"
                                    onClick={this.createLead.bind(this)}
                                    className="btn-sm-bottom" >
                                        { this.state.canceling ? "Cancelando..." : "Cancelar"}                                        
                                </button>
                            </div>
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
    parameters: state.parameters.data,
    steps: state.steps.pages,
    lastPage: state.steps.lastPage
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
        ...LeadsActions, ...ParameterActions, ...StepActions
    }, dispatch
);

export default connect(mapStateToProps,mapDispatchToProps)(DataForm);