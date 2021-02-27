import { EscrowStatus } from "@fluxprotocol/amm-sdk/dist/models/EscrowStatus";
import Big from "big.js";
import { PoolToken } from "../../../models/PoolToken";
import { TokenViewModel } from "../../../models/TokenViewModel";

export function calculatePayout(
    tokens: TokenViewModel[], 
    payoutNumerator: string[] | null, 
    escrowStatus: EscrowStatus[], 
    poolTokenTotalSupply: string, 
    poolToken?: PoolToken
): Big {
    let claimable = new Big(0);

    // First add fees
    if (poolToken) {
        claimable = claimable.add(poolToken.fees);
    }
    
    // Token balance * payout numerator
    if (payoutNumerator) {
        const escrowValidMarket = escrowStatus.find(status => status.type === 'valid_escrow');
        const numerators = payoutNumerator.map(n => new Big(n));

        numerators.forEach((num, outcome) => {
            const token = tokens.find(token => token.outcomeId === outcome);
            if (!token || num.eq("0")) return;

            const payout = new Big(token.balance).mul(num.div(`1e${token.decimals}`));
            // Calculate payout from still existent lp tokens
            if (poolToken) {
                const bal = new Big(poolToken.balance);
                if (bal.eq("0")) return;
                const ts = new Big(poolTokenTotalSupply);
                const relBal = bal.div(ts);
                const outcomeOwnership = relBal.mul(tokens[outcome].poolBalance);
                const claimableThroughExit = outcomeOwnership.mul(num.div(`1e${token.decimals}`));
                claimable = claimable.add(claimableThroughExit);
            }

            claimable = claimable.add(payout);
        });

        if (escrowValidMarket) {
            claimable = claimable.add(escrowValidMarket.total_amount);
        }
    } else {
        // Return total spent + escrow.invalid
    }

    return claimable;
}
