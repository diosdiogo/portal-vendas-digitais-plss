import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './utils/history';

import Landing from './pages/Landing';
import City from './pages/City';
import EnterpriseChoice from './pages/EnterpriseChoice';
import TypologyChoice from './pages/TypologyChoice';
import BlockChoice from './pages/BlockChoice';
import Howtopay from './pages/HowToPay';
import DataForm from './pages/DataForm';
import Thanks from './pages/Thanks';
import TypologyImage from './pages/TypologyImage';
import Gallery from './pages/Gallery';
import BankFinancing from './pages/BankFinancing';
import PrestesFinancing from './pages/PrestesFinancing';
import Summary from './pages/Summary';

function Routes() {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" exact component={City} />
                <Route path="/city" component={City} />
                <Route path="/enterprise" component={EnterpriseChoice} />
                <Route path="/gallery" component={Gallery} />
                <Route path="/typology" component={TypologyChoice} />
                <Route path="/typologyimage" component={TypologyImage} />
                <Route path="/block" component={BlockChoice} />
                <Route path="/howtopay" component={Howtopay} />
                <Route path="/bankfinancing" component={BankFinancing} />
                <Route path="/prestesfinancing" component={PrestesFinancing} />
                <Route path="/summary" component={Summary} />
                <Route path="/dataform" component={DataForm} />
                <Route path="/thanks" component={Thanks} />
            </Switch>
        </Router>
    )
}

export default Routes;