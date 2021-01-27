import Big from "big.js";
export interface PoolBalanceViewModel {
    outcomeId: number;
    price: number;
    weight: number;
    poolWeight: Big;
    outcomeLabel: string;
    poolBalance: string;
    odds: Big;
}

export interface PoolBalanceGraphData {
    id: string;
    pool_id: string;
    outcome_id: number;
    account_id: string;
    balance: string;
    price: number;
    weight: string;
    odds: string;
}

export function transformToPoolBalanceViewModel(response: PoolBalanceGraphData[], outcomeTags: string[]): PoolBalanceViewModel[] {
    // @todo write this in a simpler way (start with outcome tags and work your way back)
    if (!response.length) {
        return outcomeTags.map((tag, index) => ({
            outcomeId: index,
            outcomeLabel: tag,
            poolWeight: new Big('0'),
            price: 0,
            weight: 0,
            poolBalance: "0",
            odds: new Big(0),
        }));
    }

    return response.map((poolBalance) => {
        const poolWeight = new Big(poolBalance.weight);

        return {
            outcomeId: poolBalance.outcome_id,
            outcomeLabel: outcomeTags[poolBalance.outcome_id],
            price: poolBalance.price,
            poolWeight,
            poolBalance: poolBalance.balance,
            weight: 0,
            odds: new Big(poolBalance.odds),
        };
    }).sort((a, b) => a.outcomeId - b.outcomeId);
}
