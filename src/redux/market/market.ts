import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MarketViewModel } from '../../models/Market';

export type MarketState = Readonly<{
    markets: MarketViewModel[];
    resolutingMarkets: MarketViewModel[];
    marketDetail?: MarketViewModel;
    marketError?: string[];
    marketLoading: boolean;
    editLoading: boolean,
}>;

const initialState: MarketState = {
    marketLoading: false,
    editLoading: false,
    markets: [],
    resolutingMarkets: [],
};

const marketsSlice = createSlice({
    initialState,
    name: 'markets',
    reducers: {
        setMarketErrors(state: MarketState, action: PayloadAction<string[]>): MarketState {
            return ({
                ...state,
                marketError: action.payload,
            });
        },
        setMarketLoading(state: MarketState, action: PayloadAction<boolean>): MarketState {
            return ({
                ...state,
                marketLoading: action.payload,
            });
        },
        setMarketEditLoading(state: MarketState, action: PayloadAction<boolean>): MarketState {
            return ({
                ...state,
                editLoading: action.payload,
            });
        },
        setMarkets(state: MarketState, action: PayloadAction<MarketViewModel[]>): MarketState {
            return ({
                ...state,
                markets: action.payload,
            });
        },
        appendMarkets(state: MarketState, action: PayloadAction<MarketViewModel[]>): MarketState {
            return ({
                ...state,
                markets: [...action.payload, ...state.markets],
            });
        },
        setResolutingMarkets(state: MarketState, action: PayloadAction<MarketViewModel[]>): MarketState {
            return ({
                ...state,
                resolutingMarkets: action.payload,
            });
        },
        setMarketDetail(state: MarketState, action: PayloadAction<MarketViewModel | undefined>): MarketState {
            return ({
                ...state,
                marketDetail: action.payload,
            });
        },
    },
});

export const {
    setMarketErrors,
    setMarketLoading,
    setMarkets,
    setResolutingMarkets,
    setMarketDetail,
    setMarketEditLoading,
    appendMarkets,
} = marketsSlice.actions;

export default marketsSlice.reducer;
