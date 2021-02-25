import React, { ReactElement } from 'react';
import Big from "big.js";
import { MarketViewModel } from '../../../../models/Market';
import Overview from '../../../../components/Overview';
import FluxSdk from '@fluxprotocol/amm-sdk';


interface Props {
    market: MarketViewModel
    amount: string
}

export default function LiquidityOverview({
    market,
    amount
}: Props): ReactElement {

    // let pool_balances = self.get_pool_balances();
    // let max_balance = pool_balances.iter().max().unwrap(); // max_balance = cheapest outcome
    // let pool_supply = self.pool_token.total_supply();

    // for (i, balance) in pool_balances.iter().enumerate() {
    //     let remaining = math::div_u128(self.collateral_denomination, math::mul_u128(self.collateral_denomination, total_in, *balance), *max_balance); // remaining = amt_in * balance / max_balance
    //     outcome_tokens_to_return.insert(i, total_in - remaining);
    // }


    const maxBalance = new Big(market.outcomeTokens.reduce((s, t) => new Big(t.poolBalance).gt(new Big(s))  ? t.poolBalance : s, "0"));
    const collateralIn = amount ? new Big(amount) : new Big("0");

    const data = market.outcomeTokens.map(t => {
        const balance = new Big(t.poolBalance);
        return  {
            key: t.tokenName + " returned",
            value: FluxSdk.utils.formatToken(collateralIn.minus(collateralIn.mul(balance).div(maxBalance)).toString(), t.decimals)
        }
    });
    
    data.push({
        key: "LP tokens returned",
        value: FluxSdk.utils.formatToken(collateralIn.mul(new Big(market.poolTokenInfo.totalSupply)).div(maxBalance).toString(), market.collateralToken.decimals)
    })

    return (
        <Overview data={data} />
    )
}
