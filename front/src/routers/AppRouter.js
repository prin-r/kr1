import React from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const loading = (<div>...loading</div>);

const Register = Loadable({
    loader: () => import('../components/Register'),
    loading: () => loading
});

const GetLink = Loadable({
    loader: () => import('../components/GetLink'),
    loading: () => loading
});

const NotFound = Loadable({
    loader: () => import('../components/NotFound'),
    loading: () => loading
});

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route exact={true} path="/register" component={Register} />
                <Route path="/:id" component={GetLink} />
                <Route component={NotFound}/>
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;