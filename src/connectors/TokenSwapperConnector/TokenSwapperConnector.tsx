import React, { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
import TokenSwapper from '../../containers/TokenSwapper';
import TokenSwapperLoader from '../../containers/TokenSwapper/TokenSwapperLoader';
import { TokenViewModel } from '../../models/TokenViewModel';
import { Reducers } from '../../redux/reducers';
import createProtocolContract from '../../services/contracts/ProtocolContract';
import createTokenContract from '../../services/contracts/TokenContract';
import { SwapFormValues } from '../../services/SwapService';

interface Props {
    className?: string;
}

export default function TokenSwapperConnector({
    className,
}: Props): ReactElement {
    const [switched, setSwitched] = useState(false);
    const mainToken = useSelector((store: Reducers) => store.tokens.mainToken);
    const market = useSelector((store: Reducers) => store.market.marketDetail);
    if (!mainToken) {
        return <TokenSwapperLoader />;
    }

    const inputs: TokenViewModel[] = [mainToken];

    const outputs: TokenViewModel[] = [
        {
            balance: '4.50',
            price: 2.38,
            tokenName: 'KANYE WEST',
            balanceFormatted: '4.50',
            tokenSymbol: '',
            outcomeId: 0
        },
        {
            balance: '7.92',
            price: 2.38,
            balanceFormatted: '4.50',
            tokenName: 'NO',
            tokenSymbol: '',
            outcomeId: 1
        },
        {
            balance: '1',
            price: 2.38,
            balanceFormatted: '4.50',
            tokenName: 'MAYBE',
            tokenSymbol: '',
            outcomeId: 2
        }
    ];

    async function onConfirm(
        values: SwapFormValues
    ): Promise<void> {
        if (!market) throw new Error("Market is undefined");
        console.log(values.fromToken.tokenName, market.collateralToken);
        if (values.fromToken.tokenName === market.collateralToken) {
            const token = await createTokenContract(values.fromToken.tokenName);
            return token.buy(market.id, values);
        } else {
            const protocol = await createProtocolContract();
            return protocol.sell(market.id, values);
        }
    }

    function handleRequestSwitchPairs() {
        setSwitched(!switched);
    }

    return (
        <TokenSwapper
            inputs={switched ? outputs : inputs}
            outputs={switched ? inputs : outputs}
            onConfirm={onConfirm}
            onRequestSwitchPairs={handleRequestSwitchPairs}
            className={className}
        />
    );
}
