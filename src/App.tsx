import React, { ReactElement } from 'react';

import { Route, Switch, useHistory } from 'react-router';

import { routes } from './routes';

function App(): ReactElement {
    const history = useHistory();

    history.listen((currentLocation) => {
        // @ts-ignore
        if (window && window.gtag) {
            // @ts-ignore
            window.gtag('config', process.env.REACT_APP_GA_ID, {
                'page_path': currentLocation.pathname + currentLocation.search,
            });
        }
    });

    return (
        <Switch>
            {routes.map((route): ReactElement => <Route {...route} key={route.key} />)}
        </Switch>
    );
};

export default App;
