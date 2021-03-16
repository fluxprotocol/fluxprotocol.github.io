import { Pagination } from "@fluxprotocol/amm-sdk/dist/models/Pagination";
import { transformToMainTokenViewModel } from "../models/TokenViewModel";
import { Transaction, transformToTransaction } from "../models/Transaction";
import { connectSdk } from "./WalletService";

/**
 * Gets all the transactions a user has done on Flux
 *
 * @export
 * @param {string} accountId
 * @return {Promise<Pagination<Transaction>>}
 */
export async function getTransactionsForAccount(accountId: string, limit: number, offset: number): Promise<Pagination<Transaction>> {
    const sdk = await connectSdk();

    const result = await sdk.getTransactions({
        accountId,
        limit,
        offset,
    });

    const transactions = result.items.map(async (tx) => {
        const collateralToken = await transformToMainTokenViewModel(tx.pool.collateral_token_id);
        return transformToTransaction(tx, collateralToken);
    });

    return {
        total: result.total,
        items: await Promise.all(transactions),
    }
}
