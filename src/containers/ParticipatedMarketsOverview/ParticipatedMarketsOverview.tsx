import React from 'react';
import classnames from 'classnames';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';

import { ParticipatedMarket } from '../../models/ParticipatedMarket';
import { routePaths } from '../../routes';
import { prettyFormatDate } from '../../services/DateService';
import trans from '../../translation/trans';

import s from './ParticipatedMarketsOverview.module.scss';

interface Props {
    participatedMarkets: ParticipatedMarket[];
    hasMoreMarkets: boolean;
    onRequestMoreMarkets: () => void;
}

export default function ParticipatedMarketsOverview({
    participatedMarkets,
    hasMoreMarkets,
    onRequestMoreMarkets,
}: Props) {
    return (
        <div>
            <header className={s.header}>
                {trans('participatedMarketsOverview.title')}
            </header>
            <InfiniteScroll
                dataLength={participatedMarkets.length}
                next={onRequestMoreMarkets}
                hasMore={hasMoreMarkets}
                loader={<div />}
            >
                <div className={s.tableWrapper}>
                    <table className={s.table}>
                        <thead>
                            <tr className={s.tableHeadRow}>
                                <th>{trans('participatedMarketsOverview.table.description')}</th>
                                <th>{trans('participatedMarketsOverview.table.status')}</th>
                                <th>{trans('participatedMarketsOverview.table.date')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {participatedMarkets.map((item) => {
                                const href = {
                                    pathname: routePaths.marketDetail(item.marketId),
                                    state: {
                                        canGoBack: true,
                                    }
                                };

                                return (
                                    <tr className={s.tableRow} key={item.marketId}>
                                        <td>
                                            <Link to={href} className={classnames(s.link, s.marketDescription)}>
                                                {item.marketDescription}
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={href} className={s.link}>
                                                {item.marketStatus}
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={href} className={s.link}>
                                                {prettyFormatDate(item.participated_date)}
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </InfiniteScroll>
        </div>
    )
}
