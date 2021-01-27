import React, { ReactElement, useState } from 'react';
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
import mutateFormValues from './utils/formValuesMutation';
import { MarketViewModel } from '../../models/Market';
import { toCollateralToken } from '../../services/CollateralTokenService';

interface TokenSwapperProps {
    inputs: TokenViewModel[];
    outputs: TokenViewModel[];
    onRequestSwitchPairs: () => void;
    onConfirm: (formData: SwapFormValues) => Promise<void>;
    className?: string;
    market: MarketViewModel
}

export default function TokenSwapper({
    inputs,
    outputs,
    onConfirm,
    onRequestSwitchPairs,
    className = '',
}: TokenSwapperProps): ReactElement {
    const [formValues, setFormValues] = useState(createDefaultSwapFormValues(inputs[0], outputs[0]));

    function handleSubmit(mutatedValues: SwapFormValues) {
        onConfirm(mutatedValues);
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
            formattedAmountIn: value,
            amountIn: value ? toCollateralToken(value) : ""
        });
    }

    function handleAmountOutChange(value: string) {
        // TODO: remove this fn
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


    const poolTokens = outputs.length > 1 ? outputs : inputs;
    const mutation = mutateFormValues(formValues, poolTokens);

    return (
        <form className={classnames(s['token-swapper'], className)}>
            <div className={s['token-swapper__token']}>
                <div className={s['token-swapper__token-header']}>
                    <span>{trans('market.label.youPay')}</span>
                    <span>{trans('global.balance', {}, true)}: {mutation.fromToken.balanceFormatted}</span>
                </div>
                <TokenSelect
                    onTokenSwitch={handleInputTokenSwitch}
                    value={mutation.formattedAmountIn}
                    tokens={inputs}
                    selectedToken={mutation.fromToken}
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
                    value={mutation.formattedAmountOut}
                    tokens={outputs}
                    selectedToken={mutation.toToken}
                    onValueChange={(v) => handleAmountOutChange(v)}
                />
            </div>

            <div className={s['token-swapper__token']}>
                <div className={s['token-swapper__token-header']}>
                    <span>{trans('market.label.overview', {}, true)}</span>
                </div>
                <SwapOverview />
            </div>

            <Button onClick={() => handleSubmit(mutation)} className={s['token-swapper__confirm']}>
                {trans('market.action.confirmSwap')}
            </Button>
        </form>
    );
}
