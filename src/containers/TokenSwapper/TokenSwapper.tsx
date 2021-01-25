import React, { FormEvent, ReactElement, useCallback, useState } from 'react';
import classnames from 'classnames';

import Button from '../../components/Button';
import IconButton from '../../components/IconButton';
import { TokenViewModel } from '../../models/TokenViewModel';
import trans from '../../translation/trans';
import TokenSelect from '../TokenSelect';
import SwapOverview from './components/SwapOverview/SwapOverview';

import s from './TokenSwapper.module.scss';
import createDefaultSwapFormValues from './utils/createDefaultSwapFormValues';
import { SwapFormValues } from '../../services/SwapService';

interface TokenSwapperProps {
    inputs: TokenViewModel[];
    outputs: TokenViewModel[];
    onRequestSwitchPairs: () => void;
    onConfirm: (formData: SwapFormValues) => Promise<void>;
    className?: string;
}

export default function TokenSwapper({
    inputs,
    outputs,
    onConfirm,
    onRequestSwitchPairs,
    className = '',
}: TokenSwapperProps): ReactElement {
    const [formValues, setFormValues] = useState(createDefaultSwapFormValues(inputs[0], outputs[0]));

    function handleSubmit() {
        onConfirm(formValues);
    }

    function handleInputTokenSwitch(token: TokenViewModel) {
        setFormValues({
            ...formValues,
            fromToken: token
        });
    }

    function handleOutputTokenSwitch(token: TokenViewModel) {
        setFormValues({
            ...formValues,
            toToken: token
        });
    }

    function handleAmountInChange(value: string) {
        setFormValues({
            ...formValues,
            amountIn: value
        });
    }

    function handleAmountOutChange(value: string) {
        setFormValues({
            ...formValues,
            amountOut: value
        });
    }

    function switchTokenPlaces() {
        setFormValues({
            ...formValues,
            amountIn: formValues.amountOut,
            amountOut: formValues.amountIn,
            fromToken: formValues.toToken,
            toToken: formValues.fromToken,
        });
        onRequestSwitchPairs();
    }

    return (
        <form className={classnames(s['token-swapper'], className)}>
            <div className={s['token-swapper__token']}>
                <div className={s['token-swapper__token-header']}>
                    <span>{trans('market.label.youPay')}</span>
                    <span>{trans('global.balance', {}, true)}: {formValues.fromToken.balanceFormatted}</span>
                </div>
                <TokenSelect
                    onTokenSwitch={handleInputTokenSwitch}
                    value={formValues.amountIn}
                    tokens={inputs}
                    selectedToken={formValues.fromToken}
                    onValueChange={(v) => handleAmountInChange(v)}
                />
            </div>

            <div className={s['token-swapper__switch-tokens']}>
                <IconButton onClick={switchTokenPlaces} icon="/assets/icons/swap.svg" alt={trans('market.action.switchTokens')} />
            </div>

            <div className={s['token-swapper__token']}>
                <div className={s['token-swapper__token-header']}>
                    <span>{trans('market.label.youReceive')}</span>
                </div>
                <TokenSelect
                    onTokenSwitch={handleOutputTokenSwitch}
                    value={formValues.amountOut}
                    tokens={outputs}
                    selectedToken={formValues.toToken}
                    onValueChange={(v) => handleAmountOutChange(v)}
                />
            </div>

            <div className={s['token-swapper__token']}>
                <div className={s['token-swapper__token-header']}>
                    <span>{trans('market.label.overview', {}, true)}</span>
                </div>
                <SwapOverview />
            </div>

            <Button onClick={handleSubmit} className={s['token-swapper__confirm']}>
                {trans('market.action.confirmSwap')}
            </Button>
        </form>
    );
}
