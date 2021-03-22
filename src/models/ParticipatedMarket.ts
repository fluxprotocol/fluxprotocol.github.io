import { ParticipatedMarket as FluxParticipatedMarket } from '@fluxprotocol/amm-sdk';
import { getMarketStatusTranslation } from './Market';

export interface ParticipatedMarket {
    participated_date: Date;
    marketId: string;
    marketDescription: string;
    marketStatus: string;
}

export function transformToParticipatedMarket(item: FluxParticipatedMarket): ParticipatedMarket {
    return {
        participated_date: new Date(Number(item.participated_date)),
        marketDescription: item.market.description,
        marketId: item.market.id,
        marketStatus: getMarketStatusTranslation(
            Number(item.market.end_time),
            item.market.payout_numerator,
            item.market.finalized
        ),
    }
}
