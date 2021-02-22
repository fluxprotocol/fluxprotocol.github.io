import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';

import { Route, Switch, useHistory } from 'react-router';

import { routes } from './routes';
import { themeContext, useDarkMode } from './utils/hooks/useDarkModeTheme';

function App(): ReactElement {
    const [theme, toggleTheme] = useDarkMode();
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
        // @ts-ignore
        <themeContext.Provider value={{ toggleTheme, theme }}>
            <Switch>
                {routes.map((route): ReactElement => <Route {...route} key={route.key} />)}
            </Switch>
        </themeContext.Provider>
    );
};

export default App;
