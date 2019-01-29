import React from "react";
import ReactDOM from "react-dom";
import AppRouter from './routers/AppRouter';

const app = (
    <div>
        <AppRouter />
    </div>
);

ReactDOM.render(app, document.getElementById('app'));