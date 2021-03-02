import React from 'react';
import classnames from 'classnames';
import { MarketType, MarketViewModel } from '../../models/Market';
import { formatResolutionDate } from '../../services/MarketService';
import trans from '../../translation/trans';

import s from './MarketHeader.module.scss';
import MarketOpinionCard from '../../compositions/MarketOpinionCard';
import Tag from '../../components/Tag';
import getCategoryInfo from '../../utils/getCategoryInfo';
import Button from '../../components/Button';

interface Props {
    market: MarketViewModel;
    className?: string;
    onGoBackClick: () => void;
}

export default function MarketHeader({
    market,
    onGoBackClick,
    className = '',
}: Props) {
    return (
        <header className={classnames(s['root'], className)}>
            <div className={s['wrapper']}>
                <div className={s.headerItem}>
                    <Button className={s['market-header__back-button']} onClick={onGoBackClick}>
                        {trans('navigation.back')}
                    </Button>
                    {market.category.length > 0 && (<Tag className={s.categoryTag} category={market.category[0]} />)}

                    <h1 className={s.title}>{market.description}</h1>

                    {market.creationDate && (
                        <div className={s.resolutionDate}>
                            <span className={s['market-header__resolution-date-title']}>
                                {trans('market.startDate')} —&nbsp;
                            </span>
                            <span className={s['market-header__resolution-date-stamp']}>
                                {formatResolutionDate(market.creationDate)}
                            </span>
                        </div>
                    )}

                    <div className={s.resolutionDate}>
                        <span className={s['market-header__resolution-date-title']}>
                            {trans('market.resolutionDate')} —&nbsp;
                        </span>
                        <span className={s['market-header__resolution-date-stamp']}>
                            {formatResolutionDate(market.resolutionDate)}
                        </span>
                    </div>
                </div>
                <div className={classnames(s.headerItem, s.opinionCardWrapper)}>
                    <MarketOpinionCard market={market} />
                </div>
                <div className={s['bubble']} style={{ backgroundImage: `url(${getCategoryInfo(market.category[0]).circleIcon})` }} />
            </div>
        </header>
    );
}
