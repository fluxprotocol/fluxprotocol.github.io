import React from 'react';
import { FluxTransactionType } from '@fluxprotocol/amm-sdk';

import { Transaction } from '../../models/Transaction';
import trans from '../../translation/trans';
import AddLiquidityTransactionRow from './TransactionRows/AddLiquidityTransactionRow/AddLiquidityTransactionRow';

import s from './TransactionsOverview.module.scss';
import BuyTransactionRow from './TransactionRows/BuyTransactionRow/BuyTransactionRow';
import SellTransactionRow from './TransactionRows/SellTransactionRow/SellTransactionRow';
import RemoveLiquidityTransactionRow from './TransactionRows/RemoveLiquidityTransactionRow/RemoveLiquidityTransactionRow';
import RedeemTransactionRow from './TransactionRows/RedeemTransactionRow/RedeemTransactionRow';
import ClaimEarningsTransactionRow from './TransactionRows/ClaimEarningsTransactionRow/ClaimEarningsTransactionRow';
import { routePaths } from '../../routes';

interface Props {
    transactions: Transaction[];
}

export default function TransactionsOverview({
    transactions,
}: Props) {
    return (
        <div>
            <header className={s.header}>
                {trans('accountTransactionsOverview.title')}
            </header>
            <div className={s.tableWrapper}>
                <table className={s.table}>
                    <thead>
                        <tr className={s.tableHeadRow}>
                            <th>{trans('accountTransactionsOverview.table.type')}</th>
                            <th>{trans('accountTransactionsOverview.table.market')}</th>
                            <th>{trans('accountTransactionsOverview.table.details')}</th>
                            <th />
                            <th />
                            <th>{trans('accountTransactionsOverview.table.date')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((tx) => {
                            const href = {
                                pathname: routePaths.marketDetail(tx.marketId),
                                state: {
                                    canGoBack: true,
                                }
                            };

                            if (tx.type === FluxTransactionType.AddLiquidity) {
                                return <AddLiquidityTransactionRow href={href} transaction={tx} key={tx.id} className={s.tableRow} linkClassName={s.link} />
                            } else if (tx.type === FluxTransactionType.Buy) {
                                return <BuyTransactionRow href={href} transaction={tx} key={tx.id} className={s.tableRow} linkClassName={s.link} />
                            } else if (tx.type === FluxTransactionType.Sell) {
                                return <SellTransactionRow href={href} transaction={tx} key={tx.id} className={s.tableRow} linkClassName={s.link} />
                            } else if (tx.type === FluxTransactionType.RemoveLiquidity) {
                                return <RemoveLiquidityTransactionRow href={href} transaction={tx} key={tx.id} className={s.tableRow} linkClassName={s.link} />
                            } else if (tx.type === FluxTransactionType.Redeem) {
                                return <RedeemTransactionRow href={href} transaction={tx} key={tx.id} className={s.tableRow} linkClassName={s.link} />
                            } else if (tx.type === FluxTransactionType.ClaimEarnings) {
                                return <ClaimEarningsTransactionRow href={href} transaction={tx} key={tx.id} className={s.tableRow} linkClassName={s.link} />
                            }

                            return null;
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
