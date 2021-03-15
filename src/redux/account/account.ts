import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Account } from '../../models/Account';
import { EscrowStatus } from '../../models/EscrowStatus';
import { PoolToken } from '../../models/PoolToken';
import { TokenViewModel } from '../../models/TokenViewModel';
import { Transaction } from '../../models/Transaction';
import { UserBalance } from '../../models/UserBalance';

export type AccountState = Readonly<{
    account: Account | null;
    loading: boolean;
    poolTokens: PoolToken[];
    balances: UserBalance[];
    poolTokenLoading: boolean;
    nearToken?: TokenViewModel;
    wrappedNearToken?: TokenViewModel;
    requiredWrappedNearDeposit?: string;
    errors: string[];
    escrowStatus: EscrowStatus[];
    accountTransactions: {
        loading: boolean;
        transactions: Transaction[];
        total: number;
    };
}>;

const initialState: AccountState = {
    account: null,
    loading: false,
    poolTokenLoading: false,
    poolTokens: [],
    errors: [],
    balances: [],
    escrowStatus: [],
    accountTransactions: {
        loading: false,
        transactions: [],
        total: 0,
    }
};

const accountSlice = createSlice({
    initialState,
    name: 'account',
    reducers: {
        setAccount(state: AccountState, action: PayloadAction<Account | null>): AccountState {
            return ({
                ...state,
                account: action.payload,
            });
        },
        setNearToken(state: AccountState, action: PayloadAction<TokenViewModel | undefined>): AccountState {
            return ({
                ...state,
                nearToken: action.payload,
            });
        },
        setWrappedNearToken(state: AccountState, action: PayloadAction<TokenViewModel | undefined>): AccountState {
            return ({
                ...state,
                wrappedNearToken: action.payload,
            });
        },
        setRequiredWrappedNearDeposit(state: AccountState, action: PayloadAction<string | undefined>): AccountState {
            return ({
                ...state,
                requiredWrappedNearDeposit: action.payload,
            });
        },
        setAccountPoolTokens(state: AccountState, action: PayloadAction<PoolToken[]>): AccountState {
            return ({
                ...state,
                poolTokens: action.payload,
            });
        },
        setAccountLoading(state: AccountState, action: PayloadAction<boolean>): AccountState {
            return ({
                ...state,
                loading: action.payload,
            });
        },
        setAccountPoolTokenLoading(state: AccountState, action: PayloadAction<boolean>): AccountState {
            return ({
                ...state,
                poolTokenLoading: action.payload,
            });
        },
        setAccountBalances(state: AccountState, action: PayloadAction<UserBalance[]>): AccountState {
            return ({
                ...state,
                balances: action.payload,
            });
        },
        setEscrowStatus(state: AccountState, action: PayloadAction<EscrowStatus[]>): AccountState {
            return ({
                ...state,
                escrowStatus: action.payload,
            });
        },
        setAccountErrors(state: AccountState, action: PayloadAction<string[]>): AccountState {
            return ({
                ...state,
                errors: action.payload,
            });
        },
        setAccountTransactions(state: AccountState, action: PayloadAction<Transaction[]>): AccountState {
            return ({
                ...state,
                accountTransactions: {
                    ...state.accountTransactions,
                    transactions: action.payload,
                }
            });
        },
        setTotalAccountTransactions(state: AccountState, action: PayloadAction<number>): AccountState {
            return ({
                ...state,
                accountTransactions: {
                    ...state.accountTransactions,
                    total: action.payload,
                }
            });
        },
        setAccountTransactionsLoading(state: AccountState, action: PayloadAction<boolean>): AccountState {
            return ({
                ...state,
                accountTransactions: {
                    ...state.accountTransactions,
                    loading: action.payload,
                }
            });
        }
    },
});

export const {
    setAccount,
    setAccountErrors,
    setAccountLoading,
    setAccountPoolTokenLoading,
    setAccountPoolTokens,
    setAccountBalances,
    setNearToken,
    setWrappedNearToken,
    setRequiredWrappedNearDeposit,
    setEscrowStatus,
    setAccountTransactions,
    setTotalAccountTransactions,
    setAccountTransactionsLoading,
} = accountSlice.actions;

export default accountSlice.reducer;
