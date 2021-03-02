import React from 'react';
import TokenWeightsBar from '../../../../components/TokenWeightsBar';
import trans from '../../../../translation/trans';
import { MarketViewModel } from '../../../../models/Market';
import { prettyFormatNumber } from '../../../../utils/prettyFormatNumber';
import { formatCollateralToken } from '../../../../services/CollateralTokenService';

import s from './CategoricalOpinionCard.module.scss';

interface Props {
    market: MarketViewModel;
}

export default function CategoricalOpinionCard({
    market,
}: Props) {
    return (
        <>
            <h2 className={s['title']}>
                {trans('market.label.opinion')}
            </h2>
            <TokenWeightsBar tokens={market.outcomeTokens} className={s['token-weight-bar']} />
            <div className={s['outcomes-wrapper']}>
                {market.outcomeTokens.map((outcome, index) => (
                    <div key={outcome.outcomeId} className={s['outcome']}>
                        <div className={s['outcome-label-wrapper']}>
                            <div style={{ backgroundColor: `var(${outcome.colorVar})` }} className={s.colorLabel} />
                            <span className={s.tokenName}>{outcome.tokenName}</span>
                        </div>
                        <span className={s.percentage}>{outcome.odds.mul(100).toNumber().toFixed(2)}%</span>
                    </div>
                ))}
            </div>
            <div className={s['volume-wrapper']}>
                <span>{trans('market.label.totalVolume')}</span>
                <span>
                    {prettyFormatNumber(formatCollateralToken(market.volume, market.collateralToken.decimals))} {market.collateralToken.tokenSymbol}
                </span>
            </div>
        </>
    );
}
