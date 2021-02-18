import Big from "big.js";
import { WRAPPED_NEAR_ACCOUNT_ID } from "../config";
import { TokenViewModel } from "../models/TokenViewModel";
import { formatCollateralToken } from "./CollateralTokenService";
import { connectSdk } from "./WalletService";
import wrappedNearIcon from '../assets/images/icons/wrapped-near.svg';
import nearIcon from '../assets/images/icons/near-icon.png';
import createWrappedNearContract from "./contracts/WrappedNearContract";

export async function getNearToken(): Promise<TokenViewModel> {
    const defaults: TokenViewModel = {
        decimals: 24,
        isCollateralToken: false,
        odds: new Big(0),
        outcomeId: NaN,
        poolBalance: '0',
        poolWeight: new Big(0),
        tokenName: 'NEAR',
        price: 0,
        priceSymbol: '$',
        priceSymbolPosition: 'left',
        tokenSymbol: 'NEAR',
        weight: 0,
        balance: '0',
        balanceFormatted: '0',
        tokenImage: nearIcon,
    }

    try {
        const sdk = await connectSdk();
        const balance = await sdk.getNearBalance();

        return {
            ...defaults,
            balance: balance.available,
            balanceFormatted: formatCollateralToken(balance.available, 24),
        }
    } catch (error) {
        console.error('[getNearToken]', error);
        return defaults;
    }
}

export async function getWrappedNearToken(): Promise<TokenViewModel> {
    const defaults: TokenViewModel = {
        decimals: 24,
        isCollateralToken: false,
        odds: new Big(0),
        outcomeId: NaN,
        poolBalance: '0',
        poolWeight: new Big(0),
        tokenName: 'wNEAR',
        price: 0,
        priceSymbol: '$',
        priceSymbolPosition: 'left',
        tokenSymbol: 'wNEAR',
        tokenImage: wrappedNearIcon,
        weight: 0,
        balance: '0',
        balanceFormatted: '0',
    }

    try {
        const wNearContract = await createWrappedNearContract();
        const sdk = await connectSdk();
        const accountId = sdk.getAccountId();
        const balance = await wNearContract.getBalance(accountId);

        return {
            ...defaults,
            balance,
            balanceFormatted: formatCollateralToken(balance, 24),
        }
    } catch (error) {
        console.error('[getWrappedNearToken]', error);
        return defaults;
    }
}

export interface WrapNearFormValues {
    amountIn: string;
    type: 'wrap' | 'unwrap';
}

export async function wrapNear(amountIn: string) {
    const wNearContract = await createWrappedNearContract();
    wNearContract.wrapNear(amountIn);
}

export async function unwrapNear(amountIn: string) {
    const wNearContract = await createWrappedNearContract();
    wNearContract.unwrapNear(amountIn);
}

export async function getWrappedNearStorageBalance() {
    const wNearContract = await createWrappedNearContract();
    const sdk = await connectSdk();
    
    return wNearContract.getStorageBalance(sdk.getAccountId());
}

export async function getRequiredWrappedNearStorageDeposit() {
    const wNearContract = await createWrappedNearContract();
    return wNearContract.getMinimumRequiredStorageBalance();
}

export async function depositWrappedNearStorage(amount: string, accountId?: string) {
    const wNearContract = await createWrappedNearContract();
    return wNearContract.depositStorage(amount, accountId);
}
