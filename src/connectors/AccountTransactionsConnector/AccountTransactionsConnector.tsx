import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TransactionsOverview from '../../containers/TransactionsOverview';
import { loadAccountTransactions } from '../../redux/account/accountActions';
import { Reducers } from '../../redux/reducers';

export default function AccountTransactionsConnector() {
    const dispatch = useDispatch();
    const accountId = useSelector((store: Reducers) => store.account.account?.accountId);
    const accountTransactions = useSelector((store: Reducers) => store.account.accountTransactions.transactions);

    useEffect(() => {
        if (!accountId) return;

        dispatch(loadAccountTransactions(accountId));
    }, [dispatch, accountId]);

    return (
        <TransactionsOverview
            transactions={accountTransactions}
        />
    );
}
