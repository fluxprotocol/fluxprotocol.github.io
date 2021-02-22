import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import MarketOverview from '../../containers/MarketOverview';
import { MarketFilters } from '../../services/MarketService';
import { MarketCategory, MarketViewModel } from '../../models/Market';
import { Reducers } from '../../redux/reducers';
import { DEFAULT_LIMIT } from '../../config';

interface Props {
    rootPath: string;
    markets: MarketViewModel[];
    defaultMarketFilters: MarketFilters;
    onRequestFetchMarkets: (filters: MarketFilters, append: boolean) => void;
}

export default function MarketOverviewConnector({
    rootPath,
    markets,
    defaultMarketFilters,
    onRequestFetchMarkets,
}: Props): ReactElement {
    const loading = useSelector((store: Reducers) => store.market.marketLoading);
    const history = useHistory();
    const location = useLocation();
    const offset = useRef<number>(0);
    const [filters, setFilters] = useState<MarketFilters>({
        categories: [],
        ...defaultMarketFilters,
    });

    // Changes just the query params
    function handleFilterChange(newFilters: MarketFilters) {
        const queryParams = new URLSearchParams();

        if (newFilters.categories?.length) {
            newFilters.categories.forEach((category) => {
                queryParams.append('categories', category.toString());
            });
        }

        history.replace(`${rootPath}?${queryParams.toString()}`);
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

        onRequestFetchMarkets(newActiveFilters, false);
        setFilters(newActiveFilters);
    }, [location]);

    function handleRequestMoreMarkets() {
        offset.current += DEFAULT_LIMIT;

        const newActiveFilters: MarketFilters = {
            ...filters,
            offset: offset.current,
            limit: DEFAULT_LIMIT,
        };

        onRequestFetchMarkets(newActiveFilters, true);
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
