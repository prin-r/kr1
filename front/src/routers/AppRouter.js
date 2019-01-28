import React from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const loading = (<div>...loading</div>);

const Page = Loadable({
    loader: () => import('../components/Page'),
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
                <Route path="/page" component={Page} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;