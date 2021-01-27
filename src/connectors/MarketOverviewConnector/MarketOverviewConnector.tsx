import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import MarketOverview from '../../containers/MarketOverview';
import { MarketFilters } from '../../services/MarketService';
import { MarketCategory } from '../../models/Market';
import { Reducers } from '../../redux/reducers';
import { routePaths } from '../../routes';
import { fetchMarkets } from '../../redux/market/marketActions';
import { DEFAULT_LIMIT } from '../../config';


export default function MarketOverviewConnector(): ReactElement {
    const dispatch = useDispatch();
    const markets = useSelector((store: Reducers) => store.market.markets);
    const loading = useSelector((store: Reducers) => store.market.marketLoading);
    const history = useHistory();
    const location = useLocation();
    const offset = useRef<number>(0);
    const [filters, setFilters] = useState<MarketFilters>({
        categories: [],
    });

    // Changes just the query params
    function handleFilterChange(newFilters: MarketFilters) {
        const queryParams = new URLSearchParams();

        if (newFilters.categories?.length) {
            newFilters.categories.forEach((category) => {
                queryParams.append('categories', category.toString());
            });
        }

        history.replace(`${routePaths.root()}?${queryParams.toString()}`);
    }

    // Listens for a query change and adapts the internal state
    // Gets triggered by the history replace of handleFilterChange
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const newActiveFilters: MarketFilters = {
            ...filters,
            limit: DEFAULT_LIMIT,
            categories: queryParams.getAll('categories') as MarketCategory[],
        };

        dispatch(fetchMarkets(newActiveFilters));
        setFilters(newActiveFilters);
    }, [location]);

    function handleRequestMoreMarkets() {
        offset.current += DEFAULT_LIMIT;

        const newActiveFilters: MarketFilters = {
            ...filters,
            offset: offset.current,
            limit: DEFAULT_LIMIT,
        };

        dispatch(fetchMarkets(newActiveFilters, true));
    }

    return (
        <MarketOverview
            loading={loading}
            markets={markets}
            activeFilters={filters}
            onFilterChange={handleFilterChange}
            onRequestMoreMarkets={handleRequestMoreMarkets}
            hasMoreMarkets={markets.length % DEFAULT_LIMIT === 0}
        />
    );
}
