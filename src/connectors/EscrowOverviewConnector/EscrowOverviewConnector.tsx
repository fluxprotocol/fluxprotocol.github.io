import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EscrowStatusOverview from '../../containers/EscrowStatusOverview';
import { getEscrowStatus } from '../../redux/account/accountActions';
import { Reducers } from '../../redux/reducers';

interface Props {
    className?: string;
}

export default function EscrowOwerviewConnector({
    className,
}: Props) {
    const dispatch = useDispatch();
    const escrowStatus = useSelector((store: Reducers) => store.account.escrowStatus);
    const accountId = useSelector((store: Reducers) => store.account.account?.accountId);

    useEffect(() => {
        if (accountId) {
            dispatch(getEscrowStatus(accountId))
        }
    }, [accountId]);

    return (
        <EscrowStatusOverview escrowStatus={escrowStatus} className={className} />
    );
}
