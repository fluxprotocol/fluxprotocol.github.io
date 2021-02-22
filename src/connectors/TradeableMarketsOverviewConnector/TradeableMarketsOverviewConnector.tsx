import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMarkets } from '../../redux/market/marketActions';
import { Reducers } from '../../redux/reducers';
import { routePaths } from '../../routes';
import { MarketFilters } from '../../services/MarketService';
import MarketOverviewConnector from '../MarketOverviewConnector';


export default function TradeableMarketsOverviewConnector() {
    const dispatch = useDispatch();
    const markets = useSelector((store: Reducers) => store.market.markets);
    const handleFetchMarkets = useCallback((filters: MarketFilters, append: boolean) => {
        dispatch(fetchMarkets(filters, append));
    }, [dispatch]);

    return (
        <MarketOverviewConnector
            markets={markets}
            onRequestFetchMarkets={handleFetchMarkets}
            rootPath={routePaths.root()}
            defaultMarketFilters={{
                expired: false,
            }}
        />
    );
}
