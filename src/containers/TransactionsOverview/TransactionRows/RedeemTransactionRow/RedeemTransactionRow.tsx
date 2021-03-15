import FluxSdk from '@fluxprotocol/amm-sdk';
import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { Transaction } from '../../../../models/Transaction';
import { prettyFormatDate } from '../../../../services/DateService';
import trans from '../../../../translation/trans';

interface Props {
    transaction: Transaction;
    className?: string;
    href: any;
    linkClassName?: string;
}

export default function RedeemTransactionRow({
    transaction,
    href,
    linkClassName,
    className = '',
}: Props) {
    return (
        <tr className={className}>
            <td>
                <Link to={href} className={linkClassName}>
                    {trans('accountTransactionsOverview.redeem.type')}
                </Link>
            </td>
            <td>
                <Link to={href} className={classnames(linkClassName, 'txoverview__market-description')}>
                    {transaction.marketDescription}
                </Link>
            </td>
            <td>
                <Link to={href} className={linkClassName}>
                    {FluxSdk.utils.formatToken(transaction.input, transaction.collateralToken.decimals)} {transaction.tokenName}
                </Link>
            </td>
            <td>
                <Link to={href} className={linkClassName}>
                ➔
                </Link>
            </td>
            <td>
                <Link to={href} className={linkClassName}>
                    {FluxSdk.utils.formatToken(transaction.output, transaction.collateralToken.decimals)} {transaction.collateralToken.tokenSymbol}
                </Link>
            </td>
            <td>
                <Link to={href} className={linkClassName}>
                   {prettyFormatDate(transaction.date)}
                </Link>
            </td>
        </tr>
    );
}
