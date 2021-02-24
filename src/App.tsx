import React, { Component } from 'react';
import Routes from './routes';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import TagManager from 'react-gtm-module';

import { ApplicationState } from '../src/store';
import { Parameter } from '../src/store/ducks/parameters/types';
import * as ParameterActions from '../src/store/ducks/parameters/actions';
import api from '../src/services/api';

import './assets/styles/global.css';
import './assets/styles/simulations.css';
import CookieConsent from 'react-cookie-consent';

interface StateProps {
    parameters: Parameter[]
}

interface DispatchProps {
    updateParameters(data: Parameter[]): void
}

type Props = StateProps & DispatchProps;

class App extends Component<Props> {
    async componentDidMount() {        
        await api.get('parameters/get')
            .then(response => {
                this.props.updateParameters(response.data.parameters);
            });
        
        const tagManagerArgs = {
            gtmId: String(this.props.parameters.find(({id}) => id === 3)?.value)
        };
        TagManager.initialize(tagManagerArgs);
    };

    render() {
        return (
            <div>                
                <Routes />
                <CookieConsent     
                    location="bottom"
                    buttonText="Prosseguir"
                    cookieName="vendasdigitaisprestes"
                    style={{ background: "#2B373B", alignItems: "center" }}
                    buttonStyle={{background: "#01BFEB", color: "#000", fontSize: "13px" }}
                    expires={50}
                    buttonId="CookieConsent"
                >
                    <span style={{ font: "500 Roboto" }}>
                        Utilizamos recursos do seu navegador para fornecer melhor experiência,
                        melhorar o desempenho, analisar como você interage em nosso site e personalizar conteúdo.
                    </span>
                </CookieConsent>
            </div>
        );  
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    parameters: state.parameters.data
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
        ...ParameterActions
    }, dispatch
);

export default connect(mapStateToProps,mapDispatchToProps)(App);
