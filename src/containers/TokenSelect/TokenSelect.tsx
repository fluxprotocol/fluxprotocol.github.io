import React, { useCallback, useState } from 'react';
import classnames from 'classnames';

import { TokenViewModel } from '../../models/TokenViewModel';

import s from './TokenSelect.module.scss';
import trans from '../../translation/trans';
import Token from '../../components/Token';
import NonLinkButton from '../../components/NonLinkButton';
import TokenDropdown from './components/TokenDropdown/TokenDropdown';

interface Props {
    className?: string;
    selectedToken: TokenViewModel;
    tokens: TokenViewModel[];
    value: string;
    onValueChange: (newValue: string) => void;
    onTokenSwitch: (token: TokenViewModel) => void;
}

export default function TokenSelect({
    selectedToken,
    tokens,
    value,
    onTokenSwitch,
    onValueChange,
    className = '',
}: Props) {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleChangePairClick = useCallback(() => {
        setDropdownOpen(!isDropdownOpen);
    }, [isDropdownOpen]);

    const handleTokenClick = useCallback((token: TokenViewModel) => {
        setDropdownOpen(false);
        onTokenSwitch(token);
    }, [onTokenSwitch]);

    return (
        <div className={classnames(s['token-select'], className)}>
            <div className={s['token-select__info']}>
                <span>{selectedToken.tokenName} {trans('global.token')}</span>
                <span>${selectedToken.price}</span>
            </div>
            <div className={s['token-select__inputs']}>
                <div className={s['token-select__inputs-info']}>
                    <Token tokenName={selectedToken.tokenName} className={s['token-select__token-icon']} />

                    {tokens.length === 1 && (
                        <span className={s['token-select__token-name']}>{selectedToken.tokenName}</span>
                    )}

                    {tokens.length > 1 && (
                        <NonLinkButton type="button" onClick={handleChangePairClick}>
                            {isDropdownOpen ? trans('global.action.cancel') : trans('market.action.changeTradingPair')}
                        </NonLinkButton>
                    )}
                </div>
                <input
                    type="number"
                    value={value}
                    placeholder="0"
                    className={s['token-select__input']}
                    onChange={(e) => onValueChange(e.target.value)}
                />
            </div>
            {tokens.length > 1 && isDropdownOpen && (
                <TokenDropdown onTokenClick={handleTokenClick} tokens={tokens} />
            )}
        </div>
    );
}
