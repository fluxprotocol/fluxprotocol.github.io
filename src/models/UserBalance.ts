import Big from "big.js";
import { formatCollateralToken } from "../services/CollateralTokenService";
import trans from "../translation/trans";
import { TokenMetadata } from "./TokenMetadata";

export interface UserBalance {
    outcomeId: number;
    balance: string;
    marketId: string;
    marketDescription: string;
    marketStatus: string;
    outcomeTag: string;
    collateralTokenMetadata: TokenMetadata;
    spent: string;
    avgPaidPrice: Big;
    profitPercentage: Big;
    outcomePrice: number;
    payoutNumerator: string[] | null;
}

export interface GraphUserBalancesItem {
    balance: string;
    outcome_id: number;
    pool_id: string;
    spent?: string;
    market?: {
        description: string;
        outcome_tags: string[];
        finalized: boolean;
        end_time: string;
        payout_numerator: string[] | null;
        is_scalar: boolean;
        pool: {
            collateral_token_id: string;
            pool_balances?: {
                outcome_id: number,
                price: number
            }[];
        }
    }
}

export interface GraphUserBalanceResponse {
    balances: GraphUserBalancesItem[];
}

export function getMarketStatus(data: GraphUserBalancesItem['market']) {
    if (!data) {
        return trans('marketStatus.uknown');
    }

    const endTime = new Date(parseInt(data.end_time));
    const now = new Date();

    if (data.finalized && data.payout_numerator !== null) {
        return trans('marketStatus.finalized');
    } else if (data.finalized && data.payout_numerator === null) {
        return trans('marketStatus.invalid');
    } else if (!data.finalized && now.getTime() >= endTime.getTime()) {
        return trans('marketStatus.resoluting');
    } else {
        return trans('marketStatus.ongoing');
    }
}

export function transformToUserBalance(graphData: GraphUserBalancesItem, collateralTokenMetadata: TokenMetadata): UserBalance {
    const isScalar = graphData.market?.is_scalar;
    let outcomeTag = graphData.market?.outcome_tags[graphData.outcome_id] ?? '';
    const outcomeId = graphData.outcome_id;
    const outcomePrice = graphData.market?.pool.pool_balances?.find(pb => pb.outcome_id === graphData.outcome_id)?.price ?? 0;
    const spent = new Big(graphData.spent ?? '0');
    const payoutNumerator = graphData.market?.payout_numerator || null;
    const avgPaidPrice = graphData.balance === '0' ? new Big(0) : spent.div(graphData.balance);
    const payoutNumeratorForOutcome = payoutNumerator && payoutNumerator[outcomeId] ? payoutNumerator[outcomeId] : '0';
    const currentPrice = payoutNumerator ? formatCollateralToken(payoutNumeratorForOutcome, collateralTokenMetadata.decimals) : outcomePrice.toString();
    const profitPercentage = avgPaidPrice.gt("0") ? new Big(currentPrice).minus(avgPaidPrice).div(avgPaidPrice).mul(100).round(2) : new Big("0");

    if (isScalar) {
        if (graphData.outcome_id === 0) {
            outcomeTag = trans('market.outcomes.short');
        } else {
            outcomeTag = trans('market.outcomes.long');
        }
    }

    return {
        avgPaidPrice,
        balance: graphData.balance,
        outcomeId,
        spent: spent.toString(),
        marketId: graphData.pool_id,
        marketDescription: graphData.market?.description || '',
        marketStatus: getMarketStatus(graphData.market),
        outcomeTag,
        collateralTokenMetadata,
        outcomePrice,
        payoutNumerator,
        profitPercentage,
    }
}
