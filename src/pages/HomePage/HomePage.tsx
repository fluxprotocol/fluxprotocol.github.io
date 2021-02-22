import React, { useCallback } from 'react';
import Helmet from 'react-helmet';
import { Route, Switch, useHistory, useLocation } from 'react-router';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import BackgroundWave from '../../components/BackgroundWave';
import TabBar from '../../containers/TabBar';
import Page from '../../containers/Page';
import { routePaths } from '../../routes';
import trans from '../../translation/trans';
import ResolutionPage from './sub-pages/ResolutionPage';
import { TabBarItem } from '../../containers/TabBar/TabBar';
import MarketsOverviewPage from './sub-pages/MarketsOverviewPage';
import MarketCreationDialogConnector from '../../connectors/MarketCreationDialogConnector';

import s from './HomePage.module.scss';
import HomeHeaderConnector from '../../connectors/HomeHeaderConnector';
import PendingPage from './sub-pages/PendingPage';


export default function HomePage() {
    const isLargeScreen = useMediaQuery('(min-width: 1024px)');
    const history = useHistory();
    const location = useLocation();

    const onTabClick = useCallback((item: TabBarItem) => {
        history.push(item.id);
    }, [history]);

    return (
        <Page className={s.homePage} bodyClassName={s.homePageBody} size="large" hasNavigation>
            <BackgroundWave />
            <HomeHeaderConnector />
            <TabBar
                className={s.tabBar}
                activeId={location.pathname}
                onTabClick={onTabClick}
                variant={isLargeScreen ? 'standard' : 'fullWidth'}
                items={[{
                    id: routePaths.root(),
                    label: trans('pages.marketOverview'),
                    show: true,
                }, {
                    id: routePaths.pending(),
                    label: trans('pages.pendingOverview'),
                    show: true,
                }, {
                    id: routePaths.resoluted(),
                    label: trans('pages.resoluteOverview'),
                    show: true,
                }]}
            />
            <MarketCreationDialogConnector />
            <Switch>
                <Route exact path={routePaths.root()} component={MarketsOverviewPage} />
                <Route exact path={routePaths.resoluted()} component={ResolutionPage} />
                <Route exact path={routePaths.pending()} component={PendingPage} />
            </Switch>
        </Page>
    );
}
