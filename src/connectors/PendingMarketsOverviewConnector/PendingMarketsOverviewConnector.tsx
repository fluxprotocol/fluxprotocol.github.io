
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPendingMarkets } from '../../redux/market/marketActions';
import { Reducers } from '../../redux/reducers';
import { routePaths } from '../../routes';
import { MarketFilters } from '../../services/MarketService';
import MarketOverviewConnector from '../MarketOverviewConnector';


export default function PendingMarketsOverviewConnector() {
    const dispatch = useDispatch();
    const markets = useSelector((store: Reducers) => store.market.pendingMarkets);
    const handleFetchMarkets = useCallback((filters: MarketFilters, append: boolean) => {
        dispatch(fetchPendingMarkets(filters, append));
    }, [dispatch]);

    return (
        <MarketOverviewConnector
            markets={markets}
            onRequestFetchMarkets={handleFetchMarkets}
            rootPath={routePaths.pending()}
            defaultMarketFilters={{
                expired: true,
            }}
        />
    );
}
