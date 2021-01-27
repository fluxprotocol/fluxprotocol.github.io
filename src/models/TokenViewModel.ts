import Big from "big.js";

import { PoolBalanceGraphData, transformToPoolBalanceViewModel } from "./PoolBalance";
import { AccountTokenBalance, formatCollateralToken, getCollateralTokenBalance, getCollateralTokenPrice } from '../services/CollateralTokenService';
import { UserBalance } from "./UserBalance";

export interface TokenViewModel {
    tokenName: string;
    balance: string;
    balanceFormatted: string;
    price: number;
    tokenSymbol: string;
    outcomeId: number;
    tokenAccountId?: string;
    poolWeight: Big;
    poolBalance: string;
    weight: number;
    odds: Big;
    decimals: number;
}

/**
 * Generates a short token name (max 3 characters) for a token
 *
 * @export
 * @param {string} tokenName
 * @return {string}
 */
export function generateTokenName(tokenName: string): string {
    if (tokenName.length <= 3) {
        return tokenName.toUpperCase();
    }

    const splitted = tokenName.split(' ');

    if (splitted.length === 2) {
        // Takes the first character of every spaced word
        // so for Kanye West it would be KW
        return (splitted[0][0] + splitted[1][0]).toUpperCase();
    } else if (splitted.length === 3) {
        // Same but for 3 letters
        return (splitted[0][0] + splitted[1][0] + splitted[2][0]).toUpperCase();
    }

    return tokenName.slice(0, 3).toUpperCase();
}

/**
 * Transforms to a tokenview model shape
 *
 * @export
 * @param {string[]} tags
 * @param {PoolBalanceGraphData[]} [poolBalanceData=[]]
 * @param {UserBalance[]} userBalances
 * @return {TokenViewModel[]}
 */
export function transformToTokenViewModels(
    tags: string[],
    poolBalanceData: PoolBalanceGraphData[] = [],
    userBalances: UserBalance[],
): TokenViewModel[] {
    const poolBalances = transformToPoolBalanceViewModel(poolBalanceData, tags);

    return tags.map((outcome, outcomeId) => {
        const poolBalance = poolBalances.find(poolBalance => poolBalance.outcomeId === outcomeId);
        const userBalance = userBalances.find(userBalance => userBalance.outcomeId === outcomeId);

        return {
            balance: userBalance?.balance || '0',
            balanceFormatted: formatCollateralToken(userBalance?.balance || '0'),
            outcomeId,
            price: poolBalance?.price || 0,
            tokenSymbol: generateTokenName(outcome),
            tokenName: outcome,
            poolBalance: poolBalance?.poolBalance || "0",
            poolWeight: poolBalance?.poolWeight || new Big(0),
            weight: poolBalance?.weight || 0,
            decimals: 18,
            odds: poolBalance?.odds || new Big(0),
        };
    });
}

/**
 * Used for the collateralToken fills some information to keep the shape of TokenViewModel
 *
 * @export
 * @param {string} collateralTokenAccountId
 * @param {string} [accountId]
 * @param {boolean} [fetchPrice=true]
 * @return {Promise<TokenViewModel>}
 */
export async function transformToMainTokenViewModel(collateralTokenAccountId: string, accountId?: string, fetchPrice = true): Promise<TokenViewModel> {
    let balances: AccountTokenBalance = {
        balance: '0',
        balanceFormatted: '0',
    };

    if (accountId) {
        balances = await getCollateralTokenBalance(collateralTokenAccountId, accountId);
    }

    return {
        balance: balances.balance,
        balanceFormatted: balances.balanceFormatted,
        decimals: 18,
        outcomeId: NaN,
        poolWeight: new Big(0),
        price: fetchPrice ? await getCollateralTokenPrice(collateralTokenAccountId) : 0,
        tokenName: collateralTokenAccountId,
        tokenSymbol: collateralTokenAccountId,
        poolBalance: "",
        weight: 0,
        tokenAccountId: collateralTokenAccountId,
        odds: new Big(0)
    };
}
