import React from 'react';
import EscrowOverviewConnector from '../../../../connectors/EscrowOverviewConnector';
import FeesEarnedOverviewConnector from '../../../../connectors/FeesEarnedOverviewConnector';
import UserBalancesOverviewConnector from '../../../../connectors/UserBalancesOverviewConnector';

import s from './BalancesOverviewPage.module.scss';

export default function BalancesOverviewPage() {
    return (
        <section>
            <UserBalancesOverviewConnector className={s.userBalances} />
            <FeesEarnedOverviewConnector className={s.feesEarned} />
            <EscrowOverviewConnector className={s.feesEarned} />
        </section>
    );
}
