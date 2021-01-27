import React, { ReactElement } from 'react';
import TokenWeightsBar from '../../components/TokenWeightsBar';
import { MarketViewModel } from '../../models/Market';
import { formatCollateralToken } from '../../services/CollateralTokenService';
import trans from '../../translation/trans';
import { getColorForOutcome } from '../../utils/getColorForOutcome';

import s from './MarketOpinionCard.module.scss';

interface Props {
    market: MarketViewModel;
}

export default function MarketOpinionCard({
    market,
}: Props): ReactElement {
    return (
        <div className={s.root}>
            <h2 className={s['title']}>
                {trans('market.label.opinion')}
            </h2>
            <TokenWeightsBar weights={market.outcomeTokens.map(b => b.odds.toNumber() * 100)} className={s['token-weight-bar']} />
            <div className={s['outcomes-wrapper']}>
                {market.outcomeTokens.map((outcome, index) => (
                    <div key={outcome.outcomeId} className={s['outcome']}>
                        <div className={s['outcome-label-wrapper']}>
                            <div style={{ backgroundColor: `var(${getColorForOutcome(index)})` }} className={s['color-label']} />
                            <span>{outcome.tokenName}</span>
                        </div>
                        <span>{outcome.odds.mul(100).toNumber().toPrecision(3)}%</span>
                    </div>
                ))}
            </div>
            <div className={s['volume-wrapper']}>
                <span>{trans('market.label.totalVolume')}</span>
                <span>{formatCollateralToken(market.volume)}</span>
            </div>
        </div>
    );
}
