import BN from 'bn.js';
import Big from 'big.js';
export const API_URL = process.env.REACT_APP_API_URL || '';
export const NULL_CONTRACT = process.env.REACT_APP_NULL_CONTRACT ?? 'null_contract.flux-dev';
export const COINGECKO_API_URL = process.env.REACT_APP_COINGECKO_API_URL || '';
export const PROTOCOL_ACCOUNT_ID = process.env.REACT_APP_PROTOCOL_ACCOUNT_ID || 'amm.flux-dev';
export const FUNGIBLE_TOKEN_ACCOUNT_ID = process.env.REACT_APP_FUNGIBLE_TOKEN_ACCOUNT_ID || 'ft.flux-dev';
export const WRAPPED_NEAR_ACCOUNT_ID = process.env.REACT_APP_WRAPPED_NEAR_ACCOUNT_ID || 'wrap.near';
export const MAX_GAS = new BN("300000000000000");
export const STORAGE_DEFAULT = new BN("300800000000000000000000");
export const STORAGE_BASE = new BN('30000000000000000000000');
export const ONE = new BN((10 ** 18).toString());
export const ZERO = new BN("0");
export const BUY = "BUY";
export const SELL = "SELL";
export const DEFAULT_FEE = 2; // 2%
export const DEFAULT_SLIPPAGE = 2; // 2%
export const NODE_ENV = process.env.NODE_ENV;
export const NETWORK: 'testnet' | 'mainnet' | 'custom' = process.env.REACT_APP_NETWORK as any || 'testnet';

export const DEFAULT_LIMIT = 100;
export const ANALYTICS_STORAGE_KEY = 'flux_selected_period';

Big.PE = 1000000;
