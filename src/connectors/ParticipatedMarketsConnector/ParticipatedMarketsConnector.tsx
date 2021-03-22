import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ParticipatedMarketsOverview from '../../containers/ParticipatedMarketsOverview';
import { loadAccountParticipatedMarkets } from '../../redux/account/accountActions';
import { Reducers } from '../../redux/reducers';

export default function ParticipatedMarketsConnector() {
    const dispatch = useDispatch();
    const accountId = useSelector((store: Reducers) => store.account.account?.accountId);
    const total = useSelector((store: Reducers) => store.account.accountParticipatedMarkets.total);
    const participatedMarkets = useSelector((store: Reducers) => store.account.accountParticipatedMarkets.participatedMarkets);

    useEffect(() => {
        if (!accountId) return;

        dispatch(loadAccountParticipatedMarkets(accountId, true));
    }, [dispatch, accountId]);

    const handleRequestMoreMarkets = useCallback(() => {
        if (!accountId) return;

        dispatch(loadAccountParticipatedMarkets(accountId));
    }, [dispatch, accountId]);


    return (
        <ParticipatedMarketsOverview
            participatedMarkets={participatedMarkets}
            hasMoreMarkets={total > participatedMarkets.length}
            onRequestMoreMarkets={handleRequestMoreMarkets}
        />
    );
}
