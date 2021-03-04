import { getCollateralTokenMetadata } from "../services/CollateralTokenService";
import { TokenMetadata } from "./TokenMetadata";

export interface EscrowStatusResponse {
    total_amount: string;
    type: 'valid_escrow' | 'invalid_escrow';
    market: {
        id: string,
        description: string,
        pool: {
            collateral_token_id: string
        }
    }
}

export interface EscrowStatus {
    totalAmount: string;
    type: 'valid_escrow' | 'invalid_escrow';
    marketId: string,
    marketDescription: string,
    collateralToken: TokenMetadata
}

export async function transformEscrowStatusViewModel(escrowStatusResponse: EscrowStatusResponse[]) : Promise<EscrowStatus[]> {
    const escrowStatus = [];
    for await (const d of escrowStatusResponse) {
        let collateralTokenMetaData = await getCollateralTokenMetadata(d.market.pool.collateral_token_id);
        escrowStatus.push({
            totalAmount: d.total_amount,
            type: d.type,
            marketId: d.market.id,
            marketDescription: d.market.description,
            collateralToken: collateralTokenMetaData
        })
    }
    return escrowStatus;
}