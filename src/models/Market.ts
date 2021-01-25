import { PoolBalanceViewModel } from "./PoolBalance";
import { TokenViewModel } from "./TokenViewModel";

export enum MarketCategory {
    Stocks = 'stocks',
    Esports = 'esports',
    Meme = 'meme',
    Politics = 'politics',
    Viral = 'viral',
    Crypto = 'crypto',
    Sports = 'sports',
    Startups = 'startups',
    Unknown = 'unknown',
}

export interface MarketViewModel {
    id: string;
    finalized: boolean;
    owner: string;
    description: string;
    resolutionDate: Date;
    resoluted: boolean;
    outcomes: PoolBalanceViewModel[];
    volume: string;
    category: (MarketCategory | string)[];
    extraInfo: string;
    collateralToken: string;
}
