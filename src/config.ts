import BN from 'bn.js';

export const API_URL = process.env.REACT_APP_API_URL || '';
export const NULL_CONTRACT = 'null_contract.flux-dev';
export const COINGECKO_API_URL = process.env.REACT_APP_COINGECKO_API_URL || '';
export const PROTOCOL_ACCOUNT_ID = process.env.REACT_APP_PROTOCOL_ACCOUNT_ID || 'amm.flux-dev';
export const FUNGIBLE_TOKEN_ACCOUNT_ID = process.env.REACT_APP_FUNGIBLE_TOKEN_ACCOUNT_ID || 'ft.flux-dev';
export const MAX_GAS = new BN("300000000000000");
export const STORAGE_DEFAULT = new BN("115800000000000000000000");
export const BUY = "BUY";
export const SELL = "SELL";