import React, { ReactElement, useState } from 'react';

import Button from '../../components/Button';
import { TokenViewModel } from '../../models/TokenViewModel';
import trans from '../../translation/trans';
import TokenSelect from '../TokenSelect';
import { validateLiquidityProviderFormValues } from './services/validateLiquidityProviderFormValues';

import s from './LiquidityProvider.module.scss';
import Error from '../../components/Error';

interface Props {
    token: TokenViewModel;
    onSubmit: (amountIn: string) => void;
}

export default function LiquidityProvider({
    token,
    onSubmit,
}: Props): ReactElement {
    const [liquidityAmount, setLiquidityAmount] = useState('');

    function handleSubmit() {
        onSubmit(liquidityAmount);
    }

    const errors = validateLiquidityProviderFormValues(liquidityAmount, token);

    return (
        <div>
            <p>
                {trans('liquidityProvider.description', {
                    percentage: '2',
                })}
            </p>

            <div className={s.header}>
                <span>{trans('market.label.youPay')}</span>
                <span>{trans('global.balance', {}, true)}: {token.balanceFormatted}</span>
            </div>

            <TokenSelect
                value={liquidityAmount}
                onValueChange={(v) => setLiquidityAmount(v)}
                onTokenSwitch={() => {}}
                selectedToken={token}
                tokens={[token]}
                className={s.tokenSelect}
                placeholder="1000"
            />

            <Error error={errors.liquidityAmountIn} />

            <Button disabled={!errors.canAddLiquidity} onClick={handleSubmit} className={s.confirm}>
                {trans('market.action.confirmLiquidity')}
            </Button>
        </div>
    );
}
