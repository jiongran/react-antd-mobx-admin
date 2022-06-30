import LayoutView from "@/layout";
import Login from "@/pages/login";
import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

const App: FC = () => (
    <Router>
        <Switch>
        <Route exact path={'/login'} component={Login} />
        <Route
            path="/"
            key="container"
            render={(props: any) => <LayoutView {...props} />}
        />
        </Switch>
    </Router>
)

export default App;
