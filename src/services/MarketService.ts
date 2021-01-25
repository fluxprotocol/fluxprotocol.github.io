import { format } from 'date-fns';
import { FUNGIBLE_TOKEN_ACCOUNT_ID } from '../config';
import { FetchResult, FetchResultType, isFetchResultSuccesful } from '../models/FetchResult';
import { MarketCategory, MarketViewModel } from '../models/Market';
import { sleep } from '../utils/sleep';
import createProtocolContract from './contracts/ProtocolContract';
import { getMainToken } from './MainTokenService';
export interface MarketFormValues {
    isCategoricalMarket: boolean;
    categories: MarketCategory[];
    resolutionDate: Date;
    description: string;
    outcomes: string[];
}

export async function createMarket(values: MarketFormValues): Promise<FetchResult<any, string>> {
    try {
        const protocol = await createProtocolContract();
        const outcomes = values.outcomes.length > 2 ? values.outcomes : ['YES', 'NO'];

        protocol.createMarket(values.description, outcomes, values.resolutionDate);

        return {
            type: FetchResultType.Success,
            data: {},
            status: 200,
        }
    } catch (error) {
        console.error('[createMarket]', error);
        return {
            type: FetchResultType.Error,
            error,
            status: 500,
        }
    }
}

export async function getMarketById(marketId: string): Promise<MarketViewModel | null> {
    const mainTokenResponse = await getMainToken();

    try {
        const market: MarketViewModel = {
            id: marketId,
            finalized: true,
            resoluted: false,
            description: "Will SpaceX launch a second manned mission in 2020?",
            resolutionDate: new Date(),
            extraInfo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            volume: '100000000',
            category: ['StakeGG'],
            owner: 'franklinwaller.testnet',
            outcomes: [
                {
                    outcomeId: 0,
                    price: 0.4,
                    weight: 40,
                    outcomeLabel: 'Yes',
                },
                {
                    outcomeId: 1,
                    price: 0.6,
                    weight: 60,
                    outcomeLabel: 'No',
                }
            ],
            collateralToken: FUNGIBLE_TOKEN_ACCOUNT_ID
        };

        await sleep(2000);

        return market;
    } catch (error) {
        console.error('[getMarketById]', error);
        return null;
    }

}

export interface MarketFilters {
    categories?: MarketCategory[];
}

export async function getMarkets(filters: MarketFilters): Promise<MarketViewModel[]> {
    try {
        const categories = Object.values(MarketCategory);
        const market: MarketViewModel = {
            id: '6',
            finalized: false,
            owner: 'godaso.dsjai',
            resoluted: false,
            description: "Will SpaceX launch a second manned mission in 2020?",
            resolutionDate: new Date(),
            extraInfo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            volume: '100000000',
            // category: [],
            category: ['StakeGG', 'CSGP'],
            outcomes: [
                {
                    outcomeId: 0,
                    price: 0.4,
                    weight: 40,
                    outcomeLabel: 'Yes',
                },
                {
                    outcomeId: 1,
                    price: 0.6,
                    weight: 60,
                    outcomeLabel: 'No',
                }
            ],
            collateralToken: FUNGIBLE_TOKEN_ACCOUNT_ID
        };

        const x = new Array(23).fill(0).map((nan, index) => ({
            ...market,
            id: index.toString(),
        }));

        await sleep(2000);

        return x;
    } catch (error) {
        console.error('[getMarketById]', error);
        return [];
    }
}

export async function getResolutingMarkets(): Promise<MarketViewModel[]> {
    try {
        const categories = Object.values(MarketCategory);
        const market: MarketViewModel = {
            resoluted: false,
            finalized: true,
            owner: 'sdahuoasd',
            id: '6',
            description: "Will BTC hit $1000000 by the end of 2020?",
            resolutionDate: new Date(),
            extraInfo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            volume: '100000000',
            // category: [],
            category: ['StakeGG', 'CSGP'],
            outcomes: [
                {
                    outcomeId: 0,
                    price: 0.4,
                    weight: 40,
                    outcomeLabel: 'Yes',
                },
                {
                    outcomeId: 1,
                    price: 0.6,
                    weight: 60,
                    outcomeLabel: 'No',
                }
            ],
            collateralToken: FUNGIBLE_TOKEN_ACCOUNT_ID
        };

        const x = new Array(23).fill(0).map((nan, index) => ({
            ...market,
            id: index.toString(),
        }));

        return x;
    } catch (error) {
        console.error('[getMarketById]', error);
        return [];
    }
}



export function formatResolutionDate(resolutionDate: Date): string {
    return format(resolutionDate, 'MMMM d, yyyy HH:mm');
}
