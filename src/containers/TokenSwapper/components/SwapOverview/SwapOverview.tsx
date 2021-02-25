import React, { ReactElement } from 'react';
import { DEFAULT_SLIPPAGE } from '../../../../config';
import { SwapFormValues } from '../../../../services/SwapService';
import trans from '../../../../translation/trans';
import Big from "big.js";
import s from './SwapOverview.module.scss';
import mutateFormValues from './utils/overviewMutation';

interface SwapOverviewProps {
    formValues: SwapFormValues
}

export default function SwapOverview({formValues}: SwapOverviewProps): ReactElement {
    let formattedFormValues = mutateFormValues(formValues);
    const collateralToken = formValues.fromToken.isCollateralToken ? formValues.fromToken : formValues.toToken;
    console.log(formValues)
    const amountIn = new Big(formValues.amountIn);
    const amountOut = new Big(formValues.amountOut);
    const divisor = new Big("100");
    const profitPercentage = formValues.amountIn !== "0" ? amountOut.minus(amountIn).div(amountIn).mul(divisor).round(2).toString() : "0";

    return (
        <div className={s['swap-overview']}>
            <div className={s['swap-overview__info-row']}>
                <span className={s['swap-overview__info-key']}>{trans('market.overview.rate')}</span>
                <span className={s['swap-overview__info-value']}>{formattedFormValues.rateInOut} {formValues.fromToken.tokenSymbol} / {formValues.toToken.tokenSymbol}</span>
            </div>

            <div className={s['swap-overview__info-row']}>
                <span className={s['swap-overview__info-key']}>{trans('market.overview.inverseRate')}</span>
                <span className={s['swap-overview__info-value']}>{formattedFormValues.rateOutIn} {formValues.toToken.tokenSymbol} / {formValues.fromToken.tokenSymbol}</span>
            </div>

            <div className={s['swap-overview__info-row']}>
                <span className={s['swap-overview__info-key']}>{trans('market.overview.estimatedFee')}</span>
                <span className={s['swap-overview__info-value']}>
                    {formattedFormValues.feePaid} {collateralToken.tokenSymbol}
                </span>
            </div>

            <div className={s['swap-overview__info-row']}>
                <span className={s['swap-overview__info-key']}>{trans('market.overview.maxSlippage')}</span>
                <span className={s['swap-overview__info-value']}>{DEFAULT_SLIPPAGE}%</span>
            </div>
          
            {
                formValues.type === "BUY" && (
                    <div className={s['swap-overview__info-row']}>
                        <span className={s['swap-overview__info-key']}>{trans('market.overview.maxPayout')}</span>
                        <span className={s['swap-overview__info-value']}>{formValues.formattedAmountOut || "0"} {formValues.fromToken.tokenSymbol} (+{profitPercentage}%)</span>
                    </div>
                )
            }
        </div>
    );
}
