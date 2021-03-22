import React, { ReactElement, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory, useLocation } from 'react-router';
import { useMediaQuery } from '@material-ui/core';
import { TabBarItem } from '../../containers/TabBar/TabBar';
import Page from '../../containers/Page';
import { loadAccountBalanceInfo } from '../../redux/account/accountActions';
import { Reducers } from '../../redux/reducers';
import { routePaths } from '../../routes';
import TransactionsOverviewPage from './sub-pages/TransactionsOverviewPage/TransactionsOverviewPage';
import BalancesOverviewPage from './sub-pages/BalancesOverviewPage/BalancesOverviewPage';
import TabBar from '../../containers/TabBar';
import trans from '../../translation/trans';

import s from './ProfilePage.module.scss';
import ParticipatedMarketsOverviewPage from './sub-pages/ParticipatedMarketsOverviewPage/ParticipatedMarketsOverviewPage';


export default function ProfilePage(): ReactElement {
    const dispatch = useDispatch();
    const isLargeScreen = useMediaQuery('(min-width: 1024px)');
    const history = useHistory();
    const location = useLocation();
    const account = useSelector((store: Reducers) => store.account.account);

    const onTabClick = useCallback((item: TabBarItem) => {
        history.push(item.id);
    }, [history]);

    useEffect(() => {
        if (!account) return;
        dispatch(loadAccountBalanceInfo(account.accountId));
    }, [dispatch, account]);

    return (
        <Page className={s.root} bodyClassName={s.pageBody} size="large">
            <TabBar
                className={s.tabBar}
                activeId={location.pathname}
                onTabClick={onTabClick}
                variant={isLargeScreen ? 'standard' : 'fullWidth'}
                items={[{
                    id: routePaths.profile(),
                    label: trans('pages.profileStatus'),
                    show: true,
                }, {
                    id: routePaths.profileParticipated(),
                    label: trans('pages.profileParticipated'),
                    show: true,
                }, {
                    id: routePaths.profileTransactions(),
                    label: trans('pages.profileTransactions'),
                    show: true,
                }]}
            />
            <Switch>
                <Route exact path={routePaths.profile()} component={BalancesOverviewPage} />
                <Route exact path={routePaths.profileTransactions()} component={TransactionsOverviewPage} />
                <Route exact path={routePaths.profileParticipated()} component={ParticipatedMarketsOverviewPage} />
            </Switch>
        </Page>
    );
}
