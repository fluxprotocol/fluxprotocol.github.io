import React, { ReactElement, useState } from 'react';

import Button from '../../components/Button';
import { TokenViewModel } from '../../models/TokenViewModel';
import trans from '../../translation/trans';
import TokenSelect from '../TokenSelect';
import { LiquidityProviderFormValues, validateLiquidityProviderFormValues } from './services/validateLiquidityProviderFormValues';

import s from './LiquidityProvider.module.scss';
import Error from '../../components/Error';
import TextButton from '../../components/TextButton';
import { toCollateralToken } from '../../services/CollateralTokenService';
import LiquidityOverview from './components/LiquidityOverview/LiquidityOverview';
import { MarketViewModel } from '../../models/Market';

interface Props {
    market: MarketViewModel;
    onSubmit: (formValues: LiquidityProviderFormValues) => void;
}

export default function LiquidityProvider({
    market,
    onSubmit,
}: Props): ReactElement {
    const [formValues, setFormValues] = useState<LiquidityProviderFormValues>({
        liquidityAmountIn: '',
        liquidityAmountInFormatted: '',
    });
    function handleSubmit() {
        onSubmit(formValues);
    }

    function handleInChange(value: string) {
        setFormValues({
            ...formValues,
            liquidityAmountIn: value ? toCollateralToken(value, market.collateralToken.decimals) : '',
            liquidityAmountInFormatted: value,
        });
    }

    function handleBalanceClick() {
        setFormValues({
            ...formValues,
            liquidityAmountIn: market.collateralToken.balance,
            liquidityAmountInFormatted: market.collateralToken.balanceFormatted,
        });
    }

    const errors = validateLiquidityProviderFormValues(formValues, market.collateralToken);

    return (
        <div>
            <p>
                {trans('liquidityProvider.description', {
                    percentage: '2',
                })}
            </p>

            <div className={s.header}>
                <span>{trans('market.label.youPay')}</span>
                <TextButton onClick={handleBalanceClick} className={s.balanceButton}>
                    {trans('global.balance', {}, true)}: {market.collateralToken.balanceFormatted}
                </TextButton>
            </div>

            <TokenSelect
                value={formValues.liquidityAmountInFormatted}
                onValueChange={(v) => handleInChange(v)}
                onTokenSwitch={() => {}}
                selectedToken={market.collateralToken}
                tokens={[market.collateralToken]}
                className={s.tokenSelect}
                placeholder="1000"
            />

            <LiquidityOverview market={market} amount={formValues.liquidityAmountIn} />

            <Error error={errors.liquidityAmountIn} />

            <Button disabled={!errors.canAddLiquidity} onClick={handleSubmit} className={s.confirm}>
                {trans('market.action.confirmLiquidity')}
            </Button>
        </div>
    );
}
