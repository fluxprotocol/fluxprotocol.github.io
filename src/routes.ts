import * as Router from 'react-router';
import HomePage from './pages/HomePage';
import MarketPage from './pages/MarketPage';
import ProfilePage from './pages/ProfilePage';

interface RouteProps extends Router.RouteProps {
    inNavigation: boolean;
    key: string;
    label: string;
    icon?: string;
}

export const routePaths = {
    root: () => '/',
    profile: () => '/profile',
    profileTransactions: () => '/profile/transactions',
    profileParticipated: () => '/profile/participated',
    resoluted: () => '/resoluted',
    pending: () => '/pending',
    marketDetail: (marketId = ':marketId') => `/markets/${marketId}`,
}

export const routes: RouteProps[] = [
    {
        component: MarketPage,
        exact: true,
        inNavigation: false,
        key: 'market',
        label: 'Market',
        path: routePaths.marketDetail(),
    },
    {
        component: ProfilePage,
        exact: false,
        inNavigation: false,
        key: 'home',
        label: 'Home',
        path: routePaths.profile(),
    },
    {
        component: HomePage,
        exact: false,
        inNavigation: false,
        key: 'home',
        label: 'Home',
        path: routePaths.root(),
    },
];
