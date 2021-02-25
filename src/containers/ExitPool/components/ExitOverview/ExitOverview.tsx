import React, { ReactElement } from 'react';
import Big from "big.js";
import { MarketViewModel } from '../../../../models/Market';
import Overview from '../../../../components/Overview';
import FluxSdk from '@fluxprotocol/amm-sdk';
import trans from '../../../../translation/trans';


interface Props {
    market: MarketViewModel
    amount: string
}

export default function ExitOverview({
    market,
    amount
}: Props): ReactElement {
    const poolTokenTotalSupply = new Big(market.poolTokenInfo.totalSupply);
    const relativeBal = amount ? new Big(amount).div(poolTokenTotalSupply) : new Big("0");

    const data = market.outcomeTokens.map(tokenData => ({
        key: tokenData.tokenName + trans('market.label.spaceTokens'),
        value: FluxSdk.utils.formatToken(relativeBal.mul(new Big(tokenData.poolBalance)).toString(), market.collateralToken.decimals)
    }))

    return (
        <Overview header={trans('market.label.youReceive', {}, true)} data={data} />
    )
}
