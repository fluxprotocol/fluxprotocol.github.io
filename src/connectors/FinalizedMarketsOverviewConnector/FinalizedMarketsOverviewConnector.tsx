import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResolutingMarkets } from '../../redux/market/marketActions';
import { Reducers } from '../../redux/reducers';
import { routePaths } from '../../routes';
import { MarketFilters } from '../../services/MarketService';
import MarketOverviewConnector from '../MarketOverviewConnector';


export default function FinalizedMarketsOverviewConnector() {
    const dispatch = useDispatch();
    const markets = useSelector((store: Reducers) => store.market.resolutingMarkets);
    const handleFetchMarkets = useCallback((filters: MarketFilters, append: boolean) => {
        dispatch(fetchResolutingMarkets(filters, append));
    }, [dispatch]);

    return (
        <MarketOverviewConnector
            markets={markets}
            onRequestFetchMarkets={handleFetchMarkets}
            rootPath={routePaths.resoluted()}
            defaultMarketFilters={{
                expired: true,
                finalized: true,
            }}
        />
    );
}
