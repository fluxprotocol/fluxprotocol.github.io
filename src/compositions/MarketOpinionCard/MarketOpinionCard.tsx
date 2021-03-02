import React, { ReactElement } from 'react';
import { MarketType, MarketViewModel } from '../../models/Market';
import CategoricalOpinionCard from './components/CategoricalOpinionCard/CategoricalOpinionCard';
import ScalarOpinionCard from './components/ScalarOpinionCard/ScalarOpinionCard';

import s from './MarketOpinionCard.module.scss';

interface Props {
    market: MarketViewModel;
}

export default function MarketOpinionCard({
    market,
}: Props): ReactElement {
    return (
        <div className={s.root}>
            {market.type !== MarketType.Scalar && (<CategoricalOpinionCard market={market} />)}
            {market.type === MarketType.Scalar && (<ScalarOpinionCard market={market} />)}
        </div>
    );
}
