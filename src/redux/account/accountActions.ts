import {
    setAccount,
    setAccountBalances,
    setAccountLoading,
    setAccountPoolTokenLoading,
    setAccountPoolTokens,
    setNearToken,
    setRequiredWrappedNearDeposit,
    setWrappedNearToken,
    setEscrowStatus,
    setAccountTransactions,
    setTotalAccountTransactions,
    setAccountTransactionsLoading,
    setAccountParticipatedMarketsLoading,
    setTotalAccountParticipatedMarkets,
    setAccountParticipatedMarkets,
} from "./account";
import { signUserIn, getAccountInfo, signUserOut, getAccountBalancesInfo, fetchEscrowStatus, getParticipatedMarkets } from '../../services/AccountService';
import { getNearToken, getRequiredWrappedNearStorageDeposit, getWrappedNearStorageBalance, getWrappedNearToken } from "../../services/NearService";
import { getTransactionsForAccount } from '../../services/TransactionService';
import { Reducers } from "../reducers";

export function signIn() {
    return async (dispatch: Function) => {
        try {
            dispatch(setAccountLoading(true));
            await signUserIn();
            dispatch(setAccountLoading(false));
        } catch (error) {
            dispatch(setAccountLoading(false));
            console.error('[signIn]', error);
        }
    }
}

export function getEscrowStatus(accountId: string) {
    return async (dispatch: Function) => {
        try {
            dispatch(setAccountLoading(true));
            const escrowStatus = await fetchEscrowStatus(accountId);
            dispatch(setEscrowStatus(escrowStatus));
            dispatch(setAccountLoading(false));

        } catch (error) {
            dispatch(setAccountLoading(false));
            console.error('[fetchEscrowStatus]', error);
        }
    }
}

export function loadAccount() {
    return async (dispatch: Function) => {
        try {
            dispatch(setAccountLoading(true));
            const account = await getAccountInfo();
            dispatch(setAccount(account));
            dispatch(setAccountLoading(false));
        } catch (error) {
            dispatch(setAccountLoading(false));
            console.error('[loadAccount]', error);
        }
    }
}

export function loadNearBalances() {
    return async (dispatch: Function) => {
        const nearTokenRequest = getNearToken();
        const wrappedNeartokenRequest = getWrappedNearToken();

        let accountInfo = await getAccountInfo();
        if (accountInfo !== null) {
            const storageUsage = await getWrappedNearStorageBalance();

            if (storageUsage.total === '0') {
                const requiredDeposit = await getRequiredWrappedNearStorageDeposit();
                dispatch(setRequiredWrappedNearDeposit(requiredDeposit));
            }
        }

        const nearToken = await nearTokenRequest;
        const wrappedNearToken = await wrappedNeartokenRequest;

        dispatch(setNearToken(nearToken));
        dispatch(setWrappedNearToken(wrappedNearToken));
    }
}

export function loadAccountBalanceInfo(accountId: string) {
    return async (dispatch: Function) => {
        try {
            dispatch(setAccountPoolTokenLoading(true));
            const accountBalancesInfo = await getAccountBalancesInfo(accountId);
            dispatch(setAccountPoolTokens(accountBalancesInfo.poolTokens));
            dispatch(setAccountBalances(accountBalancesInfo.marketBalances));
            dispatch(setAccountPoolTokenLoading(false));
        } catch (error) {
            dispatch(setAccountPoolTokenLoading(false));
            console.error('[getPoolTokensForAccount]', error);
        }
    }
}

export function signOut() {
    return async (dispatch: Function) => {
        await signUserOut();
        dispatch(setAccount(null));
    }
}

export function loadAccountTransactions(accountId: string, reset = false) {
    return async (dispatch: Function, getState: () => Reducers) => {
        dispatch(setAccountTransactionsLoading(true));
        const limit = 100;

        if (reset) {
            dispatch(setAccountTransactions([]));
        }

        const state = getState();
        const currentLoadedTransactions = state.account.accountTransactions.transactions;
        const offest = currentLoadedTransactions.length;
        const transactions = await getTransactionsForAccount(accountId, limit, offest);

        dispatch(setAccountTransactions([
            ...currentLoadedTransactions,
            ...transactions.items,
        ]));

        dispatch(setTotalAccountTransactions(transactions.total));
        dispatch(setAccountTransactionsLoading(false));
    }
}

export function loadAccountParticipatedMarkets(accountId: string, reset = false) {
    return async (dispatch: Function, getState: () => Reducers) => {
        dispatch(setAccountParticipatedMarketsLoading(true));
        const limit = 100;

        if (reset) {
            dispatch(setAccountParticipatedMarkets([]));
        }

        const state = getState();
        const currentLoadedMarkets = state.account.accountParticipatedMarkets.participatedMarkets;
        const offest = currentLoadedMarkets.length;
        const participatedMarkets = await getParticipatedMarkets(accountId, limit, offest);

        dispatch(setAccountParticipatedMarkets([
            ...currentLoadedMarkets,
            ...participatedMarkets.items,
        ]));

        dispatch(setTotalAccountParticipatedMarkets(participatedMarkets.total));
        dispatch(setAccountParticipatedMarketsLoading(false));
    }
}
