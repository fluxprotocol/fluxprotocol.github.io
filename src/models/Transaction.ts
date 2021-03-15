import { FluxTransaction, FluxTransactionType } from "@fluxprotocol/amm-sdk";
import trans from "../translation/trans";
import { generateTokenName, TokenViewModel } from "./TokenViewModel";

export interface Transaction {
    id: string;
    accountId: string;
    input: string;
    output: string;
    marketId: string;
    outcomeId: string;
    date: Date;
    type: FluxTransactionType;
    collateralToken: TokenViewModel;
    marketDescription: string;
    tokenName: string;
}

export function transformToTransaction(tx: FluxTransaction, collateralToken: TokenViewModel): Transaction {
    let tokenName = tx.market.outcome_tags[Number(tx.outcome_id)];

    if (tx.type === FluxTransactionType.AddLiquidity || tx.type === FluxTransactionType.RemoveLiquidity) {
        tokenName = generateTokenName(trans('global.poolToken'));
    } else if (tx.type === FluxTransactionType.Redeem) {
        tokenName = trans('transaction.tokenNames.ofEachShare')
    } else if (tx.market.is_scalar) {
        tokenName = tx.outcome_id === '0' ? trans('market.outcomes.short') : trans('market.outcomes.long')
    }

    return {
        id: `${tx.account_id}${tx.market_id}${tx.date}${tx.type}`,
        accountId: tx.account_id,
        marketId: tx.market_id,
        date: new Date(Number(tx.date)),
        input: tx.input,
        outcomeId: tx.outcome_id,
        output: tx.output,
        type: tx.type,
        collateralToken,
        marketDescription: tx.market.description,
        tokenName,
    }
}
