import { Account, Contract } from "near-api-js";
import { FUNGIBLE_TOKEN_ACCOUNT_ID, MAX_GAS, PROTOCOL_ACCOUNT_ID, STORAGE_DEFAULT } from "../../config";
import { SwapFormValues } from "../SwapService";
import { connectWallet } from "../WalletService";

class TokenContract {
    contract: Contract;

    constructor(account: Account, tokenAccountId: string) {
        this.contract = new Contract(account, tokenAccountId, {
            viewMethods: ['get_balance'],
            changeMethods: ['transfer_with_vault'],
        });
    }

    async getBalance(accountId: string): Promise<void> {
        // @ts-ignore
        return this.contract.get_balance({account_id: accountId});
    }

    async buy(
        marketId: string,
        values: SwapFormValues
    ): Promise<void> {
        let payload = JSON.stringify({
            function: "buy",
            args: {
                market_id: marketId,
                outcome_id: values.toToken.outcomeId,
                min_shares_out: values.amountOut // TODO: add default slippage check to amountOut and make it expectedAmountOut
            }
        });

        // @ts-ignore
        return this.contract.transfer_with_vault({
                receiver_id: this.contract.account.accountId,
                amount: "1",
                payload: payload
            },
            values.amountIn,
            MAX_GAS
        )
    }


}

let protocolInstance: TokenContract;

export default async function createTokenContract(tokenAccountId: string): Promise<TokenContract> {
    if (protocolInstance) {
        return protocolInstance;
    }

    const wallet = await connectWallet();
    protocolInstance = new TokenContract(wallet.account(), tokenAccountId);

    return protocolInstance;
}
