import { FUNGIBLE_TOKEN_ACCOUNT_ID } from "../config";
import { TokenViewModel, transformToTokenViewModels } from "./TokenViewModel";
import { UserBalance } from "./UserBalance";

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
    Beer = "beer"
}

export interface GraphMarketResponse {
    description: string;
    outcome_tags: string[];
    end_time: string;
    extra_info: string;
    finalized: boolean;
    id: string;
    volume: string;
    categories: string[];
    pool: {
        public: boolean;
        owner: string;
        collateral_token_id: string;
        pool_balances: {
            weight: string;
            outcome_id: number;
            balance: string;
            price: number;
        }[];
        tokens_info: {
            is_pool_token: boolean;
            total_supply: string;
        }[];
    }
}

export interface MarketViewModel {
    id: string;
    finalized: boolean;
    public: boolean;
    owner: string;
    description: string;
    resolutionDate: Date;
    volume: string;
    category: (MarketCategory | string)[];
    extraInfo: string;
    collateralTokenId: string;
    outcomeTokens: TokenViewModel[];
    collateralToken: TokenViewModel;
    poolTokenInfo: {
        totalSupply: string;
    };
}

export async function transformToMarketViewModel(graphResponse: GraphMarketResponse, collateralToken: TokenViewModel, userBalances: UserBalance[] = []): Promise<MarketViewModel> {
    const tokensInfo = graphResponse.pool.tokens_info || [];
    const poolTokenInfo = tokensInfo.find(info => info.is_pool_token);

    return {
        id: graphResponse.id,
        category: graphResponse.categories || [],
        description: graphResponse.description,
        extraInfo: graphResponse.extra_info,
        finalized: graphResponse.finalized,
        owner: graphResponse.pool.owner,
        resolutionDate: new Date(parseInt(graphResponse.end_time)),
        public: graphResponse.pool.public,
        volume: graphResponse.volume,
        collateralTokenId: FUNGIBLE_TOKEN_ACCOUNT_ID,
        collateralToken,
        outcomeTokens: transformToTokenViewModels(
            graphResponse.outcome_tags,
            graphResponse.pool.pool_balances as any,
            userBalances,
        ),
        poolTokenInfo: {
            totalSupply: poolTokenInfo?.total_supply || '0',
        }
    }
}
